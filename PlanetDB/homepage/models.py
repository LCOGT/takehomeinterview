from django.db import models

class Planet(models.Model):
    #Planet model for PlanetDB application

    #Fields
    ordinality = models.IntegerField(primary_key=True, help_text="Enter ordinality of planet")
    name = models.CharField(max_length=20, help_text="Enter planet name")
    size = models.FloatField("Enter size of planet in Earth Masses")
    distance = models.FloatField("Enter distance from Sun in AU")
    description = models.CharField(max_length=500, help_text="Enter description of planet (500 char. max)")

    #Order by ordinality
    class Meta:
        ordering = ["ordinality"]
