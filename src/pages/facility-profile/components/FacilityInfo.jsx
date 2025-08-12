import React from 'react';
import Icon from '../../../components/AppIcon';

const FacilityInfo = ({ facility }) => {
  const amenityIcons = {
    'Parking': 'Car',
    'Lighting': 'Lightbulb',
    'Equipment Rental': 'Package',
    'Changing Rooms': 'Users',
    'Refreshments': 'Coffee',
    'WiFi': 'Wifi',
    'Air Conditioning': 'Wind',
    'First Aid': 'Heart',
    'Security': 'Shield',
    'Accessibility': 'Accessibility'
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic p-6">
      <div className="space-y-8">
        {/* Basic Information */}
        <div>
          <h2 className="text-2xl font-athletic-bold text-text-primary mb-4">
            {facility?.name}
          </h2>
          <div className="flex items-center space-x-4 text-text-secondary mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={18} />
              <span className="font-athletic-medium">{facility?.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={18} className="text-warning" />
              <span className="font-athletic-medium">{facility?.rating}</span>
              <span>({facility?.reviewCount} reviews)</span>
            </div>
          </div>
          <p className="text-text-secondary leading-relaxed">
            {facility?.description}
          </p>
        </div>

        {/* Court Information */}
        <div>
          <h3 className="text-lg font-athletic-bold text-text-primary mb-4">
            Court Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facility?.courts?.map((court, index) => (
              <div key={index} className="bg-muted rounded-athletic p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-athletic-bold text-text-primary">
                    {court?.name}
                  </h4>
                  <span className="text-sm text-text-secondary">
                    {court?.surface}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="Maximize" size={16} />
                    <span>{court?.dimensions}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span>Max {court?.capacity} players</span>
                  </div>
                  {court?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-athletic-bold text-text-primary mb-4">
            Amenities & Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {facility?.amenities?.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 p-3 bg-muted rounded-athletic">
                <div className="w-10 h-10 bg-primary/10 rounded-athletic flex items-center justify-center">
                  <Icon 
                    name={amenityIcons?.[amenity] || 'Check'} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <span className="text-sm font-athletic-medium text-text-primary text-center">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div>
          <h3 className="text-lg font-athletic-bold text-text-primary mb-4">
            Operating Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facility?.operatingHours?.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="font-athletic-medium text-text-primary">
                  {schedule?.day}
                </span>
                <span className="text-text-secondary">
                  {schedule?.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Information */}
        <div>
          <h3 className="text-lg font-athletic-bold text-text-primary mb-4">
            Pricing
          </h3>
          <div className="space-y-3">
            {facility?.pricing?.map((price, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-athletic">
                <div>
                  <span className="font-athletic-medium text-text-primary">
                    {price?.timeSlot}
                  </span>
                  <span className="text-sm text-text-secondary ml-2">
                    ({price?.duration})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-athletic-bold text-primary">
                    ${price?.rate}
                  </span>
                  <span className="text-sm text-text-secondary">/hour</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Policies */}
        <div>
          <h3 className="text-lg font-athletic-bold text-text-primary mb-4">
            Safety & Policies
          </h3>
          <div className="space-y-3">
            {facility?.policies?.map((policy, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{policy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityInfo;