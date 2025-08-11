from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.views.generic import View
from django.http import JsonResponse
from .models import User, OTP, UserProfile
from .forms import UserRegistrationForm, UserLoginForm, OTPVerificationForm, UserProfileForm, UserProfileDetailForm
import random
import string

class RegisterView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard:home')
        form = UserRegistrationForm()
        return render(request, 'accounts/register.html', {'form': form})

    def post(self, request):
        form = UserRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            # Generate and send OTP
            self.send_otp(user)
            messages.success(request, 'Registration successful! Please verify your email with the OTP sent.')
            return redirect('accounts:verify_otp', user_id=user.id)
        return render(request, 'accounts/register.html', {'form': form})

    def send_otp(self, user):
        # Delete any existing unused OTPs
        OTP.objects.filter(user=user, is_used=False).delete()
        
        # Create new OTP
        otp = OTP.objects.create(user=user)
        
        # Send OTP via email (in development, this will print to console)
        subject = 'QuickCourt - Email Verification'
        message = f'''
        Welcome to QuickCourt!
        
        Your email verification code is: {otp.otp_code}
        
        This code will expire in 10 minutes.
        
        Best regards,
        QuickCourt Team
        '''
        
        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Email sending failed: {e}")


class LoginView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard:home')
        form = UserLoginForm()
        return render(request, 'accounts/login.html', {'form': form})

    def post(self, request):
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            
            if user:
                if not user.is_verified:
                    messages.error(request, 'Please verify your email first.')
                    return redirect('accounts:verify_otp', user_id=user.id)
                
                login(request, user)
                messages.success(request, f'Welcome back, {user.display_name}!')
                
                # Redirect based on user type
                if user.user_type == 'admin':
                    return redirect('dashboard:admin_dashboard')
                elif user.user_type == 'facility_owner':
                    return redirect('dashboard:owner_dashboard')
                else:
                    return redirect('dashboard:home')
            
        return render(request, 'accounts/login.html', {'form': form})


class VerifyOTPView(View):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        form = OTPVerificationForm()
        return render(request, 'accounts/verify_otp.html', {
            'form': form, 
            'user': user
        })

    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        form = OTPVerificationForm(request.POST)
        
        if form.is_valid():
            otp_code = form.cleaned_data['otp_code']
            try:
                otp = OTP.objects.get(
                    user=user, 
                    otp_code=otp_code, 
                    is_used=False
                )
                
                if otp.is_valid():
                    otp.is_used = True
                    otp.save()
                    
                    user.is_verified = True
                    user.save()
                    
                    login(request, user)
                    messages.success(request, 'Email verified successfully! Welcome to QuickCourt.')
                    
                    # Redirect based on user type
                    if user.user_type == 'admin':
                        return redirect('dashboard:admin_dashboard')
                    elif user.user_type == 'facility_owner':
                        return redirect('dashboard:owner_dashboard')
                    else:
                        return redirect('dashboard:home')
                else:
                    messages.error(request, 'OTP has expired. Please request a new one.')
                    
            except OTP.DoesNotExist:
                messages.error(request, 'Invalid OTP code.')
        
        return render(request, 'accounts/verify_otp.html', {
            'form': form, 
            'user': user
        })


def resend_otp(request, user_id):
    user = get_object_or_404(User, id=user_id)
    
    # Delete existing OTPs
    OTP.objects.filter(user=user, is_used=False).delete()
    
    # Create new OTP
    otp = OTP.objects.create(user=user)
    
    # Send OTP (same logic as in RegisterView)
    subject = 'QuickCourt - Email Verification (Resent)'
    message = f'''
    Your new email verification code is: {otp.otp_code}
    
    This code will expire in 10 minutes.
    
    Best regards,
    QuickCourt Team
    '''
    
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        messages.success(request, 'New OTP sent to your email.')
    except Exception as e:
        messages.error(request, 'Failed to send OTP. Please try again.')
    
    return redirect('accounts:verify_otp', user_id=user.id)


@login_required
def logout_view(request):
    user_name = request.user.display_name
    logout(request)
    messages.success(request, f'Goodbye, {user_name}! You have been logged out.')
    return redirect('dashboard:home')


@login_required
def profile_view(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        user_form = UserProfileForm(request.POST, request.FILES, instance=request.user)
        profile_form = UserProfileDetailForm(request.POST, instance=user_profile)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:profile')
    else:
        user_form = UserProfileForm(instance=request.user)
        profile_form = UserProfileDetailForm(instance=user_profile)
    
    context = {
        'user_form': user_form,
        'profile_form': profile_form,
    }
    return render(request, 'accounts/profile.html', context)