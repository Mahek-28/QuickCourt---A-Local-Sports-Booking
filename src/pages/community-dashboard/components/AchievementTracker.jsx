import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementTracker = () => {
  const [selectedCategory, setSelectedCategory] = useState('recent');

  const userStats = {
    totalBookings: 47,
    totalHours: 142,
    favoritesSport: "Tennis",
    currentStreak: 12,
    level: "Court Regular",
    nextLevel: "Court Master",
    progressToNext: 68
  };

  const achievements = [
    {
      id: 1,
      title: "First Booking",
      description: "Made your first court booking",
      icon: "Calendar",
      category: "milestone",
      earned: true,
      earnedDate: "2025-06-15",
      rarity: "common",
      points: 10
    },
    {
      id: 2,
      title: "Court Regular",
      description: "Completed 25 bookings",
      icon: "Trophy",
      category: "milestone",
      earned: true,
      earnedDate: "2025-07-20",
      rarity: "uncommon",
      points: 50
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Booked 10 morning sessions",
      icon: "Sunrise",
      category: "behavior",
      earned: true,
      earnedDate: "2025-08-01",
      rarity: "rare",
      points: 75
    },
    {
      id: 4,
      title: "Social Butterfly",
      description: "Played with 20 different partners",
      icon: "Users",
      category: "social",
      earned: true,
      earnedDate: "2025-08-05",
      rarity: "uncommon",
      points: 60
    },
    {
      id: 5,
      title: "Court Master",
      description: "Complete 50 bookings",
      icon: "Crown",
      category: "milestone",
      earned: false,
      progress: 47,
      target: 50,
      rarity: "rare",
      points: 100
    },
    {
      id: 6,
      title: "Weekend Warrior",
      description: "Play 5 games in one week",
      icon: "Zap",
      category: "challenge",
      earned: false,
      progress: 3,
      target: 5,
      rarity: "uncommon",
      points: 40
    },
    {
      id: 7,
      title: "Multi-Sport Athlete",
      description: "Play 3 different sports",
      icon: "Target",
      category: "variety",
      earned: false,
      progress: 2,
      target: 3,
      rarity: "rare",
      points: 80
    },
    {
      id: 8,
      title: "Community Leader",
      description: "Organize 5 group bookings",
      icon: "Flag",
      category: "social",
      earned: false,
      progress: 1,
      target: 5,
      rarity: "epic",
      points: 150
    }
  ];

  const categories = [
    { value: 'recent', label: 'Recent', icon: 'Clock' },
    { value: 'milestone', label: 'Milestones', icon: 'Trophy' },
    { value: 'social', label: 'Social', icon: 'Users' },
    { value: 'challenge', label: 'Challenges', icon: 'Target' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-text-secondary bg-muted';
      case 'uncommon': return 'text-secondary bg-secondary/10';
      case 'rare': return 'text-warning bg-warning/10';
      case 'epic': return 'text-destructive bg-destructive/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getFilteredAchievements = () => {
    if (selectedCategory === 'recent') {
      return achievements?.filter(a => a?.earned)?.sort((a, b) => new Date(b.earnedDate) - new Date(a.earnedDate))?.slice(0, 4);
    }
    return achievements?.filter(a => a?.category === selectedCategory);
  };

  const earnedAchievements = achievements?.filter(a => a?.earned);
  const totalPoints = earnedAchievements?.reduce((sum, a) => sum + a?.points, 0);

  return (
    <div className="bg-card rounded-athletic shadow-athletic border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-athletic flex items-center justify-center">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-athletic-bold text-text-primary">Achievements</h2>
              <p className="text-sm text-text-secondary">Track your progress and milestones</p>
            </div>
          </div>
        </div>

        {/* User Level Progress */}
        <div className="bg-gradient-athletic-depth rounded-athletic p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-athletic-bold text-text-primary">{userStats?.level}</h3>
              <p className="text-sm text-text-secondary">Next: {userStats?.nextLevel}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-athletic-bold text-primary">{totalPoints}</p>
              <p className="text-sm text-text-secondary">Total Points</p>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${userStats?.progressToNext}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-secondary text-center">
            {userStats?.progressToNext}% to {userStats?.nextLevel}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-athletic flex items-center justify-center mx-auto mb-2">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-athletic-bold text-text-primary">{userStats?.totalBookings}</p>
            <p className="text-xs text-text-secondary">Bookings</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-athletic flex items-center justify-center mx-auto mb-2">
              <Icon name="Clock" size={20} className="text-secondary" />
            </div>
            <p className="text-2xl font-athletic-bold text-text-primary">{userStats?.totalHours}</p>
            <p className="text-xs text-text-secondary">Hours Played</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-athletic flex items-center justify-center mx-auto mb-2">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <p className="text-2xl font-athletic-bold text-text-primary">{userStats?.currentStreak}</p>
            <p className="text-xs text-text-secondary">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-athletic flex items-center justify-center mx-auto mb-2">
              <Icon name="Trophy" size={20} className="text-success" />
            </div>
            <p className="text-2xl font-athletic-bold text-text-primary">{earnedAchievements?.length}</p>
            <p className="text-xs text-text-secondary">Earned</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1 bg-muted rounded-athletic p-1">
          {categories?.map((category) => (
            <button
              key={category?.value}
              onClick={() => setSelectedCategory(category?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-athletic-medium transition-athletic ${
                selectedCategory === category?.value
                  ? 'bg-card text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {getFilteredAchievements()?.map((achievement) => (
            <div key={achievement?.id} className={`rounded-athletic p-4 border transition-athletic ${
              achievement?.earned 
                ? 'bg-surface border-border/50 hover:border-accent/30' :'bg-muted/30 border-border/30'
            }`}>
              <div className="flex items-start space-x-4">
                {/* Achievement Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-athletic flex items-center justify-center ${
                  achievement?.earned ? 'bg-accent/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={24} 
                    className={achievement?.earned ? 'text-accent' : 'text-text-secondary'} 
                  />
                </div>

                {/* Achievement Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-athletic-bold ${
                        achievement?.earned ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {achievement?.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{achievement?.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded text-xs font-athletic-medium ${getRarityColor(achievement?.rarity)}`}>
                        {achievement?.rarity}
                      </div>
                      <span className="text-sm font-athletic-bold text-accent">+{achievement?.points}</span>
                    </div>
                  </div>

                  {/* Progress Bar for Unearned Achievements */}
                  {!achievement?.earned && achievement?.progress !== undefined && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">Progress</span>
                        <span className="text-xs text-text-secondary">
                          {achievement?.progress}/{achievement?.target}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(achievement?.progress / achievement?.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Earned Date */}
                  {achievement?.earned && achievement?.earnedDate && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary">
                        Earned on {new Date(achievement.earnedDate)?.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredAchievements()?.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Award" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-athletic-bold text-text-primary mb-2">No achievements yet</h3>
            <p className="text-text-secondary mb-4">Start playing to unlock your first achievements!</p>
            <Button variant="default" iconName="Play" iconPosition="left">
              Book a Court
            </Button>
          </div>
        )}

        {/* View All */}
        {getFilteredAchievements()?.length > 0 && selectedCategory === 'recent' && (
          <div className="text-center mt-6">
            <Button variant="outline" iconName="Award" iconPosition="left">
              View All Achievements
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementTracker;