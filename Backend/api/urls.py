from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks-list'),
    path('task/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
<<<<<<< HEAD
    path('tasks/update/<int:pk>/', views.TaskUpdateView.as_view(), name='task-update'),
=======
>>>>>>> d7c6c70215bf74e63b102a18a480d7efc3cbae23
    path('chatgpt/', views.ChatGPTView.as_view(), name='chatgpt'),
    path('getuser/', views.UserListView.as_view(), name='getuser'),
]
