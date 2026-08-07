import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Check, MapPin, Navigation, Phone, ShieldCheck, Sparkles, CheckCircle2, Upload } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const PartnerJobExecutionView: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeBooking,
    activePartner,
    updateBookingStatus,
    addBookingPhoto,
    completeChecklistItem
  } = useBooking();

  const booking = activeBooking || {
    id: 'ACP-20901',
    bookingRef: 'ACP-20901',
    status: 'ACCEPTED',
    service: {
      name: 'Premium Foam Wash',
      checklist: [
        'Perform initial paint inspection',
        'Foam cannon coverage',
        'Wheel & rim detail brush wash',
        'Microfiber hand dry',
        'Apply tire shine'
      ]
    },
    vehicle: { make: 'Honda', model: 'City ZX', registrationNumber: 'KA01CQ5521', color: 'Pearl White' },
    customerName: 'Arjun Mehta',
    customerPhone: '+91 98765 43210',
    customerAddress: { line1: '14B, Brigade Millennium Apartments', city: 'Bangalore' },
    checklistCompleted: [],
    photos: []
  };

  const currentStatus = booking.status;
  const [selectedAngle, setSelectedAngle] = useState<'front' | 'rear' | 'left' | 'right'>('front');

  // Simulated photo assets
  const samplePhotos: Record<string, string> = {
    front: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
    rear: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    left: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80',
    right: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80'
  };

  const handleUploadPhoto = (type: 'before' | 'after') => {
    const url = samplePhotos[selectedAngle];
    addBookingPhoto(booking.id, type, url, selectedAngle);
  };

  const handleNextStage = () => {
    if (currentStatus === 'CONFIRMED' || currentStatus === 'ASSIGNED') {
      updateBookingStatus(booking.id, 'ACCEPTED');
    } else if (currentStatus === 'ACCEPTED') {
      updateBookingStatus(booking.id, 'ON_THE_WAY');
    } else if (currentStatus === 'ON_THE_WAY') {
      updateBookingStatus(booking.id, 'ARRIVED');
    } else if (currentStatus === 'ARRIVED') {
      updateBookingStatus(booking.id, 'IN_PROGRESS');
    } else if (currentStatus === 'IN_PROGRESS') {
      updateBookingStatus(booking.id, 'QUALITY_CHECK');
    } else if (currentStatus === 'QUALITY_CHECK') {
      updateBookingStatus(booking.id, 'COMPLETED');
      navigate('/partner');
    }
  };

  const checklist = booking.service.checklist || [
    'Perform initial paint inspection',
    'Foam cannon coverage',
    'Microfiber hand dry',
    'Apply tire shine'
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Top Job Status Control Bar */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
        <div>
          <span className="text-[10px] font-mono text-[#6B7280]">Ref #{booking.bookingRef}</span>
          <h2 className="text-base font-bold text-[#18181B]">{booking.service.name}</h2>
        </div>
        <Badge variant="warning">
          {getStatusBadgeVariant(currentStatus).label}
        </Badge>
      </div>

      {/* Customer Contact & Location Box */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#18181B]">{booking.customerName}</div>
            <div className="text-xs text-[#6B7280]">
              {booking.vehicle.make} {booking.vehicle.model} • <span className="font-mono font-bold text-[#18181B]">{booking.vehicle.registrationNumber}</span>
            </div>
          </div>

          <a
            href={`tel:${booking.customerPhone}`}
            className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <div className="bg-[#F4F5F7] p-2.5 rounded-xl flex items-center gap-2 text-xs text-[#6B7280]">
          <MapPin className="w-4 h-4 text-[#2457FF] shrink-0" />
          <span className="truncate">{booking.customerAddress.line1}, {booking.customerAddress.city}</span>
        </div>
      </Card>

      {/* Workflow Stage 1: Accepted / On The Way Map Navigation */}
      {(currentStatus === 'ACCEPTED' || currentStatus === 'ON_THE_WAY') && (
        <Card className="p-4 space-y-3 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#2457FF] flex items-center justify-center mx-auto">
            <Navigation className="w-6 h-6 rotate-45" />
          </div>
          <h4 className="font-bold text-sm text-[#18181B]">
            {currentStatus === 'ACCEPTED' ? 'Job Accepted!' : 'Navigation to Customer Location'}
          </h4>
          <p className="text-xs text-[#6B7280]">
            Destination: {booking.customerAddress.line1}
          </p>

          <Button fullWidth size="lg" onClick={handleNextStage}>
            {currentStatus === 'ACCEPTED' ? 'Start Navigation (On The Way) →' : 'I Have Arrived at Location →'}
          </Button>
        </Card>
      )}

      {/* Workflow Stage 2: Arrived & Before Photos Capture */}
      {currentStatus === 'ARRIVED' && (
        <Card className="p-4 space-y-4">
          <div>
            <h4 className="font-bold text-sm text-[#18181B] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#2457FF]" />
              Capture Mandatory BEFORE Photos
            </h4>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Upload photos of vehicle condition before starting foam wash:
            </p>
          </div>

          {/* Angle Picker */}
          <div className="grid grid-cols-4 gap-2">
            {(['front', 'rear', 'left', 'right'] as const).map((angle) => (
              <button
                key={angle}
                onClick={() => setSelectedAngle(angle)}
                className={`py-2 text-xs font-bold rounded-xl uppercase border transition-all ${
                  selectedAngle === angle
                    ? 'border-[#2457FF] bg-[#2457FF] text-white'
                    : 'border-[#E5E7EB] bg-white text-[#6B7280]'
                }`}
              >
                {angle}
              </button>
            ))}
          </div>

          <Button fullWidth variant="outline" onClick={() => handleUploadPhoto('before')}>
            <Upload className="w-4 h-4 mr-2" /> Upload Photo for {selectedAngle.toUpperCase()}
          </Button>

          {/* Uploaded Photos Preview */}
          {booking.photos && booking.photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pt-2">
              {booking.photos.map((p: any) => (
                <img key={p.id} src={p.photoUrl} alt="Photo" className="w-20 h-20 rounded-xl object-cover shrink-0" />
              ))}
            </div>
          )}

          <Button fullWidth size="lg" onClick={handleNextStage}>
            Confirm Before Photos & Start Service →
          </Button>
        </Card>
      )}

      {/* Workflow Stage 3: Service In Progress Checklist */}
      {(currentStatus === 'IN_PROGRESS' || currentStatus === 'QUALITY_CHECK') && (
        <Card className="p-4 space-y-4">
          <div>
            <h4 className="font-bold text-sm text-[#18181B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2457FF]" />
              Service Task Checklist
            </h4>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Check off tasks as you perform them:
            </p>
          </div>

          <div className="space-y-2">
            {checklist.map((item, idx) => {
              const isChecked = booking.checklistCompleted?.includes(item);

              return (
                <div
                  key={idx}
                  onClick={() => completeChecklistItem(booking.id, item)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold'
                      : 'border-[#E5E7EB] bg-white text-[#18181B]'
                  }`}
                >
                  <span className="text-xs">{item}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-[#D1D5DB]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          {currentStatus === 'IN_PROGRESS' && (
            <Button fullWidth size="lg" onClick={handleNextStage}>
              Proceed to Quality Check & After Photos →
            </Button>
          )}

          {currentStatus === 'QUALITY_CHECK' && (
            <div className="space-y-3 pt-2">
              <Button fullWidth variant="outline" onClick={() => handleUploadPhoto('after')}>
                <Upload className="w-4 h-4 mr-2" /> Upload AFTER Photo
              </Button>
              <Button fullWidth size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleNextStage}>
                <CheckCircle2 className="w-5 h-5 mr-2" /> Finish & Complete Booking
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
