import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FacilityHero from './components/FacilityHero';
import FacilityInfo from './components/FacilityInfo';
import BookingWidget from './components/BookingWidget';
import ReviewsSection from './components/ReviewsSection';
import CommunitySection from './components/CommunitySection';
import LocationSection from './components/LocationSection';

const FacilityProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isBookingWidgetSticky, setIsBookingWidgetSticky] = useState(false);

  // Mock facility data
  const facility = {
    id: 1,
    name: "Elite Sports Complex",
    location: "Downtown Sports District",
    address: "1234 Sports Complex Drive",
    city: "Metro City",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 123-4567",
    email: "info@elitesportscomplex.com",
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    },
    rating: 4.8,
    reviewCount: 247,
    isOpen: true,
    description: `Elite Sports Complex is a premier multi-sport facility featuring state-of-the-art courts and amenities. Our mission is to provide athletes of all levels with exceptional playing experiences in a welcoming community environment. With professional-grade surfaces, modern lighting systems, and comprehensive support facilities, we're your destination for serious sports and recreational fun.`,
    images: [
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
    ],
    courts: [
      {
        name: "Court A - Premium Tennis",
        surface: "Hard Court",
        dimensions: "78\' x 36'",
        capacity: 4,
        features: ["Professional Lighting", "Wind Screens", "Ball Machine Available"]
      },
      {
        name: "Court B - Tennis",surface: "Hard Court", dimensions: "78\' x 36'",
        capacity: 4,
        features: ["LED Lighting", "Spectator Seating"]
      },
      {
        name: "Basketball Court 1",surface: "Hardwood",dimensions: "94\' x 50'",
        capacity: 10,
        features: ["Professional Hoops", "Scoreboard", "Sound System"]
      },
      {
        name: "Basketball Court 2",surface: "Synthetic",dimensions: "94\' x 50'",
        capacity: 10,
        features: ["Adjustable Hoops", "Multi-Sport Lines"]
      }
    ],
    amenities: [
      "Parking","Lighting", "Equipment Rental","Changing Rooms","Refreshments","WiFi","Air Conditioning","First Aid","Security","Accessibility"
    ],
    operatingHours: [
      { day: "Monday", hours: "6:00 AM - 10:00 PM" },
      { day: "Tuesday", hours: "6:00 AM - 10:00 PM" },
      { day: "Wednesday", hours: "6:00 AM - 10:00 PM" },
      { day: "Thursday", hours: "6:00 AM - 10:00 PM" },
      { day: "Friday", hours: "6:00 AM - 11:00 PM" },
      { day: "Saturday", hours: "7:00 AM - 11:00 PM" },
      { day: "Sunday", hours: "7:00 AM - 9:00 PM" }
    ],
    pricing: [
      { timeSlot: "Early Morning", duration: "6:00 AM - 9:00 AM", rate: 25 },
      { timeSlot: "Morning", duration: "9:00 AM - 12:00 PM", rate: 30 },
      { timeSlot: "Afternoon", duration: "12:00 PM - 5:00 PM", rate: 35 },
      { timeSlot: "Evening", duration: "5:00 PM - 8:00 PM", rate: 45 },
      { timeSlot: "Night", duration: "8:00 PM - 10:00 PM", rate: 40 }
    ],
    policies: [
      "All players must wear appropriate athletic footwear","Court reservations can be cancelled up to 2 hours before start time","Maximum 4 players per tennis court, 10 players per basketball court","Equipment rental available at front desk with valid ID","Facility rules and safety guidelines must be followed at all times","Children under 16 must be accompanied by an adult","No outside food or beverages allowed (water bottles permitted)"
    ]
  };

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'booking', label: 'Book Now', icon: 'Calendar' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsBookingWidgetSticky(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToDiscovery = () => {
    navigate('/facility-discovery');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb Navigation */}
      <div className="pt-20 pb-4 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={handleBackToDiscovery}
              className="text-primary hover:text-primary/80 transition-athletic"
            >
              Discover Facilities
            </button>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Sports Facilities</span>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="font-athletic-medium text-text-primary">{facility?.name}</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <FacilityHero facility={facility} />
      {/* Sticky Navigation */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-athletic border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <nav className="flex space-x-1">
              {navigationSections?.map(section => (
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-athletic text-sm font-athletic-medium transition-athletic ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Heart"
                iconPosition="left"
              >
                Save
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => scrollToSection('booking')}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <div id="overview">
              <FacilityInfo facility={facility} />
            </div>

            {/* Reviews Section */}
            <div id="reviews">
              <ReviewsSection facility={facility} />
            </div>

            {/* Community Section */}
            <div id="community">
              <CommunitySection facility={facility} />
            </div>

            {/* Location Section */}
            <div id="location">
              <LocationSection facility={facility} />
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div id="booking" className={isBookingWidgetSticky ? 'sticky top-32' : ''}>
              <BookingWidget facility={facility} />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Starting from</p>
            <p className="text-lg font-athletic-bold text-primary">$25/hour</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => scrollToSection('booking')}
            className="ripple-effect"
          >
            Book Now
          </Button>
        </div>
      </div>
      {/* Trust Indicators Footer */}
      <div className="bg-gradient-athletic-depth border-t border-border/50 py-8 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-athletic flex items-center justify-center mx-auto">
                <Icon name="Shield" size={24} className="text-success" />
              </div>
              <h4 className="font-athletic-bold text-text-primary">Verified Facility</h4>
              <p className="text-sm text-text-secondary">Background checked & insured</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-athletic flex items-center justify-center mx-auto">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <h4 className="font-athletic-bold text-text-primary">Instant Booking</h4>
              <p className="text-sm text-text-secondary">Immediate confirmation</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-athletic flex items-center justify-center mx-auto">
                <Icon name="RefreshCw" size={24} className="text-warning" />
              </div>
              <h4 className="font-athletic-bold text-text-primary">Free Cancellation</h4>
              <p className="text-sm text-text-secondary">Cancel up to 2 hours before</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-athletic flex items-center justify-center mx-auto">
                <Icon name="Headphones" size={24} className="text-accent" />
              </div>
              <h4 className="font-athletic-bold text-text-primary">24/7 Support</h4>
              <p className="text-sm text-text-secondary">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityProfile;