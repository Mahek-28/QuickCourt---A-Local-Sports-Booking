import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import UserPathways from './components/UserPathways';
import LiveActivityFeed from './components/LiveActivityFeed';
import FeaturedFacilities from './components/FeaturedFacilities';
import CommunityStats from './components/CommunityStats';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <UserPathways />
        <FeaturedFacilities />
        <LiveActivityFeed />
        <CommunityStats />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;