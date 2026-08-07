import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Smartphone, Wrench, LayoutDashboard, Home, RotateCcw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const { resetDemoData, activeBooking } = useBooking();

  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] flex flex-col font-sans">
      {/* Universal Demo Switcher Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F17] text-white border-b border-[#1E293B] px-4 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/wipeit-logo.png"
              alt="Wipeit"
              className="h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-base tracking-tight text-white">WIPE</span>
                <span className="font-extrabold text-base tracking-tight text-[#F5B000]">IT</span>
              </div>
              <span className="hidden sm:block text-[9px] text-[#0088FF] font-semibold tracking-wider uppercase">
                Drive Clean. Shine Always.
              </span>
            </div>
          </Link>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isLanding
                ? 'bg-[#0088FF] text-white shadow-xs'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Portal</span>
          </Link>

          <Link
            to="/customer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              location.pathname.startsWith('/customer')
                ? 'bg-[#0088FF] text-white shadow-xs'
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              location.pathname.startsWith('/partner')
                ? 'bg-[#0088FF] text-white shadow-xs'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Partner App</span>
          </Link>

          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
