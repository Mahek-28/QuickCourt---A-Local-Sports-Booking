import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'booking',
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      action: "booked a tennis court at",
      facility: "Elite Sports Complex",
      time: "2 hours ago",
      details: "Tomorrow at 10:00 AM",
      icon: "Calendar",
      color: "text-primary"
    },
    {
      id: 2,
      type: 'achievement',
      user: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      action: "earned the",
      achievement: "Court Master",
      badge: "🏆",
      time: "4 hours ago",
      details: "Completed 50 bookings",
      icon: "Award",
      color: "text-accent"
    },
    {
      id: 3,
      type: 'social',
      user: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      action: "joined your group",
      group: "Weekend Warriors",
      time: "6 hours ago",
      details: "Basketball enthusiasts",
      icon: "Users",
      color: "text-secondary"
    },
    {
      id: 4,
      type: 'review',
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      action: "rated",
      facility: "Riverside Badminton Club",
      rating: 5,
      time: "8 hours ago",
      details: "Excellent facilities and service!",
      icon: "Star",
      color: "text-warning"
    },
    {
      id: 5,
      type: 'challenge',
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
      },
      action: "completed the",
      challenge: "Weekly Warrior",
      time: "12 hours ago",
      details: "Played 5 games this week",
      icon: "Target",
      color: "text-success"
    },
    {
      id: 6,
      type: 'tournament',
      user: {
        name: "Lisa Zhang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      action: "registered for",
      tournament: "Summer Tennis Championship",
      time: "1 day ago",
      details: "Starts August 20th",
      icon: "Trophy",
      color: "text-trust"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'booking', label: 'Bookings', icon: 'Calendar' },
    { value: 'social', label: 'Social', icon: 'Users' },
    { value: 'achievement', label: 'Achievements', icon: 'Award' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const renderActivityContent = (activity) => {
    switch (activity?.type) {
      case 'booking':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium text-primary">{activity?.facility}</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">{activity?.details}</p>
          </div>
        );
      
      case 'achievement':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium text-accent">{activity?.achievement}</span>
              <span className="ml-1">{activity?.badge}</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">{activity?.details}</p>
          </div>
        );
      
      case 'social':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium text-secondary">{activity?.group}</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">{activity?.details}</p>
          </div>
        );
      
      case 'review':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium">{activity?.facility}</span>
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                {[...Array(activity?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                ))}
              </div>
              <p className="text-xs text-text-secondary">{activity?.details}</p>
            </div>
          </div>
        );
      
      case 'challenge':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium text-success">{activity?.challenge}</span>
              <span className="text-text-secondary"> challenge</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">{activity?.details}</p>
          </div>
        );
      
      case 'tournament':
        return (
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              <span className="font-athletic-medium">{activity?.user?.name}</span>
              <span className="text-text-secondary"> {activity?.action} </span>
              <span className="font-athletic-medium text-trust">{activity?.tournament}</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">{activity?.details}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-athletic flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Community Activity</h2>
              <p className="text-sm text-text-secondary">Stay connected with your sports community</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-muted rounded-athletic p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-athletic-medium transition-athletic ${
                filter === option?.value
                  ? 'bg-card text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-athletic hover:bg-surface transition-athletic">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>

              {/* Activity Content */}
              {renderActivityContent(activity)}

              {/* Activity Icon and Time */}
              <div className="flex-shrink-0 flex flex-col items-end space-y-1">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                  <Icon name={activity?.icon} size={16} />
                </div>
                <span className="text-xs text-text-secondary">{activity?.time}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities?.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-athletic-bold text-text-primary mb-2">No activity yet</h3>
            <p className="text-text-secondary mb-4">Start playing and connecting with the community!</p>
            <Link to="/facility-discovery">
              <Button variant="default" iconName="Search" iconPosition="left">
                Find Courts
              </Button>
            </Link>
          </div>
        )}

        {/* Load More */}
        {filteredActivities?.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="ghost" iconName="ChevronDown" iconPosition="right">
              Load More Activity
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;