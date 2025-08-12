import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ facility }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        level: "Advanced Player",
        verified: true
      },
      rating: 5,
      date: "2025-01-08",
      sport: "Tennis",
      title: "Excellent facilities and great atmosphere!",
      content: `Amazing courts with perfect lighting and well-maintained surfaces. The staff is incredibly helpful and the booking system is seamless. I've been playing here regularly for the past 3 months and it's become my go-to facility.`,
      images: [
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&h=200&fit=crop"
      ],
      helpful: 12,
      response: {
        author: "QuickCourt Management",
        date: "2025-01-09",
        content: "Thank you Sarah! We\'re thrilled to hear you\'re enjoying your regular sessions. Your feedback helps us maintain our high standards."
      }
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        level: "Intermediate Player",
        verified: true
      },
      rating: 4,
      date: "2025-01-05",
      sport: "Basketball",
      title: "Great courts, minor parking issues",
      content: `The basketball courts are in excellent condition with good lighting for evening games. The only downside is parking can be challenging during peak hours. Overall, highly recommend for serious players.`,
      images: [],
      helpful: 8,
      response: {
        author: "QuickCourt Management",
        date: "2025-01-06",
        content: "Thanks for the feedback Mike! We're working on expanding our parking capacity. In the meantime, we recommend using the overflow lot across the street."
      }
    },
    {
      id: 3,
      user: {
        name: "Emma Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        level: "Beginner Player",
        verified: false
      },
      rating: 5,
      date: "2025-01-03",
      sport: "Tennis",
      title: "Perfect for beginners like me!",
      content: `As someone new to tennis, I was nervous about playing at a 'serious' facility. But the staff here is so welcoming and helpful. They even gave me tips on my serve! The courts are immaculate.`,
      images: [
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=300&h=200&fit=crop"
      ],
      helpful: 15
    },
    {
      id: 4,
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        level: "Advanced Player",
        verified: true
      },
      rating: 4,
      date: "2024-12-28",
      sport: "Basketball",
      title: "Solid facility with room for improvement",
      content: `Good courts and equipment. The changing rooms could use some updates, but overall it's a reliable place to play. The online booking system works well and I appreciate the real-time availability.`,
      images: [],
      helpful: 6
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews', count: reviews?.length },
    { value: 'tennis', label: 'Tennis', count: reviews?.filter(r => r?.sport === 'Tennis')?.length },
    { value: 'basketball', label: 'Basketball', count: reviews?.filter(r => r?.sport === 'Basketball')?.length },
    { value: '5-star', label: '5 Stars', count: reviews?.filter(r => r?.rating === 5)?.length },
    { value: 'verified', label: 'Verified Only', count: reviews?.filter(r => r?.user?.verified)?.length }
  ];

  const filteredReviews = reviews?.filter(review => {
    switch (selectedFilter) {
      case 'tennis':
        return review?.sport === 'Tennis';
      case 'basketball':
        return review?.sport === 'Basketball';
      case '5-star':
        return review?.rating === 5;
      case 'verified':
        return review?.user?.verified;
      default:
        return true;
    }
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-athletic-bold text-text-primary mb-2">
              Reviews & Ratings
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(facility?.rating)}
                </div>
                <span className="text-lg font-athletic-bold text-text-primary">
                  {facility?.rating}
                </span>
              </div>
              <span className="text-text-secondary">
                Based on {facility?.reviewCount} reviews
              </span>
            </div>
          </div>
          
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
          >
            Write Review
          </Button>
        </div>

        {/* Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted rounded-athletic">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1]?.map(rating => {
              const count = reviews?.filter(r => r?.rating === rating)?.length;
              const percentage = (count / reviews?.length) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-athletic-medium text-text-primary w-8">
                    {rating}★
                  </span>
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div
                      className="bg-warning rounded-full h-2 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-text-secondary w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Cleanliness</span>
              <div className="flex items-center space-x-1">
                {renderStars(5)}
                <span className="text-sm font-athletic-medium text-text-primary ml-1">5.0</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Staff Service</span>
              <div className="flex items-center space-x-1">
                {renderStars(5)}
                <span className="text-sm font-athletic-medium text-text-primary ml-1">4.8</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Facilities</span>
              <div className="flex items-center space-x-1">
                {renderStars(5)}
                <span className="text-sm font-athletic-medium text-text-primary ml-1">4.9</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Value for Money</span>
              <div className="flex items-center space-x-1">
                {renderStars(4)}
                <span className="text-sm font-athletic-medium text-text-primary ml-1">4.6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map(option => (
            <button
              key={option?.value}
              onClick={() => setSelectedFilter(option?.value)}
              className={`px-4 py-2 rounded-athletic text-sm font-athletic-medium transition-athletic ${
                selectedFilter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {option?.label} ({option?.count})
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews?.map(review => (
            <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
              {/* Review Header */}
              <div className="flex items-start space-x-4 mb-4">
                <Image
                  src={review?.user?.avatar}
                  alt={review?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-athletic-bold text-text-primary">
                      {review?.user?.name}
                    </h4>
                    {review?.user?.verified && (
                      <div className="flex items-center space-x-1 bg-trust/10 text-trust px-2 py-0.5 rounded-athletic text-xs">
                        <Icon name="Shield" size={12} />
                        <span>Verified</span>
                      </div>
                    )}
                    <span className="text-sm text-text-secondary">
                      • {review?.user?.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {formatDate(review?.date)}
                    </span>
                    <span className="text-sm bg-muted text-text-secondary px-2 py-0.5 rounded-athletic">
                      {review?.sport}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="ml-16">
                <h5 className="font-athletic-bold text-text-primary mb-2">
                  {review?.title}
                </h5>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {review?.content}
                </p>

                {/* Review Images */}
                {review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review?.images?.map((image, index) => (
                      <div key={index} className="w-20 h-20 rounded-athletic overflow-hidden">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4 mb-4">
                  <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-athletic">
                    <Icon name="ThumbsUp" size={16} />
                    <span className="text-sm">Helpful ({review?.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-athletic">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-athletic">
                    <Icon name="Share" size={16} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>

                {/* Management Response */}
                {review?.response && (
                  <div className="bg-muted p-4 rounded-athletic">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Building" size={16} className="text-primary" />
                      <span className="font-athletic-medium text-text-primary">
                        {review?.response?.author}
                      </span>
                      <span className="text-sm text-text-secondary">
                        • {formatDate(review?.response?.date)}
                      </span>
                    </div>
                    <p className="text-text-secondary">
                      {review?.response?.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredReviews?.length > 3 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showAllReviews 
                ? 'Show Less Reviews' 
                : `Show All ${filteredReviews?.length} Reviews`
              }
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;