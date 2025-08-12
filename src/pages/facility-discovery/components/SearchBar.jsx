import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onLocationRequest, currentLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, type: 'facility', name: 'Elite Sports Complex', location: 'Downtown', icon: 'Building' },
    { id: 2, type: 'facility', name: 'Metro Tennis Club', location: 'Midtown', icon: 'Building' },
    { id: 3, type: 'location', name: 'Central Park Area', location: 'Manhattan', icon: 'MapPin' },
    { id: 4, type: 'sport', name: 'Basketball Courts', location: 'All areas', icon: 'Circle' },
    { id: 5, type: 'facility', name: 'Riverside Sports Center', location: 'Upper West Side', icon: 'Building' },
    { id: 6, type: 'location', name: 'Brooklyn Heights', location: 'Brooklyn', icon: 'MapPin' },
    { id: 7, type: 'sport', name: 'Tennis Courts', location: 'All areas', icon: 'Circle' },
    { id: 8, type: 'facility', name: 'Olympic Fitness Hub', location: 'Queens', icon: 'Building' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);

    if (query?.length > 0) {
      const filtered = mockSuggestions?.filter(
        item => 
          item?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.location?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setShowSuggestions(false);
    onSearch(suggestion?.name);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleLocationRequest = async () => {
    setIsLocationLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition(
          (position) => {
            const location = {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude
            };
            onLocationRequest(location);
            setIsLocationLoading(false);
          },
          (error) => {
            console.error('Location error:', error);
            // Use mock location for demo
            onLocationRequest({ lat: 40.7128, lng: -74.0060 });
            setIsLocationLoading(false);
          }
        );
      } else {
        // Use mock location for demo
        onLocationRequest({ lat: 40.7128, lng: -74.0060 });
        setIsLocationLoading(false);
      }
    } catch (error) {
      console.error('Location request failed:', error);
      setIsLocationLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'facility': return 'Building';
      case 'location': return 'MapPin';
      case 'sport': return 'Circle';
      default: return 'Search';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'facility': return 'text-primary';
      case 'location': return 'text-success';
      case 'sport': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 z-10">
            <Icon name="Search" size={20} className="text-text-secondary" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery?.length > 0 && setShowSuggestions(true)}
            placeholder="Search facilities, sports, or locations..."
            className="w-full pl-12 pr-32 py-4 bg-card border border-border rounded-athletic text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-athletic"
          />
          
          <div className="absolute right-2 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName={currentLocation ? "MapPin" : "Navigation"}
              iconPosition="left"
              loading={isLocationLoading}
              onClick={handleLocationRequest}
              className={`whitespace-nowrap ${currentLocation ? 'text-success' : 'text-text-secondary'}`}
            >
              {currentLocation ? 'Located' : 'Near Me'}
            </Button>
            
            <Button
              type="submit"
              variant="default"
              size="sm"
              iconName="Search"
              iconPosition="left"
              disabled={!searchQuery?.trim()}
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-athletic shadow-athletic-lg z-20 overflow-hidden">
          <div className="py-2">
            {suggestions?.map((suggestion) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-muted transition-athletic text-left"
              >
                <Icon 
                  name={getTypeIcon(suggestion?.type)} 
                  size={16} 
                  className={getTypeColor(suggestion?.type)} 
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-athletic-medium text-text-primary truncate">
                    {suggestion?.name}
                  </div>
                  <div className="text-xs text-text-secondary truncate">
                    {suggestion?.location}
                  </div>
                </div>
                <div className="text-xs text-text-secondary capitalize">
                  {suggestion?.type}
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-border px-4 py-2 bg-muted/50">
            <div className="text-xs text-text-secondary text-center">
              Press Enter to search for "{searchQuery}"
            </div>
          </div>
        </div>
      )}
      {/* Quick Filters */}
      <div className="flex items-center space-x-2 mt-3 overflow-x-auto pb-2">
        <span className="text-sm text-text-secondary whitespace-nowrap">Quick filters:</span>
        {['Tennis', 'Basketball', 'Available Now', 'Under $50', 'Near Me']?.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setSearchQuery(filter);
              onSearch(filter);
            }}
            className="px-3 py-1 bg-muted hover:bg-muted/80 text-text-secondary hover:text-text-primary text-sm rounded-athletic transition-athletic whitespace-nowrap"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;