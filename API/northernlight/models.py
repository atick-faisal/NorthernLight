from django.db import models


class UserData(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    hum = models.PositiveIntegerField()
    temp = models.PositiveIntegerField()
    light = models.PositiveIntegerField()
    anomaly = models.FloatField(default=20)
    condition = models.PositiveIntegerField(default=666)


class Devices(models.Model):
    name = models.TextField(default="Unnamed")
    port = models.PositiveIntegerField(default=1)
    state = models.BooleanField(default=False)
