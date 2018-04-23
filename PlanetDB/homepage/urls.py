from django.urls import path
from . import views

#Define urls for homepage
#For planet details pages, simply use their primary key
urlpatterns = [
    path('', views.index, name = 'index'),
    path('planet_detail/<int:pk>', views.PlanetDetail.as_view(), name='planet_detail'),
]
