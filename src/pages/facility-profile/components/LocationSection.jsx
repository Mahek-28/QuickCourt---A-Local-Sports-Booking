import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSection = ({ facility }) => {
  const [activeTransportTab, setActiveTransportTab] = useState('driving');

  const transportOptions = {
    driving: {
      icon: 'Car',
      time: '12 mins',
      distance: '4.2 miles',
      instructions: [
        "Head north on Main St toward Oak Ave",
        "Turn right onto Sports Complex Dr",
        "Destination will be on your left"
      ]
    },
    transit: {
      icon: 'Bus',
      time: '28 mins',
      distance: '3.8 miles',
      instructions: [
        "Walk to Main St Bus Stop (3 mins)",
        "Take Bus Route 42 toward Sports District",
        "Get off at Sports Complex Station",
        "Walk 2 mins to facility"
      ]
    },
    walking: {
      icon: 'MapPin',
      time: '52 mins',
      distance: '3.8 miles',
      instructions: [
        "Head north on Main St",
        "Continue straight for 2.1 miles",
        "Turn right onto Sports Complex Dr",
        "Walk 0.3 miles to destination"
      ]
    },
    cycling: {
      icon: 'Bike',
      time: '18 mins',
      distance: '3.8 miles',
      instructions: [
        "Take the Main St bike lane north",
        "Follow bike path through Central Park",
        "Exit onto Sports Complex Dr",
        "Bike parking available at facility"
      ]
    }
  };

  const nearbyAmenities = [
    {
      name: "SportZone Cafe",
      type: "Restaurant",
      distance: "0.2 miles",
      rating: 4.5,
      icon: "Coffee",
      description: "Sports-themed cafe with healthy options"
    },
    {
      name: "FitGear Pro Shop",
      type: "Sports Store",
      distance: "0.3 miles",
      rating: 4.7,
      icon: "ShoppingBag",
      description: "Professional sports equipment and apparel"
    },
    {
      name: "Metro Parking Garage",
      type: "Parking",
      distance: "0.1 miles",
      rating: 4.2,
      icon: "Car",
      description: "Covered parking with hourly rates"
    },
    {
      name: "QuickMart Express",
      type: "Convenience",
      distance: "0.4 miles",
      rating: 4.0,
      icon: "ShoppingCart",
      description: "Snacks, drinks, and essentials"
    },
    {
      name: "Central Park",
      type: "Recreation",
      distance: "0.5 miles",
      rating: 4.8,
      icon: "Trees",
      description: "Beautiful park with walking trails"
    },
    {
      name: "Sports Medicine Clinic",
      type: "Healthcare",
      distance: "0.6 miles",
      rating: 4.6,
      icon: "Heart",
      description: "Specialized sports injury treatment"
    }
  ];

  const weatherData = {
    current: {
      temperature: 72,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8,
      icon: "Cloud"
    },
    forecast: [
      { day: "Today", high: 75, low: 68, condition: "Partly Cloudy", icon: "Cloud" },
      { day: "Tomorrow", high: 78, low: 70, condition: "Sunny", icon: "Sun" },
      { day: "Wed", high: 73, low: 66, condition: "Light Rain", icon: "CloudRain" },
      { day: "Thu", high: 76, low: 69, condition: "Sunny", icon: "Sun" },
      { day: "Fri", high: 74, low: 67, condition: "Partly Cloudy", icon: "Cloud" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Location & Map */}
      <div className="bg-card rounded-athletic shadow-athletic p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-athletic-bold text-text-primary">
              Location & Directions
            </h2>
            <Button
              variant="outline"
              iconName="Navigation"
              iconPosition="left"
            >
              Get Directions
            </Button>
          </div>

          {/* Address & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-athletic-bold text-text-primary mb-1">Address</h3>
                  <p className="text-text-secondary">
                    {facility?.address}<br />
                    {facility?.city}, {facility?.state} {facility?.zipCode}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Phone" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-athletic-bold text-text-primary mb-1">Phone</h3>
                  <p className="text-text-secondary">{facility?.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Mail" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-athletic-bold text-text-primary mb-1">Email</h3>
                  <p className="text-text-secondary">{facility?.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon name="Car" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-athletic-bold text-text-primary mb-1">Parking</h3>
                  <p className="text-text-secondary">
                    Free on-site parking available<br />
                    150+ spaces including accessible spots
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Icon name="Accessibility" size={20} className="text-primary mt-1" />
                <div>
                  <h3 className="font-athletic-bold text-text-primary mb-1">Accessibility</h3>
                  <p className="text-text-secondary">
                    Wheelchair accessible entrance<br />
                    ADA compliant facilities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-muted rounded-athletic overflow-hidden h-64">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={facility?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${facility?.coordinates?.lat},${facility?.coordinates?.lng}&z=14&output=embed`}
            />
          </div>
        </div>
      </div>
      {/* Transportation Options */}
      <div className="bg-card rounded-athletic shadow-athletic p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-athletic-bold text-text-primary">
            How to Get Here
          </h3>

          {/* Transport Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-athletic">
            {Object.entries(transportOptions)?.map(([key, option]) => (
              <button
                key={key}
                onClick={() => setActiveTransportTab(key)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-athletic text-sm font-athletic-medium transition-athletic ${
                  activeTransportTab === key
                    ? 'bg-card text-primary shadow-athletic'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span className="capitalize">{key}</span>
              </button>
            ))}
          </div>

          {/* Transport Details */}
          <div className="bg-muted rounded-athletic p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-athletic flex items-center justify-center">
                <Icon 
                  name={transportOptions?.[activeTransportTab]?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              <div>
                <h4 className="font-athletic-bold text-text-primary">
                  {transportOptions?.[activeTransportTab]?.time}
                </h4>
                <p className="text-text-secondary">
                  {transportOptions?.[activeTransportTab]?.distance}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              {transportOptions?.[activeTransportTab]?.instructions?.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-athletic-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-text-secondary">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Weather Information */}
      <div className="bg-card rounded-athletic shadow-athletic p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-athletic-bold text-text-primary">
            Weather Conditions
          </h3>

          {/* Current Weather */}
          <div className="bg-gradient-athletic-depth rounded-athletic p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-athletic flex items-center justify-center">
                  <Icon 
                    name={weatherData?.current?.icon} 
                    size={32} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-athletic-bold text-text-primary">
                    {weatherData?.current?.temperature}°F
                  </h4>
                  <p className="text-text-secondary">
                    {weatherData?.current?.condition}
                  </p>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Droplets" size={14} />
                  <span>{weatherData?.current?.humidity}% humidity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Wind" size={14} />
                  <span>{weatherData?.current?.windSpeed} mph wind</span>
                </div>
              </div>
            </div>
            
            <div className="bg-success/10 border border-success/20 rounded-athletic p-3">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-success font-athletic-medium">
                  Perfect conditions for outdoor sports!
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h4 className="font-athletic-bold text-text-primary mb-3">
              5-Day Forecast
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {weatherData?.forecast?.map((day, index) => (
                <div key={index} className="bg-muted rounded-athletic p-3 text-center">
                  <p className="text-sm font-athletic-medium text-text-primary mb-2">
                    {day?.day}
                  </p>
                  <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <Icon name={day?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-athletic-bold text-text-primary">
                      {day?.high}°
                    </p>
                    <p className="text-xs text-text-secondary">
                      {day?.low}°
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Nearby Amenities */}
      <div className="bg-card rounded-athletic shadow-athletic p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-athletic-bold text-text-primary">
            Nearby Amenities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyAmenities?.map((amenity, index) => (
              <div key={index} className="bg-muted rounded-athletic p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-athletic flex items-center justify-center flex-shrink-0">
                    <Icon name={amenity?.icon} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-athletic-bold text-text-primary">
                        {amenity?.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning" />
                        <span className="text-sm text-text-secondary">
                          {amenity?.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-athletic">
                        {amenity?.type}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {amenity?.distance}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary">
                      {amenity?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;