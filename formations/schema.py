import graphene
from graphene_django import DjangoObjectType
from .models import Formations, Classroms
from graphql import GraphQLError
from graphene_file_upload.scalars import Upload
import base64
from django.core.files.base import ContentFile


class ClassromsType(DjangoObjectType):
    class Meta:
        model = Classroms
        fields = ("id", "name")

class FormationsType(DjangoObjectType): 
    class Meta:
        model = Formations
        fields = ("id", "title", "description", "date", "classroom", "image")

class Query(graphene.ObjectType):
    byid_formations = graphene.Field(FormationsType, id=graphene.Int())
    all_formations = graphene.List(FormationsType)
    all_classroms = graphene.List(ClassromsType)

        
    def resolve_byid_formations(root, info, id):
        return Formations.objects.get(pk=id)

    def resolve_all_formations(self, info):
        return Formations.objects.all()
    
    def resolve_all_classroms(root, info):
        return Classroms.objects.all()

class CreateClassroomMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
    classroom = graphene.Field(ClassromsType)

    @classmethod
    def mutate(cls, root, info, name):
        if Classroms.objects.filter(name=name).first():
            raise GraphQLError('Cette classe existe déjà')
        classroom = Classroms(name=name)
        classroom.save()
        return CreateClassroomMutation(classroom=classroom)

class UpdateClassroomMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=True)
    classroom = graphene.Field(ClassromsType)

    @classmethod
    def mutate(cls, root, info, name, id):
        if Classroms.objects.exclude(id=id).filter(name=name).first():
            raise GraphQLError('Cette classe existe déjà')
        classroom = Classroms.objects.get(id=id)
        classroom.name = name
        classroom.save()
        return UpdateClassroomMutation(classroom=classroom)

class DeleteClassroomMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    classroom = graphene.Field(ClassromsType)

    @classmethod
    def mutate(cls, root, info, id):
        classroom = Classroms.objects.get(id=id)
        classroom.delete()
        return 

class CreateFormationMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        date = graphene.String()
        classroom_id = graphene.Int()
        image = graphene.String()
    formation = graphene.Field(FormationsType)

    @classmethod
    def mutate(cls, root, info, title, description, date, classroom_id, image):
        classroom = Classroms.objects.get(pk=classroom_id)
        format, image = image.split(';base64,') 
        ext = format.split('/')[-1] 
        image = ContentFile(base64.b64decode(image), name='temp.' + ext)
        if Formations.objects.filter(date=date).filter(classroom=classroom).first():
            raise GraphQLError('La salle est réservée déjà')
        formation = Formations(title=title, description=description, date=date, classroom=classroom, image=image)
        formation.save()
        return CreateFormationMutation(formation=formation)

class UpdateFormationMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        title = graphene.String()
        description = graphene.String()
        date = graphene.Date()
        classroom_id = graphene.Int()
    formation = graphene.Field(FormationsType)

    @classmethod
    def mutate(cls, root, info, id, title, description, date, classroom_id):
        classroom = Classroms.objects.get(pk=classroom_id)
        if Formations.objects.filter(date=date).filter(classroom=classroom).first():
            raise GraphQLError('La salle est réservée déjà')
        formation = Formations.objects.get(id=id)
        formation.title = title
        formation.description = description
        formation.date = date
        formation.classroom = classroom
        formation.save()
        return UpdateFormationMutation(formation=formation)

class DeleteFormationMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    formation = graphene.Field(ClassromsType)

    @classmethod
    def mutate(cls, root, info, id):
        formation = Formations.objects.get(id=id)
        formation.delete()
        return

class Mutation(graphene.ObjectType):
    create_classroom = CreateClassroomMutation.Field()
    update_classroom = UpdateClassroomMutation.Field()
    delete_classroom = DeleteClassroomMutation.Field()
    create_formation = CreateFormationMutation.Field()
    update_formation = UpdateFormationMutation.Field()
    delete_formation = DeleteFormationMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)