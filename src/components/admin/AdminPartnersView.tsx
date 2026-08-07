import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { INITIAL_PARTNERS } from '../../constants/mockData';
import { formatCurrency } from '../../utils/formatters';

export const AdminPartnersView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#18181B]">Service Partners (Technicians)</h1>
        <p className="text-xs text-[#6B7280]">Vetted field technicians, branch allocations, and rating performance.</p>
      </div>

      <Card className="p-5 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#6B7280] uppercase tracking-wider font-semibold">
                <th className="pb-3 pr-4">Technician Partner</th>
                <th className="pb-3 px-4">Specialization</th>
                <th className="pb-3 px-4">Branch Zone</th>
                <th className="pb-3 px-4">Rating & Reviews</th>
                <th className="pb-3 px-4">Punctuality %</th>
                <th className="pb-3 px-4 text-right">Today's Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {INITIAL_PARTNERS.map((p) => (
                <tr key={p.id} className="hover:bg-[#F4F5F7]/50">
                  <td className="py-3 pr-4 font-bold text-[#18181B] flex items-center gap-3">
                    <img src={p.profilePhotoUrl} alt={p.fullName} className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500" />
                    <div>
                      <div>{p.fullName}</div>
                      <div className="text-[10px] text-[#6B7280] font-normal">{p.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#18181B] font-medium">{p.specialization}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{p.branch}</td>
                  <td className="py-3 px-4 font-bold text-amber-500">★ {p.rating} ({p.totalRatings})</td>
                  <td className="py-3 px-4 text-[#17A34A] font-semibold">{p.punctualityScore}%</td>
                  <td className="py-3 px-4 text-right font-bold text-[#18181B]">{formatCurrency(p.earningsToday)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
