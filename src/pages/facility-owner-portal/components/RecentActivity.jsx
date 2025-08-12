import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: 'Court 2 booked by Sarah Johnson for Jan 15, 2025 at 7:00 PM',
      time: '2 minutes ago',
      icon: 'Calendar',
      color: 'success',
      amount: '$45'
    },
    {
      id: 2,
      type: 'review',
      title: 'New Review Received',
      description: 'Mike Rodriguez left a 5-star review: "Excellent facilities and great service!"',
      time: '15 minutes ago',
      icon: 'Star',
      color: 'warning',
      rating: 5
    },
    {
      id: 3,
      type: 'cancellation',
      title: 'Booking Cancelled',
      description: 'Court 1 booking cancelled by Alex Chen for Jan 14, 2025',
      time: '1 hour ago',
      icon: 'X',
      color: 'error',
      amount: '-$30'
    },
    {
      id: 4,
      type: 'message',
      title: 'Customer Message',
      description: 'Emma Wilson asked about equipment rental availability',
      time: '2 hours ago',
      icon: 'MessageSquare',
      color: 'primary',
      unread: true
    },
    {
      id: 5,
      type: 'booking',
      title: 'Recurring Booking Created',
      description: 'Tennis Club booked Court 3 for weekly sessions (8 weeks)',
      time: '3 hours ago',
      icon: 'Repeat',
      color: 'success',
      amount: '$360'
    },
    {
      id: 6,
      type: 'maintenance',
      title: 'Maintenance Scheduled',
      description: 'Court 2 lighting system maintenance scheduled for Jan 16, 2025',
      time: '4 hours ago',
      icon: 'Tool',
      color: 'secondary'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'secondary':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-athletic-bold text-text-primary">Recent Activity</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" className="w-8 h-8 p-0" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div
            key={activity?.id}
            className={`flex items-start space-x-4 p-4 rounded-athletic transition-athletic hover:bg-surface/50 ${
              activity?.unread ? 'bg-primary/5 border border-primary/20' : 'border border-transparent'
            }`}
          >
            {/* Activity Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(activity?.color)}`}>
              <Icon name={activity?.icon} size={18} strokeWidth={2} />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-athletic-medium text-text-primary mb-1">
                    {activity?.title}
                    {activity?.unread && (
                      <span className="inline-block w-2 h-2 bg-primary rounded-full ml-2"></span>
                    )}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {activity?.description}
                  </p>
                  
                  {/* Special content for different activity types */}
                  {activity?.rating && (
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < activity?.rating ? 'text-warning fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Amount or Action */}
                <div className="flex flex-col items-end space-y-1 ml-4">
                  {activity?.amount && (
                    <span className={`text-sm font-athletic-medium ${
                      activity?.amount?.startsWith('-') ? 'text-error' : 'text-success'
                    }`}>
                      {activity?.amount}
                    </span>
                  )}
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    {formatTime(activity?.time)}
                  </span>
                </div>
              </div>

              {/* Action buttons for specific activity types */}
              {activity?.type === 'message' && (
                <div className="mt-3">
                  <Button variant="outline" size="sm" iconName="Reply" iconPosition="left">
                    Reply
                  </Button>
                </div>
              )}

              {activity?.type === 'review' && (
                <div className="mt-3">
                  <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                    Respond
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;