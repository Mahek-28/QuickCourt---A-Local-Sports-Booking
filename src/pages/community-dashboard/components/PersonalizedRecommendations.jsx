import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState('facilities');

  const facilityRecommendations = [
    {
      id: 1,
      name: "Sunset Tennis Club",
      type: "Tennis",
      distance: "1.2 miles",
      rating: 4.8,
      priceRange: "$25-35/hour",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      reason: "Based on your tennis activity",
      features: ["Indoor Courts", "Pro Shop", "Coaching"],
      availability: "Available today",
      matchScore: 95
    },
    {
      id: 2,
      name: "Metro Basketball Complex",
      type: "Basketball",
      distance: "2.1 miles",
      rating: 4.6,
      priceRange: "$20-30/hour",
      image: "https://images.pixabay.com/photo/2016/11/29/12/30/basketball-1869573_960_720.jpg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      reason: "Popular with your friends",
      features: ["Full Court", "Locker Rooms", "Parking"],
      availability: "Peak hours available",
      matchScore: 88
    },
    {
      id: 3,
      name: "Riverside Badminton Center",
      type: "Badminton",
      distance: "1.8 miles",
      rating: 4.7,
      priceRange: "$18-25/hour",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      reason: "New sport to try",
      features: ["Multiple Courts", "Equipment Rental", "Beginner Friendly"],
      availability: "Evening slots open",
      matchScore: 82
    }
  ];

  const timeRecommendations = [
    {
      id: 1,
      facility: "Elite Sports Complex",
      sport: "Tennis",
      time: "Tomorrow, 10:00 AM",
      duration: "1.5 hours",
      price: "$30",
      discount: "15% off",
      reason: "Your preferred morning slot",
      weather: { temp: "75°F", condition: "Sunny", icon: "Sun" },
      popularity: "Low demand"
    },
    {
      id: 2,
      facility: "Downtown Basketball Arena",
      sport: "Basketball",
      time: "Today, 8:00 PM",
      duration: "2 hours",
      price: "$25",
      discount: null,
      reason: "Last-minute availability",
      weather: { temp: "68°F", condition: "Clear", icon: "Moon" },
      popularity: "Medium demand"
    },
    {
      id: 3,
      facility: "Riverside Badminton Club",
      sport: "Badminton",
      time: "This Weekend, 2:00 PM",
      duration: "1 hour",
      price: "$20",
      discount: "20% off",
      reason: "Weekend special offer",
      weather: { temp: "72°F", condition: "Partly Cloudy", icon: "Cloud" },
      popularity: "High demand"
    }
  ];

  const eventRecommendations = [
    {
      id: 1,
      title: "Summer Tennis Tournament",
      type: "Tournament",
      date: "August 25-27, 2025",
      location: "Elite Sports Complex",
      participants: 32,
      skillLevel: "Intermediate",
      entryFee: "$50",
      prize: "$500 winner",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      reason: "Matches your skill level"
    },
    {
      id: 2,
      title: "Pickup Basketball League",
      type: "League",
      date: "Every Wednesday, 7:00 PM",
      location: "Metro Basketball Complex",
      participants: 16,
      skillLevel: "All Levels",
      entryFee: "Free",
      prize: "Fun & Fitness",
      image: "https://images.pixabay.com/photo/2016/11/29/12/30/basketball-1869573_960_720.jpg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      reason: "Popular with your network"
    },
    {
      id: 3,
      title: "Badminton Beginners Workshop",
      type: "Workshop",
      date: "August 20, 2025",
      location: "Riverside Badminton Center",
      participants: 12,
      skillLevel: "Beginner",
      entryFee: "$25",
      prize: "Certificate & Equipment",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop",
      reason: "Perfect for skill development"
    }
  ];

  const tabs = [
    { id: 'facilities', label: 'New Facilities', icon: 'Building', count: facilityRecommendations?.length },
    { id: 'times', label: 'Optimal Times', icon: 'Clock', count: timeRecommendations?.length },
    { id: 'events', label: 'Local Events', icon: 'Calendar', count: eventRecommendations?.length }
  ];

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    return 'text-text-secondary bg-muted';
  };

  const getPopularityColor = (popularity) => {
    switch (popularity?.toLowerCase()) {
      case 'low demand': return 'text-success bg-success/10';
      case 'medium demand': return 'text-warning bg-warning/10';
      case 'high demand': return 'text-destructive bg-destructive/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const renderFacilities = () => (
    <div className="space-y-4">
      {facilityRecommendations?.map((facility) => (
        <div key={facility?.id} className="bg-surface rounded-athletic p-4 border border-border/50 hover:border-primary/30 transition-athletic">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-athletic overflow-hidden">
              <Image 
                src={facility?.image} 
                alt={facility?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-athletic-bold text-text-primary">{facility?.name}</h3>
                  <p className="text-sm text-text-secondary">{facility?.type} • {facility?.distance}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getMatchScoreColor(facility?.matchScore)}`}>
                  {facility?.matchScore}% match
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-athletic-medium text-text-primary">{facility?.rating}</span>
                </div>
                <span className="text-sm text-text-secondary">{facility?.priceRange}</span>
                <span className="text-sm text-success">{facility?.availability}</span>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                {facility?.features?.slice(0, 3)?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-athletic-medium">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary italic">{facility?.reason}</p>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Heart">
                    Save
                  </Button>
                  <Link to="/facility-profile">
                    <Button variant="default" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimes = () => (
    <div className="space-y-4">
      {timeRecommendations?.map((time) => (
        <div key={time?.id} className="bg-surface rounded-athletic p-4 border border-border/50 hover:border-primary/30 transition-athletic">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-athletic-bold text-text-primary">{time?.facility}</h3>
              <p className="text-sm text-text-secondary">{time?.sport} • {time?.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-athletic-bold text-primary">{time?.price}</p>
              {time?.discount && (
                <p className="text-sm text-success">{time?.discount}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-sm font-athletic-medium text-text-primary">{time?.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name={time?.weather?.icon} size={16} className="text-accent" />
              <span className="text-sm text-text-secondary">{time?.weather?.temp}</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getPopularityColor(time?.popularity)}`}>
              {time?.popularity}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary italic">{time?.reason}</p>
            <Link to="/booking-engine">
              <Button variant="default" size="sm" iconName="Calendar" iconPosition="left">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      {eventRecommendations?.map((event) => (
        <div key={event?.id} className="bg-surface rounded-athletic p-4 border border-border/50 hover:border-primary/30 transition-athletic">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-20 h-16 rounded-athletic overflow-hidden">
              <Image 
                src={event?.image} 
                alt={event?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-athletic-bold text-text-primary">{event?.title}</h3>
                  <p className="text-sm text-text-secondary">{event?.type} • {event?.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-athletic-medium text-primary">{event?.entryFee}</p>
                  <p className="text-xs text-text-secondary">{event?.prize}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{event?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{event?.participants} participants</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded font-athletic-medium">
                    {event?.skillLevel}
                  </span>
                  <p className="text-sm text-text-secondary italic">{event?.reason}</p>
                </div>
                <Button variant="default" size="sm" iconName="UserPlus" iconPosition="left">
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'facilities': return renderFacilities();
      case 'times': return renderTimes();
      case 'events': return renderEvents();
      default: return renderFacilities();
    }
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-trust/10 rounded-athletic flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-trust" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Personalized Recommendations</h2>
              <p className="text-sm text-text-secondary">Discover new opportunities tailored for you</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Customize
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 bg-muted rounded-athletic p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-athletic-medium transition-athletic ${
                activeTab === tab?.id
                  ? 'bg-card text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-surface text-text-secondary'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderContent()}

        {/* View All */}
        <div className="text-center mt-6">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            View All Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;