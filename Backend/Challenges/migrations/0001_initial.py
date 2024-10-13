# Generated by Django 5.1.1 on 2024-09-27 10:51

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Challenge",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                (
                    "challenge_type",
                    models.CharField(
                        choices=[("weekly", "Weekly"), ("monthly", "Monthly")],
                        max_length=10,
                    ),
                ),
            ],
        ),
    ]
