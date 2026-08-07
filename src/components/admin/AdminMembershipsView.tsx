import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MEMBERSHIP_PLANS } from '../../constants/mockData';

export const AdminMembershipsView: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#18181B]">Membership Plans Management</h1>
          <p className="text-xs text-[#6B7280]">Configure recurring Silver, Gold, and Platinum tier benefits.</p>
        </div>
        <Button size="sm">+ Create Plan Tier</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MEMBERSHIP_PLANS.map((plan) => (
          <Card key={plan.id} className="p-4 space-y-3 bg-white">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base text-[#18181B]">{plan.name}</h3>
              <span className="text-lg font-bold text-[#2457FF]">₹{plan.price}/mo</span>
            </div>
            <ul className="text-xs space-y-1 text-[#6B7280]">
              {plan.benefits.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
            <Button fullWidth size="sm" variant="outline">
              Edit Plan Specs
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
