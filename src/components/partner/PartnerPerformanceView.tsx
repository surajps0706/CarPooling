import React from 'react';
import { Star, Award, ShieldCheck, Clock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { RatingStars } from '../ui/RatingStars';

export const PartnerPerformanceView: React.FC = () => {
  const { activePartner } = useBooking();

  return (
    <div className="p-4 space-y-4">
      {/* Rating Overview */}
      <Card className="p-5 text-center space-y-2 bg-white">
        <div className="text-3xl font-bold text-[#18181B]">★ {activePartner.rating}</div>
        <RatingStars value={Math.round(activePartner.rating)} readonly size="lg" />
        <p className="text-xs text-[#6B7280]">Based on {activePartner.totalRatings} customer ratings this month</p>
      </Card>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 space-y-1">
          <div className="text-xs text-[#6B7280]">Punctuality Score</div>
          <div className="text-2xl font-bold text-[#17A34A]">{activePartner.punctualityScore}%</div>
          <div className="text-[10px] text-[#9CA3AF]">On-time arrival target &gt; 95%</div>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-[#6B7280]">Job Completion Rate</div>
          <div className="text-2xl font-bold text-[#2457FF]">{activePartner.completionRate}%</div>
          <div className="text-[10px] text-[#9CA3AF]">Zero unexcused cancellations</div>
        </Card>
      </div>

      {/* Recent Reviews */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Recent Customer Feedback</h3>
        <Card className="p-3 space-y-2 bg-white">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#18181B]">Arjun Mehta</span>
            <span className="text-amber-500 font-bold">★ 5.0</span>
          </div>
          <p className="text-xs text-[#6B7280]">
            "Rahul was professional, punctual, and the car looks absolutely spotless. Best detailing service I've had!"
          </p>
        </Card>
      </div>
    </div>
  );
};
