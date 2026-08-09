import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Navigation, ShieldCheck, Camera, Star, ChevronLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StepTimeline } from '../ui/StepTimeline';
import { RatingStars } from '../ui/RatingStars';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const BookingTrackingView: React.FC = () => {
  const navigate = useNavigate();
  const { activeBooking, activePartner, rateBooking } = useBooking();
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const booking = activeBooking || {
    id: 'ACP-20901',
    bookingRef: 'ACP-20901',
    status: 'IN_PROGRESS',
    service: { name: 'Premium Foam Wash', durationMinutes: 45 },
    vehicle: { make: 'Honda', model: 'City ZX', registrationNumber: 'KA01CQ5521' },
    partner: activePartner,
    scheduledDate: '2026-08-07',
    scheduledSlot: '10:00 AM - 11:30 AM',
    photos: [
      {
        id: 'PHT-1',
        type: 'before',
        photoUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80'
      }
    ]
  };

  const partner = booking.partner || activePartner;

  const handleRatingSubmit = () => {
    rateBooking(booking.id, rating, reviewText);
    setIsSubmitted(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:bg-[#F8FAFC] transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-[#0F172A]" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-extrabold text-[#0F172A] tracking-tight">Live Service Tracking</h2>
          <p className="text-[11px] text-[#64748B]">Ref: #{booking.bookingRef}</p>
        </div>
        <Badge variant="warning">
          {getStatusBadgeVariant(booking.status).label}
        </Badge>
      </div>

      {/* Simulated Live Vector Map Area */}
      <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-inner flex items-center justify-center">
        {/* Map Vector Graphic Simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Route Line Simulation */}
        <svg className="absolute inset-0 w-full h-full stroke-blue-500 stroke-2" fill="none">
          <path d="M 60 140 Q 180 80 320 60" strokeDasharray="6 6" className="animate-pulse" />
        </svg>

        {/* Customer Location Marker */}
        <div className="absolute top-12 right-16 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-4 ring-blue-600/30">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded mt-1">
            Your Location
          </span>
        </div>

        {/* Moving Partner Marker */}
        <div className="absolute bottom-10 left-16 flex flex-col items-center animate-bounce">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-500/30">
            <Navigation className="w-5 h-5 rotate-45" />
          </div>
          <span className="text-[9px] font-bold text-white bg-slate-900/90 px-1.5 py-0.5 rounded mt-1">
            Partner Rahul (2.4 km)
          </span>
        </div>
      </div>

      {/* Status Timeline */}
      <Card className="p-3 bg-white">
        <StepTimeline currentStatus={booking.status as any} />
      </Card>

      {/* Partner Info & Masked Calling Card */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={partner.profilePhotoUrl}
              alt={partner.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#2457FF]"
            />
            <div>
              <div className="text-sm font-bold text-[#18181B]">{partner.fullName}</div>
              <div className="text-xs text-[#6B7280]">{partner.vehicleAssigned}</div>
              <div className="text-xs font-semibold text-amber-500 mt-0.5">
                ★ {partner.rating} ({partner.totalRatings} services done)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-100 text-[#2457FF] flex items-center justify-center hover:bg-blue-200 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Before / After Photo Audit Section */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#2457FF]" />
            <span className="text-xs font-bold text-[#18181B]">Service Photos Audit</span>
          </div>
          <span className="text-[11px] text-[#6B7280]">{booking.photos?.length || 0} Uploaded</span>
        </div>

        {booking.photos && booking.photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {booking.photos.map((photo: any) => (
              <div key={photo.id} className="relative rounded-xl overflow-hidden group">
                <img src={photo.photoUrl} alt="Service photo" className="w-full h-28 object-cover" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded uppercase">
                  {photo.type} • {photo.angleLabel}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#9CA3AF] italic">
            Photos will appear here as partner uploads before/after verification.
          </p>
        )}
      </Card>

      {/* Rating & Review Box if Service Completed */}
      {booking.status === 'COMPLETED' && !isSubmitted && (
        <Card className="p-4 space-y-3 bg-[#EEF2FF]/50 border-[#2457FF]/30">
          <div className="text-xs font-bold text-[#18181B]">Rate Your Service Experience</div>
          <RatingStars value={rating} onChange={(r) => setRating(r)} size="lg" />
          <textarea
            placeholder="Write your feedback..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#18181B] focus:outline-none"
            rows={2}
          />
          <Button fullWidth onClick={handleRatingSubmit}>
            Submit Service Rating
          </Button>
        </Card>
      )}

      {isSubmitted && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold text-center">
          Thank you! Your rating has been submitted.
        </div>
      )}
    </div>
  );
};
