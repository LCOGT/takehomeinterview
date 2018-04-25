from django.shortcuts import render
from django.views import generic
from django.views.generic.edit import CreateView

from .models import Planet

# Create your views here.


class IndexView(generic.ListView):
    """Generic view to list all the Planets in the db.
    """
    model = Planet
    template_name = 'planets/index.html'
    ordering = ['ordinality'] # lowest ordinality first in query_set


class DetailView(generic.DetailView):
    """Generic view to display properties of a single planet.
    """
    model = Planet
    template_name = 'planets/detail.html'

    
class PlanetCreate(CreateView):
    """Generic view to create ModelForm from model fields.
    """
    model = Planet
    fields = '__all__' # ['ordinality', 'name', 'size', 'distance', 'description']
