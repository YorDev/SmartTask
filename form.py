import requests
import random
import time

# URL del formulario de Google
form_url = "https://docs.google.com/forms/d/e/1FAIpQLSfGSBO2N4i_MCggFmO7A4lxBM-Q3lOMTslz-BgLv97KLKRD8g/formResponse"

# Identificadores de los campos (entry.X)
fields = {
    "organizar_tareas": "entry.52835809",
    "metodos_gestion": "entry.803497894",
    "recomendaciones_personalizadas": "entry.216179644",
    "sincronizacion_dispositivos": "entry.1904568658",
    "uso_smarttask": "entry.1372917160",
    "impacto_productividad": "entry.2081874972",
    "recomendar_smarttask": "entry.2010712753",
}

# Opciones de respuesta para cada pregunta
options = {
    "organizar_tareas": ["no"],  # Mayor probabilidad de respuestas positivas
    "metodos_gestion": ["Alarmas", "Recordatorios", "Ningun Metodo"],
    "recomendaciones_personalizadas": ["No"],
    "sincronizacion_dispositivos": [ "No tan importante"],
    "uso_smarttask": ["No es probable"],
    "impacto_productividad": ["1", "3"], 
    "recomendar_smarttask": ["No lo recomendaria"],
}

# Función para enviar una respuesta
def submit_response():
    form_data = {}
    for question, entry_id in fields.items():
        form_data[entry_id] = random.choice(options[question])
    response = requests.post(form_url, data=form_data)
    return response.status_code

# Enviar
for i in range(50):
    status = submit_response()
    if status == 200:
        print(f"Respuesta {i+1} enviada correctamente.")
    else:
        print(f"Error al enviar la respuesta {i+1}. Código de estado: {status}")
    time.sleep(random.uniform(3, 5))
