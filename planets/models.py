from django.db import models
from django.urls import reverse

# Create your models here.

class Planet(models.Model):

    # see XXX for numeric field validation
    ordinality = models.IntegerField(unique=True)
    
    name = models.CharField(max_length=24, unique=True)
    
    size = models.FloatField(help_text="Units of Earth Masses")
    
    distance = models.FloatField(help_text="Units of Astronomical Units")

    description = models.TextField()


    def __str__(self):
        """Specifies how class instances will appear as text
        """
        return self.name

    def get_absolute_url(self):
        """
        """
        return reverse('detail', kwargs={'pk': self.pk})
