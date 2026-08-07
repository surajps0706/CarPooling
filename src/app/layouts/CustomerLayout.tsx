import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Calendar, ShieldCheck, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CustomerLayout: React.FC = () => {
  const { activeBooking } = useBooking();

  return (
    <div className="flex-1 bg-[#F4F5F7] flex items-center justify-center p-0 md:p-6">
      {/* Mobile Frame Outer Container */}
      <div className="w-full max-w-[430px] h-[100vh] md:h-[844px] bg-[#FAFAF8] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-[#18181B] flex flex-col relative overflow-hidden">
        {/* Mobile Viewport Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20">
          <Outlet />
        </div>

        {/* Bottom Fixed Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-around px-2 z-40">
          <NavLink
            to="/customer"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-semibold' : 'text-[#6B7280] hover:text-[#18181B]'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px]">Home</span>
          </NavLink>

          <NavLink
            to="/customer/bookings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl relative transition-all ${
                isActive ? 'text-[#2457FF] font-semibold' : 'text-[#6B7280] hover:text-[#18181B]'
              }`
            }
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[11px]">Bookings</span>
            {activeBooking && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#2457FF] animate-ping" />
            )}
          </NavLink>

          <NavLink
            to="/customer/membership"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-semibold' : 'text-[#6B7280] hover:text-[#18181B]'
              }`
            }
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[11px]">Club</span>
          </NavLink>

          <NavLink
            to="/customer/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-semibold' : 'text-[#6B7280] hover:text-[#18181B]'
              }`
            }
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
