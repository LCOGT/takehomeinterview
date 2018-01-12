from django import forms
from .models import Planet

class PlanetAddForm(forms.ModelForm):
    class Meta:
        model = Planet
        fields = ('Ordinality', 'Name', 'Size', 'Distance', 'Description')
    
