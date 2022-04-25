from django.http import HttpResponse
from django.shortcuts import render
from .models import Sight, Production

def main(request):
    sights = Sight.objects.all()
    productions = Production.objects.all()
    data = {
        'sights' : sights,
        'productions' : productions
    }
    return render(request, 'RezhApp/main.html', context=data)

def map(request):
    return HttpResponse("Карта")
