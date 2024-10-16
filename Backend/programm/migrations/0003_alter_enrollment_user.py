# Generated by Django 5.1.1 on 2024-09-27 19:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0002_account_height_account_profile_pic_account_weight"),
        ("programm", "0002_enrollment"),
    ]

    operations = [
        migrations.AlterField(
            model_name="enrollment",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="account.account"
            ),
        ),
    ]
