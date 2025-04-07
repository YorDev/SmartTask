from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks-list'),
    path('task/delete/<uuid:pk>/', views.TaskDelete.as_view(), name='task-delete'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint para obtener el token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint para refrescar el token
]
