from rest_framework import serializers
from .models import Formations

class FormationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Formations
        fields = ["id", "title", "description", "date", "classroom", "image"]