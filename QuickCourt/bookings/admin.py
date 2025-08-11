from django.contrib import admin
from .models import Booking, Payment

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [
        'booking_id', 'user', 'court', 'booking_date', 
        'start_time', 'status', 'payment_status', 'total_amount'
    ]
    list_filter = ['status', 'payment_status', 'booking_date', 'created_at']
    search_fields = [
        'booking_id', 'user__username', 'court__name', 
        'contact_name', 'contact_phone'
    ]
    readonly_fields = ['booking_id', 'created_at', 'updated_at']
    date_hierarchy = 'booking_date'

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        'booking', 'payment_method', 'amount', 
        'transaction_id', 'paid_at'
    ]
    list_filter = ['payment_method', 'paid_at', 'created_at']
    search_fields = ['booking__booking_id', 'transaction_id']
    readonly_fields = ['created_at']