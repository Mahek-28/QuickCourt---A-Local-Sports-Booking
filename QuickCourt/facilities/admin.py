from django.contrib import admin
from .models import Sport, Facility, FacilityImage, Court, TimeSlot, Review

@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name']

class FacilityImageInline(admin.TabularInline):
    model = FacilityImage
    extra = 1

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'city', 'status', 'rating', 'created_at']
    list_filter = ['status', 'city', 'created_at']
    search_fields = ['name', 'owner__username', 'city']
    inlines = [FacilityImageInline]
    
    def save_model(self, request, obj, form, change):
        if change and 'status' in form.changed_data:
            if obj.status == 'approved':
                obj.approved_by = request.user
                obj.approval_date = timezone.now()
        super().save_model(request, obj, form, change)

@admin.register(Court)
class CourtAdmin(admin.ModelAdmin):
    list_display = ['name', 'facility', 'sport', 'price_per_hour', 'is_active']
    list_filter = ['sport', 'is_active', 'facility__city']
    search_fields = ['name', 'facility__name']

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ['court', 'date', 'start_time', 'end_time', 'is_available', 'is_blocked']
    list_filter = ['is_available', 'is_blocked', 'date']
    search_fields = ['court__name', 'court__facility__name']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['facility', 'user', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['facility__name', 'user__username']