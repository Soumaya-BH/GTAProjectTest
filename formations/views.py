from django.shortcuts import render
from rest_framework import generics
from .models import Formations, Classroms
from .serializers import FormationSerializer

class FormationListView(generics.ListAPIView):
    queryset = Formations.objects.all()
    serializer_class = FormationSerializer
