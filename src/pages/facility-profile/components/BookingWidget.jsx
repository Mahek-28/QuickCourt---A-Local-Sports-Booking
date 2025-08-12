import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingWidget = ({ facility }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(facility?.courts?.[0]?.name || '');

  const timeSlots = [
    { time: '06:00', available: true, price: 25 },
    { time: '07:00', available: true, price: 25 },
    { time: '08:00', available: false, price: 30 },
    { time: '09:00', available: true, price: 30 },
    { time: '10:00', available: true, price: 30 },
    { time: '11:00', available: true, price: 30 },
    { time: '12:00', available: true, price: 35 },
    { time: '13:00', available: false, price: 35 },
    { time: '14:00', available: true, price: 35 },
    { time: '15:00', available: true, price: 35 },
    { time: '16:00', available: true, price: 40 },
    { time: '17:00', available: true, price: 40 },
    { time: '18:00', available: false, price: 45 },
    { time: '19:00', available: true, price: 45 },
    { time: '20:00', available: true, price: 45 },
    { time: '21:00', available: true, price: 40 }
  ];

  const handleBooking = () => {
    if (selectedTimeSlot) {
      navigate('/booking-engine', {
        state: {
          facility: facility?.name,
          court: selectedCourt,
          date: selectedDate,
          time: selectedTimeSlot?.time,
          price: selectedTimeSlot?.price
        }
      });
    }
  };

  const getNextAvailableSlots = () => {
    return timeSlots?.filter(slot => slot?.available)?.slice(0, 3);
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic-lg p-6 sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-xl font-athletic-bold text-text-primary mb-2">
            Book Your Court
          </h3>
          <p className="text-text-secondary text-sm">
            Real-time availability & instant confirmation
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-athletic-depth rounded-athletic">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-athletic-bold text-text-primary">
                {getNextAvailableSlots()?.length}
              </span>
            </div>
            <span className="text-xs text-text-secondary">Available Today</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-sm font-athletic-bold text-text-primary">
                ${Math.min(...timeSlots?.filter(s => s?.available)?.map(s => s?.price))}
              </span>
            </div>
            <span className="text-xs text-text-secondary">From /hour</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="text-sm font-athletic-bold text-text-primary">
                Instant
              </span>
            </div>
            <span className="text-xs text-text-secondary">Confirmation</span>
          </div>
        </div>

        {/* Court Selection */}
        <div>
          <label className="block text-sm font-athletic-medium text-text-primary mb-2">
            Select Court
          </label>
          <select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e?.target?.value)}
            className="w-full p-3 border border-border rounded-athletic bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {facility?.courts?.map((court, index) => (
              <option key={index} value={court?.name}>
                {court?.name} - {court?.surface}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-athletic-medium text-text-primary mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            className="w-full p-3 border border-border rounded-athletic bg-input text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-sm font-athletic-medium text-text-primary mb-3">
            Available Time Slots
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {timeSlots?.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot?.available && setSelectedTimeSlot(slot)}
                disabled={!slot?.available}
                className={`p-3 rounded-athletic text-sm font-athletic-medium transition-athletic ${
                  !slot?.available
                    ? 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
                    : selectedTimeSlot?.time === slot?.time
                    ? 'bg-primary text-primary-foreground shadow-athletic'
                    : 'bg-muted text-text-primary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span>{slot?.time}</span>
                  <span className="text-xs">
                    {slot?.available ? `$${slot?.price}` : 'Booked'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Booking Summary */}
        {selectedTimeSlot && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-athletic">
            <h4 className="font-athletic-bold text-text-primary mb-2">
              Booking Summary
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Court:</span>
                <span className="font-athletic-medium text-text-primary">{selectedCourt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date:</span>
                <span className="font-athletic-medium text-text-primary">
                  {new Date(selectedDate)?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Time:</span>
                <span className="font-athletic-medium text-text-primary">{selectedTimeSlot?.time}</span>
              </div>
              <div className="flex justify-between border-t border-success/20 pt-2 mt-2">
                <span className="font-athletic-medium text-text-primary">Total:</span>
                <span className="font-athletic-bold text-primary">${selectedTimeSlot?.price}</span>
              </div>
            </div>
          </div>
        )}

        {/* Booking Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            size="lg"
            iconName="Calendar"
            iconPosition="left"
            onClick={handleBooking}
            disabled={!selectedTimeSlot}
            className="ripple-effect"
          >
            {selectedTimeSlot ? 'Book Now' : 'Select Time Slot'}
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Heart"
            iconPosition="left"
          >
            Add to Favorites
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-trust" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={14} className="text-success" />
              <span>Free Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;