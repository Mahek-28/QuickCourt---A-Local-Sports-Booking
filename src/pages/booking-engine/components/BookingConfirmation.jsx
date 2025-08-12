import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ bookingDetails, onClose, onShare }) => {
  const [activeTab, setActiveTab] = useState('details');

  const mockBookingData = {
    id: "QC-2025-001247",
    facility: {
      name: "Downtown Sports Complex",
      address: "123 Athletic Drive, Downtown, NY 10001",
      phone: "(555) 123-4567",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      amenities: ["Parking", "Locker Rooms", "Equipment Rental", "Refreshments"]
    },
    court: {
      name: "Court A - Premium",
      type: "Basketball",
      surface: "Hardwood"
    },
    booking: {
      date: "January 15, 2025",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      price: "$45.00",
      tax: "$3.60",
      serviceFee: "$2.50",
      total: "$51.10"
    },
    weather: {
      condition: "Partly Cloudy",
      temperature: "72°F",
      icon: "Cloud"
    },
    tips: [
      "Arrive 10 minutes early for check-in",
      "Bring non-marking shoes for the court",
      "Water fountains available on the second floor",
      "Equipment rental desk closes 30 minutes before facility"
    ]
  };

  const tabs = [
    { id: 'details', label: 'Booking Details', icon: 'FileText' },
    { id: 'directions', label: 'Directions', icon: 'MapPin' },
    { id: 'tips', label: 'Venue Tips', icon: 'Lightbulb' }
  ];

  const handleAddToCalendar = () => {
    const event = {
      title: `${mockBookingData?.court?.type} at ${mockBookingData?.facility?.name}`,
      start: new Date('2025-01-15T14:00:00'),
      end: new Date('2025-01-15T15:00:00'),
      location: mockBookingData?.facility?.address,
      description: `Court: ${mockBookingData?.court?.name}\nBooking ID: ${mockBookingData?.id}`
    };
    
    // Create calendar URL (simplified)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=20250115T140000Z/20250115T150000Z&location=${encodeURIComponent(event?.location)}`;
    window.open(calendarUrl, '_blank');
  };

  return (
  <div className="pt-20"> 
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-athletic shadow-athletic-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-court-energy text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-athletic hover:bg-white/10 transition-athletic"
          >
            <Icon name="X" size={20} />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-athletic flex items-center justify-center">
              <Icon name="CheckCircle" size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-athletic-bold">Booking Confirmed!</h2>
              <p className="text-white/80 mt-1">
                Booking ID: {mockBookingData?.id}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border">
          <div className="flex">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-4 py-3 text-sm font-athletic-medium transition-athletic
                  ${activeTab === tab?.id
                    ? 'border-b-2 border-primary text-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Facility Info */}
              <div className="flex space-x-4">
                <div className="w-20 h-20 rounded-athletic overflow-hidden flex-shrink-0">
                  <Image
                    src={mockBookingData?.facility?.image}
                    alt={mockBookingData?.facility?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-athletic-bold text-text-primary">
                    {mockBookingData?.facility?.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {mockBookingData?.facility?.address}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {mockBookingData?.facility?.phone}
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-text-secondary">Court</p>
                    <p className="font-athletic-medium text-text-primary">
                      {mockBookingData?.court?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Date & Time</p>
                    <p className="font-athletic-medium text-text-primary">
                      {mockBookingData?.booking?.date}
                    </p>
                    <p className="font-athletic-medium text-text-primary">
                      {mockBookingData?.booking?.time}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-text-secondary">Weather Forecast</p>
                    <div className="flex items-center space-x-2">
                      <Icon name={mockBookingData?.weather?.icon} size={16} className="text-text-secondary" />
                      <span className="font-athletic-medium text-text-primary">
                        {mockBookingData?.weather?.temperature} - {mockBookingData?.weather?.condition}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Total Paid</p>
                    <p className="font-athletic-bold text-primary text-lg">
                      {mockBookingData?.booking?.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-sm text-text-secondary mb-2">Available Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {mockBookingData?.facility?.amenities?.map(amenity => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-muted text-text-primary text-sm rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'directions' && (
            <div className="space-y-4">
              <div className="bg-muted rounded-athletic p-4">
                <h4 className="font-athletic-bold text-text-primary mb-2">Address</h4>
                <p className="text-text-secondary">{mockBookingData?.facility?.address}</p>
              </div>
              
              <div className="h-64 rounded-athletic overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Downtown Sports Complex"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40.7589,-73.9851&z=14&output=embed"
                  className="border-0"
                ></iframe>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                  className="flex-1"
                >
                  Open in Maps
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  className="flex-1"
                >
                  Call Facility
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-4">
              <h4 className="font-athletic-bold text-text-primary">Pre-Game Tips</h4>
              <div className="space-y-3">
                {mockBookingData?.tips?.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Lightbulb" size={12} className="text-accent" />
                    </div>
                    <p className="text-text-secondary text-sm">{tip}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-athletic-depth rounded-athletic p-4 mt-6">
                <h5 className="font-athletic-bold text-text-primary mb-2">Equipment Rental</h5>
                <p className="text-sm text-text-secondary mb-3">
                  Need equipment? Rent directly at the facility or reserve online.
                </p>
                <Button variant="outline" size="sm" iconName="ShoppingBag" iconPosition="left">
                  View Equipment
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              iconName="Calendar"
              iconPosition="left"
              onClick={handleAddToCalendar}
              className="flex-1"
            >
              Add to Calendar
            </Button>
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={onShare}
              className="flex-1"
            >
              Share Booking
            </Button>
            <Button
              variant="default"
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              Contact Support
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-text-secondary">
              Confirmation email sent to your registered email address
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
);
};

export default BookingConfirmation;

