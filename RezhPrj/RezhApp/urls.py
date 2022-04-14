from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main_page'),
    path('map/', views.map, name='map_page'),
]
