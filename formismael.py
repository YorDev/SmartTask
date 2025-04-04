import requests
import random
import time

# URL del formulario (IMPORTANTE: Debe ser la de "formResponse")
form_url = "https://docs.google.com/forms/d/e/1FAIpQLScJIJRIf1j_wvidMpL27F418StwCBEyUzpe8zINGYtpfu2YTA/formResponse"

# Identificadores de los campos
fields = {
    "sexo": "entry.1737146375",
    "edad": "entry.110748416",
    "nivel_academico": "entry.615828087",
    "experiencia_general": "entry.1813316592",
    "comodidad_instalaciones": "entry.1872948235",
    "limpieza_mantenimiento": "entry.306644045",
    "servicio_personal": "entry.956021604",
    "lujo_sostenibilidad": "entry.364743483",
    "calidad_alimentos": "entry.729851975",
    "servicios_adicionales": "entry.1247538859",
    "relacion_calidad_precio": "entry.672159587",
    "recomendacion": "entry.1173579922",
    "mejoras_sugeridas": "entry.636568490"
}

# Opciones
options = {
    "sexo": ["Masculino", "Femenino"],
    "edad": ["Menos de 18 años", "18 - 25 años", "26 - 35 años", "36 - 45 años", "46 - 55 años", "Más de 55 años"],
    "nivel_academico": ["Primaria", "Secundaria", "Universitario", "Posgrado o más"],
    "experiencia_general": (["Excelente"] * 9) + ["Buena", "Regular", "Mala"],
    "comodidad_instalaciones": (["Muy cómodo"] * 9) + ["Cómodo", "Neutral", "Incómodo"],
    "limpieza_mantenimiento": (["Muy satisfecho"] * 9) + ["Satisfecho", "Neutral", "Insatisfecho"],
    "servicio_personal": (["Excelente"] * 9) + ["Buena", "Regular", "Deficiente"],
    "lujo_sostenibilidad": (["Superaron mis expectativas"] * 9) + ["Cumplieron mis expectativas", "No cumplieron mis expectativas", "No estoy seguro"],
    "calidad_alimentos": (["Excelente"] * 9) + ["Buena", "Regular", "Mala"],
    "servicios_adicionales": (["Muy accesibles y eficientes"] * 9) + ["Aceptables", "Difíciles de acceder o con baja calidad", "No utilicé estos servicios"],
    "relacion_calidad_precio": (["Excelente relación calidad-precio"] * 9) + ["Buena relación calidad-precio", "Regular, podría mejorar", "No vale lo que pagué"],
    "recomendacion": (["Definitivamente sí"] * 9) + ["Probablemente sí", "No estoy seguro", "Probablemente no"],
    "mejoras_sugeridas": (["Nada, todo estuvo excelente"] * 9) + ["Instalaciones y comodidades", "Atención y servicio al cliente", "Variedad y calidad de alimentos y bebidas", "Actividades recreativas y entretenimiento"]
}

# Función para enviar respuestas
def submit_response():
    form_data = {entry_id: random.choice(options[question]) for question, entry_id in fields.items()}
    response = requests.post(form_url, data=form_data)
    return response.status_code

# Enviar 50
for i in range(50):
    status = submit_response()
    if status == 200:
        print(f"Respuesta {i+1} enviada correctamente.")
    else:
        print(f"Error al enviar la respuesta {i+1}. Código de estado: {status}")
    time.sleep(random.uniform(1, 3))  # Espera entre 1 y 3 segundos para evitar bloqueos
