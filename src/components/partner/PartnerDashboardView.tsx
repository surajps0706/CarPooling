import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock, CheckCircle2, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const PartnerDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, activePartner, acceptPartnerJob, declinePartnerJob } = useBooking();
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Active or incoming job for partner
  const assignedJobs = bookings.filter(
    (b) => !['COMPLETED', 'CANCELLED_BY_CUSTOMER', 'REFUNDED'].includes(b.status)
  );

  const activeJob = assignedJobs[0] || null;

  return (
    <div className="p-4 space-y-4">
      {/* On-Duty Switcher Banner */}
      <Card className="p-4 bg-[#18181B] text-white flex items-center justify-between">
        <div>
          <div className="text-xs text-[#A1A1AA]">Duty Availability Status</div>
          <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isOnDuty ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`} />
            {isOnDuty ? 'ACTIVE & RECEIVING JOBS' : 'OFF DUTY'}
          </div>
        </div>

        <button
          onClick={() => setIsOnDuty(!isOnDuty)}
          className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
            isOnDuty ? 'bg-emerald-500 justify-end' : 'bg-gray-600 justify-start'
          }`}
        >
          <motion.div layout className="w-6 h-6 rounded-full bg-white shadow-md" />
        </button>
      </Card>

      {/* Today's Earnings Summary */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <Card className="p-3 bg-white">
          <div className="text-[10px] text-[#6B7280] font-semibold uppercase">Today's Earnings</div>
          <div className="text-sm font-bold text-[#18181B] mt-0.5">₹{activePartner.earningsToday}</div>
        </Card>
        <Card className="p-3 bg-white">
          <div className="text-[10px] text-[#6B7280] font-semibold uppercase">Jobs Done</div>
          <div className="text-sm font-bold text-[#18181B] mt-0.5">{activePartner.totalJobsToday} Jobs</div>
        </Card>
        <Card className="p-3 bg-white">
          <div className="text-[10px] text-[#6B7280] font-semibold uppercase">Rating</div>
          <div className="text-sm font-bold text-amber-500 mt-0.5">★ {activePartner.rating}</div>
        </Card>
      </div>

      {/* Incoming / Assigned Jobs Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
        <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
          Scheduled Jobs Queue ({assignedJobs.length})
        </h3>
        <span className="text-xs text-[#2457FF] font-semibold">South Bangalore Zone</span>
      </div>

      {/* Assigned Job Card */}
      {activeJob ? (
        <Card className="p-4 space-y-3 border-l-4 border-l-[#2457FF]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#18181B]">Ref #{activeJob.bookingRef}</span>
            <Badge variant="warning">
              {getStatusBadgeVariant(activeJob.status).label}
            </Badge>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#18181B]">{activeJob.service.name}</h4>
            <p className="text-xs text-[#6B7280]">
              Customer: {activeJob.customerName} • {activeJob.vehicle.make} {activeJob.vehicle.model} ({activeJob.vehicle.registrationNumber})
            </p>
          </div>

          <div className="bg-[#F4F5F7] p-3 rounded-xl space-y-1 text-xs text-[#6B7280]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#2457FF]" />
              <span>Scheduled: {activeJob.scheduledSlot}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#2457FF]" />
              <span className="truncate">{activeJob.customerAddress.line1}, {activeJob.customerAddress.city}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
            <div>
              <div className="text-[10px] text-[#6B7280]">Estimated Payout</div>
              <div className="text-base font-bold text-[#17A34A]">₹{Math.round(activeJob.totalAmount * 0.75)}</div>
            </div>

            <Button
              size="lg"
              onClick={() => navigate('/partner/job')}
            >
              Start Job Workflow <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center bg-white space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h4 className="font-bold text-sm text-[#18181B]">All Assigned Jobs Completed!</h4>
          <p className="text-xs text-[#6B7280]">Stay on duty to receive new dispatched service requests.</p>
        </Card>
      )}
    </div>
  );
};
