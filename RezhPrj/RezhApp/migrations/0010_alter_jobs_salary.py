# Generated by Django 4.0.4 on 2022-06-15 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RezhApp', '0009_jobs_salary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobs',
            name='salary',
            field=models.CharField(default='По договоренности', max_length=64),
        ),
    ]