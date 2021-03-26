# Generated by Django 3.1.7 on 2021-03-26 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('humidity', models.FloatField()),
                ('temperature', models.FloatField()),
            ],
        ),
    ]
