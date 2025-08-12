import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Book a Court",
      description: "Find and reserve your next game",
      icon: "Calendar",
      color: "bg-primary text-primary-foreground",
      hoverColor: "hover:bg-primary/90",
      route: "/booking-engine",
      popular: true
    },
    {
      id: 2,
      title: "Find Players",
      description: "Connect with compatible partners",
      icon: "Users",
      color: "bg-secondary text-secondary-foreground",
      hoverColor: "hover:bg-secondary/90",
      route: "/community-dashboard",
      popular: false
    },
    {
      id: 3,
      title: "Discover Courts",
      description: "Explore facilities near you",
      icon: "Search",
      color: "bg-trust text-trust-foreground",
      hoverColor: "hover:bg-trust/90",
      route: "/facility-discovery",
      popular: true
    },
    {
      id: 4,
      title: "Join Tournament",
      description: "Compete in local competitions",
      icon: "Trophy",
      color: "bg-accent text-accent-foreground",
      hoverColor: "hover:bg-accent/90",
      route: "/community-dashboard",
      popular: false
    },
    {
      id: 5,
      title: "My Bookings",
      description: "Manage your reservations",
      icon: "Clock",
      color: "bg-surface text-text-primary border border-border",
      hoverColor: "hover:bg-muted",
      route: "/community-dashboard",
      popular: false
    },
    {
      id: 6,
      title: "Invite Friends",
      description: "Share QuickCourt with others",
      icon: "UserPlus",
      color: "bg-surface text-text-primary border border-border",
      hoverColor: "hover:bg-muted",
      route: "/community-dashboard",
      popular: false
    }
  ];

  const recentActions = [
    {
      id: 1,
      title: "Elite Sports Complex",
      subtitle: "Tennis Court A",
      time: "Tomorrow, 10:00 AM",
      icon: "Calendar",
      action: "Rebook",
      route: "/booking-engine"
    },
    {
      id: 2,
      title: "Sarah Chen",
      subtitle: "Tennis Partner",
      time: "Last played 2 days ago",
      icon: "Users",
      action: "Message",
      route: "/community-dashboard"
    },
    {
      id: 3,
      title: "Downtown Basketball Arena",
      subtitle: "Favorited facility",
      time: "Available now",
      icon: "Heart",
      action: "Book",
      route: "/facility-discovery"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card rounded-athletic shadow-athletic border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-athletic flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Quick Actions</h2>
              <p className="text-sm text-text-secondary">Get started with common tasks</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions?.map((action) => (
              <Link key={action?.id} to={action?.route}>
                <div className={`relative p-4 rounded-athletic transition-athletic cursor-pointer ${action?.color} ${action?.hoverColor} group`}>
                  {action?.popular && (
                    <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full font-athletic-medium">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon name={action?.icon} size={24} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-athletic-bold mb-1 group-hover:scale-105 transition-transform">
                        {action?.title}
                      </h3>
                      <p className="text-sm opacity-90">{action?.description}</p>
                    </div>
                    <Icon name="ArrowRight" size={16} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Actions */}
      <div className="bg-card rounded-athletic shadow-athletic border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-athletic flex items-center justify-center">
                <Icon name="History" size={20} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-athletic-bold text-text-primary">Recent & Favorites</h2>
                <p className="text-sm text-text-secondary">Quick access to your frequent actions</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="MoreHorizontal">
              More
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {recentActions?.map((item) => (
              <div key={item?.id} className="flex items-center justify-between p-3 rounded-athletic hover:bg-surface transition-athletic group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-athletic flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon name={item?.icon} size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-athletic-medium text-text-primary">{item?.title}</h3>
                    <p className="text-sm text-text-secondary">{item?.subtitle}</p>
                    <p className="text-xs text-text-secondary opacity-75">{item?.time}</p>
                  </div>
                </div>
                <Link to={item?.route}>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {item?.action}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="bg-card rounded-athletic shadow-athletic border border-border">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-athletic flex items-center justify-center">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-athletic-bold text-text-primary">Need Help?</h3>
                <p className="text-sm text-text-secondary">Quick support and emergency actions</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Phone">
                Support
              </Button>
              <Button variant="destructive" size="sm" iconName="X">
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;