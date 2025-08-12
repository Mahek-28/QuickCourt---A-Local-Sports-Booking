import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedFacilities = ({ facilities, onRemove, onClearAll }) => {
  const [showAll, setShowAll] = useState(false);

  if (!facilities || facilities?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-athletic p-6 text-center">
        <Icon name="Heart" size={48} className="text-text-secondary mx-auto mb-3" />
        <h3 className="text-lg font-athletic-bold text-text-primary mb-2">No Saved Facilities</h3>
        <p className="text-text-secondary mb-4">
          Save facilities you're interested in to easily find them later.
        </p>
        <Button variant="outline" iconName="Search" iconPosition="left">
          Discover Facilities
        </Button>
      </div>
    );
  }

  const displayedFacilities = showAll ? facilities : facilities?.slice(0, 4);

  return (
    <div className="bg-card border border-border rounded-athletic p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-athletic-bold text-text-primary">
          Saved Facilities ({facilities?.length})
        </h3>
        {facilities?.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-text-secondary hover:text-error transition-athletic"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-3">
        {displayedFacilities?.map((facility) => (
          <div
            key={facility?.id}
            className="flex items-center space-x-4 p-3 bg-muted/30 hover:bg-muted/50 rounded-athletic transition-athletic"
          >
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-athletic">
              <Image
                src={facility?.image}
                alt={facility?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                to={`/facility-profile?id=${facility?.id}`}
                className="block hover:text-primary transition-athletic"
              >
                <h4 className="text-base font-athletic-bold text-text-primary truncate">
                  {facility?.name}
                </h4>
              </Link>
              
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-text-primary">{facility?.rating}</span>
                  <span className="text-sm text-text-secondary">
                    ({facility?.reviewCount})
                  </span>
                </div>
                <span className="text-text-secondary">•</span>
                <span className="text-sm text-text-secondary">
                  {facility?.distance} away
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                {facility?.sports?.slice(0, 2)?.map((sport, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-athletic font-athletic-medium"
                  >
                    {sport}
                  </span>
                ))}
                {facility?.sports?.length > 2 && (
                  <span className="text-xs text-text-secondary">
                    +{facility?.sports?.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <div className="text-right">
                <span className="text-base font-athletic-bold text-text-primary">
                  ${facility?.priceRange?.min}-{facility?.priceRange?.max}
                </span>
                <span className="text-sm text-text-secondary">/hr</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={(e) => {
                    e?.preventDefault();
                    // Handle booking
                  }}
                >
                  Book
                </Button>
                
                <button
                  onClick={(e) => {
                    e?.preventDefault();
                    onRemove(facility?.id);
                  }}
                  className="p-2 text-text-secondary hover:text-error rounded-athletic hover:bg-error/10 transition-athletic"
                  title="Remove from saved"
                >
                  <Icon name="Heart" size={16} className="fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {facilities?.length > 4 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary hover:text-primary/80 font-athletic-medium transition-athletic"
          >
            {showAll ? 'Show Less' : `Show All ${facilities?.length} Facilities`}
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedFacilities;