import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { INITIAL_CUSTOMERS } from '../../constants/mockData';
import { formatCurrency } from '../../utils/formatters';

export const AdminCustomersView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#18181B]">Customer Registry</h1>
        <p className="text-xs text-[#6B7280]">Registered vehicle owners and membership subscribers.</p>
      </div>

      <Card className="p-5 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider font-semibold">
                <th className="pb-3 pr-4">Customer Name</th>
                <th className="pb-3 px-4">Contact Phone</th>
                <th className="pb-3 px-4">Email</th>
                <th className="pb-3 px-4">Membership Tier</th>
                <th className="pb-3 px-4">Total Bookings</th>
                <th className="pb-3 px-4 text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {INITIAL_CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-[#F4F5F7]/50">
                  <td className="py-3 pr-4 font-bold text-[#18181B] flex items-center gap-3">
                    <img src={c.profilePhotoUrl} alt={c.fullName} className="w-8 h-8 rounded-full object-cover" />
                    {c.fullName}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#6B7280]">{c.phone}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{c.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant="accent">{c.membershipTier || 'None'}</Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#18181B]">{c.totalBookings} Services</td>
                  <td className="py-3 px-4 text-right font-bold text-[#18181B]">{formatCurrency(c.lifetimeSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
