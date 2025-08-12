// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Icon from '../AppIcon';
// import Button from './Button';

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   const navigationItems = [
//     { name: 'Discover', path: '/facility-discovery', icon: 'Search' },
//     { name: 'Book Courts', path: '/booking-engine', icon: 'Calendar' },
//     { name: 'Community', path: '/community-dashboard', icon: 'Users' },
//     { name: 'Owner Portal', path: '/facility-owner-portal', icon: 'Building' },
//   ];

//   const isActivePath = (path) => location?.pathname === path;

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-athletic border-b border-border">
//       <div className="w-full">
//         <div className="flex items-center justify-between h-16 px-6">
//           {/* Logo Section */}
//           <Link 
//             to="/homepage" 
//             className="flex items-center space-x-3 transition-athletic hover:opacity-80"
//           >
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-court-energy rounded-athletic flex items-center justify-center">
//                 <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-availability"></div>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-xl font-athletic-bold text-text-primary tracking-tight">
//                 QuickCourt
//               </span>
//               <span className="text-xs text-text-secondary font-athletic-medium -mt-1">
//                 Your Court Awaits
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {navigationItems?.map((item) => (
//               <Link
//                 key={item?.path}
//                 to={item?.path}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-athletic transition-athletic ${
//                   isActivePath(item?.path)
//                     ? 'bg-primary text-primary-foreground shadow-athletic'
//                     : 'text-text-secondary hover:text-text-primary hover:bg-muted'
//                 }`}
//               >
//                 <Icon 
//                   name={item?.icon} 
//                   size={18} 
//                   strokeWidth={isActivePath(item?.path) ? 2.5 : 2} 
//                 />
//                 <span className="font-athletic-medium text-sm">{item?.name}</span>
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="sm"
//               iconName="Bell"
//               iconPosition="left"
//               className="text-text-secondary hover:text-text-primary"
//             >
//               Notifications
//             </Button>
            
//             <div className="w-px h-6 bg-border"></div>
            
//             <Button
//               variant="outline"
//               size="sm"
//               iconName="LogIn"
//               iconPosition="left"
//             >
//               Sign In
//             </Button>
            
//             <Button
//               variant="default"
//               size="sm"
//               iconName="UserPlus"
//               iconPosition="left"
//               className="ripple-effect"
//             >
//               Join Now
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden p-2 rounded-athletic text-text-secondary hover:text-text-primary hover:bg-muted transition-athletic thumb-friendly"
//             aria-label="Toggle mobile menu"
//           >
//             <Icon 
//               name={isMobileMenuOpen ? "X" : "Menu"} 
//               size={24} 
//               strokeWidth={2} 
//             />
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden bg-card border-t border-border slide-in-right">
//             <div className="px-6 py-4 space-y-3">
//               {navigationItems?.map((item) => (
//                 <Link
//                   key={item?.path}
//                   to={item?.path}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`flex items-center space-x-3 px-4 py-3 rounded-athletic transition-athletic thumb-friendly ${
//                     isActivePath(item?.path)
//                       ? 'bg-primary text-primary-foreground shadow-athletic'
//                       : 'text-text-secondary hover:text-text-primary hover:bg-muted'
//                   }`}
//                 >
//                   <Icon 
//                     name={item?.icon} 
//                     size={20} 
//                     strokeWidth={isActivePath(item?.path) ? 2.5 : 2} 
//                   />
//                   <span className="font-athletic-medium">{item?.name}</span>
//                 </Link>
//               ))}
              
//               <div className="pt-4 border-t border-border space-y-3">
//                 <Button
//                   variant="ghost"
//                   fullWidth
//                   iconName="Bell"
//                   iconPosition="left"
//                   className="justify-start text-text-secondary hover:text-text-primary"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Notifications
//                 </Button>
                
//                 <Button
//                   variant="outline"
//                   fullWidth
//                   iconName="LogIn"
//                   iconPosition="left"
//                   className="justify-start"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Sign In
//                 </Button>
                
//                 <Button
//                   variant="default"
//                   fullWidth
//                   iconName="UserPlus"
//                   iconPosition="left"
//                   className="justify-start ripple-effect"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Join Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Trust Signal Bar */}
//       <div className="hidden md:block bg-gradient-athletic-depth border-t border-border/50">
//         <div className="px-6 py-2">
//           <div className="flex items-center justify-center space-x-8 text-xs text-text-secondary">
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-success rounded-full pulse-availability"></div>
//               <span className="font-athletic-medium">2,847 Active Users</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Icon name="Shield" size={14} className="text-trust" />
//               <span className="font-athletic-medium">Verified Facilities</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Icon name="Clock" size={14} className="text-accent" />
//               <span className="font-athletic-medium">Instant Booking</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Icon name="Star" size={14} className="text-warning" />
//               <span className="font-athletic-medium">4.9/5 Rating</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Discover', path: '/facility-discovery', icon: 'Search' },
    { name: 'Book Courts', path: '/booking-engine', icon: 'Calendar' },
    { name: 'Community', path: '/community-dashboard', icon: 'Users' },
    { name: 'Owner Portal', path: '/facility-owner-portal', icon: 'Building' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo Section */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 transition-all hover:opacity-80"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                QuickCourt
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                Your Court Awaits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActivePath(item?.path)
                    ? 'bg-blue-50 text-blue-600 shadow-inner'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  strokeWidth={isActivePath(item?.path) ? 2.5 : 2} 
                />
                <span className="font-medium text-sm">{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconPosition="left"
              className="text-gray-600 hover:text-gray-900"
            >
              Notifications
            </Button>
            
            <div className="w-px h-6 bg-gray-200"></div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="LogIn"
              iconPosition="left"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </Button>
            
            <Button
              variant="default"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              strokeWidth={2} 
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-in-right">
            <div className="px-4 py-3 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActivePath(item?.path)
                      ? 'bg-blue-50 text-blue-600 shadow-inner'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    strokeWidth={isActivePath(item?.path) ? 2.5 : 2} 
                  />
                  <span className="font-medium">{item?.name}</span>
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Button
                  variant="ghost"
                  fullWidth
                  iconName="Bell"
                  iconPosition="left"
                  className="justify-start text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Notifications
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="LogIn"
                  iconPosition="left"
                  className="justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
                
                <Button
                  variant="default"
                  fullWidth
                  iconName="UserPlus"
                  iconPosition="left"
                  className="justify-start bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Trust Signal Bar */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">2,847 Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-blue-500" />
              <span className="font-medium">Verified Facilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-blue-500" />
              <span className="font-medium">Instant Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;