import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all components
import BookingCalendar from './components/BookingCalendar';
import GroupBookingPanel from './components/GroupBookingPanel';
import RecurringBookingOptions from './components/RecurringBookingOptions';
import PaymentPanel from './components/PaymentPanel';
import BookingConfirmation from './components/BookingConfirmation';
import ConflictResolutionModal from './components/ConflictResolutionModal';

const BookingEngine = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [groupBookingOpen, setGroupBookingOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [recurringEnabled, setRecurringEnabled] = useState(false);
  const [recurringSettings, setRecurringSettings] = useState({
    frequency: 'weekly',
    duration: '3months',
    autoRebook: true,
    reminders: true,
    flexibleTime: false,
    customDays: []
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  // Mock data for available slots
  const availableSlots = {
    '2025-01-15': { available: 8, total: 12, price: 45 },
    '2025-01-16': { available: 10, total: 12, price: 40 },
    '2025-01-17': { available: 6, total: 12, price: 50 },
    '2025-01-18': { available: 12, total: 12, price: 35 },
    '2025-01-19': { available: 4, total: 12, price: 55 },
    '2025-01-20': { available: 9, total: 12, price: 45 },
    '2025-01-21': { available: 11, total: 12, price: 40 }
  };

  // Mock facility data
  const mockFacility = {
    id: 1,
    name: "Downtown Sports Complex",
    address: "123 Athletic Drive, Downtown, NY 10001",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    rating: 4.8,
    courts: [
      { id: 1, name: "Court A - Premium", type: "Basketball", price: 45 },
      { id: 2, name: "Court B - Standard", type: "Basketball", price: 35 },
      { id: 3, name: "Court C - Economy", type: "Basketball", price: 25 }
    ]
  };

  useEffect(() => {
    // Set default facility and today's date
    setSelectedFacility(mockFacility);
    setSelectedDate(new Date());
  }, []);

  const handleAddGroupMember = (member) => {
    setGroupMembers(prev => [...prev, member]);
  };

  const handleRemoveGroupMember = (memberId) => {
    setGroupMembers(prev => prev?.filter(member => member?.id !== memberId));
  };

  const calculatePaymentSplit = () => {
    const basePrice = 45;
    const tax = basePrice * 0.08;
    const serviceFee = 2.50;
    const total = basePrice + tax + serviceFee;
    const totalMembers = groupMembers?.length + 1;
    const perPerson = total / totalMembers;

    return {
      total: total?.toFixed(2),
      perPerson: perPerson?.toFixed(2),
      organizer: perPerson?.toFixed(2)
    };
  };

  const handleBookingSubmit = () => {
    // Simulate conflict detection (20% chance)
    if (Math.random() < 0.2) {
      setShowConflictModal(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConflictResolution = (alternative) => {
    setSelectedDate(new Date(alternative.date));
    setSelectedSlot(alternative?.time?.split(' - ')?.[0]);
    setShowConflictModal(false);
    setShowConfirmation(true);
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QuickCourt Booking',
        text: `I've booked a court at ${mockFacility?.name}!`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Booking link copied to clipboard!');
    }
  };

  const getStepStatus = (step) => {
    if (step < bookingStep) return 'completed';
    if (step === bookingStep) return 'active';
    return 'pending';
  };

  const steps = [
    { number: 1, title: 'Select Time', description: 'Choose date and time slot' },
    { number: 2, title: 'Configure', description: 'Group and recurring options' },
    { number: 3, title: 'Payment', description: 'Complete your booking' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="pt-24 pb-8 bg-gradient-court-energy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-athletic-bold mb-2">
                Book Your Court
              </h1>
              <p className="text-white/80 text-lg">
                Secure your perfect playing time in just a few clicks
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-athletic-bold">2,847</div>
                <div className="text-sm text-white/80">Active Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-athletic-bold">4.9★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-athletic-bold">&lt;30s</div>
                <div className="text-sm text-white/80">Booking Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.number} className="flex items-center flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-athletic-bold
                    ${getStepStatus(step?.number) === 'completed' 
                      ? 'bg-success text-success-foreground' 
                      : getStepStatus(step?.number) === 'active' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary'
                    }
                  `}>
                    {getStepStatus(step?.number) === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step?.number
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`font-athletic-medium ${
                      getStepStatus(step?.number) === 'active' ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {step?.title}
                    </div>
                    <div className="text-xs text-text-secondary">{step?.description}</div>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    getStepStatus(step?.number + 1) === 'completed' ? 'bg-success' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Facility Selection */}
            <div className="bg-card rounded-athletic border border-border shadow-athletic p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-athletic-bold text-text-primary">Selected Facility</h2>
                <Link 
                  to="/facility-discovery"
                  className="text-primary hover:text-primary/80 text-sm font-athletic-medium"
                >
                  Change Facility
                </Link>
              </div>
              
              {selectedFacility && (
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-athletic overflow-hidden">
                    <img
                      src={selectedFacility?.image}
                      alt={selectedFacility?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-athletic-bold text-text-primary">
                      {selectedFacility?.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{selectedFacility?.address}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span className="text-sm font-athletic-medium">{selectedFacility?.rating}</span>
                      </div>
                      <span className="text-text-secondary">•</span>
                      <span className="text-sm text-text-secondary">
                        {selectedFacility?.courts?.length} courts available
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar and Time Selection */}
            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              availableSlots={availableSlots}
              onSlotSelect={setSelectedSlot}
              selectedSlot={selectedSlot}
            />

            {/* Group Booking Panel */}
            <GroupBookingPanel
              isOpen={groupBookingOpen}
              onToggle={() => setGroupBookingOpen(!groupBookingOpen)}
              groupMembers={groupMembers}
              onAddMember={handleAddGroupMember}
              onRemoveMember={handleRemoveGroupMember}
              paymentSplit={calculatePaymentSplit()}
            />

            {/* Recurring Booking Options */}
            <RecurringBookingOptions
              isEnabled={recurringEnabled}
              onToggle={setRecurringEnabled}
              recurringSettings={recurringSettings}
              onUpdateSettings={setRecurringSettings}
            />
          </div>

          {/* Right Column - Payment and Summary */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-card rounded-athletic border border-border shadow-athletic p-6">
              <h3 className="font-athletic-bold text-text-primary mb-4">Booking Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date</span>
                  <span className="text-text-primary">
                    {selectedDate ? selectedDate?.toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Time</span>
                  <span className="text-text-primary">
                    {selectedSlot ? `${selectedSlot} - ${parseInt(selectedSlot) + 1}:00` : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Court</span>
                  <span className="text-text-primary">Court A - Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Duration</span>
                  <span className="text-text-primary">1 hour</span>
                </div>
                {groupMembers?.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Players</span>
                    <span className="text-text-primary">{groupMembers?.length + 1} people</span>
                  </div>
                )}
                {recurringEnabled && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Recurring</span>
                    <span className="text-text-primary capitalize">
                      {recurringSettings?.frequency} for {recurringSettings?.duration}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Panel */}
            <PaymentPanel
              bookingDetails={{ price: 45 }}
              groupMembers={groupMembers}
              onPaymentMethodSelect={setSelectedPaymentMethod}
              selectedPaymentMethod={selectedPaymentMethod}
            />

            {/* Book Now Button */}
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={handleBookingSubmit}
              disabled={!selectedDate || !selectedSlot}
              className="ripple-effect"
            >
              {recurringEnabled ? 'Book Recurring Sessions' : 'Book Now'}
            </Button>

            {/* Trust Signals */}
            <div className="bg-gradient-athletic-depth rounded-athletic p-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-text-secondary">Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} className="text-success" />
                  <span className="text-text-secondary">Free cancellation up to 2 hours before</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-text-secondary">Instant confirmation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Headphones" size={16} className="text-success" />
                  <span className="text-text-secondary">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <BookingConfirmation
        bookingDetails={{}}
        onClose={() => setShowConfirmation(false)}
        onShare={handleShareBooking}
      />
      <ConflictResolutionModal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        conflictDetails={{}}
        alternativeSlots={[]}
        onSelectAlternative={handleConflictResolution}
      />
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} QuickCourt. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
              <Link to="/terms" className="text-text-secondary hover:text-primary">Terms</Link>
              <Link to="/privacy" className="text-text-secondary hover:text-primary">Privacy</Link>
              <Link to="/support" className="text-text-secondary hover:text-primary">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingEngine;