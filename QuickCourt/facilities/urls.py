from django.urls import path
from . import views

app_name = 'facilities'

urlpatterns = [
    path('venues/', views.venue_list, name='venue_list'),
    path('venues/<int:pk>/', views.venue_detail, name='venue_detail'),
    path('venues/<int:pk>/review/', views.add_review, name='add_review'),
    
    # Facility Owner URLs
    path('my-facilities/', views.owner_facilities, name='owner_facilities'),
    path('add-facility/', views.add_facility, name='add_facility'),
    path('edit-facility/<int:pk>/', views.edit_facility, name='edit_facility'),
    
    # Court Management
    path('facility/<int:facility_id>/courts/', views.manage_courts, name='manage_courts'),
    path('facility/<int:facility_id>/courts/add/', views.add_court, name='add_court'),
    path('courts/<int:pk>/edit/', views.edit_court, name='edit_court'),
    path('courts/<int:pk>/delete/', views.delete_court, name='delete_court'),
]