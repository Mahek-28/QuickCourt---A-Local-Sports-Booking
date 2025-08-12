import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ViewToggle from './components/ViewToggle';
import FacilityCard from './components/FacilityCard';
import MapView from './components/MapView';
import RecentlyViewed from './components/RecentlyViewed';
import SavedFacilities from './components/SavedFacilities';
import SmartRecommendations from './components/SmartRecommendations';

const FacilityDiscovery = () => {
  const [currentView, setCurrentView] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
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
  });

  // Mock facilities data
  const mockFacilities = [
    {
      id: 1,
      name: "Elite Sports Complex",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      sports: ["Tennis", "Basketball", "Badminton"],
      rating: 4.8,
      reviewCount: 324,
      distance: "2.1 km",
      priceRange: { min: 45, max: 80 },
      availability: "available",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      amenities: {
        parking: true,
        equipment: true,
        lighting: true,
        changing_rooms: true,
        cafeteria: true,
        wifi: true
      },
      friendActivity: { count: 3 },
      isFavorited: true,
      matchScore: 95,
      isPopular: true
    },
    {
      id: 2,
      name: "Metro Tennis Club",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=800&h=600&fit=crop",
      sports: ["Tennis", "Squash"],
      rating: 4.6,
      reviewCount: 189,
      distance: "3.5 km",
      priceRange: { min: 35, max: 65 },
      availability: "limited",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      amenities: {
        parking: true,
        equipment: false,
        lighting: true,
        changing_rooms: true,
        cafeteria: false,
        wifi: true
      },
      friendActivity: { count: 1 },
      matchScore: 88
    },
    {
      id: 3,
      name: "Riverside Sports Center",
      image: "https://images.pixabay.com/photo/2016/11/29/12/30/basketball-1869573_1280.jpg?w=800&h=600&fit=crop",
      sports: ["Basketball", "Volleyball", "Football"],
      rating: 4.4,
      reviewCount: 267,
      distance: "4.2 km",
      priceRange: { min: 25, max: 50 },
      availability: "available",
      coordinates: { lat: 40.7614, lng: -73.9776 },
      amenities: {
        parking: false,
        equipment: true,
        lighting: true,
        changing_rooms: true,
        cafeteria: true,
        wifi: false
      },
      hasDiscount: true,
      matchScore: 82
    },
    {
      id: 4,
      name: "Olympic Fitness Hub",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
      sports: ["Swimming", "Tennis", "Basketball"],
      rating: 4.9,
      reviewCount: 445,
      distance: "1.8 km",
      priceRange: { min: 60, max: 120 },
      availability: "busy",
      coordinates: { lat: 40.7648, lng: -73.9808 },
      amenities: {
        parking: true,
        equipment: true,
        lighting: true,
        changing_rooms: true,
        cafeteria: true,
        wifi: true
      },
      friendActivity: { count: 5 },
      isFavorited: true,
      matchScore: 92,
      newFacility: true
    },
    {
      id: 5,
      name: "Central Park Courts",
      image: "https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?w=800&h=600&fit=crop",
      sports: ["Tennis", "Basketball"],
      rating: 4.2,
      reviewCount: 156,
      distance: "5.1 km",
      priceRange: { min: 20, max: 40 },
      availability: "available",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      amenities: {
        parking: false,
        equipment: false,
        lighting: false,
        changing_rooms: false,
        cafeteria: false,
        wifi: false
      },
      matchScore: 75
    },
    {
      id: 6,
      name: "Brooklyn Heights Athletic",
      image: "https://images.pixabay.com/photo/2017/06/20/22/14/man-2424761_1280.jpg?w=800&h=600&fit=crop",
      sports: ["Badminton", "Squash", "Table Tennis"],
      rating: 4.5,
      reviewCount: 203,
      distance: "6.3 km",
      priceRange: { min: 30, max: 55 },
      availability: "limited",
      coordinates: { lat: 40.6962, lng: -73.9969 },
      amenities: {
        parking: true,
        equipment: true,
        lighting: true,
        changing_rooms: true,
        cafeteria: false,
        wifi: true
      },
      friendActivity: { count: 2 },
      matchScore: 79
    }
  ];

  const [facilities, setFacilities] = useState(mockFacilities);
  const [filteredFacilities, setFilteredFacilities] = useState(mockFacilities);

  // Mock recently viewed facilities
  const recentlyViewed = mockFacilities?.slice(0, 3);

  // Mock saved facilities
  const savedFacilities = mockFacilities?.filter(f => f?.isFavorited);

  // Mock smart recommendations
  const smartRecommendations = mockFacilities?.filter(f => f?.matchScore > 80)?.sort((a, b) => b?.matchScore - a?.matchScore);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...facilities];

      // Search query filter
      if (searchQuery) {
        filtered = filtered?.filter(facility =>
          facility?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          facility?.sports?.some(sport => sport?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        );
      }

      // Sport filter
      if (filters?.sport !== 'all') {
        filtered = filtered?.filter(facility =>
          facility?.sports?.some(sport => sport?.toLowerCase() === filters?.sport?.toLowerCase())
        );
      }

      // Price range filter
      filtered = filtered?.filter(facility =>
        facility?.priceRange?.min >= filters?.priceRange?.min &&
        facility?.priceRange?.max <= filters?.priceRange?.max
      );

      // Rating filter
      if (filters?.rating > 0) {
        filtered = filtered?.filter(facility => facility?.rating >= filters?.rating);
      }

      // Availability filter
      if (filters?.availability !== 'all') {
        if (filters?.availability === 'now') {
          filtered = filtered?.filter(facility => facility?.availability === 'available');
        }
      }

      // Amenities filter
      Object.keys(filters?.amenities)?.forEach(amenity => {
        if (filters?.amenities?.[amenity]) {
          filtered = filtered?.filter(facility => facility?.amenities?.[amenity]);
        }
      });

      // Sort results
      switch (filters?.sortBy) {
        case 'distance':
          filtered?.sort((a, b) => parseFloat(a?.distance) - parseFloat(b?.distance));
          break;
        case 'price_low':
          filtered?.sort((a, b) => a?.priceRange?.min - b?.priceRange?.min);
          break;
        case 'price_high':
          filtered?.sort((a, b) => b?.priceRange?.max - a?.priceRange?.max);
          break;
        case 'rating':
          filtered?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'availability':
          filtered?.sort((a, b) => {
            const order = { 'available': 0, 'limited': 1, 'busy': 2 };
            return order?.[a?.availability] - order?.[b?.availability];
          });
          break;
        default:
          // Relevance - sort by match score if available
          filtered?.sort((a, b) => (b?.matchScore || 0) - (a?.matchScore || 0));
      }

      setFilteredFacilities(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLocationRequest = (location) => {
    setUserLocation(location);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
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
    });
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const handleRemoveSaved = (facilityId) => {
    // Handle removing from saved facilities
    console.log('Remove saved facility:', facilityId);
  };

  const handleClearRecentlyViewed = () => {
    // Handle clearing recently viewed
    console.log('Clear recently viewed');
  };

  const handleClearSavedFacilities = () => {
    // Handle clearing all saved facilities
    console.log('Clear all saved facilities');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section with Search */}
        <section className="bg-gradient-court-energy text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-athletic-bold mb-4">
                Discover Your Perfect Court
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Find and book premium sports facilities near you with real-time availability and instant confirmation
              </p>
            </div>

            <div className="flex justify-center">
              <SearchBar
                onSearch={handleSearch}
                onLocationRequest={handleLocationRequest}
                currentLocation={userLocation}
              />
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">2,847+ Facilities</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span className="text-sm">50K+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span className="text-sm">Instant Booking</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Smart Recommendations */}
          <div className="mb-8">
            <SmartRecommendations 
              recommendations={smartRecommendations}
              userPreferences={filters}
            />
          </div>

          {/* Recently Viewed & Saved Facilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RecentlyViewed 
              facilities={recentlyViewed}
              onClear={handleClearRecentlyViewed}
            />
            <SavedFacilities 
              facilities={savedFacilities}
              onRemove={handleRemoveSaved}
              onClearAll={handleClearSavedFacilities}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => setIsFilterOpen(true)}
                >
                  Filters & Sort
                </Button>
              </div>
              
              <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* View Controls */}
              <div className="mb-6">
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  resultCount={filteredFacilities?.length}
                />
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-text-secondary">Finding facilities...</span>
                  </div>
                </div>
              )}

              {/* Results */}
              {!isLoading && (
                <>
                  {currentView === 'map' ? (
                    <div className="h-96 lg:h-[600px] rounded-athletic overflow-hidden">
                      <MapView
                        facilities={filteredFacilities}
                        selectedFacility={selectedFacility}
                        onFacilitySelect={handleFacilitySelect}
                        userLocation={userLocation}
                      />
                    </div>
                  ) : (
                    <div className={`
                      ${currentView === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
                      }
                    `}>
                      {filteredFacilities?.length > 0 ? (
                        filteredFacilities?.map((facility) => (
                          <FacilityCard
                            key={facility?.id}
                            facility={facility}
                            viewMode={currentView}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12">
                          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                          <h3 className="text-xl font-athletic-bold text-text-primary mb-2">
                            No facilities found
                          </h3>
                          <p className="text-text-secondary mb-4">
                            Try adjusting your filters or search criteria
                          </p>
                          <Button
                            variant="outline"
                            iconName="RotateCcw"
                            iconPosition="left"
                            onClick={handleClearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Load More Button */}
              {!isLoading && filteredFacilities?.length > 0 && filteredFacilities?.length >= 12 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    iconName="ChevronDown"
                    iconPosition="right"
                    onClick={() => {
                      // Handle load more
                    }}
                  >
                    Load More Facilities
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Floating Action Button for Mobile Filters */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <Button
          variant="default"
          size="lg"
          iconName="Filter"
          onClick={() => setIsFilterOpen(true)}
          className="rounded-full w-14 h-14 shadow-athletic-lg"
        />
      </div>
    </div>
  );
};

export default FacilityDiscovery;