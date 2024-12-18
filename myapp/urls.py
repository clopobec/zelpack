from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create_reservation', views.create_reservation, name='create_reservation'),
    path('calendar/', views.calendar_view, name='calendar'),
    
]

