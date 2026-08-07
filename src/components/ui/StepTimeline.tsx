import React from 'react';
import { Check, Clock, MapPin, Car, Sparkles, ShieldCheck } from 'lucide-react';
import { BookingStatus } from '../../types';

interface StepTimelineProps {
  currentStatus: BookingStatus;
}

export const StepTimeline: React.FC<StepTimelineProps> = ({ currentStatus }) => {
  const steps = [
    { key: 'CONFIRMED', label: 'Confirmed', icon: Check },
    { key: 'ACCEPTED', label: 'Partner Assigned', icon: Clock },
    { key: 'ON_THE_WAY', label: 'On The Way', icon: Car },
    { key: 'ARRIVED', label: 'Arrived', icon: MapPin },
    { key: 'IN_PROGRESS', label: 'In Progress', icon: Sparkles },
    { key: 'COMPLETED', label: 'Completed', icon: ShieldCheck }
  ];

  const statusOrder: Record<string, number> = {
    CONFIRMED: 0,
    ASSIGNED: 1,
    ACCEPTED: 1,
    ON_THE_WAY: 2,
    ARRIVED: 3,
    IN_PROGRESS: 4,
    QUALITY_CHECK: 4,
    COMPLETED: 5
  };

  const currentIndex = statusOrder[currentStatus] ?? 0;

  return (
    <div className="w-full py-3">
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute left-4 right-4 top-4 h-0.5 bg-[#E5E7EB] -z-0">
          <div
            className="h-full bg-[#2457FF] transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-[#2457FF] text-white'
                    : isCurrent
                    ? 'bg-[#2457FF] text-white ring-4 ring-[#2457FF]/20 scale-110'
                    : 'bg-white border-2 border-[#E5E7EB] text-[#9CA3AF]'
                }`}
              >
                <StepIcon className="w-4 h-4" />
              </div>
              <span
                className={`mt-2 text-[10px] font-semibold text-center max-w-[60px] leading-tight ${
                  isCurrent ? 'text-[#2457FF]' : isDone ? 'text-[#18181B]' : 'text-[#9CA3AF]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
