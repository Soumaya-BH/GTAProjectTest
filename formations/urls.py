from django.urls import path
from graphene_django.views import GraphQLView
from formations.schema import schema
from . import views
from django.views.decorators.csrf import csrf_exempt
app_name = "ghazela"

urlpatterns = [
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path("api/", views.FormationListView.as_view(), name="ghazela_home")
]