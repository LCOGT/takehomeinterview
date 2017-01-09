from django.core.urlresolvers import reverse
from django.db import models


class Planet(models.Model):

    name = models.CharField(max_length=10, unique=True)
    size = models.FloatField()
    distance = models.FloatField()
    ordinality = models.IntegerField(unique=True)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('planet-list', args=[self.id])
