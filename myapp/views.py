from django.shortcuts import render, redirect
from .forms import ReservationForm
from django.http import JsonResponse
from .models import Reservation
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

@login_required
def create_reservation(request):
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            reservation = form.save(commit=False)
            reservation.assigned_user = request.user  # Associe la réservation à l'utilisateur connecté
            reservation.save()
            return redirect('reservation_success')  # Redirige après une réservation réussie
    else:
        form = ReservationForm()
    
    return render(request, 'reservation_form.html', {'form': form})

def calendar_view(request):
    return render(request, 'calendar.html')


def get_reservations(request):
    reservations = Reservation.objects.all()
    
    events = []
    for reservation in reservations:
        events.append({
            'title': reservation.assigned_user.username,  # Le nom de l'utilisateur
            'start': str(reservation.date),
        })

