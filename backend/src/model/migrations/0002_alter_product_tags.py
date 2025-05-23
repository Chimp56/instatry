# Generated by Django 5.1.6 on 2025-04-13 00:51

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("model", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="tags",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(max_length=255),
                blank=True,
                default=list,
                null=True,
                size=None,
            ),
        ),
    ]
