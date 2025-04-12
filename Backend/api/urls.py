from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks-list'),
    path('task/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
    path('chatgpt/', views.ChatGPTView.as_view(), name='chatgpt'),
    path('genai/', views.GenAIView.as_view(), name='genai'),
]
