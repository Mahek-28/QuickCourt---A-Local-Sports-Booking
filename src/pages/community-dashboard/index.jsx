import React from 'react';
import Header from '../../components/ui/Header';
import UpcomingBookings from './components/UpcomingBookings';
import ActivityFeed from './components/ActivityFeed';
import PlayerMatching from './components/PlayerMatching';
import AchievementTracker from './components/AchievementTracker';
import QuickActions from './components/QuickActions';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';

const CommunityDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-court-energy rounded-athletic p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-athletic-bold mb-2">Welcome back, Alex! 🏆</h1>
                <p className="text-white/90 mb-4">
                  You have 3 upcoming bookings and 2 new player matches waiting for you.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full pulse-availability"></div>
                    <span className="text-sm font-athletic-medium">12-day streak</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm font-athletic-medium">Court Regular level</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm font-athletic-medium">47 total bookings</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <UpcomingBookings />
              <ActivityFeed />
              <PlayerMatching />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <QuickActions />
              <AchievementTracker />
            </div>
          </div>

          {/* Full Width Recommendations */}
          <div className="mt-8">
            <PersonalizedRecommendations />
          </div>

          {/* Community Stats Section */}
          <div className="mt-8 bg-card rounded-athletic shadow-athletic border border-border p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-athletic-bold text-text-primary mb-2">Community Impact</h2>
              <p className="text-text-secondary">Your contribution to the QuickCourt community</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎾</span>
                </div>
                <p className="text-2xl font-athletic-bold text-text-primary">47</p>
                <p className="text-sm text-text-secondary">Games Played</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-2xl font-athletic-bold text-text-primary">23</p>
                <p className="text-sm text-text-secondary">Players Met</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⭐</span>
                </div>
                <p className="text-2xl font-athletic-bold text-text-primary">4.8</p>
                <p className="text-sm text-text-secondary">Avg Rating</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-2xl font-athletic-bold text-text-primary">8</p>
                <p className="text-sm text-text-secondary">Achievements</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} QuickCourt. Building communities through sport.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityDashboard;