from django import forms
from .models import PlanetDB


class PlanetForm(forms.ModelForm):
    class Meta:
        model = PlanetDB
        fields = ('Ordinality', 'Name', 'Size', 'Distance', 'Description')

    def planet_exists(self, planet_name):
        """Check if planet exists to prevent duplicate planet names"""

        existing_planets = PlanetDB.objects.values_list('Name', flat=True)
        if planet_name in existing_planets:
            exists = True
        else:
            exists = False

        return exists
