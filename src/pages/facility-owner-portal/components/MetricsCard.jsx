import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getChangeColor = () => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic transition-athletic hover:shadow-athletic-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-athletic flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} strokeWidth={2} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              strokeWidth={2} 
            />
            <span className="text-sm font-athletic-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-athletic-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary font-athletic-medium">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;