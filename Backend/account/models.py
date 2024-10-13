# Create your models here.
from django.contrib.auth.hashers import check_password
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Account(models.Model):
    user_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    profile_pic = models.ImageField(unique="profile/",blank=True,null=True)
    weight = models.FloatField(
        validators=[MinValueValidator(0.0)],
        null=True,
        blank=True,
    )
    height =  models.FloatField(
        validators=[MinValueValidator(0.0)],
        null=True,
        blank=True,)
    
    
    def _str_(self):
        return self.name 