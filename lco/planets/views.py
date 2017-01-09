from django.shortcuts import redirect, render

from .forms import PlanetForm
from planets.models import Planet

from django.views.generic.list import ListView
from django.views.generic.detail import DetailView


def PlanetCreate(request):
    form = PlanetForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('planet-list')
    else:
        return render(request, 'planets/create.html', {"form": form},)


class PlanetListView(ListView):

    model = Planet

    def get_context_data(self, **kwargs):
        context = super(PlanetListView, self).get_context_data(**kwargs)
        return context


class PlanetDetailView(DetailView):

    model = Planet

    def get_context_data(self, **kwargs):
        context = super(PlanetDetailView, self).get_context_data(**kwargs)
        return context
