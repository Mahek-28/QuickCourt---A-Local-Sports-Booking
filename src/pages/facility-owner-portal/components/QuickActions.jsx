import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Block Time Slot',
      description: 'Reserve courts for maintenance or events',
      icon: 'Calendar',
      color: 'primary',
      action: 'block-time'
    },
    {
      id: 2,
      title: 'Update Pricing',
      description: 'Adjust hourly rates and special offers',
      icon: 'DollarSign',
      color: 'success',
      action: 'update-pricing'
    },
    {
      id: 3,
      title: 'Send Announcement',
      description: 'Notify customers about updates or events',
      icon: 'Megaphone',
      color: 'warning',
      action: 'send-announcement'
    },
    {
      id: 4,
      title: 'Generate Report',
      description: 'Create detailed analytics reports',
      icon: 'FileText',
      color: 'secondary',
      action: 'generate-report'
    },
    {
      id: 5,
      title: 'Manage Staff',
      description: 'Add or update staff member access',
      icon: 'Users',
      color: 'primary',
      action: 'manage-staff'
    },
    {
      id: 6,
      title: 'Emergency Contact',
      description: 'Quick access to support and emergency services',
      icon: 'Phone',
      color: 'error',
      action: 'emergency-contact'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20 hover:bg-error/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Executing quick action: ${action}`);
    // Handle different quick actions
    switch (action) {
      case 'block-time':
        // Open time blocking modal
        break;
      case 'update-pricing':
        // Navigate to pricing section
        break;
      case 'send-announcement':
        // Open announcement composer
        break;
      case 'generate-report':
        // Open report generator
        break;
      case 'manage-staff':
        // Navigate to staff management
        break;
      case 'emergency-contact':
        // Show emergency contact options
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-athletic-bold text-text-primary">Quick Actions</h3>
        <Button variant="ghost" size="sm" iconName="Settings" className="w-8 h-8 p-0" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleQuickAction(action?.action)}
            className={`flex items-start space-x-4 p-4 rounded-athletic border transition-athletic text-left w-full ${getColorClasses(action?.color)}`}
          >
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={20} strokeWidth={2} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-athletic-medium mb-1">
                {action?.title}
              </h4>
              <p className="text-xs opacity-80 leading-relaxed">
                {action?.description}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Icon name="ChevronRight" size={16} strokeWidth={2} className="opacity-60" />
            </div>
          </button>
        ))}
      </div>
      {/* Emergency Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-error/5 border border-error/20 rounded-athletic p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-error" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-athletic-medium text-error mb-1">Emergency Support</h4>
              <p className="text-xs text-error/80">24/7 support for urgent facility issues</p>
            </div>
            <Button variant="outline" size="sm" className="border-error text-error hover:bg-error hover:text-error-foreground">
              Contact
            </Button>
          </div>
        </div>
      </div>
      {/* Recent Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-athletic-medium text-text-primary mb-3">Recent Actions</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">Blocked Court 2 for maintenance</span>
            </div>
            <span className="text-xs text-text-secondary">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">Updated weekend pricing</span>
            </div>
            <span className="text-xs text-text-secondary">1 day ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Megaphone" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">Sent holiday hours announcement</span>
            </div>
            <span className="text-xs text-text-secondary">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;