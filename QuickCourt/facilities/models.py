from django.db import models
from accounts.models import User
from django.utils import timezone

class Sport(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True)  # For Bootstrap icons
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Facility(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='facilities')
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    
    sports = models.ManyToManyField(Sport, related_name='facilities')
    amenities = models.TextField(help_text="Comma-separated list of amenities")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_reviews = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Admin approval fields
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_facilities')
    approval_date = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)

    def __str__(self):
        return self.name

    @property
    def location_short(self):
        return f"{self.city}, {self.state}"

    @property
    def amenities_list(self):
        return [amenity.strip() for amenity in self.amenities.split(',') if amenity.strip()]

    @property
    def min_price_per_hour(self):
        courts = self.courts.all()
        if courts:
            return min(court.price_per_hour for court in courts)
        return 0

    class Meta:
        ordering = ['-created_at']


class FacilityImage(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='facilities/')
    alt_text = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.facility.name}"

    class Meta:
        ordering = ['-is_primary', '-uploaded_at']


class Court(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='courts')
    name = models.CharField(max_length=255)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    price_per_hour = models.DecimalField(max_digits=8, decimal_places=2)
    
    # Operating hours
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.facility.name}"

    @property
    def operating_hours(self):
        return f"{self.opening_time.strftime('%I:%M %p')} - {self.closing_time.strftime('%I:%M %p')}"

    class Meta:
        ordering = ['name']


class TimeSlot(models.Model):
    court = models.ForeignKey(Court, on_delete=models.CASCADE, related_name='time_slots')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)  # For maintenance
    block_reason = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.court.name} - {self.date} ({self.start_time} - {self.end_time})"

    @property
    def duration_hours(self):
        start = timezone.datetime.combine(self.date, self.start_time)
        end = timezone.datetime.combine(self.date, self.end_time)
        duration = end - start
        return duration.total_seconds() / 3600

    class Meta:
        unique_together = ['court', 'date', 'start_time']
        ordering = ['date', 'start_time']


class Review(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.facility.name}"

    class Meta:
        unique_together = ['facility', 'user']
        ordering = ['-created_at']