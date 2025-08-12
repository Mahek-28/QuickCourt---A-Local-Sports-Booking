import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const bookingData = {
    "2025-01-15": { bookings: 8, revenue: 1200, status: 'high' },
    "2025-01-16": { bookings: 12, revenue: 1800, status: 'peak' },
    "2025-01-17": { bookings: 6, revenue: 900, status: 'medium' },
    "2025-01-18": { bookings: 3, revenue: 450, status: 'low' },
    "2025-01-19": { bookings: 15, revenue: 2250, status: 'peak' },
    "2025-01-20": { bookings: 10, revenue: 1500, status: 'high' }
  };

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
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateKey = (date) => {
    return date?.toISOString()?.split('T')?.[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'peak':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-secondary text-secondary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-surface text-surface-foreground';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-athletic-bold text-text-primary">Booking Calendar</h3>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
            className="w-8 h-8 p-0"
          />
          <span className="text-lg font-athletic-medium text-text-primary min-w-[140px] text-center">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
            className="w-8 h-8 p-0"
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-athletic-medium text-text-secondary">
            {day}
          </div>
        ))}
        
        {days?.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2 h-16"></div>;
          }
          
          const dateKey = formatDateKey(day);
          const dayData = bookingData?.[dateKey];
          const isToday = day?.toDateString() === new Date()?.toDateString();
          const isSelected = selectedDate && day?.toDateString() === selectedDate?.toDateString();
          
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`p-2 h-16 border border-border rounded cursor-pointer transition-athletic hover:shadow-athletic ${
                isSelected ? 'ring-2 ring-primary' : ''
              } ${isToday ? 'bg-primary/5' : 'bg-background hover:bg-muted/50'}`}
            >
              <div className="text-sm font-athletic-medium text-text-primary mb-1">
                {day?.getDate()}
              </div>
              {dayData && (
                <div className={`text-xs px-1 py-0.5 rounded text-center ${getStatusColor(dayData?.status)}`}>
                  {dayData?.bookings}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-text-secondary">Peak (15+)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-text-secondary">High (8-14)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span className="text-text-secondary">Medium (4-7)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <span className="text-text-secondary">Low (1-3)</span>
          </div>
        </div>
        
        {selectedDate && bookingData?.[formatDateKey(selectedDate)] && (
          <div className="text-text-primary font-athletic-medium">
            {selectedDate?.toLocaleDateString()}: {bookingData?.[formatDateKey(selectedDate)]?.bookings} bookings, 
            ${bookingData?.[formatDateKey(selectedDate)]?.revenue}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;