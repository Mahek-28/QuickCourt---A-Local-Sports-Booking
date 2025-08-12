import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FacilityCard = ({ facility, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(facility?.isFavorited || false);

  const handleFavoriteToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'limited': return 'text-warning bg-warning/10';
      case 'busy': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available Now';
      case 'limited': return 'Limited Slots';
      case 'busy': return 'Busy';
      default: return 'Check Availability';
    }
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/facility-profile?id=${facility?.id}`}
        className="block bg-card border border-border rounded-athletic hover:shadow-athletic-lg transition-athletic"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center p-4 space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-athletic">
            <Image
              src={facility?.image}
              alt={facility?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={handleFavoriteToggle}
                className="p-1 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-athletic"
              >
                <Icon
                  name={isFavorited ? "Heart" : "Heart"}
                  size={14}
                  className={isFavorited ? "text-error fill-current" : "text-white"}
                />
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-athletic-bold text-text-primary truncate">
                  {facility?.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm font-athletic-medium text-text-primary">
                      {facility?.rating}
                    </span>
                    <span className="text-sm text-text-secondary">
                      ({facility?.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">
                    {facility?.distance} away
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {facility?.sports?.slice(0, 3)?.map((sport, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-athletic font-athletic-medium"
                    >
                      {sport}
                    </span>
                  ))}
                  {facility?.sports?.length > 3 && (
                    <span className="text-xs text-text-secondary">
                      +{facility?.sports?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className={`px-2 py-1 rounded-athletic text-xs font-athletic-medium ${getAvailabilityColor(facility?.availability)}`}>
                  {getAvailabilityText(facility?.availability)}
                </div>
                <div className="text-right">
                  <span className="text-lg font-athletic-bold text-text-primary">
                    ${facility?.priceRange?.min}-{facility?.priceRange?.max}
                  </span>
                  <span className="text-sm text-text-secondary">/hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/facility-profile?id=${facility?.id}`}
      className="block bg-card border border-border rounded-athletic hover:shadow-athletic-lg transition-athletic transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-athletic">
        <div className="aspect-video overflow-hidden">
          <Image
            src={facility?.image}
            alt={facility?.name}
            className={`w-full h-full object-cover transition-athletic ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        </div>
        
        {/* Overlay Elements */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className={`px-2 py-1 rounded-athletic text-xs font-athletic-medium backdrop-blur-sm ${getAvailabilityColor(facility?.availability)}`}>
            {getAvailabilityText(facility?.availability)}
          </div>
          <button
            onClick={handleFavoriteToggle}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-athletic"
          >
            <Icon
              name={isFavorited ? "Heart" : "Heart"}
              size={16}
              className={isFavorited ? "text-error fill-current" : "text-white"}
            />
          </button>
        </div>

        {/* Friend Activity Indicator */}
        {facility?.friendActivity && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-athletic">
              <Icon name="Users" size={12} className="text-white" />
              <span className="text-xs text-white font-athletic-medium">
                {facility?.friendActivity?.count} friends played here
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions (Hover State) */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 animate-in fade-in duration-200">
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={(e) => {
                  e?.preventDefault();
                  e?.stopPropagation();
                }}
              >
                Quick View
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={(e) => {
                  e?.preventDefault();
                  e?.stopPropagation();
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-athletic-bold text-text-primary line-clamp-1">
            {facility?.name}
          </h3>
          <div className="text-right">
            <span className="text-lg font-athletic-bold text-text-primary">
              ${facility?.priceRange?.min}-{facility?.priceRange?.max}
            </span>
            <span className="text-sm text-text-secondary">/hour</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-athletic-medium text-text-primary">
              {facility?.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({facility?.reviewCount})
            </span>
          </div>
          <span className="text-text-secondary">•</span>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {facility?.distance} away
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {facility?.sports?.slice(0, 3)?.map((sport, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-athletic font-athletic-medium"
            >
              {sport}
            </span>
          ))}
          {facility?.sports?.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-athletic font-athletic-medium">
              +{facility?.sports?.length - 3} more
            </span>
          )}
        </div>

        {/* Amenities Icons */}
        <div className="flex items-center space-x-3 text-text-secondary">
          {facility?.amenities?.parking && (
            <div className="flex items-center space-x-1">
              <Icon name="Car" size={14} />
              <span className="text-xs">Parking</span>
            </div>
          )}
          {facility?.amenities?.equipment && (
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={14} />
              <span className="text-xs">Equipment</span>
            </div>
          )}
          {facility?.amenities?.lighting && (
            <div className="flex items-center space-x-1">
              <Icon name="Lightbulb" size={14} />
              <span className="text-xs">Lighting</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FacilityCard;