import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlayerMatching = () => {
  const [selectedSport, setSelectedSport] = useState('all');

  const suggestedPlayers = [
    {
      id: 1,
      name: "Jessica Martinez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      sports: ["Tennis", "Badminton"],
      skillLevel: "Intermediate",
      location: "2.3 miles away",
      compatibility: 95,
      commonFriends: 3,
      lastActive: "2 hours ago",
      preferredTimes: ["Morning", "Evening"],
      bio: "Love playing tennis on weekends! Looking for consistent partners.",
      achievements: ["Court Regular", "Team Player"],
      rating: 4.8,
      gamesPlayed: 47
    },
    {
      id: 2,
      name: "Ryan Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      sports: ["Basketball", "Tennis"],
      skillLevel: "Advanced",
      location: "1.8 miles away",
      compatibility: 88,
      commonFriends: 1,
      lastActive: "1 hour ago",
      preferredTimes: ["Evening", "Weekend"],
      bio: "Competitive player seeking regular matches and tournaments.",
      achievements: ["Tournament Winner", "Skill Master"],
      rating: 4.9,
      gamesPlayed: 89
    },
    {
      id: 3,
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      sports: ["Badminton", "Table Tennis"],
      skillLevel: "Beginner",
      location: "3.1 miles away",
      compatibility: 82,
      commonFriends: 5,
      lastActive: "30 minutes ago",
      preferredTimes: ["Morning", "Afternoon"],
      bio: "New to badminton, eager to learn and improve with friendly players.",
      achievements: ["Quick Learner", "Friendly Player"],
      rating: 4.6,
      gamesPlayed: 12
    },
    {
      id: 4,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      sports: ["Basketball", "Volleyball"],
      skillLevel: "Intermediate",
      location: "2.7 miles away",
      compatibility: 91,
      commonFriends: 2,
      lastActive: "4 hours ago",
      preferredTimes: ["Evening", "Weekend"],
      bio: "Team sports enthusiast, love the energy of group games!",
      achievements: ["Team Captain", "Community Leader"],
      rating: 4.7,
      gamesPlayed: 63
    }
  ];

  const sportFilters = [
    { value: 'all', label: 'All Sports', icon: 'Activity' },
    { value: 'tennis', label: 'Tennis', icon: 'Circle' },
    { value: 'basketball', label: 'Basketball', icon: 'Circle' },
    { value: 'badminton', label: 'Badminton', icon: 'Circle' }
  ];

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    return 'text-text-secondary bg-muted';
  };

  const getSkillLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'text-secondary bg-secondary/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-destructive bg-destructive/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const filteredPlayers = selectedSport === 'all' 
    ? suggestedPlayers 
    : suggestedPlayers?.filter(player => 
        player?.sports?.some(sport => sport?.toLowerCase()?.includes(selectedSport))
      );

  return (
    <div className="bg-card rounded-athletic shadow-athletic border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-trust/10 rounded-athletic flex items-center justify-center">
              <Icon name="Users" size={20} className="text-trust" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Player Matching</h2>
              <p className="text-sm text-text-secondary">Find compatible players near you</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Preferences
          </Button>
        </div>

        {/* Sport Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {sportFilters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setSelectedSport(filter?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-athletic text-sm font-athletic-medium transition-athletic whitespace-nowrap ${
                selectedSport === filter?.value
                  ? 'bg-trust text-trust-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {filteredPlayers?.map((player) => (
            <div key={player?.id} className="bg-surface rounded-athletic p-4 border border-border/50 hover:border-trust/30 transition-athletic">
              <div className="flex items-start space-x-4">
                {/* Player Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={player?.avatar}
                      alt={player?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                      <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-athletic-bold text-text-primary">{player?.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getSkillLevelColor(player?.skillLevel)}`}>
                          {player?.skillLevel}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getCompatibilityColor(player?.compatibility)}`}>
                          {player?.compatibility}% match
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-warning fill-current" />
                      <span className="text-sm font-athletic-medium text-text-primary">{player?.rating}</span>
                    </div>
                  </div>

                  {/* Sports and Location */}
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{player?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">{player?.lastActive}</span>
                    </div>
                    {player?.commonFriends > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className="text-text-secondary" />
                        <span className="text-sm text-text-secondary">{player?.commonFriends} mutual</span>
                      </div>
                    )}
                  </div>

                  {/* Sports Tags */}
                  <div className="flex items-center space-x-2 mb-2">
                    {player?.sports?.map((sport, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-athletic font-athletic-medium">
                        {sport}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">{player?.bio}</p>

                  {/* Preferred Times */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Calendar" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">Prefers:</span>
                    {player?.preferredTimes?.map((time, index) => (
                      <span key={index} className="text-sm text-text-primary font-athletic-medium">
                        {time}{index < player?.preferredTimes?.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Trophy" size={14} className="text-accent" />
                        <span className="text-sm text-text-secondary">{player?.gamesPlayed} games</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {player?.achievements?.slice(0, 2)?.map((achievement, index) => (
                          <span key={index} className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="MessageCircle">
                        Message
                      </Button>
                      <Button variant="default" size="sm" iconName="UserPlus" iconPosition="left">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-athletic-bold text-text-primary mb-2">No players found</h3>
            <p className="text-text-secondary mb-4">Try adjusting your sport preferences or location settings</p>
            <Button variant="default" iconName="Settings" iconPosition="left">
              Update Preferences
            </Button>
          </div>
        )}

        {/* View All */}
        {filteredPlayers?.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline" iconName="ArrowRight" iconPosition="right">
              View All Matches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerMatching;