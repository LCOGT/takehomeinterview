from django.db import models

class PlanetModel(models.Model):
	planet_name = models.CharField(max_length=200, unique=True)
	planet_size = models.DecimalField(max_digits=5, decimal_places=2)
	planet_distance = models.DecimalField(max_digits=5, decimal_places=2)
	planet_ordinality = models.IntegerField(unique=True)
	planet_description = models.CharField(max_length=500, default="")
	def __str__(self):
		return self.planet_name