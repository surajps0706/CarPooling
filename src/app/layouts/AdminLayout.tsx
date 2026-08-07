import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Wrench,
  DollarSign,
  Package,
  ShieldCheck,
  Tag,
  BarChart3,
  Bell,
  Settings,
  Search,
  Building2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const AdminLayout: React.FC = () => {
  const { bookings } = useBooking();
  const unassignedCount = bookings.filter((b) => b.status === 'CONFIRMED' && !b.partnerId).length;

  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/bookings', label: 'Bookings', icon: Calendar, badge: unassignedCount ? `${unassignedCount}` : undefined },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    { to: '/admin/partners', label: 'Technicians', icon: Wrench },
    { to: '/admin/revenue', label: 'Revenue & Finance', icon: DollarSign },
    { to: '/admin/catalog', label: 'Service Catalog', icon: Package },
    { to: '/admin/memberships', label: 'Membership Plans', icon: ShieldCheck },
    { to: '/admin/coupons', label: 'Coupons & Offers', icon: Tag },
    { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { to: '/admin/settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <div className="flex-1 bg-[#FAFAF8] flex min-h-[calc(100vh-50px)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
          <img src="/wipeit-logo.png" alt="Wipeit" className="h-10 object-contain" />
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-base tracking-tight text-[#0F172A]">WIPE</span>
              <span className="font-extrabold text-base tracking-tight text-[#F5B000]">IT</span>
            </div>
            <p className="text-[10px] text-[#0088FF] font-semibold uppercase tracking-wider">Admin Operations</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0088FF] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0A0F17] text-white flex items-center justify-center font-bold text-xs">
              WA
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0F172A]">Wipeit Admin</div>
              <div className="text-[10px] text-[#64748B]">admin@wipeit.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search booking ref, customer, phone... (Ctrl+K)"
                className="w-full h-10 pl-9 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:bg-white focus:border-[#0088FF] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-semibold text-[#0284C7]">
              <Building2 className="w-3.5 h-3.5 text-[#0088FF]" />
              <span>Bangalore Central Hub</span>
            </div>

            <button className="relative p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto max-w-[1440px] w-full mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
