from rest_framework import viewsets
from rest_framework import permissions
from pet.models import Breed, Pet

from pet.serializers import BreedSerializer, PetSerializer


class BreedViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows breeds to be viewed or edited.
    """
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer


class PetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows owner's pets to be viewed or edited.
    """
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user   
        return Pet.objects.filter(owner=user).order_by('-birth_date')
