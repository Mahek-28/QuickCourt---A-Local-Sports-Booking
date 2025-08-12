import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BookingCalendar = ({ selectedDate, onDateSelect, availableSlots, onSlotSelect, selectedSlot }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date?.getDate() === today?.getDate() &&
           date?.getMonth() === today?.getMonth() &&
           date?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate && date &&
           date?.getDate() === selectedDate?.getDate() &&
           date?.getMonth() === selectedDate?.getMonth() &&
           date?.getFullYear() === selectedDate?.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date && date < today;
  };

  const getAvailabilityForDate = (date) => {
    if (!date) return null;
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateStr] || { available: 0, total: 12, price: 45 };
  };

  const formatTimeSlot = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="pt-20"> 
<div className="bg-card rounded-athletic border border-border shadow-athletic">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-athletic hover:bg-muted transition-athletic thumb-friendly"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <h3 className="text-lg font-athletic-bold text-text-primary">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-athletic hover:bg-muted transition-athletic thumb-friendly"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames?.map(day => (
            <div key={day} className="text-center text-sm font-athletic-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-12"></div>;
            }

            const availability = getAvailabilityForDate(date);
            const isDisabled = isPastDate(date);
            const availabilityPercent = availability ? (availability?.available / availability?.total) * 100 : 0;

            return (
              <button
                key={date?.toISOString()}
                onClick={() => !isDisabled && onDateSelect(date)}
                disabled={isDisabled}
                className={`
                  h-12 rounded-athletic text-sm font-athletic-medium transition-athletic relative
                  ${isSelected(date) 
                    ? 'bg-primary text-primary-foreground shadow-athletic' 
                    : isToday(date)
                    ? 'bg-accent text-accent-foreground'
                    : isDisabled
                    ? 'text-text-secondary/50 cursor-not-allowed' :'hover:bg-muted text-text-primary'
                  }
                `}
              >
                <span className="relative z-10">{date?.getDate()}</span>
                {/* Availability Indicator */}
                {!isDisabled && availability && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className={`w-1 h-1 rounded-full ${
                      availabilityPercent > 70 ? 'bg-success' :
                      availabilityPercent > 30 ? 'bg-warning' : 'bg-destructive'
                    }`}></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Time Slots for Selected Date */}
      {selectedDate && (
        <div className="border-t border-border p-4">
          <h4 className="text-sm font-athletic-bold text-text-primary mb-3">
            Available Times - {selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 8)?.map(hour => {
              const timeSlot = `${hour}:00`;
              const availability = getAvailabilityForDate(selectedDate);
              const isAvailable = availability && availability?.available > 0;
              const isSlotSelected = selectedSlot === timeSlot;
              
              return (
                <button
                  key={hour}
                  onClick={() => isAvailable && onSlotSelect(timeSlot)}
                  disabled={!isAvailable}
                  className={`
                    p-2 rounded-athletic text-xs font-athletic-medium transition-athletic
                    ${isSlotSelected
                      ? 'bg-primary text-primary-foreground shadow-athletic'
                      : isAvailable
                      ? 'bg-muted hover:bg-muted/80 text-text-primary' :'bg-muted/50 text-text-secondary/50 cursor-not-allowed'
                    }
                  `}
                >
                  <div>{formatTimeSlot(hour)}</div>
                  {isAvailable && (
                    <div className="text-xs opacity-75">
                      ${availability?.price}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
</div>
    
  );
};

export default BookingCalendar;



