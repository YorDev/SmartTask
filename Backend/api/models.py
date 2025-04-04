import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('Baja', 'Baja'),
        ('Media', 'Media'),
        ('Alta', 'Alta'),
    ]
    
    STATUS_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('En progreso', 'En progreso'),
        ('Completada', 'Completada'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField()
    category = models.CharField(max_length=100)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Media')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Pendiente')
    created_by = models.CharField(max_length=50, default='User')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class AIInteraction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ai_interactions")
    user_input = models.TextField()
    ai_response = models.TextField()
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="ai_interactions")
    created_at = models.DateTimeField(auto_now_add=True)