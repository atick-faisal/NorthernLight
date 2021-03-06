# Generated by Django 3.1.7 on 2021-03-26 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('northernlight', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='humidity',
            new_name='hum',
        ),
        migrations.RenameField(
            model_name='userdata',
            old_name='temperature',
            new_name='light',
        ),
        migrations.RenameField(
            model_name='userdata',
            old_name='timestamp',
            new_name='time',
        ),
        migrations.AddField(
            model_name='userdata',
            name='temp',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
