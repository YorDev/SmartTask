from rest_framework import viewsets
from .models import Task, AIInteraction
from .serializers import UserSerializer, TaskSerializer, AIInteractionSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TaskListCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Requiere autenticación

    def get(self, request):
        user = request.user  # Obtiene el usuario desde el token JWT
        tasks = Task.objects.filter(user=user)  # Filtra las tareas por usuario
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user  # Obtiene el usuario desde el token JWT
        data = request.data
        data['user'] = user.id  # Asigna el usuario al nuevo objeto
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
   
class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)



# class TaskViewSet(viewsets.ModelViewSet):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer

# class AIInteractionViewSet(viewsets.ModelViewSet):
#     queryset = AIInteraction.objects.all()
#     serializer_class = AIInteractionSerializer
