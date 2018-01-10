from django.db import models

# Create your models here.

class Planet(models.Model):
	Name = models.CharField(max_length=30)
	Size = models.FloatField(default=0.0)
	Distance = models.FloatField(default=0.0)
	Ordinality = models.IntegerField(default=0)
	Description = models.TextField(default="Enter Description..")

	class Meta:
		unique_together = ("Ordinality", "Name")
