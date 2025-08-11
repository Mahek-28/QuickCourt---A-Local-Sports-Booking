from django.urls import path
from . import views

app_name = 'bookings'

urlpatterns = [
    # User booking URLs
    path('book/<int:court_id>/', views.book_court, name='book_court'),
    path('payment/<uuid:booking_id>/', views.payment, name='payment'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
    path('booking/<uuid:booking_id>/', views.booking_detail, name='booking_detail'),
    path('cancel/<uuid:booking_id>/', views.cancel_booking, name='cancel_booking'),
    
    # Owner booking management
    path('owner/bookings/', views.owner_bookings, name='owner_bookings'),
]