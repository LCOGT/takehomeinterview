from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.urls import reverse
from django.shortcuts import get_object_or_404, render


from .models import Planet

def index(request):
    planet_list = Planet.objects.order_by('Ordinality')[:5]
    #template = loader.get_template('planets/index.html')
    context = {'planet_list': planet_list}
    #output = ', '.join([p.Name for p in planet_list])
    return render(request, 'planets/index.html', context)

def detail(request, Ordinality):
    planet = get_object_or_404(Planet, pk=Ordinality)
    return render(request, 'planets/detail.html', {'planet': planet})

def add_planet(request):
    try:
        uniquePlanet = True
        errorMessage = ""
        ordinality = request.POST.get('ordinality')
        planetName = request.POST.get('name')
        if (ordinality):
            # Only check when posting form
            if (check_planet_by_ordinality(ordinality)):
                uniquePlanet = False
                errorMessage = 'A planet with this ordinality already exists'
            else:
                if (check_planet_by_name(planetName)):
                    uniquePlanet = False
                    errorMessage = 'A planet with this name already exists'
                    
            if uniquePlanet:
                planet = Planet(ordinality,
                                request.POST.get('name'),
                                request.POST.get('size'),
                                request.POST.get('distance'),
                                request.POST.get('description'))
                planet.save()
                return HttpResponseRedirect(reverse('planets:index'))
            else:
                return render(request, 'planets/planet_add.html', {
                    'error_message': errorMessage,
                })
        #planet = Planet.objects.get(pk=ordinality)
    except Planet.DoesNotExist:
        raise Http404("Planet does not exist")
    return render(request, 'planets/planet_add.html')

def check_planet_by_ordinality(ordinality):
    try:
        Planet.objects.get(pk=ordinality)
        return True
    except:
        return False

def check_planet_by_name(planetName):
    try:
        Planet.objects.get(Name=planetName)
        return True
    except:
        return False
        
    

    
