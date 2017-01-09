from django import forms
from planets.models import Planet


class PlanetForm(forms.ModelForm):

    class Meta:
        model = Planet
        fields = '__all__'
        widgets = {
            'name': forms.fields.TextInput(attrs={'placeholder': 'planet name'}),
            'distance': forms.fields.TextInput(
                attrs={'placeholder': 'from the sun, in Astronomical Units'}
            ),
            'size': forms.fields.TextInput(
                attrs={'placeholder': 'in Earth Masses'}
            ),
            'ordinality': forms.fields.TextInput(
                attrs={'placeholder': 'ordinality'}
            ),
            'description': forms.Textarea(
                attrs={'placeholder': 'planet description', 
                       'cols': 50, 'rows':20}
            ),
        }
