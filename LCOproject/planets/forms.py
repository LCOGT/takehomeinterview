from django import forms

from .models import PlanetModel

class PlanetForm(forms.ModelForm):

	class Meta:
		model = PlanetModel
		fields = ('planet_name', 'planet_size', 'planet_distance', 'planet_ordinality', 'planet_description')