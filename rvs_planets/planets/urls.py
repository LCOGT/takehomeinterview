from django.urls import path

from . import views

app_name = 'planets'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:Ordinality>/', views.detail, name='detail'),
    path('planet_add/', views.add_planet, name='planet_add'),
]


