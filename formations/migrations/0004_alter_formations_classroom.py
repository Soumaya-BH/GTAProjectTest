# Generated by Django 3.2.13 on 2022-05-22 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('formations', '0003_auto_20220522_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formations',
            name='classroom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='formations.classroms'),
        ),
    ]
