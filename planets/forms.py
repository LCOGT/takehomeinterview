from django import forms

class PlanetForm(forms.Form):
	Ordinality = forms.IntegerField()
	Name = forms.CharField(max_length=30)
	Size = forms.FloatField()
	Distance = forms.FloatField()
	Description = forms.CharField(widget=forms.Textarea)
