import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

export const AdminRevenueView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#18181B]">Revenue & Finance Audit</h1>
        <p className="text-xs text-[#6B7280]">Financial ledger, payment gateway breakdowns, and partner payout management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1 bg-white">
          <div className="text-xs text-[#6B7280]">Monthly Gross Revenue</div>
          <div className="text-2xl font-bold text-[#18181B]">{formatCurrency(248500)}</div>
        </Card>
        <Card className="p-4 space-y-1 bg-white">
          <div className="text-xs text-[#6B7280]">Partner Payout Pool (75%)</div>
          <div className="text-2xl font-bold text-[#17A34A]">{formatCurrency(186375)}</div>
        </Card>
        <Card className="p-4 space-y-1 bg-white">
          <div className="text-xs text-[#6B7280]">Platform Gross Margin (25%)</div>
          <div className="text-2xl font-bold text-[#2457FF]">{formatCurrency(62125)}</div>
        </Card>
      </div>

      <Card className="p-5 bg-white space-y-3">
        <h3 className="font-bold text-sm text-[#18181B]">Weekly Partner Payout Status</h3>
        <div className="divide-y divide-[#E5E7EB] text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#18181B]">Rahul Verma</span>
              <span className="text-[#6B7280] ml-2">• 14 Jobs Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#18181B]">₹8,450</span>
              <Badge variant="success">PAID</Badge>
            </div>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#18181B]">Suresh Kumar</span>
              <span className="text-[#6B7280] ml-2">• 18 Jobs Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#18181B]">₹6,240</span>
              <Badge variant="success">PAID</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
