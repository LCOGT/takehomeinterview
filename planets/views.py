from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse,HttpResponseRedirect
from .models import Planet
from .forms import PlanetForm

def index(request):
	if request.method == 'POST':
		form = PlanetForm(request.POST)

		if form.is_valid():
			ordinality = form.cleaned_data['Ordinality']
			name = form.cleaned_data['Name']
			size = form.cleaned_data['Size']
			distance = form.cleaned_data['Distance']
			description = form.cleaned_data['Description']

			print(ordinality)
			print(name)
			print(size)
			print(distance)
			print(description)
	
			planet = Planet(Ordinality=ordinality,
					Name=name,
					Size=size,
					Distance=distance,
					Description=description)
			planet.save()
			return HttpResponseRedirect('/planets/')
		return render(request, 'planets/index.html', {'planet': planet})
	else:
		planets = Planet.objects.all()
		form = PlanetForm()

	return render(request, 'planets/index.html', 
			{'form': form,
			 'planets': planets,})

def description(request, name):
	planet = Planet.objects.filter(Name=name)[0]

	return render(request, 'planets/description.html',
		{'planet': planet})
