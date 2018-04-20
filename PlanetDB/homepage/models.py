from django.db import models

#Planet model for PlanetDB application
class Planet(models.Model):

    #Fields
    ordinality = models.IntegerField(help_text="Enter ordinality of planet")
    name = models.CharField(max_length=20, help_text="Enter planet name")
    size = models.FloatField(help_text = "Enter size of planet in Earth Masses")
    distance = models.FloatField(help_text = "Enter distance from Sun in AU")
    description = models.CharField(max_length=500, help_text="Enter description of planet (500 char. max)")

    #Order by ordinality
    class Meta:
        ordering = ["ordinality"]
