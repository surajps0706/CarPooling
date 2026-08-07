import React from 'react';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const PartnerEarningsView: React.FC = () => {
  const { activePartner, bookings } = useBooking();

  return (
    <div className="p-4 space-y-4">
      {/* Top Total Payout Card */}
      <Card className="p-5 bg-gradient-to-br from-[#18181B] to-[#27272A] text-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Weekly Earnings</span>
          <Badge variant="success" size="sm">Next Payout: Monday</Badge>
        </div>
        <div className="text-3xl font-bold text-emerald-400">₹8,450</div>
        <div className="text-xs text-[#A1A1AA] flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>+14% higher than last week's average</span>
        </div>
      </Card>

      {/* Completed Jobs Payout Ledger */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Completed Jobs Ledger</h3>
        <div className="space-y-2">
          {bookings.map((b) => (
            <Card key={b.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#18181B]">{b.service.name}</div>
                <div className="text-[11px] text-[#6B7280]">{b.customerName} • #{b.bookingRef}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-600">+₹{Math.round(b.totalAmount * 0.75)}</div>
                <div className="text-[10px] text-[#9CA3AF]">75% Partner Share</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
