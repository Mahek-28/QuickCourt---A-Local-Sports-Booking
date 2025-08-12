import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import RevenueChart from './components/RevenueChart';
import BookingCalendar from './components/BookingCalendar';
import CustomerInsights from './components/CustomerInsights';
import FacilityManagement from './components/FacilityManagement';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const FacilityOwnerPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data for metrics
  const metricsData = [
    {
      title: 'Total Bookings',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      title: 'Monthly Revenue',
      value: '$18,450',
      change: '+8%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'warning'
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      color: 'primary'
    }
  ];

  // Mock data for revenue chart
  const revenueData = [
    { name: 'Jan', value: 15200 },
    { name: 'Feb', value: 16800 },
    { name: 'Mar', value: 14500 },
    { name: 'Apr', value: 18200 },
    { name: 'May', value: 19800 },
    { name: 'Jun', value: 17600 },
    { name: 'Jul', value: 21400 },
    { name: 'Aug', value: 20100 },
    { name: 'Sep', value: 18900 },
    { name: 'Oct', value: 22300 },
    { name: 'Nov', value: 19700 },
    { name: 'Dec', value: 18450 }
  ];

  const weeklyData = [
    { name: 'Mon', value: 2800 },
    { name: 'Tue', value: 3200 },
    { name: 'Wed', value: 2900 },
    { name: 'Thu', value: 3800 },
    { name: 'Fri', value: 4200 },
    { name: 'Sat', value: 5100 },
    { name: 'Sun', value: 4600 }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'customers', label: 'Customers', icon: 'Users' },
    { id: 'facility', label: 'Facility', icon: 'Building' },
    { id: 'reports', label: 'Reports', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard 
                  key={index} 
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>
            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <RevenueChart
                type="bar"
                data={revenueData}
                title="Monthly Revenue Trend"
                height={300}
              />
              <RevenueChart
                type="line"
                data={weeklyData}
                title="Weekly Performance"
                height={300}
              />
            </div>
            {/* Activity and Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <RecentActivity />
              <QuickActions />
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-athletic-bold text-text-primary">Calendar Management</h2>
              <Button variant="default" iconName="Plus" iconPosition="left">
                Block Time Slot
              </Button>
            </div>
            <BookingCalendar />
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-athletic-bold text-text-primary">Customer Analytics</h2>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Export Data
              </Button>
            </div>
            <CustomerInsights />
          </div>
        );

      case 'facility':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-athletic-bold text-text-primary">Facility Management</h2>
              <Button variant="default" iconName="Save" iconPosition="left">
                Save Changes
              </Button>
            </div>
            <FacilityManagement />
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-athletic-bold text-text-primary">Analytics & Reports</h2>
              <Button variant="default" iconName="Download" iconPosition="left">
                Generate Report
              </Button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
                <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Revenue Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Total Revenue (YTD)</span>
                    <span className="font-athletic-bold text-text-primary">$221,750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average per Booking</span>
                    <span className="font-athletic-bold text-text-primary">$42.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Peak Hour Revenue</span>
                    <span className="font-athletic-bold text-text-primary">$89,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Growth Rate</span>
                    <span className="font-athletic-bold text-success">+15.3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
                <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Booking Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Total Bookings</span>
                    <span className="font-athletic-bold text-text-primary">5,218</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Cancellation Rate</span>
                    <span className="font-athletic-bold text-text-primary">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">No-Show Rate</span>
                    <span className="font-athletic-bold text-text-primary">1.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Repeat Customers</span>
                    <span className="font-athletic-bold text-success">68%</span>
                  </div>
                </div>
              </div>
            </div>

            <RevenueChart
              type="bar"
              data={revenueData}
              title="Annual Revenue Overview"
              height={400}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-athletic-bold text-text-primary">Account Settings</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
                <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-athletic-medium text-text-primary">New Bookings</p>
                      <p className="text-sm text-text-secondary">Get notified when customers make new bookings</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-athletic-medium text-text-primary">Cancellations</p>
                      <p className="text-sm text-text-secondary">Get notified about booking cancellations</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-athletic-medium text-text-primary">Reviews</p>
                      <p className="text-sm text-text-secondary">Get notified about new customer reviews</p>
                    </div>
                    <div className="w-12 h-6 bg-muted rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
                <h3 className="text-lg font-athletic-bold text-text-primary mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-athletic-medium text-text-primary mb-1">Business Name</label>
                    <input
                      type="text"
                      defaultValue="Elite Sports Complex"
                      className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-athletic-medium text-text-primary mb-1">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="owner@elitesports.com"
                      className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-athletic-medium text-text-primary mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-border rounded-athletic focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 lg:pt-28">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block w-64 bg-card border-r border-border min-h-screen">
            <div className="p-6">
              <div className="mb-8">
                <h1 className="text-xl font-athletic-bold text-text-primary mb-2">Owner Portal</h1>
                <p className="text-sm text-text-secondary">Elite Sports Complex</p>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-athletic text-left transition-athletic ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground shadow-athletic'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      strokeWidth={activeSection === item.id ? 2.5 : 2} 
                    />
                    <span className="font-athletic-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Support Section */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="bg-surface/50 rounded-athletic p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    <span className="font-athletic-medium text-text-primary">Need Help?</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Get support from our facility management experts
                  </p>
                  <Button variant="outline" size="sm" fullWidth iconName="MessageSquare" iconPosition="left">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Mobile Navigation */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-athletic whitespace-nowrap transition-athletic ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-text-secondary hover:text-text-primary border border-border'
                    }`}
                  >
                    <Icon name={item.icon} size={16} strokeWidth={2} />
                    <span className="text-sm font-athletic-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Content */}
            {renderContent()}
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-athletic transition-athletic ${
                activeSection === item.id
                  ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={item.icon} size={20} strokeWidth={2} />
              <span className="text-xs font-athletic-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityOwnerPortal;