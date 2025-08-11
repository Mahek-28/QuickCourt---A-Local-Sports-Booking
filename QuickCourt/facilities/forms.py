from django import forms
from .models import Facility, Court, TimeSlot, Review, Sport, FacilityImage

class FacilityForm(forms.ModelForm):
    sports = forms.ModelMultipleChoiceField(
        queryset=Sport.objects.filter(is_active=True),
        widget=forms.CheckboxSelectMultiple,
        required=True
    )

    class Meta:
        model = Facility
        fields = [
            'name', 'description', 'address', 'city', 'state', 'pincode',
            'phone', 'email', 'sports', 'amenities'
        ]
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
            'address': forms.Textarea(attrs={'rows': 3}),
            'amenities': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Enter amenities separated by commas (e.g., Parking, Washroom, Cafeteria)'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name != 'sports':
                field.widget.attrs.update({'class': 'form-control'})


class FacilityImageForm(forms.ModelForm):
    class Meta:
        model = FacilityImage
        fields = ['image', 'alt_text', 'is_primary']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'].widget.attrs.update({'class': 'form-control'})
        self.fields['alt_text'].widget.attrs.update({'class': 'form-control'})


class CourtForm(forms.ModelForm):
    class Meta:
        model = Court
        fields = ['name', 'sport', 'price_per_hour', 'opening_time', 'closing_time', 'is_active']
        widgets = {
            'opening_time': forms.TimeInput(attrs={'type': 'time'}),
            'closing_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name == 'is_active':
                continue
            elif field_name in ['opening_time', 'closing_time']:
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control'})
        
        self.fields['sport'].widget.attrs.update({'class': 'form-select'})


class TimeSlotForm(forms.ModelForm):
    class Meta:
        model = TimeSlot
        fields = ['date', 'start_time', 'end_time', 'is_available', 'is_blocked', 'block_reason']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
            'block_reason': forms.TextInput(attrs={'placeholder': 'Reason for blocking (optional)'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name in ['is_available', 'is_blocked']:
                continue
            field.widget.attrs.update({'class': 'form-control'})


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.Select(choices=[(i, f"{i} Star{'s' if i != 1 else ''}") for i in range(1, 6)]),
            'comment': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Share your experience...'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['rating'].widget.attrs.update({'class': 'form-select'})
        self.fields['comment'].widget.attrs.update({'class': 'form-control'})


class FacilitySearchForm(forms.Form):
    search = forms.CharField(
        max_length=255, 
        required=False, 
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Search facilities...'
        })
    )
    sport = forms.ModelChoiceField(
        queryset=Sport.objects.filter(is_active=True),
        required=False,
        empty_label="All Sports",
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    city = forms.CharField(
        max_length=100,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'City'
        })
    )
    min_price = forms.DecimalField(
        max_digits=8,
        decimal_places=2,
        required=False,
        widget=forms.NumberInput(attrs={
            'class': 'form-control',
            'placeholder': 'Min Price'
        })
    )
    max_price = forms.DecimalField(
        max_digits=8,
        decimal_places=2,
        required=False,
        widget=forms.NumberInput(attrs={
            'class': 'form-control',
            'placeholder': 'Max Price'
        })
    )