# Generated by Django 5.1.6 on 2025-04-10 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_task_id_alter_task_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aiinteraction',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
