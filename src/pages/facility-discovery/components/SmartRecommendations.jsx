import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SmartRecommendations = ({ recommendations, userPreferences }) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  const getRecommendationReason = (facility) => {
    const reasons = [];
    
    if (facility?.matchScore > 90) {
      reasons?.push('Perfect match for your preferences');
    } else if (facility?.isPopular) {
      reasons?.push('Popular in your area');
    } else if (facility?.hasDiscount) {
      reasons?.push('Special offer available');
    } else if (facility?.friendsPlayed) {
      reasons?.push(`${facility?.friendsPlayed} friends played here`);
    } else if (facility?.newFacility) {
      reasons?.push('New facility in your area');
    } else {
      reasons?.push('Recommended based on your activity');
    }
    
    return reasons?.[0];
  };

  const getRecommendationIcon = (facility) => {
    if (facility?.matchScore > 90) return 'Target';
    if (facility?.isPopular) return 'TrendingUp';
    if (facility?.hasDiscount) return 'Tag';
    if (facility?.friendsPlayed) return 'Users';
    if (facility?.newFacility) return 'Sparkles';
    return 'ThumbsUp';
  };

  const getRecommendationColor = (facility) => {
    if (facility?.matchScore > 90) return 'text-success';
    if (facility?.isPopular) return 'text-primary';
    if (facility?.hasDiscount) return 'text-warning';
    if (facility?.friendsPlayed) return 'text-secondary';
    if (facility?.newFacility) return 'text-accent';
    return 'text-trust';
  };

  return (
    <div className="bg-gradient-athletic-depth border border-border rounded-athletic p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-athletic flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-athletic-bold text-text-primary">Smart Recommendations</h3>
          <p className="text-sm text-text-secondary">
            Personalized suggestions based on your preferences and activity
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations?.slice(0, 4)?.map((facility) => (
          <div
            key={facility?.id}
            className="bg-card border border-border rounded-athletic p-4 hover:shadow-athletic transition-athletic"
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-athletic">
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
                  </div>
                  <span className="text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">
                    {facility?.distance} away
                  </span>
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <Icon 
                    name={getRecommendationIcon(facility)} 
                    size={14} 
                    className={getRecommendationColor(facility)} 
                  />
                  <span className="text-xs text-text-secondary">
                    {getRecommendationReason(facility)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-athletic-bold text-text-primary">
                      ${facility?.priceRange?.min}-{facility?.priceRange?.max}
                    </span>
                    <span className="text-xs text-text-secondary">/hr</span>
                    {facility?.hasDiscount && (
                      <span className="px-1 py-0.5 bg-warning/10 text-warning text-xs rounded font-athletic-medium">
                        20% OFF
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={(e) => {
                      e?.preventDefault();
                      // Handle quick booking
                    }}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>

            {/* Match Score Indicator */}
            {facility?.matchScore && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Match Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success rounded-full transition-all duration-500"
                        style={{ width: `${facility?.matchScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-athletic-medium text-success">
                      {facility?.matchScore}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => {
            // Handle refresh recommendations
          }}
        >
          Refresh Recommendations
        </Button>
      </div>
    </div>
  );
};

export default SmartRecommendations;