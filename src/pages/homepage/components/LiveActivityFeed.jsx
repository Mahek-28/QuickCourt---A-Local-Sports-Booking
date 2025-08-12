import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockActivities = [
    {
      id: 1,
      type: 'booking',
      user: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      action: 'booked a tennis court',
      facility: 'Downtown Sports Complex',
      time: '2 minutes ago',
      icon: 'Calendar'
    },
    {
      id: 2,
      type: 'facility',
      user: 'Elite Fitness Center',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150',
      action: 'joined QuickCourt',
      facility: '5 courts available',
      time: '5 minutes ago',
      icon: 'Building'
    },
    {
      id: 3,
      type: 'community',
      user: 'Mike R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      action: 'organized a pickup game',
      facility: 'Riverside Basketball Court',
      time: '8 minutes ago',
      icon: 'Users'
    },
    {
      id: 4,
      type: 'achievement',
      user: 'Tennis Club Pro',
      avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150',
      action: 'reached 100 bookings',
      facility: 'Community milestone',
      time: '12 minutes ago',
      icon: 'Trophy'
    },
    {
      id: 5,
      type: 'booking',
      user: 'Alex K.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      action: 'booked a soccer field',
      facility: 'Westside Sports Park',
      time: '15 minutes ago',
      icon: 'Calendar'
    },
    {
      id: 6,
      type: 'community',
      user: 'Lisa T.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      action: 'joined badminton group',
      facility: 'Morning Players Club',
      time: '18 minutes ago',
      icon: 'Users'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockActivities?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (type) => {
    switch (type) {
      case 'booking': return 'text-primary';
      case 'facility': return 'text-secondary';
      case 'community': return 'text-accent';
      case 'achievement': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'booking': return 'bg-primary/10';
      case 'facility': return 'bg-secondary/10';
      case 'community': return 'bg-accent/10';
      case 'achievement': return 'bg-warning/10';
      default: return 'bg-muted';
    }
  };

  if (activities?.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-athletic-depth">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-success rounded-full pulse-availability"></div>
            <span className="text-success font-medium text-sm">Live Activity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Community in Action
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See what's happening right now in the QuickCourt community. Real bookings, new facilities, and growing connections.
          </p>
        </div>

        {/* Activity Feed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-athletic">
            <div className="space-y-6">
              {activities?.slice(currentIndex, currentIndex + 3)?.concat(
                activities?.slice(0, Math.max(0, (currentIndex + 3) - activities?.length))
              )?.map((activity, index) => (
                <div
                  key={`${activity?.id}-${index}`}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                    index === 0 ? 'bg-primary/5 scale-105' : 'hover:bg-muted/50'
                  }`}
                >
                  {/* User Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={activity?.avatar}
                      alt={activity?.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getActivityBg(activity?.type)} rounded-full flex items-center justify-center`}>
                      <Icon 
                        name={activity?.icon} 
                        size={12} 
                        className={getActivityColor(activity?.type)} 
                      />
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-text-primary">
                        {activity?.user}
                      </span>
                      <span className="text-text-secondary">
                        {activity?.action}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">
                        {activity?.facility}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {activity?.time}
                      </span>
                    </div>
                  </div>

                  {/* Activity Indicator */}
                  {index === 0 && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-success rounded-full pulse-availability"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">47</div>
                <div className="text-sm text-text-secondary">Bookings Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">12</div>
                <div className="text-sm text-text-secondary">New Facilities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">89</div>
                <div className="text-sm text-text-secondary">Active Games</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">156</div>
                <div className="text-sm text-text-secondary">New Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Join thousands of athletes already using QuickCourt
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
            ))}
            <span className="ml-2 text-text-secondary font-medium">
              4.9/5 from 2,847 reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;