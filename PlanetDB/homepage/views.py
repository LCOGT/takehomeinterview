from django.shortcuts import render
from .models import Planet
from django.views import generic
from .forms import AddPlanetForm

def index(request):

    #fetch all existing Planet objects from database to display
    cur_list = Planet.objects.all()

    # if user has entered form data
    if request.method == 'POST':
        form = AddPlanetForm(request.POST)
        if form.is_valid():
            #clean data, error-check and add to db if needed
            data = form.cleaned_data
            new_planet = Planet(ordinality = data['ordinality'],
                                name = data['name'],
                                size = data['size'],
                                distance = data['distance'],
                                description = data['description'])
            new_planet.save()
            return HttpResponseRedirect('index')

    #if presenting page (GET)
    else:
        form = AddPlanetForm()

    return render(
        request,
        'index.html',
        context={'cur_list':cur_list, 'form':form}
    )

class PlanetDetail(generic.DetailView):
    model = Planet
