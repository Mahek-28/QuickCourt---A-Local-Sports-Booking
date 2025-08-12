import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunitySection = ({ facility }) => {
  const [activeTab, setActiveTab] = useState('players');

  const regularPlayers = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      sport: "Tennis",
      level: "Advanced",
      playTime: "Evenings",
      gamesPlayed: 47,
      rating: 4.8,
      isOnline: true,
      lookingForPartner: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      sport: "Basketball",
      level: "Intermediate",
      playTime: "Mornings",
      gamesPlayed: 32,
      rating: 4.6,
      isOnline: false,
      lookingForPartner: false
    },
    {
      id: 3,
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      sport: "Tennis",
      level: "Beginner",
      playTime: "Weekends",
      gamesPlayed: 15,
      rating: 4.2,
      isOnline: true,
      lookingForPartner: true
    },
    {
      id: 4,
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      sport: "Basketball",
      level: "Advanced",
      playTime: "Afternoons",
      gamesPlayed: 68,
      rating: 4.9,
      isOnline: true,
      lookingForPartner: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Weekend Tennis Tournament",
      date: "2025-01-18",
      time: "09:00 AM",
      type: "Tournament",
      participants: 16,
      maxParticipants: 32,
      entryFee: 25,
      prize: "$500 Prize Pool",
      organizer: "QuickCourt Community",
      description: "Join our monthly tennis tournament! All skill levels welcome. Singles format with bracket elimination.",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Basketball Pickup Games",
      date: "2025-01-15",
      time: "06:00 PM",
      type: "Pickup Game",
      participants: 8,
      maxParticipants: 10,
      entryFee: 0,
      prize: "Fun & Fitness",
      organizer: "Maria Garcia",
      description: "Regular evening pickup games. Come join us for some competitive basketball!",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Beginner Tennis Clinic",
      date: "2025-01-20",
      time: "10:00 AM",
      type: "Clinic",
      participants: 6,
      maxParticipants: 12,
      entryFee: 15,
      prize: "Learn & Improve",
      organizer: "Pro Coach Sarah",
      description: "Perfect for beginners! Learn basic techniques, rules, and court etiquette.",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=200&fit=crop"
    }
  ];

  const groupActivities = [
    {
      id: 1,
      name: "Morning Tennis Club",
      members: 24,
      sport: "Tennis",
      schedule: "Mon, Wed, Fri - 7:00 AM",
      level: "All Levels",
      description: "Start your day with energizing tennis sessions. Great community of morning players!",
      isJoined: false
    },
    {
      id: 2,
      name: "Evening Basketball League",
      members: 18,
      sport: "Basketball",
      schedule: "Tue, Thu - 6:00 PM",
      level: "Intermediate+",
      description: "Competitive basketball league with weekly games and monthly tournaments.",
      isJoined: true
    },
    {
      id: 3,
      name: "Weekend Warriors",
      members: 31,
      sport: "Mixed Sports",
      schedule: "Saturdays - 2:00 PM",
      level: "All Levels",
      description: "Mixed sports group for weekend fun. Tennis, basketball, and more!",
      isJoined: false
    }
  ];

  const tabs = [
    { id: 'players', label: 'Regular Players', icon: 'Users', count: regularPlayers?.length },
    { id: 'events', label: 'Upcoming Events', icon: 'Calendar', count: upcomingEvents?.length },
    { id: 'groups', label: 'Group Activities', icon: 'Users', count: groupActivities?.length }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-athletic shadow-athletic p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-athletic-bold text-text-primary mb-2">
              Community & Events
            </h2>
            <p className="text-text-secondary">
              Connect with players and join activities at {facility?.name}
            </p>
          </div>
          
          <Button
            variant="primary"
            iconName="UserPlus"
            iconPosition="left"
          >
            Join Community
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-athletic-depth rounded-athletic">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-lg font-athletic-bold text-text-primary">127</span>
            </div>
            <span className="text-xs text-text-secondary">Active Members</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Calendar" size={16} className="text-success" />
              <span className="text-lg font-athletic-bold text-text-primary">8</span>
            </div>
            <span className="text-xs text-text-secondary">Events This Month</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Trophy" size={16} className="text-warning" />
              <span className="text-lg font-athletic-bold text-text-primary">3</span>
            </div>
            <span className="text-xs text-text-secondary">Active Leagues</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Star" size={16} className="text-accent" />
              <span className="text-lg font-athletic-bold text-text-primary">4.8</span>
            </div>
            <span className="text-xs text-text-secondary">Community Rating</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-athletic">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-athletic text-sm font-athletic-medium transition-athletic ${
                activeTab === tab?.id
                  ? 'bg-card text-primary shadow-athletic'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'players' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-athletic-bold text-text-primary">
                  Regular Players
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <div className="w-2 h-2 bg-success rounded-full pulse-availability"></div>
                    <span>{regularPlayers?.filter(p => p?.isOnline)?.length} online now</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regularPlayers?.map(player => (
                  <div key={player?.id} className="bg-muted rounded-athletic p-4">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Image
                          src={player?.avatar}
                          alt={player?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {player?.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full pulse-availability"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-athletic-bold text-text-primary">
                            {player?.name}
                          </h4>
                          {player?.lookingForPartner && (
                            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-athletic text-xs">
                              Looking for partner
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-text-secondary">
                          <div className="flex items-center space-x-2">
                            <Icon name="Target" size={14} />
                            <span>{player?.sport} • {player?.level}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Clock" size={14} />
                            <span>Plays {player?.playTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Trophy" size={14} />
                            <span>{player?.gamesPlayed} games • {player?.rating}★</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="xs">
                            Connect
                          </Button>
                          <Button variant="ghost" size="xs" iconName="MessageCircle">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-athletic-bold text-text-primary">
                  Upcoming Events
                </h3>
                <Button variant="outline" size="sm" iconName="Plus">
                  Create Event
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents?.map(event => (
                  <div key={event?.id} className="bg-muted rounded-athletic overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-32 md:h-auto">
                        <Image
                          src={event?.image}
                          alt={event?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-athletic-bold text-text-primary mb-1">
                              {event?.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-text-secondary">
                              <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={14} />
                                <span>{formatDate(event?.date)} at {event?.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Users" size={14} />
                                <span>{event?.participants}/{event?.maxParticipants} joined</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-athletic text-xs font-athletic-medium ${
                              event?.type === 'Tournament' ?'bg-warning/10 text-warning'
                                : event?.type === 'Clinic' ?'bg-primary/10 text-primary' :'bg-success/10 text-success'
                            }`}>
                              {event?.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-text-secondary text-sm mb-3">
                          {event?.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Icon name="DollarSign" size={14} className="text-primary" />
                              <span className="text-text-primary font-athletic-medium">
                                {event?.entryFee === 0 ? 'Free' : `$${event?.entryFee}`}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Award" size={14} className="text-warning" />
                              <span className="text-text-secondary">{event?.prize}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Learn More
                            </Button>
                            <Button variant="primary" size="sm">
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-athletic-bold text-text-primary">
                  Group Activities
                </h3>
                <Button variant="outline" size="sm" iconName="Plus">
                  Create Group
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupActivities?.map(group => (
                  <div key={group?.id} className="bg-muted rounded-athletic p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-athletic-bold text-text-primary mb-1">
                          {group?.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="Users" size={14} />
                          <span>{group?.members} members</span>
                          <span>•</span>
                          <span>{group?.sport}</span>
                        </div>
                      </div>
                      
                      {group?.isJoined && (
                        <span className="bg-success/10 text-success px-2 py-1 rounded-athletic text-xs font-athletic-medium">
                          Joined
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Clock" size={14} />
                        <span>{group?.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Target" size={14} />
                        <span>{group?.level}</span>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-4">
                      {group?.description}
                    </p>
                    
                    <div className="flex space-x-2">
                      {group?.isJoined ? (
                        <>
                          <Button variant="outline" size="sm" fullWidth>
                            View Group
                          </Button>
                          <Button variant="ghost" size="sm" iconName="MessageCircle">
                            Chat
                          </Button>
                        </>
                      ) : (
                        <Button variant="primary" size="sm" fullWidth>
                          Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;