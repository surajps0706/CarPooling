import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Wrench,
  AlertTriangle,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { getStatusBadgeVariant, formatCurrency } from '../../utils/formatters';
import { Booking } from '../../types';

export const AdminOverviewView: React.FC = () => {
  const { bookings, partners, updateBookingStatus } = useBooking();

  const totalBookingsToday = bookings.length;
  const totalRevenueToday = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const activePartnersCount = partners.filter((p) => p.isAvailable).length;
  const unassignedBookings = bookings.filter((b) => b.status === 'CONFIRMED' && !b.partnerId);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('');

  const handleAssignPartner = () => {
    if (!selectedBooking || !selectedPartnerId) return;
    updateBookingStatus(selectedBooking.id, 'ACCEPTED');
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#18181B] tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-[#6B7280]">Real-time business performance and operational status.</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Export Summary (CSV)
          </Button>
          <Button size="sm">
            + New Manual Booking
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Today's Bookings</span>
            <div className="p-2 bg-blue-50 text-[#2457FF] rounded-xl">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#18181B]">{totalBookingsToday}</div>
          <div className="text-[11px] text-[#17A34A] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% from yesterday
          </div>
        </Card>

        <Card className="p-4 space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Gross Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#18181B]">{formatCurrency(totalRevenueToday)}</div>
          <div className="text-[11px] text-[#17A34A] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18% weekly growth
          </div>
        </Card>

        <Card className="p-4 space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Active Technicians</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#18181B]">{activePartnersCount} / {partners.length}</div>
          <div className="text-[11px] text-[#6B7280]">100% On-time dispatch rate</div>
        </Card>

        <Card className="p-4 space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Unassigned Jobs</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">{unassignedBookings.length}</div>
          <div className="text-[11px] text-amber-700 font-medium">Requires immediate manual dispatch</div>
        </Card>
      </div>

      {/* Main Grid: Revenue Graph & Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Analytics Chart Visualizer */}
        <Card className="lg:col-span-8 p-5 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#18181B]">Revenue & Booking Velocity</h3>
              <p className="text-xs text-[#6B7280]">Daily revenue distribution across service categories</p>
            </div>
            <select className="text-xs border border-[#E5E7EB] rounded-lg px-2 py-1 bg-white focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* Bar Graph Simulation */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-[#E5E7EB]">
            {[
              { day: 'Mon', rev: 42000, height: '55%' },
              { day: 'Tue', rev: 51000, height: '65%' },
              { day: 'Wed', rev: 64000, height: '80%' },
              { day: 'Thu', rev: 58000, height: '72%' },
              { day: 'Fri', rev: 78450, height: '95%' },
              { day: 'Sat', rev: 89000, height: '100%' },
              { day: 'Sun', rev: 72000, height: '88%' }
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-[#2457FF] rounded-t-lg group-hover:bg-[#1D46D8] transition-all relative"
                  style={{ height: bar.height }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#18181B] text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap">
                    ₹{bar.rev}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#6B7280]">{bar.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Operational Alerts Feed */}
        <Card className="lg:col-span-4 p-5 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#18181B]">Live Operations Feed</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Unassigned Job Alert
              </div>
              <p className="text-[11px]">Booking #ACP-20905 in Whitefield unassigned &gt; 10 mins.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F4F5F7] text-[#18181B] space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17A34A]" />
                Service Completed
              </div>
              <p className="text-[11px] text-[#6B7280]">Rahul Verma completed Premium Wash for Arjun Mehta (#ACP-20901).</p>
            </div>

            <div className="p-3 rounded-xl bg-[#F4F5F7] text-[#18181B] space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#2457FF]" />
                New Gold Subscription
              </div>
              <p className="text-[11px] text-[#6B7280]">Rohit Kapoor subscribed to Gold Executive annual plan.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Bookings Data Table */}
      <Card className="p-5 space-y-4 bg-white overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#18181B]">Recent Live Bookings Ledger</h3>
          <span className="text-xs text-[#6B7280]">{bookings.length} Bookings Total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider font-semibold">
                <th className="pb-3 pr-4">Ref ID</th>
                <th className="pb-3 px-4">Customer</th>
                <th className="pb-3 px-4">Vehicle</th>
                <th className="pb-3 px-4">Service</th>
                <th className="pb-3 px-4">Partner</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 text-right">Amount</th>
                <th className="pb-3 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {bookings.map((b) => {
                const badge = getStatusBadgeVariant(b.status);

                return (
                  <tr key={b.id} className="hover:bg-[#F4F5F7]/50 transition-colors">
                    <td className="py-3 pr-4 font-mono font-bold text-[#18181B]">#{b.bookingRef}</td>
                    <td className="py-3 px-4 font-semibold text-[#18181B]">{b.customerName}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{b.vehicle.make} {b.vehicle.model}</td>
                    <td className="py-3 px-4 font-medium text-[#18181B]">{b.service.name}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{b.partner?.fullName || 'Unassigned'}</td>
                    <td className="py-3 px-4">
                      <Badge variant={b.status === 'COMPLETED' ? 'success' : 'warning'}>
                        {badge.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#18181B]">₹{b.totalAmount}</td>
                    <td className="py-3 pl-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setSelectedPartnerId(b.partnerId || partners[0].id);
                        }}
                        className="text-xs font-semibold text-[#2457FF] hover:underline"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Booking Management Drawer Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Manage Booking #${selectedBooking?.bookingRef}`}
      >
        {selectedBooking && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#F4F5F7] p-3 rounded-xl space-y-1">
              <div className="font-bold text-[#18181B] text-sm">{selectedBooking.service.name}</div>
              <div className="text-[#6B7280]">Customer: {selectedBooking.customerName} ({selectedBooking.customerPhone})</div>
              <div className="text-[#6B7280]">Vehicle: {selectedBooking.vehicle.make} {selectedBooking.vehicle.model} ({selectedBooking.vehicle.registrationNumber})</div>
              <div className="text-[#6B7280]">Location: {selectedBooking.customerAddress.line1}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1 uppercase">Reassign Technician Partner</label>
              <select
                value={selectedPartnerId}
                onChange={(e) => setSelectedPartnerId(e.target.value)}
                className="w-full h-11 bg-white border border-[#E5E7EB] rounded-xl px-3 text-xs focus:outline-none"
              >
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.specialization} • ★ {p.rating})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <Button fullWidth onClick={handleAssignPartner}>
                Confirm Partner Assignment & Update Status
              </Button>
              <Button fullWidth variant="destructive" onClick={() => {
                updateBookingStatus(selectedBooking.id, 'CANCELLED_BY_ADMIN');
                setSelectedBooking(null);
              }}>
                Cancel Booking & Refund Customer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
