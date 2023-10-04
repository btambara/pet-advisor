from django.db import models
from django.conf import settings

class Breed(models.Model):
    class PetType(models.TextChoices):
        DOG = "Dog", "Dog"
        CAT = "Cat", "Cat"

    pet_type = models.CharField(choices=PetType.choices, default=PetType.DOG, max_length=3)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return f"{self.pet_type} | {self.name}"

class Pet(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    breed = models.ForeignKey("Breed", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def __str__(self) -> str:
        return self.name