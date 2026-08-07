import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MOCK_COUPONS } from '../../constants/mockData';

export const AdminCouponsView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#18181B]">Coupons & Offers</h1>
          <p className="text-xs text-[#6B7280]">Promotional discount code generator and usage logs.</p>
        </div>
        <Button size="sm">+ Create Coupon</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_COUPONS.map((cpn) => (
          <Card key={cpn.id} className="p-4 space-y-2 bg-white">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-sm text-[#2457FF]">{cpn.code}</span>
              <Badge variant="success">Active</Badge>
            </div>
            <h4 className="font-bold text-xs text-[#18181B]">{cpn.title}</h4>
            <p className="text-xs text-[#6B7280]">{cpn.description}</p>
            <div className="text-[11px] text-[#9CA3AF] pt-2 border-t border-[#E5E7EB]">
              Valid until: {cpn.validUntil}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
