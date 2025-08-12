import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConflictResolutionModal = ({ isOpen, onClose, conflictDetails, alternativeSlots, onSelectAlternative }) => {
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [showAllAlternatives, setShowAllAlternatives] = useState(false);

  if (!isOpen) return null;

  const mockConflictData = {
    originalRequest: {
      date: "January 15, 2025",
      time: "2:00 PM - 3:00 PM",
      court: "Court A - Premium",
      facility: "Downtown Sports Complex"
    },
    reason: "slot_unavailable",
    message: "Your preferred time slot has been booked by another user.",
    alternatives: [
      {
        id: 1,
        date: "January 15, 2025",
        time: "1:00 PM - 2:00 PM",
        court: "Court A - Premium",
        price: 45,
        availability: "available",
        matchScore: 95,
        reason: "1 hour earlier, same court"
      },
      {
        id: 2,
        date: "January 15, 2025",
        time: "3:00 PM - 4:00 PM",
        court: "Court A - Premium",
        price: 45,
        availability: "available",
        matchScore: 95,
        reason: "1 hour later, same court"
      },
      {
        id: 3,
        date: "January 15, 2025",
        time: "2:00 PM - 3:00 PM",
        court: "Court B - Standard",
        price: 35,
        availability: "available",
        matchScore: 85,
        reason: "Same time, different court"
      },
      {
        id: 4,
        date: "January 16, 2025",
        time: "2:00 PM - 3:00 PM",
        court: "Court A - Premium",
        price: 45,
        availability: "available",
        matchScore: 80,
        reason: "Next day, same time and court"
      },
      {
        id: 5,
        date: "January 15, 2025",
        time: "4:00 PM - 5:00 PM",
        court: "Court C - Economy",
        price: 25,
        availability: "limited",
        matchScore: 70,
        reason: "2 hours later, budget option"
      }
    ]
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-destructive';
  };

  const getMatchScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 80) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const displayedAlternatives = showAllAlternatives 
    ? mockConflictData?.alternatives 
    : mockConflictData?.alternatives?.slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-athletic shadow-athletic-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-destructive/10 border-b border-destructive/20 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-athletic flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-athletic-bold text-text-primary">
                  Booking Conflict Detected
                </h2>
                <p className="text-text-secondary mt-1">
                  {mockConflictData?.message}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-athletic hover:bg-muted transition-athletic"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Original Request */}
        <div className="p-6 border-b border-border">
          <h3 className="font-athletic-bold text-text-primary mb-3">Your Original Request</h3>
          <div className="bg-muted/50 rounded-athletic p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Date & Time</p>
                <p className="font-athletic-medium text-text-primary">
                  {mockConflictData?.originalRequest?.date}
                </p>
                <p className="font-athletic-medium text-text-primary">
                  {mockConflictData?.originalRequest?.time}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Court & Facility</p>
                <p className="font-athletic-medium text-text-primary">
                  {mockConflictData?.originalRequest?.court}
                </p>
                <p className="text-text-secondary text-xs">
                  {mockConflictData?.originalRequest?.facility}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-athletic-bold text-text-primary">
              Recommended Alternatives
            </h3>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Zap" size={12} />
              <span>AI-powered suggestions</span>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {displayedAlternatives?.map(alternative => (
              <button
                key={alternative?.id}
                onClick={() => setSelectedAlternative(alternative)}
                className={`
                  w-full p-4 rounded-athletic border text-left transition-athletic
                  ${selectedAlternative?.id === alternative?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80 hover:bg-muted/50'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-athletic-bold
                      ${getMatchScoreBg(alternative?.matchScore)} ${getMatchScoreColor(alternative?.matchScore)}
                    `}>
                      {alternative?.matchScore}%
                    </div>
                    <div>
                      <p className="font-athletic-medium text-text-primary">
                        {alternative?.date} • {alternative?.time}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {alternative?.court}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-athletic-bold text-text-primary">
                      ${alternative?.price}
                    </p>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        alternative?.availability === 'available' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      <span className="text-xs text-text-secondary capitalize">
                        {alternative?.availability}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">
                  {alternative?.reason}
                </p>
              </button>
            ))}
          </div>

          {!showAllAlternatives && mockConflictData?.alternatives?.length > 3 && (
            <button
              onClick={() => setShowAllAlternatives(true)}
              className="w-full mt-3 p-2 text-sm text-primary hover:bg-primary/5 rounded-athletic transition-athletic"
            >
              Show {mockConflictData?.alternatives?.length - 3} more alternatives
            </button>
          )}
        </div>

        {/* Smart Suggestions */}
        <div className="px-6 pb-4">
          <div className="bg-gradient-athletic-depth rounded-athletic p-4">
            <h4 className="font-athletic-bold text-text-primary mb-2 flex items-center">
              <Icon name="Brain" size={16} className="mr-2" />
              Smart Suggestions
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} className="text-accent" />
                <span className="text-text-secondary">
                  Peak hours are 6-8 PM. Consider booking earlier for better availability.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-accent" />
                <span className="text-text-secondary">
                  Weekday mornings have 40% better availability and 20% lower prices.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              iconName="Search"
              iconPosition="left"
              onClick={onClose}
              className="flex-1"
            >
              Search Again
            </Button>
            <Button
              variant="outline"
              iconName="Bell"
              iconPosition="left"
              className="flex-1"
            >
              Notify When Available
            </Button>
            <Button
              variant="default"
              iconName="CheckCircle"
              iconPosition="left"
              onClick={() => selectedAlternative && onSelectAlternative(selectedAlternative)}
              disabled={!selectedAlternative}
              className="flex-1"
            >
              Book Alternative
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-text-secondary">
              We'll automatically check for your preferred slot and notify you if it becomes available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictResolutionModal;