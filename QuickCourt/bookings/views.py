from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils import timezone
from .models import Booking, Payment
from .forms import BookingForm, PaymentForm, BookingSearchForm
from facilities.models import Court
import uuid

@login_required
def book_court(request, court_id):
    court = get_object_or_404(Court, id=court_id, is_active=True, facility__status='approved')
    
    if request.method == 'POST':
        form = BookingForm(request.POST, court=court, user=request.user)
        if form.is_valid():
            booking = form.save()
            messages.success(request, f'Booking created successfully! Booking ID: {booking.booking_id}')
            return redirect('bookings:payment', booking_id=booking.booking_id)
    else:
        form = BookingForm(court=court, user=request.user)
    
    # Get existing bookings for this court to show unavailable slots
    today = timezone.now().date()
    existing_bookings = Booking.objects.filter(
        court=court,
        booking_date__gte=today,
        status='confirmed'
    ).order_by('booking_date', 'start_time')
    
    context = {
        'court': court,
        'form': form,
        'existing_bookings': existing_bookings,
    }
    return render(request, 'bookings/book_court.html', context)


@login_required
def payment(request, booking_id):
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    
    if booking.payment_status == 'paid':
        messages.info(request, 'This booking has already been paid for.')
        return redirect('bookings:booking_detail', booking_id=booking_id)
    
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            # Simulate payment process
            payment = form.save(commit=False)
            payment.booking = booking
            payment.amount = booking.total_amount
            payment.transaction_id = str(uuid.uuid4())[:12].upper()
            payment.paid_at = timezone.now()
            payment.save()
            
            # Update booking payment status
            booking.payment_status = 'paid'
            booking.save()
            
            messages.success(request, 'Payment successful! Your booking is confirmed.')
            return redirect('bookings:my_bookings')
    else:
        form = PaymentForm()
    
    context = {
        'booking': booking,
        'form': form,
    }
    return render(request, 'bookings/payment.html', context)


@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    
    # Search and filtering
    form = BookingSearchForm(request.GET)
    if form.is_valid():
        search_query = form.cleaned_data.get('search')
        status_filter = form.cleaned_data.get('status')
        date_from = form.cleaned_data.get('date_from')
        date_to = form.cleaned_data.get('date_to')
        
        if search_query:
            bookings = bookings.filter(
                Q(booking_id__icontains=search_query) |
                Q(court__name__icontains=search_query) |
                Q(court__facility__name__icontains=search_query)
            )
        
        if status_filter:
            bookings = bookings.filter(status=status_filter)
        
        if date_from:
            bookings = bookings.filter(booking_date__gte=date_from)
        
        if date_to:
            bookings = bookings.filter(booking_date__lte=date_to)
    
    # Pagination
    paginator = Paginator(bookings, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'form': form,
    }
    return render(request, 'bookings/my_bookings.html', context)


@login_required
def booking_detail(request, booking_id):
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    
    context = {
        'booking': booking,
    }
    return render(request, 'bookings/booking_detail.html', context)


@login_required
@require_POST
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    
    if not booking.can_cancel:
        messages.error(request, 'This booking cannot be cancelled.')
        return redirect('bookings:booking_detail', booking_id=booking_id)
    
    reason = request.POST.get('reason', '')
    booking.cancel_booking(reason)
    
    messages.success(request, 'Booking cancelled successfully.')
    return redirect('bookings:my_bookings')


# Owner views for booking management
@login_required
def owner_bookings(request):
    if request.user.user_type != 'facility_owner':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    # Get all bookings for this owner's facilities
    bookings = Booking.objects.filter(
        court__facility__owner=request.user
    ).select_related('court', 'court__facility', 'user')
    
    # Search and filtering
    form = BookingSearchForm(request.GET)
    if form.is_valid():
        search_query = form.cleaned_data.get('search')
        status_filter = form.cleaned_data.get('status')
        date_from = form.cleaned_data.get('date_from')
        date_to = form.cleaned_data.get('date_to')
        
        if search_query:
            bookings = bookings.filter(
                Q(booking_id__icontains=search_query) |
                Q(court__name__icontains=search_query) |
                Q(user__username__icontains=search_query) |
                Q(contact_name__icontains=search_query)
            )
        
        if status_filter:
            bookings = bookings.filter(status=status_filter)
        
        if date_from:
            bookings = bookings.filter(booking_date__gte=date_from)
        
        if date_to:
            bookings = bookings.filter(booking_date__lte=date_to)
    
    # Pagination
    paginator = Paginator(bookings, 15)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'form': form,
    }
    return render(request, 'bookings/owner_bookings.html', context)