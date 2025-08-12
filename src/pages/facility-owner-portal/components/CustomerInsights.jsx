import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CustomerInsights = () => {
  const demographicData = [
    { name: 'Ages 18-25', value: 25, color: '#2563EB' },
    { name: 'Ages 26-35', value: 35, color: '#10B981' },
    { name: 'Ages 36-45', value: 28, color: '#F59E0B' },
    { name: 'Ages 46+', value: 12, color: '#DC2626' }
  ];

  const bookingPatterns = [
    { time: 'Morning (6-12)', bookings: 45, percentage: 25 },
    { time: 'Afternoon (12-18)', bookings: 72, percentage: 40 },
    { time: 'Evening (18-24)', bookings: 63, percentage: 35 }
  ];

  const customerStats = [
    { label: 'Total Customers', value: '1,247', icon: 'Users', change: '+12%' },
    { label: 'Repeat Customers', value: '68%', icon: 'Repeat', change: '+5%' },
    { label: 'Avg. Rating', value: '4.8', icon: 'Star', change: '+0.2' },
    { label: 'Response Rate', value: '94%', icon: 'MessageSquare', change: '+3%' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-athletic p-3 shadow-athletic">
          <p className="text-sm font-athletic-medium text-text-primary">
            {payload?.[0]?.name}: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
      <h3 className="text-lg font-athletic-bold text-text-primary mb-6">Customer Insights</h3>
      {/* Customer Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {customerStats?.map((stat, index) => (
          <div key={index} className="bg-surface/50 rounded-athletic p-4 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <Icon name={stat?.icon} size={20} className="text-primary" strokeWidth={2} />
              <span className="text-xs text-success font-athletic-medium">{stat?.change}</span>
            </div>
            <div className="text-xl font-athletic-bold text-text-primary mb-1">{stat?.value}</div>
            <div className="text-sm text-text-secondary">{stat?.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Demographics Chart */}
        <div>
          <h4 className="text-md font-athletic-bold text-text-primary mb-4">Age Demographics</h4>
          <div className="h-64" aria-label="Customer Age Demographics Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {demographicData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {demographicData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Patterns */}
        <div>
          <h4 className="text-md font-athletic-bold text-text-primary mb-4">Peak Booking Times</h4>
          <div className="space-y-4">
            {bookingPatterns?.map((pattern, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-athletic-medium text-text-primary">{pattern?.time}</span>
                  <span className="text-sm text-text-secondary">{pattern?.bookings} bookings</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pattern?.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-text-secondary text-right">{pattern?.percentage}%</div>
              </div>
            ))}
          </div>

          {/* Recent Reviews */}
          <div className="mt-6 pt-6 border-t border-border">
            <h5 className="text-sm font-athletic-bold text-text-primary mb-3">Recent Reviews</h5>
            <div className="space-y-3">
              <div className="bg-surface/30 rounded-athletic p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-warning">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">Sarah M.</span>
                </div>
                <p className="text-xs text-text-secondary">"Excellent facilities and great customer service!"</p>
              </div>
              <div className="bg-surface/30 rounded-athletic p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-warning">
                    {[...Array(4)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="fill-current" />
                    ))}
                    <Icon name="Star" size={12} className="text-muted" />
                  </div>
                  <span className="text-xs text-text-secondary">Mike R.</span>
                </div>
                <p className="text-xs text-text-secondary">"Good courts, could use better lighting in evening hours."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;