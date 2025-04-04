import requests
import random
import time

# URL del formulario ("formResponse")
form_url = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdEEc5ZhPXPBdKEoOgeAHvzRLyOuajYdlz4B9dJfgT1RDSAyA/formResponse"

# Identificadores correctos de cada pregunta (REEMPLAZAR los `entry.X` si se cambia el link del formulario)
fields = {
    "edad": "entry.344563123",
    "sexo": "entry.1681414558",
    "frecuencia_accidentes": "entry.1350648690",
    "causa_principal_accidentes": "entry.1518500411",
    "involucrado_accidente": "entry.830398905",
    "respeto_leyes_transito": "entry.1503347704",
    "tecnologia_reduccion_accidentes": "entry.1521723257",
    "dispositivo_seguridad": "entry.1480980120",
    "app_utilidad": "entry.923561723",
    "funcion_importante_software": "entry.1983391644",
    "sistema_mecatronico_efectivo": "entry.960914537",
    "impacto_IA_prevencion": "entry.838755617",
    "viabilidad_RD": "entry.746007773",
    "educacion_vial_RD": "entry.2113260289",
    "inversion_tecnologia": "entry.155949217",
    "tecnologia_educacion_vial": "entry.253287189",
    "grupo_enfoque_educacion": "entry.1229120816",
    "uso_app_seguridad": "entry.1086095343",
    "deteccion_infracciones": "entry.1786690708",
    "campaña_concienciacion": "entry.1534077016"
}

# Opciones de respuestas mayormente positivas para cada pregunta
options = {
    "edad": ["18 - 24 años", "25 - 34 años", "35 - 44 años"] * 5 + [ "45 - 54 años"] * 3 + ["Menos de 18 años", "55 años o más"],
    "sexo": ["Masculino"] * 5 + ["Femenino"] * 3 +["Prefiero no decirlo"],
    "frecuencia_accidentes": ["Es algo que veo con frecuencia"] * 5 + ["He notado que es común en mi área"] * 3 + ["Casi nunca ocurre cerca de mí", "Lo veo en contadas ocasiones", "No lo veo a menudo", "Nunca he visto"],
    "causa_principal_accidentes": ["Exceso de velocidad"] * 5 + ["Uso del celular al conducir"] * 3 + ["Imprudencia de peatones", "Mal estado de las vías", "Consumo de alcohol o drogas", "Falta de señalización", "Todas las Anteriores"],
    "involucrado_accidente": ["Sí, como conductor"] * 5 + ["Sí, como pasajero"] * 3 + ["Sí, como peatón", "No, pero he presenciado uno", "No, nunca he estado involucrado", "Prefiero no responder"],
    "respeto_leyes_transito": ["Pocos lo hacen"] * 5 + ["Casi nadie las respeta"] * 3 + ["Sí, algunos respetan", "La mayoría respeta algunas leyes y otras no", "No se respetan en absoluto", "Ni las autoridades respetan las leyes"],
    "tecnologia_reduccion_accidentes": ["Sí, de manera significativa"] * 5 + ["Sí, pero solo si se implementa correctamente"] * 3 + ["Puede ayudar, pero no es suficiente", "No cambiaría mucho la situación actual", "No, los accidentes seguirán ocurriendo", "No estoy seguro de que funcionen"],
    "dispositivo_seguridad": ["Sí, sin dudarlo"] * 5 + ["Sí, si es gratuito"] * 3 + ["Sí, si es económico", "No, no confío en la tecnología", "No, es una invasión de privacidad", "No tengo vehículo"],
    "app_utilidad": ["Una que alerte sobre zonas de alto riesgo"] * 5 + ["Una que monitoree el comportamiento del conductor"] * 3 + ["Una que sugiera rutas más seguras", "Una que reporte condiciones de la vía en tiempo real", "Una que integre datos de tráfico y clima", "Todas las anteriores"],
    "funcion_importante_software": ["Alertas en tiempo real"] * 5 + ["Detección de infracciones con multas automatizadas"] * 3 + ["Análisis de datos históricos", "Integración con GPS", "Simulación de escenarios de tráfico", "Todas las anteriores"],
    "sistema_mecatronico_efectivo": ["Frenado automático de emergencia"] * 5 + ["Sensores de detección de colisión"] * 3 + ["Semáforos inteligentes", "Drones de vigilancia vial", "Comunicación entre vehículos", "Todas las anteriores"],
    "impacto_IA_prevencion": ["Detección de conductores ebrios"] * 5 + ["Predicción de puntos críticos de accidentes"] * 3 + ["Monitoreo de la fatiga del conductor", "Optimización de rutas en tiempo real", "Análisis de patrones de tráfico", "Todas las anteriores"],
    "viabilidad_RD": ["Sí, pero con muchas dificultades"] * 5 + ["Depende del tipo de sistema"] * 3 + ["Sí, es totalmente viable", "No es viable en la actualidad", "No, por falta de infraestructura", "Aquí no funciona"],
    "educacion_vial_RD": ["No, falta mucho por mejorar"] * 5 + ["No, casi no existe educación vial"] * 3 + ["Sí, es adecuada", "Sí, pero necesita actualizaciones", "Depende de cómo se implemente", "No tengo información al respecto"],
    "inversion_tecnologia": ["Sí, pero junto con educación vial"] * 5 + ["Sí, es una prioridad urgente"] * 3 + ["Sí, pero de forma gradual", "No, hay otros problemas más importantes", "No, la tecnología no es la solución", "No lo creo necesario"],
    "tecnologia_educacion_vial": ["Sí, es fundamental"] * 5 + ["Sí, pero no como prioridad"] * 3 + ["Sí, pero solo en ciertos niveles educativos", "No, no es necesario", "No, primero hay que mejorar la educación vial básica", "No creo que funcione"],
    "grupo_enfoque_educacion": ["Motociclistas"] * 5 + ["Conductores de automóviles"] * 3 + ["Peatones", "Ciclistas", "Estudiantes y jóvenes", "Transportistas y conductores de carga"],
    "uso_app_seguridad": ["Definitivamente, sí."] * 5 + ["Es algo que podría considerar."] * 3 + ["No me convence mucho.", "Podría ser una opción.", "Creo que hay mejores alternativas.", "No tengo una opinión clara al respecto."],
    "deteccion_infracciones": ["Sí, de manera efectiva"] * 5 + ["Sí, pero con regulaciones adecuadas"] * 3 + ["Sí, pero solo en ciertas zonas", "No, los conductores buscarían cómo evitarlas", "No me parece la mejor opción.", "No tengo suficiente información para decidir."],
    "campaña_concienciacion": ["Sí, sin dudarlo"] * 5 + ["Sí, si es accesible"] * 3 + ["Sí, pero solo como espectador", "No, no tengo tiempo", "No, no me interesa el tema", "No participaria"]
}



# Función para enviar respuestas
def submit_response():
    form_data = {entry_id: random.choice(options[question]) for question, entry_id in fields.items()}
    response = requests.post(form_url, data=form_data)
    return response.status_code

# Enviar respuestas con pausas aleatorias
for i in range(200):
    status = submit_response()
    if status == 200:
        print(f"Respuesta {i+1} enviada correctamente.")
    else:
        print(f"Error al enviar la respuesta {i+1}. Código de estado: {status}")
    time.sleep(random.uniform(1, 2))
