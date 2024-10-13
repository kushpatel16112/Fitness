from django.db import models

class Challenge(models.Model):
    CHALLENGE_TYPE_CHOICES = [
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]
    title = models.CharField(max_length=200)
    challenge_img = models.ImageField(upload_to="challenges/",null=True,blank=True)
    description = models.TextField()
    goal = models.CharField(max_length=300,default="Default Goal")  
    tracking_method = models.TextField(default="Tracking method") 
    reward = models.CharField(max_length=200,default="No reward")
    start_date = models.DateField()
    end_date = models.DateField()
    challenge_type = models.CharField(max_length=10, choices=CHALLENGE_TYPE_CHOICES)

    def __str__(self):
        return self.title
