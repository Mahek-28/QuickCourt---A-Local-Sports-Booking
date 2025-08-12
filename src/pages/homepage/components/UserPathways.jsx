import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserPathways = () => {
  const navigate = useNavigate();

  const pathways = [
    {
      id: 'players',
      title: 'Find & Book Courts',
      description: 'Discover premium facilities, check real-time availability, and book instantly with your friends.',
      icon: 'Calendar',
      color: 'bg-primary',
      stats: '2,847 courts available',
      features: ['Real-time availability', 'Group booking', 'Instant confirmation', 'Secure payments'],
      cta: 'Start Booking',
      route: '/facility-discovery'
    },
    {
      id: 'owners',
      title: 'List Your Facility',
      description: 'Maximize your facility revenue with smart pricing, automated bookings, and detailed analytics.',
      icon: 'Building',
      color: 'bg-secondary',
      stats: '89% average occupancy',
      features: ['Smart pricing', 'Automated bookings', 'Revenue analytics', 'Customer insights'],
      cta: 'Join as Owner',
      route: '/facility-owner-portal'
    },
    {
      id: 'community',
      title: 'Join Local Games',
      description: 'Connect with players in your area, join pickup games, and build lasting sports friendships.',
      icon: 'Users',
      color: 'bg-accent',
      stats: '1,234 active groups',
      features: ['Player matching', 'Pickup games', 'Skill-based groups', 'Social features'],
      cta: 'Find Players',
      route: '/community-dashboard'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Choose Your Path
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Whether you're looking to play, own, or connect, QuickCourt has the perfect solution for your sporting journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways?.map((pathway, index) => (
            <div
              key={pathway?.id}
              className="group relative bg-card rounded-2xl p-8 shadow-athletic hover:shadow-athletic-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 ${pathway?.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={pathway?.icon} size={32} color="white" strokeWidth={2.5} />
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-secondary font-medium">
                    {pathway?.stats}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {pathway?.title}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {pathway?.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {pathway?.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                variant="default"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate(pathway?.route)}
                className="group-hover:bg-primary-foreground group-hover:text-primary transition-colors duration-300"
              >
                {pathway?.cta}
              </Button>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-muted px-6 py-3 rounded-full">
            <Icon name="Zap" size={20} className="text-accent" />
            <span className="text-text-secondary font-medium">
              New to QuickCourt? Get started in under 2 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPathways;