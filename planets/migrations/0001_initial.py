# Generated by Django 2.0.1 on 2018-01-10 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Planet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=30)),
                ('Distance', models.FloatField(default=0.0)),
                ('Size', models.FloatField(default=0.0)),
                ('Ordinality', models.IntegerField(default=0)),
            ],
        ),
    ]