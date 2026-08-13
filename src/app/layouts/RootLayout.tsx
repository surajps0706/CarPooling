import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Smartphone, Wrench, LayoutDashboard, Home, RotateCcw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { WipeitLogo } from '../../components/ui/WipeitLogo';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const { resetDemoData, activeBooking } = useBooking();

  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] flex flex-col font-sans max-w-full overflow-x-hidden">
      {/* Universal Demo Switcher Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F17] text-white border-b border-[#1E293B] px-2 sm:px-4 py-2 flex items-center justify-between shadow-md max-w-full overflow-x-hidden">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to="/customer" className="flex items-center group">
            <WipeitLogo size="sm" variant="light" className="brightness-125" />
          </Link>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          <Link
            to="/customer"
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold shrink-0 transition-all ${
              location.pathname.startsWith('/customer')
                ? 'bg-[#0088FF] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Customer App</span>
            {activeBooking && (
              <span className="w-2 h-2 rounded-full bg-[#F5B000] animate-ping" />
            )}
          </Link>

          <Link
            to="/partner"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold shrink-0 transition-all ${
              location.pathname.startsWith('/partner')
                ? 'bg-[#0088FF] text-white shadow-xs'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Partner</span>
          </Link>

          <Link
            to="/admin"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold shrink-0 transition-all ${
              location.pathname.startsWith('/admin')
                ? 'bg-[#0088FF] text-white shadow-xs'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>

          <button
            onClick={resetDemoData}
            title="Reset Demo Data"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] shrink-0 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 flex flex-col max-w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
