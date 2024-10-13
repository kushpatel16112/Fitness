# programm/models.py
from django.db import models
from account.models import Account  # Assuming you're using Django's built-in User model

class Programm(models.Model):
    programm_img = models.ImageField(upload_to="programm/")
    programm_name = models.CharField(max_length=100)
    description = models.CharField(max_length=600)
    key_features = models.CharField(max_length=200)
    work_include = models.CharField(max_length=200)
    example = models.CharField(max_length=200)

class Enrollment(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    program = models.ForeignKey(Programm, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'program')  # Prevent duplicate enrollments
