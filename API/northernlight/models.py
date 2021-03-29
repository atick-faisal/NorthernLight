from django.db import models


class UserData(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    hum = models.PositiveIntegerField()
    temp = models.PositiveIntegerField()
    light = models.PositiveIntegerField()
    anomaly = models.FloatField()


class UserControl(models.Model):
    port1 = models.BooleanField(default=False)
    port2 = models.BooleanField(default=False)
