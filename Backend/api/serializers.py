from rest_framework import serializers
from .models import Task, AIInteraction
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "user", "title", "description", "due_date", "category", "priority", "status", "created_by", "created_at"]
        read_only_fields = ["id", "created_at"]
        extra_kwargs = {
            "user": {"read_only": True}
        }

class AIInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIInteraction
        fields = '__all__'
