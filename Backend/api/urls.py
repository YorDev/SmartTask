from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks-list'),
    path('task/delete/<uuid:pk>/', views.TaskDelete.as_view(), name='task-delete'),
]
