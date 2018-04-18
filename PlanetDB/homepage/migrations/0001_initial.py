# Generated by Django 2.0.4 on 2018-04-18 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Planet',
            fields=[
                ('ordinality', models.IntegerField(help_text='Enter ordinality of planet', primary_key=True, serialize=False)),
                ('name', models.CharField(help_text='Enter planet name', max_length=20)),
                ('size', models.FloatField(verbose_name='Enter size of planet in Earth Masses')),
                ('distance', models.FloatField(verbose_name='Enter distance from Sun in AU')),
                ('description', models.CharField(help_text='Enter description of planet (500 char. max)', max_length=500)),
            ],
            options={
                'ordering': ['ordinality'],
            },
        ),
    ]
