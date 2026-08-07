import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

// Layouts
import { RootLayout } from './app/layouts/RootLayout';
import { CustomerLayout } from './app/layouts/CustomerLayout';
import { PartnerLayout } from './app/layouts/PartnerLayout';
import { AdminLayout } from './app/layouts/AdminLayout';

// Landing
import { LandingPortalView } from './components/landing/LandingPortalView';

// Customer Views
import { CustomerHomeView } from './components/customer/CustomerHomeView';
import { ServiceCatalogView } from './components/customer/ServiceCatalogView';
import { BookingFlowView } from './components/customer/BookingFlowView';
import { BookingTrackingView } from './components/customer/BookingTrackingView';
import { BookingHistoryView } from './components/customer/BookingHistoryView';
import { CustomerProfileView } from './components/customer/CustomerProfileView';
import { MembershipView } from './components/customer/MembershipView';

// Partner Views
import { PartnerDashboardView } from './components/partner/PartnerDashboardView';
import { PartnerJobExecutionView } from './components/partner/PartnerJobExecutionView';
import { PartnerEarningsView } from './components/partner/PartnerEarningsView';
import { PartnerPerformanceView } from './components/partner/PartnerPerformanceView';

// Admin Views
import { AdminOverviewView } from './components/admin/AdminOverviewView';
import { AdminBookingsView } from './components/admin/AdminBookingsView';
import { AdminCustomersView } from './components/admin/AdminCustomersView';
import { AdminPartnersView } from './components/admin/AdminPartnersView';
import { AdminRevenueView } from './components/admin/AdminRevenueView';
import { AdminCatalogView } from './components/admin/AdminCatalogView';
import { AdminMembershipsView } from './components/admin/AdminMembershipsView';
import { AdminCouponsView } from './components/admin/AdminCouponsView';
import { AdminReportsView } from './components/admin/AdminReportsView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

export function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Landing Portal */}
            <Route index element={<LandingPortalView />} />

            {/* Customer App Routes */}
            <Route path="customer" element={<CustomerLayout />}>
              <Route index element={<CustomerHomeView />} />
              <Route path="catalog" element={<ServiceCatalogView />} />
              <Route path="book" element={<BookingFlowView />} />
              <Route path="tracking" element={<BookingTrackingView />} />
              <Route path="bookings" element={<BookingHistoryView />} />
              <Route path="profile" element={<CustomerProfileView />} />
              <Route path="garage" element={<CustomerProfileView />} />
              <Route path="membership" element={<MembershipView />} />
            </Route>

            {/* Partner App Routes */}
            <Route path="partner" element={<PartnerLayout />}>
              <Route index element={<PartnerDashboardView />} />
              <Route path="job" element={<PartnerJobExecutionView />} />
              <Route path="earnings" element={<PartnerEarningsView />} />
              <Route path="performance" element={<PartnerPerformanceView />} />
              <Route path="profile" element={<PartnerPerformanceView />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminOverviewView />} />
              <Route path="bookings" element={<AdminBookingsView />} />
              <Route path="customers" element={<AdminCustomersView />} />
              <Route path="partners" element={<AdminPartnersView />} />
              <Route path="revenue" element={<AdminRevenueView />} />
              <Route path="catalog" element={<AdminCatalogView />} />
              <Route path="memberships" element={<AdminMembershipsView />} />
              <Route path="coupons" element={<AdminCouponsView />} />
              <Route path="reports" element={<AdminReportsView />} />
              <Route path="settings" element={<AdminSettingsView />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
