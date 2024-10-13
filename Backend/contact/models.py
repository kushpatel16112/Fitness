from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return f"Message from {self.name}"
