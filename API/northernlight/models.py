from django.db import models


class UserData(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    humidity = models.FloatField()
    temperature = models.FloatField()
