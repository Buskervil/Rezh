from django.http import HttpResponse
from django.shortcuts import render

def main(request):
    return render(request, 'RezhApp/main.html')

def map(request):
    return HttpResponse("Карта")
