from django.http import HttpResponse
from django.shortcuts import render
from .models import Sight, Production, History

def main(request):
    sights = Sight.objects.all()
    productions = Production.objects.all()
    histories = History.objects.all()
    data = {
        'sights' : sights,
        'productions' : productions,
        'histories' : histories
    }
    return render(request, 'RezhApp/main.html', context=data)

def sight(request, id):
    sight = Sight.objects.get(id=id)
    data = {
        'sight' : sight
    }
    return render(request, 'RezhApp/sight.html', context=data)

def history(request, id):
    history = History.objects.get(id=id)
    histories = History.objects.all().filter(age=history.age)
    prev_history = History.objects.all().filter(age=history.age - 1)
    next_history = History.objects.all().filter(age=history.age + 1)

    prev_id = prev_history[0].id if len(prev_history) > 0 else -1
    next_id = next_history[0].id if len(next_history) > 0 else -1

    data = {
        'histories' : histories,
        'prev_history' : prev_history,
        'next_history' : next_history,
    }
    return render(request, 'RezhApp/history.html', context=data)

def map(request):
    return HttpResponse("Карта")
