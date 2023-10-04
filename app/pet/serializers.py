from rest_framework import serializers

from pet.models import Breed, Pet


class BreedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Breed
        fields = ['url', 'pet_type', 'name']


class PetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pet
        fields = ['url', 'owner', 'breed', 'name', 'birth_date']