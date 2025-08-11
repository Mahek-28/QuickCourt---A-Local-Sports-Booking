from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
from .models import User, UserProfile

class UserRegistrationForm(UserCreationForm):
    USER_TYPES = (
        ('user', 'User'),
        ('facility_owner', 'Facility Owner'),
    )
    
    email = forms.EmailField(required=True)
    full_name = forms.CharField(max_length=255, required=True)
    user_type = forms.ChoiceField(choices=USER_TYPES, required=True)
    avatar = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'full_name', 'user_type', 'avatar', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for fieldname in ['username', 'email', 'full_name', 'password1', 'password2']:
            self.fields[fieldname].help_text = None
        
        # Add Bootstrap classes
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})
        
        self.fields['user_type'].widget.attrs.update({'class': 'form-select'})

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.full_name = self.cleaned_data['full_name']
        user.user_type = self.cleaned_data['user_type']
        
        if commit:
            user.save()
            if self.cleaned_data.get('avatar'):
                user.avatar = self.cleaned_data['avatar']
                user.save()
        
        return user


class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise forms.ValidationError("Invalid username or password.")
            if user.is_banned:
                raise forms.ValidationError("Your account has been banned.")
        
        return self.cleaned_data


class OTPVerificationForm(forms.Form):
    otp_code = forms.CharField(max_length=6, min_length=6)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['otp_code'].widget.attrs.update({
            'class': 'form-control text-center',
            'placeholder': 'Enter 6-digit OTP'
        })


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone', 'avatar']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name != 'avatar':
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control-file'})


class UserProfileDetailForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['bio', 'location', 'date_of_birth']
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
            'bio': forms.Textarea(attrs={'rows': 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})