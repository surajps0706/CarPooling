import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, Sparkles, Star, ChevronLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MEMBERSHIP_PLANS } from '../../constants/mockData';

export const MembershipView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer } = useBooking();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('PLAN-02'); // Gold

  return (
    <div className="p-4 space-y-4">
      {/* Top Header with Back Button */}
      <div className="flex items-center gap-3 pt-1 pb-1">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:bg-[#F8FAFC] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#0F172A]" />
        </button>
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A] tracking-tight">Wipeit Membership</h2>
          <p className="text-[11px] text-[#64748B]">Exclusive benefits & free washes</p>
        </div>
      </div>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#18181B] to-[#27272A] text-white p-5 rounded-2xl shadow-lg border border-[#3F3F46] space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="accent">
            Current Tier: {currentCustomer.membershipTier || 'Gold Club'}
          </Badge>
          <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">AutoCare Executive Club</h2>
        <p className="text-xs text-[#A1A1AA]">
          Subscribe once, enjoy free monthly washes, priority booking, and 15% off all detailing treatments.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="space-y-4">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-4 space-y-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#2457FF] ring-2 ring-[#2457FF]/15 bg-[#EEF2FF]/30'
                  : 'bg-white hover:border-[#D1D5DB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#18181B]">{plan.name}</h3>
                    {plan.isPopular && <Badge variant="accent">Most Popular</Badge>}
                  </div>
                  <div className="text-xs text-[#6B7280]">{plan.duration} Subscription</div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold text-[#18181B]">₹{plan.price}</span>
                  <span className="text-xs text-[#6B7280]">/mo</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-[#E5E7EB]">
                {plan.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#18181B]">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {isSelected && (
                <Button fullWidth size="md" className="mt-2">
                  Subscribe to {plan.name} • ₹{plan.price}/mo
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
