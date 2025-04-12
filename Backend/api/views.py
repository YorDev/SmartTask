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


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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
            openai.base_url = "https://models.inference.ai.azure.com/"
            openai.api_key = settings.OPENAI_API_KEY
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

class GenAIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt", "")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=400)

        try:
            client = genai.ModelServiceClient()
            response = client.predict(
                model="projects/your_project/locations/us-central1/models/your_model",
                instances=[{"content": prompt}],
            )
            return Response({"response": response.predictions[0]})
        except Exception as e:
            return Response({"error": str(e)}, status=500)