from django.db import models
from django.core.validators import MinValueValidator

class Planet(models.Model):
    Ordinality = models.PositiveIntegerField(primary_key=True, unique=True, validators=[MinValueValidator(1)])
    Name = models.CharField(max_length=20, unique=True)
    Size = models.DecimalField(max_digits=5, decimal_places=2)
    Distance = models.DecimalField(max_digits=5, decimal_places=2)
    Description = models.TextField()

    def __str__(self):
        return self.Name
    
