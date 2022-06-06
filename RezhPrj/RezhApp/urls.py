from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.main, name='main_page'),
    path('map/', views.map, name='map_page'),
    path('sight/<int:id>', views.sight, name='sight_page'),
    path('history/<int:id>', views.history, name='history_page'),
    path('victorina/', views.victorina, name='victorina_page'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
