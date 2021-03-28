# Generated by Django 3.1.7 on 2021-03-27 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('northernlight', '0002_auto_20210326_0637'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserControl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('port1', models.BooleanField(default=False)),
                ('port2', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='userdata',
            name='hum',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='light',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='temp',
            field=models.PositiveIntegerField(),
        ),
    ]