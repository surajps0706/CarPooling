import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, ShieldCheck, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CustomerLayout: React.FC = () => {
  const { activeBooking } = useBooking();

  return (
    <div className="flex-1 bg-[#F4F5F7] flex items-center justify-center p-0 md:p-6 min-h-[100dvh] w-full">
      {/* Mobile Viewport Container */}
      <div className="w-full max-w-full md:max-w-[430px] h-[100dvh] md:h-[844px] bg-[#FAFAF8] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-[#0A0F17] flex flex-col relative overflow-hidden">
        {/* Scrollable Viewport Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24 w-full">
          <Outlet />
        </div>

        {/* Fixed Bottom Navigation Bar (100% Responsive for Real Mobile & Desktop Mockup) */}
        <nav className="fixed md:absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E2E8F0] flex items-center justify-around px-2 z-50 pb-[env(safe-area-inset-bottom,0px)] shadow-lg max-w-full md:max-w-[430px] mx-auto">
          <NavLink
            to="/customer"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
              }`
            }
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Home</span>
          </NavLink>

          <NavLink
            to="/customer/bookings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl relative transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
              }`
            }
          >
            <Calendar className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Bookings</span>
            {activeBooking && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-[#F5B000] animate-ping" />
            )}
          </NavLink>

          <NavLink
            to="/customer/membership"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
              }`
            }
          >
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Club</span>
          </NavLink>

          <NavLink
            to="/customer/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
              }`
            }
          >
            <User className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
