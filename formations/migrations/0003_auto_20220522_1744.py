# Generated by Django 3.2.13 on 2022-05-22 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('formations', '0002_auto_20220522_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroms',
            name='name',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='formations',
            name='classroom',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='formations.classroms'),
        ),
        migrations.AlterField(
            model_name='formations',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='formations',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
