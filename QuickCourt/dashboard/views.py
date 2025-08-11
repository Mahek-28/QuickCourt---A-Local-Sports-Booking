from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q, Count, Sum
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime, timedelta
from accounts.models import User
from facilities.models import Facility, Sport, Review
from bookings.models import Booking

def home(request):
    # Get popular sports and venues
    popular_sports = Sport.objects.filter(is_active=True)[:6]
    popular_venues = Facility.objects.filter(status='approved').order_by('-rating', '-total_reviews')[:6]
    
    # Recent reviews
    recent_reviews = Review.objects.select_related('facility', 'user').order_by('-created_at')[:3]
    
    context = {
        'popular_sports': popular_sports,
        'popular_venues': popular_venues,
        'recent_reviews': recent_reviews,
    }
    return render(request, 'dashboard/home.html', context)


@login_required
def admin_dashboard(request):
    if request.user.user_type != 'admin':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    # Calculate statistics
    total_users = User.objects.filter(user_type='user').count()
    total_owners = User.objects.filter(user_type='facility_owner').count()
    total_facilities = Facility.objects.count()
    total_bookings = Booking.objects.count()
    pending_approvals = Facility.objects.filter(status='pending').count()
    
    # Recent activities
    recent_users = User.objects.filter(user_type__in=['user', 'facility_owner']).order_by('-date_joined')[:5]
    recent_facilities = Facility.objects.order_by('-created_at')[:5]
    recent_bookings = Booking.objects.order_by('-created_at')[:5]
    
    # Chart data
    context = {
        'total_users': total_users,
        'total_owners': total_owners,
        'total_facilities': total_facilities,
        'total_bookings': total_bookings,
        'pending_approvals': pending_approvals,
        'recent_users': recent_users,
        'recent_facilities': recent_facilities,
        'recent_bookings': recent_bookings,
    }
    return render(request, 'dashboard/admin_dashboard.html', context)


@login_required
def owner_dashboard(request):
    if request.user.user_type != 'facility_owner':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    # Get owner's facilities
    facilities = Facility.objects.filter(owner=request.user)
    
    # Calculate statistics
    total_facilities = facilities.count()
    active_courts = sum(facility.courts.filter(is_active=True).count() for facility in facilities)
    total_bookings = Booking.objects.filter(court__facility__in=facilities).count()
    total_earnings = Booking.objects.filter(
        court__facility__in=facilities,
        payment_status='paid'
    ).aggregate(total=Sum('total_amount'))['total'] or 0
    
    # Recent bookings
    recent_bookings = Booking.objects.filter(
        court__facility__in=facilities
    ).order_by('-created_at')[:5]
    
    context = {
        'total_facilities': total_facilities,
        'active_courts': active_courts,
        'total_bookings': total_bookings,
        'total_earnings': total_earnings,
        'recent_bookings': recent_bookings,
        'facilities': facilities,
    }
    return render(request, 'dashboard/owner_dashboard.html', context)


@login_required
def facility_approval(request):
    if request.user.user_type != 'admin':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    facilities = Facility.objects.filter(status='pending').order_by('-created_at')
    
    # Pagination
    paginator = Paginator(facilities, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'dashboard/facility_approval.html', {
        'page_obj': page_obj
    })


@login_required
def approve_facility(request, pk):
    if request.user.user_type != 'admin':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    facility = get_object_or_404(Facility, pk=pk)
    
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'approve':
            facility.status = 'approved'
            facility.approved_by = request.user
            facility.approval_date = timezone.now()
            facility.save()
            messages.success(request, f'Facility "{facility.name}" approved successfully!')
        
        elif action == 'reject':
            reason = request.POST.get('reason', '')
            facility.status = 'rejected'
            facility.rejection_reason = reason
            facility.save()
            messages.success(request, f'Facility "{facility.name}" rejected.')
        
        return redirect('dashboard:facility_approval')
    
    return render(request, 'dashboard/approve_facility.html', {
        'facility': facility
    })


@login_required
def user_management(request):
    if request.user.user_type != 'admin':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    users = User.objects.filter(user_type__in=['user', 'facility_owner']).order_by('-date_joined')
    
    # Search and filtering
    search = request.GET.get('search', '')
    role_filter = request.GET.get('role', '')
    status_filter = request.GET.get('status', '')
    
    if search:
        users = users.filter(
            Q(username__icontains=search) |
            Q(email__icontains=search) |
            Q(full_name__icontains=search)
        )
    
    if role_filter:
        users = users.filter(user_type=role_filter)
    
    if status_filter == 'active':
        users = users.filter(is_banned=False)
    elif status_filter == 'banned':
        users = users.filter(is_banned=True)
    
    # Pagination
    paginator = Paginator(users, 15)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search': search,
        'role_filter': role_filter,
        'status_filter': status_filter,
    }
    return render(request, 'dashboard/user_management.html', context)


@login_required
def toggle_user_ban(request, pk):
    if request.user.user_type != 'admin':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    user = get_object_or_404(User, pk=pk)
    
    if request.method == 'POST':
        user.is_banned = not user.is_banned
        user.save()
        
        action = 'banned' if user.is_banned else 'unbanned'
        messages.success(request, f'User "{user.username}" has been {action}.')
    
    return redirect('dashboard:user_management')


# API endpoints for charts
@login_required
def chart_data(request, chart_type):
    if request.user.user_type not in ['admin', 'facility_owner']:
        return JsonResponse({'error': 'Access denied'}, status=403)
    
    data = {}
    
    if chart_type == 'booking_trends':
        # Last 7 days booking trends
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=6)
        
        if request.user.user_type == 'admin':
            bookings = Booking.objects.all()
        else:
            bookings = Booking.objects.filter(court__facility__owner=request.user)
        
        dates = []
        counts = []
        
        for i in range(7):
            date = start_date + timedelta(days=i)
            count = bookings.filter(booking_date=date).count()
            dates.append(date.strftime('%m/%d'))
            counts.append(count)
        
        data = {
            'labels': dates,
            'datasets': [{
                'label': 'Bookings',
                'data': counts,
                'borderColor': 'rgb(75, 192, 192)',
                'backgroundColor': 'rgba(75, 192, 192, 0.2)',
                'tension': 0.1
            }]
        }
    
    elif chart_type == 'earnings':
        # Monthly earnings for the last 6 months
        if request.user.user_type == 'facility_owner':
            bookings = Booking.objects.filter(
                court__facility__owner=request.user,
                payment_status='paid'
            )
        else:
            bookings = Booking.objects.filter(payment_status='paid')
        
        end_date = timezone.now().date()
        months = []
        earnings = []
        
        for i in range(6):
            month = end_date.replace(day=1) - timedelta(days=i*30)
            month_bookings = bookings.filter(
                booking_date__year=month.year,
                booking_date__month=month.month
            )
            total = sum(booking.total_amount for booking in month_bookings)
            months.append(month.strftime('%B'))
            earnings.append(float(total))
        
        months.reverse()
        earnings.reverse()
        
        data = {
            'labels': months,
            'datasets': [{
                'label': 'Earnings (₹)',
                'data': earnings,
                'backgroundColor': 'rgba(54, 162, 235, 0.6)',
                'borderColor': 'rgba(54, 162, 235, 1)',
                'borderWidth': 1
            }]
        }
    
    elif chart_type == 'sports_popularity':
        # Most popular sports based on bookings
        if request.user.user_type == 'admin':
            bookings = Booking.objects.all()
        else:
            bookings = Booking.objects.filter(court__facility__owner=request.user)
        
        sport_counts = {}
        for booking in bookings:
            sport = booking.court.sport.name
            sport_counts[sport] = sport_counts.get(sport, 0) + 1
        
        sorted_sports = sorted(sport_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        data = {
            'labels': [sport[0] for sport in sorted_sports],
            'datasets': [{
                'label': 'Bookings',
                'data': [sport[1] for sport in sorted_sports],
                'backgroundColor': [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ]
            }]
        }
    
    return JsonResponse(data)