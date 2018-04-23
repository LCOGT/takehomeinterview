from django.forms import ModelForm
from .models import Planet
from django import forms

class AddPlanetForm(ModelForm):
     #Fields for users to add planets
     #Declared ordinality separately in order to ensure values
     #from 1 to 8
     ordinality = forms.IntegerField(help_text="Enter ordinality of planet",
                                     min_value = 1,
                                     max_value = 8)
     class Meta:
        model = Planet
        fields = '__all__'
        widgets = {
            'description': forms.Textarea(attrs={'rows':4, 'cols': 50})
        }
