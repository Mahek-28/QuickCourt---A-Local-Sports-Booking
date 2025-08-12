import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FacilityProfile from './pages/facility-profile';
import BookingEngine from './pages/booking-engine';
import FacilityOwnerPortal from './pages/facility-owner-portal';
import FacilityDiscovery from './pages/facility-discovery';
import CommunityDashboard from './pages/community-dashboard';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookingEngine />} />
        <Route path="/facility-profile" element={<FacilityProfile />} />
        <Route path="/booking-engine" element={<BookingEngine />} />
        <Route path="/facility-owner-portal" element={<FacilityOwnerPortal />} />
        <Route path="/facility-discovery" element={<FacilityDiscovery />} />
        <Route path="/community-dashboard" element={<CommunityDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
