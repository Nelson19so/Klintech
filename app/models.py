from django.db import models

# Create your models here.

class get_in_touch(models.Model):
  name = models.CharField(max_length=50, blank=False)
  email = models.EmailField(max_length=50, blank=False)
  message = models.TextField(max_length=1000, blank=False)

  def __str__(self):
    return self.name