from django.db import models
from accounts.models import User
from facilities.models import Court, TimeSlot
from django.utils import timezone
import uuid

class Booking(models.Model):
    STATUS_CHOICES = (
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    )
    
    PAYMENT_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    )

    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    
    booking_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration_hours = models.DecimalField(max_digits=4, decimal_places=2)
    
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # Contact information
    contact_name = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    contact_email = models.EmailField()
    
    # Special requirements
    special_requests = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Cancellation
    cancelled_at = models.DateTimeField(null=True, blank=True)
    cancellation_reason = models.TextField(blank=True)

    def __str__(self):
        return f"Booking {self.booking_id} - {self.court.name}"

    @property
    def is_past(self):
        booking_datetime = timezone.datetime.combine(self.booking_date, self.start_time)
        return timezone.make_aware(booking_datetime) < timezone.now()

    @property
    def can_cancel(self):
        if self.status == 'cancelled':
            return False
        booking_datetime = timezone.datetime.combine(self.booking_date, self.start_time)
        # Allow cancellation up to 2 hours before booking
        cancellation_deadline = timezone.make_aware(booking_datetime) - timezone.timedelta(hours=2)
        return timezone.now() < cancellation_deadline

    @property
    def booking_datetime(self):
        return timezone.datetime.combine(self.booking_date, self.start_time)

    def cancel_booking(self, reason=''):
        self.status = 'cancelled'
        self.cancelled_at = timezone.now()
        self.cancellation_reason = reason
        self.save()

    class Meta:
        ordering = ['-created_at']


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('card', 'Credit/Debit Card'),
        ('upi', 'UPI'),
        ('wallet', 'Wallet'),
        ('cash', 'Cash'),
    )

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Payment gateway response
    gateway_response = models.JSONField(blank=True, null=True)
    
    # Timestamps
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.booking.booking_id}"

    class Meta:
        ordering = ['-created_at']