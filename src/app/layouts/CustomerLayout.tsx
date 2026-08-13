import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, User, Wrench, Shield } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CustomerLayout: React.FC = () => {
  const { activeBooking } = useBooking();

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] flex flex-col w-full text-[#0F172A]">
      {/* Main Responsive Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24">
        <Outlet />
      </div>

      {/* Modern Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] flex items-center justify-around px-4 z-50 shadow-lg w-full max-w-7xl mx-auto rounded-t-2xl">
        <NavLink
          to="/customer"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#0088FF] font-bold bg-blue-50/80 scale-105'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`
          }
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="text-[11px] leading-none">Home</span>
        </NavLink>

        <NavLink
          to="/customer/catalog"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#0088FF] font-bold bg-blue-50/80 scale-105'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`
          }
        >
          <Wrench className="w-5 h-5 shrink-0" />
          <span className="text-[11px] leading-none">Services</span>
        </NavLink>

        <NavLink
          to="/customer/bookings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl relative transition-all ${
              isActive
                ? 'text-[#0088FF] font-bold bg-blue-50/80 scale-105'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`
          }
        >
          <Calendar className="w-5 h-5 shrink-0" />
          <span className="text-[11px] leading-none">Bookings</span>
          {activeBooking && (
            <span className="absolute top-1 right-3 w-2.5 h-2.5 rounded-full bg-[#F5B000] animate-ping" />
          )}
        </NavLink>

        <NavLink
          to="/customer/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#0088FF] font-bold bg-blue-50/80 scale-105'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`
          }
        >
          <User className="w-5 h-5 shrink-0" />
          <span className="text-[11px] leading-none">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
