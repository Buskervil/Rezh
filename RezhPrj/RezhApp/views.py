from django.http import HttpResponse
from django.shortcuts import render
from .models import Sight

def main(request):
    sights = Sight.objects.all()
    data = {
        'sights' : sights
    }
    return render(request, 'RezhApp/main.html', context=data)

def map(request):
    return HttpResponse("Карта")
