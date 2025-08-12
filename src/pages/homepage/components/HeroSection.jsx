import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    sport: '',
    location: '',
    timeSlot: ''
  });

  const sportOptions = [
    { value: 'tennis', label: 'Tennis' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'squash', label: 'Squash' }
  ];

  const locationOptions = [
    { value: '1km', label: 'Within 1 km' },
    { value: '5km', label: 'Within 5 km' },
    { value: '10km', label: 'Within 10 km' },
    { value: '25km', label: 'Within 25 km' }
  ];

  const timeSlotOptions = [
    { value: 'morning', label: 'Morning (6AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { value: 'evening', label: 'Evening (6PM - 10PM)' },
    { value: 'anytime', label: 'Anytime' }
  ];

  const handleSearch = () => {
    navigate('/facility-discovery', { state: { filters: searchFilters } });
  };

  const handleQuickSearch = () => {
    navigate('/facility-discovery');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white rounded-full blur-2xl"></div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Your Court
              <span className="block text-accent">Awaits</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building communities through sport. Discover, book, and play at premium facilities near you.
            </p>

            {/* Live Availability Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-12">
              <div className="w-3 h-3 bg-success rounded-full pulse-availability"></div>
              <span className="text-white/80 font-medium">2,847 courts available right now</span>
            </div>
          </div>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-athletic rounded-2xl p-8 shadow-athletic-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Select
                  label="Sport Type"
                  placeholder="Choose your sport"
                  options={sportOptions}
                  value={searchFilters?.sport}
                  onChange={(value) => setSearchFilters(prev => ({ ...prev, sport: value }))}
                  className="w-full"
                />
                
                <Select
                  label="Location Radius"
                  placeholder="How far to search?"
                  options={locationOptions}
                  value={searchFilters?.location}
                  onChange={(value) => setSearchFilters(prev => ({ ...prev, location: value }))}
                  className="w-full"
                />
                
                <Select
                  label="Preferred Time"
                  placeholder="When do you play?"
                  options={timeSlotOptions}
                  value={searchFilters?.timeSlot}
                  onChange={(value) => setSearchFilters(prev => ({ ...prev, timeSlot: value }))}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  onClick={handleSearch}
                  className="ripple-effect"
                >
                  Find Courts
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={handleQuickSearch}
                  className="sm:w-auto whitespace-nowrap"
                >
                  Courts Near Me
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,847</div>
              <div className="text-white/80 text-sm">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,234</div>
              <div className="text-white/80 text-sm">Verified Courts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">45</div>
              <div className="text-white/80 text-sm">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-white/80 text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Action Buttons - Mobile */}
      <div className="fixed bottom-6 right-6 z-20 md:hidden">
        <Button
          variant="default"
          size="icon"
          iconName="MapPin"
          onClick={handleQuickSearch}
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;