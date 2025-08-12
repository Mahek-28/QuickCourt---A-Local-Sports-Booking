import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecurringBookingOptions = ({ isEnabled, onToggle, recurringSettings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(recurringSettings);

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', description: 'Same day every week' },
    { value: 'biweekly', label: 'Bi-weekly', description: 'Every 2 weeks' },
    { value: 'monthly', label: 'Monthly', description: 'Same date every month' },
    { value: 'custom', label: 'Custom', description: 'Set your own schedule' }
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' }
  ];

  const calculateSavings = () => {
    const regularPrice = 45;
    const recurringDiscount = 0.15; // 15% discount
    const sessions = localSettings?.duration === '3months' ? 12 : 
                    localSettings?.duration === '6months' ? 24 : 52;
    const totalRegular = regularPrice * sessions;
    const totalRecurring = totalRegular * (1 - recurringDiscount);
    return {
      regular: totalRegular,
      recurring: totalRecurring,
      savings: totalRegular - totalRecurring
    };
  };

  const savings = calculateSavings();

  return (
    <div className="pt-20"> 
<div className="bg-card rounded-athletic border border-border shadow-athletic">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-athletic flex items-center justify-center">
            <Icon name="RotateCcw" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-athletic-bold text-text-primary">Recurring Booking</h3>
            <p className="text-sm text-text-secondary">Save up to 15% with regular bookings</p>
          </div>
        </div>
        
        <Checkbox
          checked={isEnabled}
          onChange={(e) => onToggle(e?.target?.checked)}
          className="scale-125"
        />
      </div>
      {/* Configuration Options */}
      {isEnabled && (
        <div className="p-4 space-y-6">
          {/* Frequency Selection */}
          <div>
            <h4 className="font-athletic-bold text-text-primary mb-3">Frequency</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frequencyOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleSettingChange('frequency', option?.value)}
                  className={`
                    p-3 rounded-athletic border text-left transition-athletic
                    ${localSettings?.frequency === option?.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80 text-text-primary'
                    }
                  `}
                >
                  <div className="font-athletic-medium">{option?.label}</div>
                  <div className="text-xs text-text-secondary mt-1">{option?.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Days Selection */}
          {localSettings?.frequency === 'custom' && (
            <div>
              <h4 className="font-athletic-bold text-text-primary mb-3">Select Days</h4>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek?.map(day => (
                  <button
                    key={day?.value}
                    onClick={() => {
                      const currentDays = localSettings?.customDays || [];
                      const updatedDays = currentDays?.includes(day?.value)
                        ? currentDays?.filter(d => d !== day?.value)
                        : [...currentDays, day?.value];
                      handleSettingChange('customDays', updatedDays);
                    }}
                    className={`
                      px-3 py-2 rounded-athletic text-sm font-athletic-medium transition-athletic
                      ${(localSettings?.customDays || [])?.includes(day?.value)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-text-primary'
                      }
                    `}
                  >
                    {day?.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duration Selection */}
          <div>
            <h4 className="font-athletic-bold text-text-primary mb-3">Duration</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '3months', label: '3 Months', sessions: '12 sessions' },
                { value: '6months', label: '6 Months', sessions: '24 sessions' },
                { value: '1year', label: '1 Year', sessions: '52 sessions' }
              ]?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleSettingChange('duration', option?.value)}
                  className={`
                    p-3 rounded-athletic border text-center transition-athletic
                    ${localSettings?.duration === option?.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80 text-text-primary'
                    }
                  `}
                >
                  <div className="font-athletic-medium">{option?.label}</div>
                  <div className="text-xs text-text-secondary mt-1">{option?.sessions}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-rebooking Options */}
          <div className="space-y-3">
            <h4 className="font-athletic-bold text-text-primary">Auto-rebooking</h4>
            
            <div className="space-y-2">
              <Checkbox
                label="Automatically rebook when slots become available"
                description="We'll secure your preferred time if it opens up"
                checked={localSettings?.autoRebook}
                onChange={(e) => handleSettingChange('autoRebook', e?.target?.checked)}
              />
              
              <Checkbox
                label="Send reminders 24 hours before each session"
                description="Get notified via email and push notification"
                checked={localSettings?.reminders}
                onChange={(e) => handleSettingChange('reminders', e?.target?.checked)}
              />
              
              <Checkbox
                label="Allow flexible time slots (±1 hour)"
                description="Book similar times if exact slot unavailable"
                checked={localSettings?.flexibleTime}
                onChange={(e) => handleSettingChange('flexibleTime', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Savings Calculator */}
          <div className="bg-gradient-court-energy rounded-athletic p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-athletic-bold flex items-center">
                <Icon name="TrendingDown" size={16} className="mr-2" />
                Your Savings
              </h4>
              <div className="text-right">
                <div className="text-2xl font-athletic-bold">${savings?.savings?.toFixed(0)}</div>
                <div className="text-sm opacity-80">Total saved</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-80">Regular pricing</p>
                <p className="font-athletic-medium line-through">${savings?.regular?.toFixed(0)}</p>
              </div>
              <div>
                <p className="opacity-80">Recurring price</p>
                <p className="font-athletic-bold">${savings?.recurring?.toFixed(0)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Preview Schedule
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Settings
            </Button>
          </div>
        </div>
      )}
    </div>
</div>
  );
};

export default RecurringBookingOptions;

