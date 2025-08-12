import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const sportOptions = [
    { value: 'all', label: 'All Sports' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'squash', label: 'Squash' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'football', label: 'Football' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'swimming', label: 'Swimming' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'availability', label: 'Most Available' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Any Time' },
    { value: 'now', label: 'Available Now' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'weekend', label: 'This Weekend' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleAmenityChange = (amenity, checked) => {
    const updatedAmenities = { ...localFilters?.amenities, [amenity]: checked };
    const updatedFilters = { ...localFilters, amenities: updatedAmenities };
    setLocalFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      sport: 'all',
      priceRange: { min: 0, max: 200 },
      distance: 50,
      rating: 0,
      availability: 'all',
      sortBy: 'relevance',
      amenities: {
        parking: false,
        equipment: false,
        lighting: false,
        changing_rooms: false,
        cafeteria: false,
        wifi: false
      }
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        lg:w-72 lg:border-l-0 lg:border-r lg:h-auto lg:sticky lg:top-24
      `}>
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-athletic-bold text-text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-athletic transition-athletic"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Sort By */}
            <div>
              <Select
                label="Sort By"
                options={sortOptions}
                value={localFilters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>

            {/* Sport Type */}
            <div>
              <Select
                label="Sport Type"
                options={sportOptions}
                value={localFilters?.sport}
                onChange={(value) => handleFilterChange('sport', value)}
              />
            </div>

            {/* Availability */}
            <div>
              <Select
                label="Availability"
                options={availabilityOptions}
                value={localFilters?.availability}
                onChange={(value) => handleFilterChange('availability', value)}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-athletic-medium text-text-primary mb-3">
                Price Range (per hour)
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localFilters?.priceRange?.min}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...localFilters?.priceRange,
                      min: parseInt(e?.target?.value) || 0
                    })}
                    className="flex-1"
                  />
                  <span className="text-text-secondary">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localFilters?.priceRange?.max}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...localFilters?.priceRange,
                      max: parseInt(e?.target?.value) || 200
                    })}
                    className="flex-1"
                  />
                </div>
                <div className="text-center text-sm text-text-secondary">
                  ${localFilters?.priceRange?.min} - ${localFilters?.priceRange?.max}
                </div>
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-athletic-medium text-text-primary mb-3">
                Distance: {localFilters?.distance} km
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={localFilters?.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>1 km</span>
                <span>100 km</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-athletic-medium text-text-primary mb-3">
                Minimum Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5]?.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', rating === localFilters?.rating ? 0 : rating)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-athletic border transition-athletic ${
                      localFilters?.rating >= rating
                        ? 'bg-warning/10 border-warning text-warning' :'bg-muted border-border text-text-secondary hover:bg-muted/80'
                    }`}
                  >
                    <Icon name="Star" size={14} className={localFilters?.rating >= rating ? 'fill-current' : ''} />
                    <span className="text-sm">{rating}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-athletic-medium text-text-primary mb-3">
                Amenities
              </label>
              <div className="space-y-3">
                <Checkbox
                  label="Parking Available"
                  checked={localFilters?.amenities?.parking}
                  onChange={(e) => handleAmenityChange('parking', e?.target?.checked)}
                />
                <Checkbox
                  label="Equipment Rental"
                  checked={localFilters?.amenities?.equipment}
                  onChange={(e) => handleAmenityChange('equipment', e?.target?.checked)}
                />
                <Checkbox
                  label="Floodlighting"
                  checked={localFilters?.amenities?.lighting}
                  onChange={(e) => handleAmenityChange('lighting', e?.target?.checked)}
                />
                <Checkbox
                  label="Changing Rooms"
                  checked={localFilters?.amenities?.changing_rooms}
                  onChange={(e) => handleAmenityChange('changing_rooms', e?.target?.checked)}
                />
                <Checkbox
                  label="Cafeteria"
                  checked={localFilters?.amenities?.cafeteria}
                  onChange={(e) => handleAmenityChange('cafeteria', e?.target?.checked)}
                />
                <Checkbox
                  label="WiFi"
                  checked={localFilters?.amenities?.wifi}
                  onChange={(e) => handleAmenityChange('wifi', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-card border-t border-border p-4 space-y-3">
            <Button
              variant="default"
              fullWidth
              iconName="Filter"
              iconPosition="left"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="RotateCcw"
              iconPosition="left"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;