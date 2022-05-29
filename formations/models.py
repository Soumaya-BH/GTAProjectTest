from django.db import models
import datetime



class Classroms(models.Model):
    name = models.CharField(max_length=5, null=True, blank=True) 

    def __str__(self):
        return self.name

class Formations(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(null=True, default=datetime.date.today)
    classroom = models.ForeignKey(Classroms, null=True, blank=True, on_delete=models.DO_NOTHING)
    image = models.FileField(upload_to="images/", default="images/default.png")

    def __str__(self):
        return self.title