from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.home, name='home'),
    
    # Admin URLs
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('facility-approval/', views.facility_approval, name='facility_approval'),
    path('approve-facility/<int:pk>/', views.approve_facility, name='approve_facility'),
    path('user-management/', views.user_management, name='user_management'),
    path('toggle-ban/<int:pk>/', views.toggle_user_ban, name='toggle_user_ban'),
    
    # Facility Owner URLs
    path('owner-dashboard/', views.owner_dashboard, name='owner_dashboard'),
    
    # API endpoints for charts
    path('api/chart-data/<str:chart_type>/', views.chart_data, name='chart_data'),
]