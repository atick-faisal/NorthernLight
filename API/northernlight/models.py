from django.db import models


class UserData(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    hum = models.FloatField()
    temp = models.FloatField()
    light = models.FloatField()
