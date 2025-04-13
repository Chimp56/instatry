from django.db import models
from django.contrib.postgres.fields import ArrayField

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_filename = models.CharField(max_length=255)
    overlay_model = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    tags = ArrayField(models.CharField(max_length=255), blank=True, default=list)

