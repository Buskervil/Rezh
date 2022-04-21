from django.http import HttpResponse
from django.shortcuts import render
from .models import Sight, Jobs, Production

def main(request):
    sights = Sight.objects.all()
    jobs = Jobs.objects.all()
    production = Production.objects.all()

    data = {
        'sights' : sights,
        'jobs' : jobs,
        'production' : production,
    }
    return render(request, 'RezhApp/main.html', context=data)

def map(request):
    return HttpResponse("Карта")
