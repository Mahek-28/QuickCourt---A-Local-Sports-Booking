import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ facilities, selectedFacility, onFacilitySelect, userLocation }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showClusters, setShowClusters] = useState(true);
  const [priceHeatmap, setPriceHeatmap] = useState(false);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 1, 8));
  };

  const togglePriceHeatmap = () => {
    setPriceHeatmap(!priceHeatmap);
  };

  const getMarkerColor = (facility) => {
    if (priceHeatmap) {
      const avgPrice = (facility?.priceRange?.min + facility?.priceRange?.max) / 2;
      if (avgPrice < 30) return '#10B981'; // Green for low prices
      if (avgPrice < 60) return '#F59E0B'; // Orange for medium prices
      return '#DC2626'; // Red for high prices
    }
    
    switch (facility?.availability) {
      case 'available': return '#10B981';
      case 'limited': return '#F59E0B';
      case 'busy': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getClusterSize = (count) => {
    if (count < 5) return 'w-8 h-8 text-xs';
    if (count < 10) return 'w-10 h-10 text-sm';
    return 'w-12 h-12 text-base';
  };

  // Group facilities by proximity for clustering
  const clusterFacilities = (facilities) => {
    if (!showClusters || zoomLevel > 14) return facilities?.map(f => ({ ...f, isCluster: false }));
    
    const clusters = [];
    const processed = new Set();
    
    facilities?.forEach((facility, index) => {
      if (processed?.has(index)) return;
      
      const nearby = facilities?.filter((other, otherIndex) => {
        if (processed?.has(otherIndex) || index === otherIndex) return false;
        const distance = Math.sqrt(
          Math.pow(facility?.coordinates?.lat - other?.coordinates?.lat, 2) +
          Math.pow(facility?.coordinates?.lng - other?.coordinates?.lng, 2)
        );
        return distance < 0.01; // Cluster threshold
      });
      
      if (nearby?.length > 0) {
        nearby?.forEach((_, nearbyIndex) => {
          const originalIndex = facilities?.findIndex(f => f?.id === nearby?.[nearbyIndex]?.id);
          processed?.add(originalIndex);
        });
        processed?.add(index);
        
        clusters?.push({
          id: `cluster-${index}`,
          isCluster: true,
          count: nearby?.length + 1,
          facilities: [facility, ...nearby],
          coordinates: facility?.coordinates,
          avgPrice: (nearby?.reduce((sum, f) => sum + (f?.priceRange?.min + f?.priceRange?.max) / 2, 0) + 
                   (facility?.priceRange?.min + facility?.priceRange?.max) / 2) / (nearby?.length + 1)
        });
      } else {
        clusters?.push({ ...facility, isCluster: false });
        processed?.add(index);
      }
    });
    
    return clusters;
  };

  const clusteredFacilities = clusterFacilities(facilities);

  return (
    <div className="relative w-full h-full bg-muted rounded-athletic overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="bg-card border border-border rounded-athletic shadow-athletic overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="block w-10 h-10 flex items-center justify-center hover:bg-muted transition-athletic"
          >
            <Icon name="Plus" size={16} />
          </button>
          <div className="border-t border-border"></div>
          <button
            onClick={handleZoomOut}
            className="block w-10 h-10 flex items-center justify-center hover:bg-muted transition-athletic"
          >
            <Icon name="Minus" size={16} />
          </button>
        </div>

        <Button
          variant={priceHeatmap ? "default" : "outline"}
          size="sm"
          iconName="TrendingUp"
          iconPosition="left"
          onClick={togglePriceHeatmap}
          className="whitespace-nowrap"
        >
          Price Heat
        </Button>
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-card border border-border rounded-athletic p-3 shadow-athletic">
        <h4 className="text-sm font-athletic-medium text-text-primary mb-2">
          {priceHeatmap ? 'Price Range' : 'Availability'}
        </h4>
        <div className="space-y-1">
          {priceHeatmap ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs text-text-secondary">$0-30/hr</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs text-text-secondary">$30-60/hr</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-xs text-text-secondary">$60+/hr</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs text-text-secondary">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs text-text-secondary">Limited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-xs text-text-secondary">Busy</span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Facility Discovery Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
        className="w-full h-full"
      />
      {/* Custom Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {clusteredFacilities?.map((item) => {
          const markerColor = item?.isCluster ? '#2563EB' : getMarkerColor(item);
          
          return (
            <div
              key={item?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
              style={{
                left: `${50 + (item?.coordinates?.lng - mapCenter?.lng) * 1000}%`,
                top: `${50 - (item?.coordinates?.lat - mapCenter?.lat) * 1000}%`,
              }}
              onClick={() => {
                if (item?.isCluster) {
                  setZoomLevel(zoomLevel + 2);
                  setMapCenter(item?.coordinates);
                } else {
                  onFacilitySelect(item);
                }
              }}
            >
              {item?.isCluster ? (
                <div
                  className={`${getClusterSize(item?.count)} bg-primary text-white rounded-full flex items-center justify-center font-athletic-bold shadow-athletic hover:shadow-athletic-lg transition-athletic`}
                >
                  {item?.count}
                </div>
              ) : (
                <div className="relative">
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-athletic hover:shadow-athletic-lg transition-athletic ${
                      selectedFacility?.id === item?.id ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: markerColor }}
                  />
                  {selectedFacility?.id === item?.id && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-athletic p-2 shadow-athletic-lg whitespace-nowrap">
                      <div className="text-sm font-athletic-medium text-text-primary">
                        {item?.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        ${item?.priceRange?.min}-{item?.priceRange?.max}/hr
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* User Location Marker */}
      {userLocation && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${50 + (userLocation?.lng - mapCenter?.lng) * 1000}%`,
            top: `${50 - (userLocation?.lat - mapCenter?.lat) * 1000}%`,
          }}
        >
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-athletic pulse-availability">
            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;