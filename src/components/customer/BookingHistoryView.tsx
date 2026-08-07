import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Download, RefreshCw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const BookingHistoryView: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = bookings.filter(
    (b) => !['COMPLETED', 'CANCELLED_BY_CUSTOMER', 'REFUNDED'].includes(b.status)
  );

  const pastBookings = bookings.filter((b) =>
    ['COMPLETED', 'CANCELLED_BY_CUSTOMER', 'REFUNDED'].includes(b.status)
  );

  const activeList = tab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <h2 className="text-base font-bold text-[#18181B]">My Bookings</h2>
        <span className="text-xs text-[#6B7280]">{bookings.length} Total</span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex rounded-xl bg-[#F4F5F7] p-1 border border-[#E5E7EB]">
        <button
          onClick={() => setTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            tab === 'upcoming'
              ? 'bg-white text-[#2457FF] shadow-xs'
              : 'text-[#6B7280] hover:text-[#18181B]'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setTab('past')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            tab === 'past'
              ? 'bg-white text-[#2457FF] shadow-xs'
              : 'text-[#6B7280] hover:text-[#18181B]'
          }`}
        >
          History ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {activeList.length > 0 ? (
          activeList.map((b) => {
            const badge = getStatusBadgeVariant(b.status);

            return (
              <Card key={b.id} hoverable className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#18181B]">#{b.bookingRef}</span>
                  <Badge variant={b.status === 'COMPLETED' ? 'success' : 'warning'}>
                    {badge.label}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#18181B]">{b.service.name}</h4>
                  <p className="text-xs text-[#6B7280]">
                    {b.vehicle.make} {b.vehicle.model} ({b.vehicle.registrationNumber})
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2457FF]" />
                    <span>{b.scheduledDate} • {b.scheduledSlot}</span>
                  </div>
                  <span className="font-bold text-sm text-[#18181B]">₹{b.totalAmount}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {tab === 'upcoming' ? (
                    <Button
                      fullWidth
                      size="sm"
                      onClick={() => navigate('/customer/tracking')}
                    >
                      Track Progress →
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate('/customer/catalog')}
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1" />
                      Re-book Service
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#E5E7EB] space-y-3">
            <p className="text-xs text-[#6B7280]">No bookings found in this category.</p>
            <Button size="sm" onClick={() => navigate('/customer/catalog')}>
              Book Service Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
