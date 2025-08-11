from django import forms
from .models import Booking, Payment
from facilities.models import Court, TimeSlot
from django.utils import timezone
import datetime

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = [
            'booking_date', 'start_time', 'end_time', 'contact_name',
            'contact_phone', 'contact_email', 'special_requests'
        ]
        widgets = {
            'booking_date': forms.DateInput(attrs={'type': 'date', 'min': timezone.now().date()}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
            'special_requests': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Any special requirements?'}),
        }

    def __init__(self, *args, **kwargs):
        self.court = kwargs.pop('court', None)
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        
        # Add Bootstrap classes
        for field_name, field in self.fields.items():
            if field_name == 'special_requests':
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control'})
        
        # Set minimum date to today
        self.fields['booking_date'].widget.attrs['min'] = timezone.now().date().isoformat()
        
        # Pre-fill user information if available
        if self.user:
            self.fields['contact_name'].initial = self.user.full_name or self.user.username
            self.fields['contact_email'].initial = self.user.email

    def clean_booking_date(self):
        booking_date = self.cleaned_data.get('booking_date')
        if booking_date and booking_date < timezone.now().date():
            raise forms.ValidationError("Booking date cannot be in the past.")
        return booking_date

    def clean(self):
        cleaned_data = super().clean()
        start_time = cleaned_data.get('start_time')
        end_time = cleaned_data.get('end_time')
        booking_date = cleaned_data.get('booking_date')
        
        if start_time and end_time:
            if start_time >= end_time:
                raise forms.ValidationError("End time must be after start time.")
            
            # Check if the time slot is within court operating hours
            if self.court:
                if start_time < self.court.opening_time or end_time > self.court.closing_time:
                    raise forms.ValidationError(
                        f"Booking time must be within court operating hours: "
                        f"{self.court.opening_time.strftime('%I:%M %p')} - "
                        f"{self.court.closing_time.strftime('%I:%M %p')}"
                    )
        
        # Check for overlapping bookings
        if booking_date and start_time and end_time and self.court:
            overlapping_bookings = Booking.objects.filter(
                court=self.court,
                booking_date=booking_date,
                status='confirmed'
            ).exclude(pk=self.instance.pk if self.instance else None)
            
            for booking in overlapping_bookings:
                if (start_time < booking.end_time and end_time > booking.start_time):
                    raise forms.ValidationError(
                        f"This time slot overlaps with an existing booking "
                        f"({booking.start_time.strftime('%I:%M %p')} - "
                        f"{booking.end_time.strftime('%I:%M %p')})"
                    )
        
        return cleaned_data

    def save(self, commit=True):
        booking = super().save(commit=False)
        
        if self.court and self.user:
            booking.court = self.court
            booking.user = self.user
            
            # Calculate duration and total amount
            start_datetime = datetime.datetime.combine(booking.booking_date, booking.start_time)
            end_datetime = datetime.datetime.combine(booking.booking_date, booking.end_time)
            duration = end_datetime - start_datetime
            booking.duration_hours = duration.total_seconds() / 3600
            booking.total_amount = booking.duration_hours * self.court.price_per_hour
        
        if commit:
            booking.save()
        
        return booking


class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['payment_method']
        widgets = {
            'payment_method': forms.RadioSelect(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['payment_method'].widget.attrs.update({'class': 'form-check-input'})


class BookingSearchForm(forms.Form):
    # STATUS_CHOICES = [('', 'All Status')] + Booking.STATUS_CHOICES
    STATUS_CHOICES = (('', 'All Status'),) + Booking.STATUS_CHOICES

    search = forms.CharField(
        max_length=255,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Search by booking ID, court name...'
        })
    )
    
    status = forms.ChoiceField(
        choices=STATUS_CHOICES,
        required=False,
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    
    date_from = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date'
        })
    )
    
    date_to = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date'
        })
    )