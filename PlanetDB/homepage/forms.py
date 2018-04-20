from django import forms

class AddPlanetForm(forms.Form):
     #Fields for users to add planets
     ordinality = forms.IntegerField(help_text="Enter ordinality of planet")
     name = forms.CharField(max_length=20, help_text="Enter planet name")
     size = forms.FloatField(help_text = "Enter size of planet in Earth Masses")
     distance = forms.FloatField(help_text = "Enter distance from Sun in AU")
     description = forms.CharField(max_length=500, help_text= "Enter description of planet (500 char. max)")
