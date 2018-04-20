from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name = 'index'),
    path('planet_detail/<int:pk>', views.PlanetDetail.as_view(), name='planet_detail'),
]
