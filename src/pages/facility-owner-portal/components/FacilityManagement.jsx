import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const FacilityManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [facilityData, setFacilityData] = useState({
    name: 'Elite Sports Complex',
    description: 'Premium indoor sports facility featuring state-of-the-art courts and equipment. Perfect for competitive matches and recreational play.',
    amenities: ['Parking', 'Locker Rooms', 'Equipment Rental', 'Refreshments', 'WiFi', 'Air Conditioning'],
    pricing: {
      peak: 45,
      offPeak: 30,
      weekend: 50
    },
    policies: {
      cancellation: '24 hours advance notice required',
      payment: 'Payment due at booking confirmation',
      equipment: 'Equipment rental available on-site'
    }
  });

  const facilityImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  ];

  const tabs = [
    { id: 'profile', label: 'Facility Profile', icon: 'Building' },
    { id: 'pricing', label: 'Pricing & Policies', icon: 'DollarSign' },
    { id: 'amenities', label: 'Amenities', icon: 'Settings' },
    { id: 'photos', label: 'Photos & Media', icon: 'Camera' }
  ];

  const handleInputChange = (field, value) => {
    setFacilityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePricingChange = (type, value) => {
    setFacilityData(prev => ({
      ...prev,
      pricing: {
        ...prev?.pricing,
        [type]: value
      }
    }));
  };

  const toggleAmenity = (amenity) => {
    setFacilityData(prev => ({
      ...prev,
      amenities: prev?.amenities?.includes(amenity)
        ? prev?.amenities?.filter(a => a !== amenity)
        : [...prev?.amenities, amenity]
    }));
  };

  const availableAmenities = [
    'Parking', 'Locker Rooms', 'Equipment Rental', 'Refreshments', 
    'WiFi', 'Air Conditioning', 'Shower Facilities', 'Pro Shop',
    'Coaching Services', 'Tournament Hosting', 'Live Streaming', 'Scoreboard'
  ];

  return (
    <div className="bg-card border border-border rounded-athletic shadow-athletic">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-athletic-medium transition-athletic whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={18} strokeWidth={2} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Facility Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Facility Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Facility Name"
                  type="text"
                  value={facilityData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  placeholder="Enter facility name"
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                Facility Description
              </label>
              <textarea
                value={facilityData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Describe your facility, its features, and what makes it special..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Address"
                type="text"
                placeholder="123 Sports Avenue, City, State 12345"
              />
              <Input
                label="Operating Hours"
                type="text"
                placeholder="6:00 AM - 11:00 PM"
              />
            </div>
          </div>
        )}

        {/* Pricing & Policies Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Pricing Structure</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-surface/50 rounded-athletic p-4 border border-border/50">
                  <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                    Peak Hours ($/hour)
                  </label>
                  <Input
                    type="number"
                    value={facilityData?.pricing?.peak}
                    onChange={(e) => handlePricingChange('peak', e?.target?.value)}
                    placeholder="45"
                  />
                  <p className="text-xs text-text-secondary mt-1">6 PM - 10 PM weekdays</p>
                </div>
                <div className="bg-surface/50 rounded-athletic p-4 border border-border/50">
                  <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                    Off-Peak ($/hour)
                  </label>
                  <Input
                    type="number"
                    value={facilityData?.pricing?.offPeak}
                    onChange={(e) => handlePricingChange('offPeak', e?.target?.value)}
                    placeholder="30"
                  />
                  <p className="text-xs text-text-secondary mt-1">6 AM - 6 PM weekdays</p>
                </div>
                <div className="bg-surface/50 rounded-athletic p-4 border border-border/50">
                  <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                    Weekend ($/hour)
                  </label>
                  <Input
                    type="number"
                    value={facilityData?.pricing?.weekend}
                    onChange={(e) => handlePricingChange('weekend', e?.target?.value)}
                    placeholder="50"
                  />
                  <p className="text-xs text-text-secondary mt-1">All day Saturday & Sunday</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-athletic-bold text-text-primary mb-4">Facility Policies</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="24 hours advance notice required for full refund..."
                    defaultValue={facilityData?.policies?.cancellation}
                  />
                </div>
                <div>
                  <label className="block text-sm font-athletic-medium text-text-primary mb-2">
                    Payment Terms
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Payment due at booking confirmation..."
                    defaultValue={facilityData?.policies?.payment}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'amenities' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Available Amenities</h3>
              <p className="text-sm text-text-secondary mb-6">Select all amenities available at your facility</p>
              
              <div className="grid md:grid-cols-3 gap-3">
                {availableAmenities?.map((amenity) => (
                  <div
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center space-x-3 p-3 rounded-athletic border cursor-pointer transition-athletic ${
                      facilityData?.amenities?.includes(amenity)
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      facilityData?.amenities?.includes(amenity)
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {facilityData?.amenities?.includes(amenity) && (
                        <Icon name="Check" size={12} color="white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-sm font-athletic-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface/30 rounded-athletic p-4 border border-border/50">
              <h4 className="text-md font-athletic-bold text-text-primary mb-2">Selected Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {facilityData?.amenities?.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <span>{amenity}</span>
                    <button
                      onClick={() => toggleAmenity(amenity)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Photos & Media Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Facility Photos</h3>
              <p className="text-sm text-text-secondary mb-6">Upload high-quality photos to showcase your facility</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {facilityImages?.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-athletic overflow-hidden border border-border">
                      <Image
                        src={image}
                        alt={`Facility photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        className="w-8 h-8 p-0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-border rounded-athletic p-8 text-center hover:border-primary/50 transition-colors">
                <Icon name="Upload" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-text-primary font-athletic-medium mb-2">Upload New Photos</p>
                <p className="text-sm text-text-secondary mb-4">Drag and drop files here, or click to browse</p>
                <Button variant="outline" iconName="Plus" iconPosition="left">
                  Add Photos
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-md font-athletic-bold text-text-primary mb-4">Photo Guidelines</h4>
              <div className="bg-surface/30 rounded-athletic p-4 border border-border/50">
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>High resolution images (minimum 1200x800 pixels)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Good lighting and clear visibility of courts/facilities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Multiple angles showing different areas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span>Include amenities and special features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button variant="outline">
            Cancel Changes
          </Button>
          <Button variant="default" iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;