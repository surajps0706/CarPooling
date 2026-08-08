import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Wrench, DollarSign, Award, UserCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const PartnerLayout: React.FC = () => {
  const { activePartner } = useBooking();

  return (
    <div className="flex-1 bg-[#F4F5F7] flex items-center justify-center p-0 md:p-6 min-h-[100dvh] w-full">
      {/* Mobile Viewport Container */}
      <div className="w-full max-w-full md:max-w-[430px] h-[100dvh] md:h-[844px] bg-white md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-[#0A0F17] flex flex-col relative overflow-hidden">
        {/* Top Header Bar for Partner App */}
        <div className="bg-[#0A0F17] text-white px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activePartner.profilePhotoUrl}
              alt={activePartner.fullName}
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shrink-0"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {activePartner.fullName}
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono shrink-0">
                  ON DUTY
                </span>
              </div>
              <div className="text-[10px] text-[#94A3B8] truncate">
                {activePartner.specialization}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-bold text-[#F5B000]">★ {activePartner.rating}</div>
            <div className="text-[10px] text-[#94A3B8]">{activePartner.totalRatings} Reviews</div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24 bg-[#FAFAF8] w-full">
          <Outlet />
        </div>

        {/* Bottom Partner Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E2E8F0] flex items-center justify-around px-2 z-50 pb-[env(safe-area-inset-bottom,0px)] shadow-lg w-full">
          <NavLink
            to="/partner"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B]'
              }`
            }
          >
            <Wrench className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Jobs</span>
          </NavLink>

          <NavLink
            to="/partner/earnings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B]'
              }`
            }
          >
            <DollarSign className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Earnings</span>
          </NavLink>

          <NavLink
            to="/partner/performance"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B]'
              }`
            }
          >
            <Award className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Metrics</span>
          </NavLink>

          <NavLink
            to="/partner/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all min-h-[48px] w-full ${
                isActive ? 'text-[#0088FF] font-bold' : 'text-[#64748B]'
              }`
            }
          >
            <UserCheck className="w-5 h-5 shrink-0" />
            <span className="text-[11px] leading-none">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
