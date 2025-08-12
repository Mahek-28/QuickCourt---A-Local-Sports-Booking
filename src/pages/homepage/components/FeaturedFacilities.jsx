import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedFacilities = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const facilities = [
    {
      id: 1,
      name: 'Elite Sports Complex',
      location: 'Downtown District',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      rating: 4.9,
      reviews: 234,
      sports: ['Tennis', 'Basketball', 'Squash'],
      price: '$25/hour',
      availability: 'Available Now',
      features: ['Premium Courts', 'Parking', 'Locker Rooms', 'Pro Shop'],
      distance: '0.8 km away'
    },
    {
      id: 2,
      name: 'Riverside Tennis Club',
      location: 'Riverside Park',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
      rating: 4.8,
      reviews: 189,
      sports: ['Tennis', 'Padel'],
      price: '$30/hour',
      availability: '3 courts available',
      features: ['Clay Courts', 'Coaching', 'Restaurant', 'Events'],
      distance: '1.2 km away'
    },
    {
      id: 3,
      name: 'Urban Basketball Arena',
      location: 'City Center',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      rating: 4.7,
      reviews: 156,
      sports: ['Basketball', 'Volleyball'],
      price: '$20/hour',
      availability: 'Available Now',
      features: ['Indoor Courts', 'Sound System', 'Scoreboard', 'Seating'],
      distance: '2.1 km away'
    },
    {
      id: 4,
      name: 'Premier Soccer Fields',
      location: 'Sports District',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      rating: 4.9,
      reviews: 298,
      sports: ['Soccer', 'Football'],
      price: '$40/hour',
      availability: '2 fields available',
      features: ['Artificial Turf', 'Floodlights', 'Changing Rooms', 'Parking'],
      distance: '3.5 km away'
    },
    {
      id: 5,
      name: 'Fitness & Racquet Club',
      location: 'Westside',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      rating: 4.6,
      reviews: 167,
      sports: ['Badminton', 'Squash', 'Table Tennis'],
      price: '$18/hour',
      availability: 'Available Now',
      features: ['Air Conditioning', 'Equipment Rental', 'Cafe', 'WiFi'],
      distance: '1.8 km away'
    },
    {
      id: 6,
      name: 'Aquatic Sports Center',
      location: 'Marina District',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      rating: 4.8,
      reviews: 203,
      sports: ['Swimming', 'Water Polo'],
      price: '$15/hour',
      availability: '4 lanes available',
      features: ['Olympic Pool', 'Heated Water', 'Diving Board', 'Sauna'],
      distance: '4.2 km away'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(facilities?.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(facilities?.length / 3)) % Math.ceil(facilities?.length / 3));
  };

  const handleBookNow = (facility) => {
    navigate('/booking-engine', { state: { facility } });
  };

  const handleViewDetails = (facility) => {
    navigate('/facility-profile', { state: { facility } });
  };

  const visibleFacilities = facilities?.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Featured Facilities
            </h2>
            <p className="text-xl text-text-secondary">
              Premium venues with the highest ratings and best availability
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronLeft"
              onClick={prevSlide}
              className="w-12 h-12"
            />
            <Button
              variant="outline"
              size="icon"
              iconName="ChevronRight"
              onClick={nextSlide}
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleFacilities?.map((facility) => (
            <div
              key={facility?.id}
              className="group bg-background rounded-2xl overflow-hidden shadow-athletic hover:shadow-athletic-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={facility?.image}
                  alt={facility?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {facility?.availability}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-text-primary">
                    {facility?.distance}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {facility?.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Icon name="MapPin" size={16} />
                      <span className="text-sm">{facility?.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {facility?.price}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(facility?.rating) ? 'text-warning fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {facility?.rating}
                  </span>
                  <span className="text-sm text-text-secondary">
                    ({facility?.reviews} reviews)
                  </span>
                </div>

                {/* Sports */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {facility?.sports?.map((sport) => (
                    <span
                      key={sport}
                      className="bg-muted text-text-secondary px-3 py-1 rounded-full text-sm"
                    >
                      {sport}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {facility?.features?.slice(0, 4)?.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => handleBookNow(facility)}
                    className="ripple-effect"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewDetails(facility)}
                    className="px-4"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            iconName="ChevronLeft"
            onClick={prevSlide}
            className="w-12 h-12"
          />
          <div className="flex space-x-2">
            {[...Array(Math.ceil(facilities?.length / 3))]?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            iconName="ChevronRight"
            onClick={nextSlide}
            className="w-12 h-12"
          />
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/facility-discovery')}
          >
            View All Facilities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;