import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Wrench, DollarSign, Award, UserCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const PartnerLayout: React.FC = () => {
  const { activePartner } = useBooking();

  return (
    <div className="flex-1 bg-[#F4F5F7] flex items-center justify-center p-0 md:p-6">
      {/* Mobile Frame Outer Container */}
      <div className="w-full max-w-[430px] h-[100vh] md:h-[844px] bg-white md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-[#18181B] flex flex-col relative overflow-hidden">
        {/* Top Header Bar for Partner App */}
        <div className="bg-[#18181B] text-white px-4 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={activePartner.profilePhotoUrl}
              alt={activePartner.fullName}
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {activePartner.fullName}
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                  ON DUTY
                </span>
              </div>
              <div className="text-[10px] text-[#A1A1AA]">
                {activePartner.specialization}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-amber-400">★ {activePartner.rating}</div>
            <div className="text-[10px] text-[#9CA3AF]">{activePartner.totalRatings} Reviews</div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 bg-[#FAFAF8]">
          <Outlet />
        </div>

        {/* Bottom Partner Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-around px-2 z-40">
          <NavLink
            to="/partner"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-bold' : 'text-[#6B7280]'
              }`
            }
          >
            <Wrench className="w-5 h-5" />
            <span className="text-[11px]">Jobs</span>
          </NavLink>

          <NavLink
            to="/partner/earnings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-bold' : 'text-[#6B7280]'
              }`
            }
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-[11px]">Earnings</span>
          </NavLink>

          <NavLink
            to="/partner/performance"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-bold' : 'text-[#6B7280]'
              }`
            }
          >
            <Award className="w-5 h-5" />
            <span className="text-[11px]">Metrics</span>
          </NavLink>

          <NavLink
            to="/partner/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#2457FF] font-bold' : 'text-[#6B7280]'
              }`
            }
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-[11px]">Profile</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
