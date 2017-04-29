from django.shortcuts import render
from .models import PlanetDB
from .forms import PlanetForm

# Create your views here.
def home(request):
    """Home page"""
    all_planets = PlanetDB.objects.all()
    return render(request, 'index.html', {'planets': all_planets})


def input(request):
    """Form for planet input"""
    if request.method == 'POST':
        form = PlanetForm(request.POST)
        entry_name = form.data.get('Name')
        if form.is_valid():
            if form.planet_exists(entry_name):
                # replace old entry with identical name
                PlanetDB.objects.filter(Name=entry_name).delete()
            form.save()

    else:
        form = PlanetForm()
    return render(request, 'input.html', {'form': form})


def detail(request, planet_name):
    """Planet detail page"""
    planet_data = PlanetDB.objects.filter(Name=planet_name).get()
    return render(request, 'detail.html', {'planet': planet_data})
