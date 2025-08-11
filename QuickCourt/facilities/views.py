from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q, Min
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Facility, Court, TimeSlot, Review, Sport, FacilityImage
from .forms import FacilityForm, CourtForm, TimeSlotForm, ReviewForm, FacilitySearchForm, FacilityImageForm
from bookings.models import Booking

def venue_list(request):
    facilities = Facility.objects.filter(status='approved').annotate(
        min_price=Min('courts__price_per_hour')
    )
    
    # Search and filtering
    form = FacilitySearchForm(request.GET)
    if form.is_valid():
        search_query = form.cleaned_data.get('search')
        sport_filter = form.cleaned_data.get('sport')
        city_filter = form.cleaned_data.get('city')
        min_price = form.cleaned_data.get('min_price')
        max_price = form.cleaned_data.get('max_price')
        
        if search_query:
            facilities = facilities.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(city__icontains=search_query)
            )
        
        if sport_filter:
            facilities = facilities.filter(sports=sport_filter)
        
        if city_filter:
            facilities = facilities.filter(city__icontains=city_filter)
        
        if min_price:
            facilities = facilities.filter(courts__price_per_hour__gte=min_price).distinct()
        
        if max_price:
            facilities = facilities.filter(courts__price_per_hour__lte=max_price).distinct()
    
    # Pagination
    paginator = Paginator(facilities.distinct(), 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'form': form,
        'total_facilities': facilities.count(),
    }
    return render(request, 'facilities/venue_list.html', context)


def venue_detail(request, pk):
    facility = get_object_or_404(Facility, pk=pk, status='approved')
    courts = facility.courts.filter(is_active=True)
    reviews = facility.reviews.all()[:5]  # Latest 5 reviews
    
    context = {
        'facility': facility,
        'courts': courts,
        'reviews': reviews,
        'can_review': request.user.is_authenticated and not reviews.filter(user=request.user).exists(),
    }
    
    # Add review form if user can review
    if context['can_review']:
        context['review_form'] = ReviewForm()
    
    return render(request, 'facilities/venue_detail.html', context)


@login_required
@require_POST
def add_review(request, pk):
    facility = get_object_or_404(Facility, pk=pk, status='approved')
    
    # Check if user already reviewed
    if Review.objects.filter(facility=facility, user=request.user).exists():
        messages.error(request, 'You have already reviewed this facility.')
        return redirect('facilities:venue_detail', pk=pk)
    
    form = ReviewForm(request.POST)
    if form.is_valid():
        review = form.save(commit=False)
        review.facility = facility
        review.user = request.user
        review.save()
        
        # Update facility rating
        reviews = facility.reviews.all()
        facility.rating = sum(r.rating for r in reviews) / len(reviews)
        facility.total_reviews = len(reviews)
        facility.save()
        
        messages.success(request, 'Review added successfully!')
    else:
        messages.error(request, 'Error adding review. Please try again.')
    
    return redirect('facilities:venue_detail', pk=pk)


@login_required
def owner_facilities(request):
    if request.user.user_type != 'facility_owner':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    facilities = Facility.objects.filter(owner=request.user)
    return render(request, 'facilities/owner_facilities.html', {
        'facilities': facilities
    })


@login_required
def add_facility(request):
    if request.user.user_type != 'facility_owner':
        messages.error(request, 'Access denied.')
        return redirect('dashboard:home')
    
    if request.method == 'POST':
        form = FacilityForm(request.POST)
        if form.is_valid():
            facility = form.save(commit=False)
            facility.owner = request.user
            facility.save()
            form.save_m2m()  # Save many-to-many relationships
            
            messages.success(request, 'Facility added successfully! It will be reviewed by admin before approval.')
            return redirect('facilities:owner_facilities')
    else:
        form = FacilityForm()
    
    return render(request, 'facilities/add_facility.html', {'form': form})


@login_required
def edit_facility(request, pk):
    facility = get_object_or_404(Facility, pk=pk, owner=request.user)
    
    if request.method == 'POST':
        form = FacilityForm(request.POST, instance=facility)
        if form.is_valid():
            form.save()
            messages.success(request, 'Facility updated successfully!')
            return redirect('facilities:owner_facilities')
    else:
        form = FacilityForm(instance=facility)
    
    return render(request, 'facilities/edit_facility.html', {
        'form': form,
        'facility': facility
    })


@login_required
def manage_courts(request, facility_id):
    facility = get_object_or_404(Facility, pk=facility_id, owner=request.user)
    courts = facility.courts.all()
    
    return render(request, 'facilities/manage_courts.html', {
        'facility': facility,
        'courts': courts
    })


@login_required
def add_court(request, facility_id):
    facility = get_object_or_404(Facility, pk=facility_id, owner=request.user)
    
    if request.method == 'POST':
        form = CourtForm(request.POST)
        if form.is_valid():
            court = form.save(commit=False)
            court.facility = facility
            court.save()
            messages.success(request, 'Court added successfully!')
            return redirect('facilities:manage_courts', facility_id=facility.id)
    else:
        form = CourtForm()
    
    return render(request, 'facilities/add_court.html', {
        'form': form,
        'facility': facility
    })


@login_required
def edit_court(request, pk):
    court = get_object_or_404(Court, pk=pk, facility__owner=request.user)
    
    if request.method == 'POST':
        form = CourtForm(request.POST, instance=court)
        if form.is_valid():
            form.save()
            messages.success(request, 'Court updated successfully!')
            return redirect('facilities:manage_courts', facility_id=court.facility.id)
    else:
        form = CourtForm(instance=court)
    
    return render(request, 'facilities/edit_court.html', {
        'form': form,
        'court': court
    })


@login_required
def delete_court(request, pk):
    court = get_object_or_404(Court, pk=pk, facility__owner=request.user)
    
    if request.method == 'POST':
        facility_id = court.facility.id
        court.delete()
        messages.success(request, 'Court deleted successfully!')
        return redirect('facilities:manage_courts', facility_id=facility_id)
    
    return render(request, 'facilities/confirm_delete.html', {
        'object': court,
        'object_type': 'Court'
    })