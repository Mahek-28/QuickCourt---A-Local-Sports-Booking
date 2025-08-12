import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentlyViewed = ({ facilities, onClear }) => {
  if (!facilities || facilities?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-athletic p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-athletic-bold text-text-primary">Recently Viewed</h3>
        <button
          onClick={onClear}
          className="text-sm text-text-secondary hover:text-text-primary transition-athletic"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {facilities?.slice(0, 6)?.map((facility) => (
          <Link
            key={facility?.id}
            to={`/facility-profile?id=${facility?.id}`}
            className="flex items-center space-x-3 p-3 bg-muted/50 hover:bg-muted rounded-athletic transition-athletic"
          >
            <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-athletic">
              <Image
                src={facility?.image}
                alt={facility?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-athletic-medium text-text-primary truncate">
                {facility?.name}
              </h4>
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-xs text-text-secondary">
                  {facility?.rating} • {facility?.distance}
                </span>
              </div>
            </div>
            <div className="text-xs text-text-secondary">
              ${facility?.priceRange?.min}+
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;