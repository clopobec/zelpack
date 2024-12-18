from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# class User(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100)
#     institute = models.CharField(max_length=100)
#     laboratory = models.CharField(max_length=100)


class Reservation(models.Model):
    assigned_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    resource = models.CharField(max_length=100)
    date = models.DateField()

class User(AbstractUser):
    institute = models.CharField(max_length=100, blank=True, null=True)
    laboratory = models.CharField(max_length=100, blank=True, null=True)