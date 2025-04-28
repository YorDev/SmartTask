from rest_framework import viewsets
from .models import Task, AIInteraction
from .serializers import UserSerializer, TaskSerializer, AIInteractionSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
import openai
from google import genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import json
import re
from datetime import datetime


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
            
class TaskUpdateView(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)
   
   
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

class AIInteractionViewSet(viewsets.ModelViewSet):
    queryset = AIInteraction.objects.all()
    serializer_class = AIInteractionSerializer


class ChatGPTView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt", "")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=400)

        try:
            if "crear tarea" in prompt.lower():
                openai.api_key = settings.OPENAI_API_KEY
                openai.base_url = "https://models.inference.ai.azure.com/"

                system_msg = (
                    "Convierte la siguiente solicitud en un objeto JSON con los siguientes campos:\n"
                    "- title (string)\n"
                    "- priority (string: 'Alta', 'Media' o 'Baja')\n"
                    "- status (string: 'Pendiente', 'Completada')\n"
                    "- description (string)\n"
                    "- due_date (formato YYYY-MM-DD HH:MM:SS, que el año por default sea 2025)\n"
                    "- category (string)\n"
                    "Devuelve solo el JSON sin explicaciones ni comentarios."
                )

                response = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": system_msg},
                        {"role": "user", "content": prompt},
                    ],
                    max_tokens=300,
                    temperature=0.3,
                )

                json_text = response.choices[0].message.content.strip()

                # Limpieza del JSON en caso de que venga con etiquetas o texto adicional
                match = re.search(r'\{.*\}', json_text, re.DOTALL)
                if not match:
                    return Response({"error": "No se pudo interpretar la tarea. JSON no encontrado."}, status=400)

                clean_json = match.group(0)

                try:
                    task_data = json.loads(clean_json)
                except json.JSONDecodeError:
                    return Response({"error": "No se pudo interpretar la tarea. Formato de JSON inválido."}, status=400)

                # Validar y convertir la fecha y hora
                due_date = task_data.get("due_date", "2025-12-31 00:00:00")
                try:
                    due_date = datetime.strptime(due_date, "%Y-%m-%d %H:%M:%S")
                except ValueError:
                    return Response({"error": "Formato de fecha y hora inválido. Use YYYY-MM-DD HH:MM:SS."}, status=400)

                task = Task.objects.create(
                    user=request.user,
                    title=task_data.get("title", "Tarea sin título"),
                    priority=task_data.get("priority", "Media"),
                    status=task_data.get("status", "Pendiente"),
                    description=task_data.get("description", ""),
                    due_date=due_date,
                    category=task_data.get("category", "General"),
                )
                return Response({"response": f"Tarea '{task.title}' creada exitosamente."})

            elif "eliminar tarea" in prompt.lower():
                # Usar GPT para deducir el título a eliminar
                openai.api_key = settings.OPENAI_API_KEY
                openai.base_url = "https://models.inference.ai.azure.com/"

                system_msg = (
                    "A partir del siguiente mensaje, devuelve solo el título de la tarea que se desea eliminar en formato JSON:\n"
                    "{ \"title\": \"...\" }\n"
                    "No incluyas texto adicional."
                )

                response = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": system_msg},
                        {"role": "user", "content": prompt},
                    ],
                    max_tokens=50,
                    temperature=0.2,
                )

                # Limpiar respuesta y extraer título
                raw = response.choices[0].message.content.strip()
                match = re.search(r'\{.*\}', raw, re.DOTALL)
                if not match:
                    return Response({"error": "No se pudo interpretar el título de la tarea a eliminar."}, status=400)

                try:
                    title = json.loads(match.group(0)).get("title")
                except json.JSONDecodeError:
                    return Response({"error": "Formato inválido al extraer el título."}, status=400)

                if not title:
                    return Response({"error": "No se encontró un título válido en el prompt."}, status=400)

                task = Task.objects.filter(user=request.user, title=title).first()
                if task:
                    task.delete()
                    return Response({"response": f"Tarea '{title}' eliminada exitosamente."})
                else:
                    return Response({"response": f"No se encontró la tarea con título '{title}'."})


            elif "recomiendame" in prompt.lower():
                tasks = Task.objects.filter(user=request.user, status="Pendiente")
                if not tasks.exists():
                    return Response({"response": "No tienes tareas pendientes para recomendar."})

                task_list = "\n".join([f"- {task.title} (prioridad: {task.priority})" for task in tasks])

                # Pedimos a GPT que sugiera en base a las tareas
                openai.api_key = settings.OPENAI_API_KEY
                openai.base_url = "https://models.inference.ai.azure.com/"

                system_msg = (
                    "Eres un asistente que ayuda a priorizar tareas.\n"
                    "Basado en esta lista de tareas pendientes, recomienda cuál debería hacer primero y por qué."
                )

                response = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": system_msg},
                        {"role": "user", "content": task_list},
                    ],
                    max_tokens=200,
                    temperature=0.5,
                )

                recommendation = response.choices[0].message.content.strip()
                return Response({"response": recommendation})


            # Si no es un comando específico, usar ChatGPT para responder
            openai.api_key = settings.OPENAI_API_KEY
            openai.base_url = "https://models.inference.ai.azure.com/"
            response = openai.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=150,
                temperature=0.7,
            )
            return Response({"response": response.choices[0].message.content.strip()})

        except Exception as e:
            return Response({"error": str(e)}, status=500)