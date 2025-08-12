import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingBookings = () => {
  const upcomingBookings = [
    {
      id: 1,
      facilityName: "Elite Sports Complex",
      courtType: "Tennis Court A",
      date: "2025-08-12",
      time: "10:00 AM - 11:30 AM",
      duration: "1.5 hours",
      players: [
        { id: 1, name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { id: 2, name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
        { id: 3, name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
      ],
      weather: { temp: "75°F", condition: "Sunny", icon: "Sun" },
      status: "confirmed",
      facilityImage: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 2,
      facilityName: "Downtown Basketball Arena",
      courtType: "Court 3",
      date: "2025-08-13",
      time: "7:00 PM - 8:30 PM",
      duration: "1.5 hours",
      players: [
        { id: 1, name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { id: 4, name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" }
      ],
      weather: { temp: "68°F", condition: "Partly Cloudy", icon: "Cloud" },
      status: "pending",
      facilityImage: "https://images.pixabay.com/photo/2016/11/29/12/30/basketball-1869573_960_720.jpg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 3,
      facilityName: "Riverside Badminton Club",
      courtType: "Court 2",
      date: "2025-08-14",
      time: "6:30 PM - 8:00 PM",
      duration: "1.5 hours",
      players: [
        { id: 1, name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        { id: 5, name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
        { id: 6, name: "David Park", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" },
        { id: 7, name: "Lisa Zhang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" }
      ],
      weather: { temp: "72°F", condition: "Clear", icon: "Sun" },
      status: "confirmed",
      facilityImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    if (date?.toDateString() === today?.toDateString()) return 'Today';
    if (date?.toDateString() === tomorrow?.toDateString()) return 'Tomorrow';
    return date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-athletic flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Upcoming Bookings</h2>
              <p className="text-sm text-text-secondary">Your next games and activities</p>
            </div>
          </div>
          <Link to="/booking-engine">
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              New Booking
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {upcomingBookings?.map((booking) => (
          <div key={booking?.id} className="bg-surface rounded-athletic p-4 border border-border/50 hover:border-primary/30 transition-athletic">
            <div className="flex items-start space-x-4">
              {/* Facility Image */}
              <div className="flex-shrink-0 w-16 h-16 rounded-athletic overflow-hidden">
                <Image 
                  src={booking?.facilityImage} 
                  alt={booking?.facilityName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-athletic-bold text-text-primary truncate">{booking?.facilityName}</h3>
                    <p className="text-sm text-text-secondary">{booking?.courtType}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getStatusColor(booking?.status)}`}>
                    {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-text-secondary" />
                    <span className="text-sm font-athletic-medium text-text-primary">
                      {formatDate(booking?.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{booking?.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={booking?.weather?.icon} size={16} className="text-accent" />
                    <span className="text-sm text-text-secondary">{booking?.weather?.temp}</span>
                  </div>
                </div>

                {/* Players */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {booking?.players?.slice(0, 4)?.map((player, index) => (
                        <div key={player?.id} className="relative">
                          <Image
                            src={player?.avatar}
                            alt={player?.name}
                            className="w-8 h-8 rounded-full border-2 border-card object-cover"
                          />
                        </div>
                      ))}
                      {booking?.players?.length > 4 && (
                        <div className="w-8 h-8 bg-muted rounded-full border-2 border-card flex items-center justify-center">
                          <span className="text-xs font-athletic-medium text-text-secondary">
                            +{booking?.players?.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-text-secondary ml-2">
                      {booking?.players?.length} player{booking?.players?.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="MessageCircle">
                      Chat
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                      Options
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {upcomingBookings?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-athletic-bold text-text-primary mb-2">No upcoming bookings</h3>
            <p className="text-text-secondary mb-4">Ready to get back on the court?</p>
            <Link to="/facility-discovery">
              <Button variant="default" iconName="Search" iconPosition="left">
                Find Courts
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingBookings;