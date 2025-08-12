import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Find Courts', path: '/facility-discovery' },
        { name: 'Book Now', path: '/booking-engine' },
        { name: 'Community', path: '/community-dashboard' },
        { name: 'Owner Portal', path: '/facility-owner-portal' }
      ]
    },
    {
      title: 'Sports',
      links: [
        { name: 'Tennis Courts', path: '/facility-discovery?sport=tennis' },
        { name: 'Basketball Courts', path: '/facility-discovery?sport=basketball' },
        { name: 'Soccer Fields', path: '/facility-discovery?sport=soccer' },
        { name: 'Badminton Courts', path: '/facility-discovery?sport=badminton' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Safety Guidelines', path: '/safety' },
        { name: 'Booking Policy', path: '/policy' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press Kit', path: '/press' },
        { name: 'Partner Program', path: '/partners' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' }
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-court-energy rounded-athletic flex items-center justify-center">
                <Icon name="Zap" size={28} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">
                  QuickCourt
                </span>
                <span className="text-sm text-white/70 -mt-1">
                  Your Court Awaits
                </span>
              </div>
            </Link>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Building communities through sport. Discover, book, and play at premium facilities while connecting with fellow athletes in your area.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Stay Updated</h4>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-athletic text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  variant="default"
                  iconName="Send"
                  iconPosition="left"
                  className="px-6"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="lg:col-span-1">
              <h4 className="font-semibold text-lg mb-6">{section?.title}</h4>
              <ul className="space-y-4">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <Link
                      to={link?.path}
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h4 className="font-semibold text-lg mb-2">Get the QuickCourt App</h4>
              <p className="text-white/70 text-sm">
                Book courts on the go with our mobile app
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant="outline"
                iconName="Smartphone"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white hover:text-text-primary"
              >
                App Store
              </Button>
              <Button
                variant="outline"
                iconName="Smartphone"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white hover:text-text-primary"
              >
                Google Play
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Shield" size={24} className="text-success" />
              <span className="text-sm text-white/70">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Clock" size={24} className="text-accent" />
              <span className="text-sm text-white/70">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Star" size={24} className="text-warning" />
              <span className="text-sm text-white/70">Verified Facilities</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Users" size={24} className="text-primary" />
              <span className="text-sm text-white/70">Growing Community</span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-text-primary/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-white/70">
              © {currentYear} QuickCourt. All rights reserved. Building communities through sport.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-white/70 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/70 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;