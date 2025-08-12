import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacilityHero = ({ facility }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === facility?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? facility?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative bg-card">
      {/* Main Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-b-athletic">
        <Image
          src={facility?.images?.[currentImageIndex]}
          alt={`${facility?.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation Overlay */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevImage}
            className="w-12 h-12 bg-black/50 backdrop-blur-athletic rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-athletic"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={nextImage}
            className="w-12 h-12 bg-black/50 backdrop-blur-athletic rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-athletic"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-athletic rounded-athletic px-3 py-1">
          <span className="text-white text-sm font-athletic-medium">
            {currentImageIndex + 1} / {facility?.images?.length}
          </span>
        </div>

        {/* Virtual Tour Button */}
        <div className="absolute bottom-4 right-4">
          <Button
            variant="secondary"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => setShowVirtualTour(true)}
            className="bg-white/90 backdrop-blur-athletic hover:bg-white"
          >
            360° Tour
          </Button>
        </div>

        {/* Facility Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-athletic text-sm font-athletic-medium ${
            facility?.isOpen 
              ? 'bg-success text-success-foreground' 
              : 'bg-error text-error-foreground'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                facility?.isOpen ? 'bg-white pulse-availability' : 'bg-white'
              }`}></div>
              <span>{facility?.isOpen ? 'Open Now' : 'Closed'}</span>
            </div>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-trust text-trust-foreground px-3 py-1 rounded-athletic text-sm font-athletic-medium flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>Verified</span>
          </div>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      <div className="px-6 py-4 bg-muted">
        <div className="flex space-x-2 overflow-x-auto">
          {facility?.images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-athletic overflow-hidden border-2 transition-athletic ${
                index === currentImageIndex 
                  ? 'border-primary' :'border-transparent hover:border-border'
              }`}
            >
              <Image
                src={image}
                alt={`${facility?.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-full max-h-[600px] bg-card rounded-athletic overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={() => setShowVirtualTour(false)}
                className="bg-black/50 text-white hover:bg-black/70"
              />
            </div>
            
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center space-y-4">
                <Icon name="Eye" size={48} className="text-text-secondary mx-auto" />
                <h3 className="text-xl font-athletic-bold text-text-primary">
                  360° Virtual Tour
                </h3>
                <p className="text-text-secondary">
                  Interactive virtual tour would be embedded here
                </p>
                <Button
                  variant="primary"
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityHero;