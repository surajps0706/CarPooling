import React, { useState } from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { getStatusBadgeVariant, formatCurrency } from '../../utils/formatters';

export const AdminBookingsView: React.FC = () => {
  const { bookings } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#18181B]">Bookings Management</h1>
          <p className="text-xs text-[#6B7280]">Full audit ledger of all active, completed, and cancelled bookings.</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
          </Button>
          <Button size="sm">
            <Plus className="w-3.5 h-3.5 mr-1" /> Create Manual Booking
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-3 bg-white flex items-center justify-between gap-3">
        <div className="w-72">
          <Input
            placeholder="Search ref, customer..."
            icon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 bg-white border border-[#E5E7EB] rounded-xl text-xs px-3 focus:outline-none"
          >
            <option value="ALL">All Booking Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ON_THE_WAY">On The Way</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED_BY_CUSTOMER">Cancelled</option>
          </select>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="p-5 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider font-semibold">
                <th className="pb-3 pr-4">Ref Number</th>
                <th className="pb-3 px-4">Customer Name</th>
                <th className="pb-3 px-4">Vehicle Details</th>
                <th className="pb-3 px-4">Service Package</th>
                <th className="pb-3 px-4">Slot & Date</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#F4F5F7]/50">
                  <td className="py-3 pr-4 font-mono font-bold text-[#18181B]">#{b.bookingRef}</td>
                  <td className="py-3 px-4 font-semibold text-[#18181B]">{b.customerName}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{b.vehicle.make} {b.vehicle.model} ({b.vehicle.registrationNumber})</td>
                  <td className="py-3 px-4 font-medium text-[#18181B]">{b.service.name}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{b.scheduledDate} • {b.scheduledSlot}</td>
                  <td className="py-3 px-4">
                    <Badge variant={b.status === 'COMPLETED' ? 'success' : 'warning'}>
                      {getStatusBadgeVariant(b.status).label}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-[#18181B]">{formatCurrency(b.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
