from django.http import Http404
from django.shortcuts import render, redirect
from django.urls import reverse

from .models import PlanetModel
from .forms import PlanetForm

#homepage - list all planets in order of ordinality
def index(request):
	planets_list_all = PlanetModel.objects.order_by('planet_ordinality')
	context = {'planets_list_all': planets_list_all}
	return render(request, 'planets/index.html', context)

#detail page - list all details of requested planet
def detail(request, planet_id):
	try:
		planet = PlanetModel.objects.get(pk=planet_id)
	except PlanetModel.DoesNotExist:
		raise Http404("Planet does not exist in database")
	return render(request, 'planets/detail.html', {'planet': planet})

#input page - enter details on form, save to model
def inputplanet(request):
	if request.method == "POST":
		form = PlanetForm(request.POST)
		if form.is_valid():
			new_planet = form.save()
			return redirect('/planets/')
	else:
		form = PlanetForm()
	return render(request, 'planets/inputplanet.html', {'form': form})