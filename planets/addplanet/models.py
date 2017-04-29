from __future__ import unicode_literals

from django.db import models

# Create your models here.
class PlanetDB(models.Model):
    Ordinality = models.IntegerField()
    Name = models.CharField(max_length=50)
    Size = models.FloatField()
    Distance = models.FloatField()
    Description = models.CharField(max_length=500)
