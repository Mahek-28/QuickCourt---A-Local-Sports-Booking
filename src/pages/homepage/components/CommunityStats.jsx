import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    bookings: 0,
    cities: 0,
    facilities: 0
  });

  const finalStats = {
    users: 2847,
    bookings: 15678,
    cities: 45,
    facilities: 1234
  };

  const statsData = [
    {
      key: 'users',
      label: 'Active Users',
      value: finalStats?.users,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Sports enthusiasts using QuickCourt daily'
    },
    {
      key: 'bookings',
      label: 'Successful Bookings',
      value: finalStats?.bookings,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Courts booked and games played'
    },
    {
      key: 'cities',
      label: 'Cities Served',
      value: finalStats?.cities,
      icon: 'MapPin',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Growing presence across the country'
    },
    {
      key: 'facilities',
      label: 'Partner Facilities',
      value: finalStats?.facilities,
      icon: 'Building',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Verified venues in our network'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        users: Math.floor(finalStats?.users * easeOutQuart),
        bookings: Math.floor(finalStats?.bookings * easeOutQuart),
        cities: Math.floor(finalStats?.cities * easeOutQuart),
        facilities: Math.floor(finalStats?.facilities * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toLocaleString();
  };

  return (
    <section className="py-20 bg-gradient-court-energy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Icon name="TrendingUp" size={20} className="text-white" />
            <span className="text-white font-medium text-sm">Growing Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join a thriving community of sports enthusiasts, facility owners, and local organizations making sports accessible for everyone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statsData?.map((stat) => (
            <div
              key={stat?.key}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name={stat?.icon} size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
                
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat?.key === 'bookings' ? formatNumber(animatedStats?.[stat?.key]) : animatedStats?.[stat?.key]?.toLocaleString()}
                  {stat?.key === 'bookings' && animatedStats?.[stat?.key] === finalStats?.[stat?.key] && '+'}
                </div>
                
                <div className="text-xl font-semibold mb-3 text-white/90">
                  {stat?.label}
                </div>
                
                <div className="text-sm text-white/70 leading-relaxed">
                  {stat?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified & Secure</h3>
            <p className="text-white/80 text-sm">
              All facilities are verified and payments are processed securely
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
            <p className="text-white/80 text-sm">
              Book courts instantly with real-time availability updates
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Community First</h3>
            <p className="text-white/80 text-sm">
              Built by athletes, for athletes, with community at the core
            </p>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">4.9/5</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/70">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/70">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">0%</div>
              <div className="text-sm text-white/70">Booking Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;