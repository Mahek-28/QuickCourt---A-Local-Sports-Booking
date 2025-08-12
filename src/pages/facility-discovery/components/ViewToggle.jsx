import React from 'react';
import Icon from '../../../components/AppIcon';

const ViewToggle = ({ currentView, onViewChange, resultCount }) => {
  const viewOptions = [
    { id: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { id: 'list', icon: 'List', label: 'List View' },
    { id: 'map', icon: 'Map', label: 'Map View' }
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-text-secondary">
          {resultCount} facilities found
        </span>
      </div>
      <div className="flex items-center space-x-1 bg-muted rounded-athletic p-1">
        {viewOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={() => onViewChange(option?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-athletic transition-athletic ${
              currentView === option?.id
                ? 'bg-card text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-card/50'
            }`}
            title={option?.label}
          >
            <Icon 
              name={option?.icon} 
              size={16} 
              strokeWidth={currentView === option?.id ? 2.5 : 2} 
            />
            <span className="text-sm font-athletic-medium hidden sm:inline">
              {option?.label?.split(' ')?.[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewToggle;