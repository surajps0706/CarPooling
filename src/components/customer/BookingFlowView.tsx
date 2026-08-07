import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, CheckCircle2, Tag, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { ServiceItem, AddonItem } from '../../types';
import { MOCK_COUPONS } from '../../constants/mockData';

export const BookingFlowView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeVehicle,
    activeAddress,
    createBooking,
    currentCustomer
  } = useBooking();

  const stateService = (location.state as any)?.service as ServiceItem;
  const stateAddons = ((location.state as any)?.addons as AddonItem[]) || [];

  const service = stateService || {
    id: 'SRV-02',
    name: 'Premium Foam Wash',
    description: 'Deep snow foam bath with gloss shine finish',
    durationMinutes: 45,
    pricing: { sedan: 449 }
  };

  const [step, setStep] = useState<'slot' | 'summary' | 'payment' | 'confirmed'>('slot');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-07');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:30 AM');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  const dateOptions = [
    { date: '2026-08-07', label: 'Today', day: 'Fri' },
    { date: '2026-08-08', label: 'Tomorrow', day: 'Sat' },
    { date: '2026-08-09', label: '09 Aug', day: 'Sun' },
    { date: '2026-08-10', label: '10 Aug', day: 'Mon' }
  ];

  const timeSlots = [
    '08:00 AM - 09:30 AM',
    '10:00 AM - 11:30 AM',
    '12:00 PM - 01:30 PM',
    '02:30 PM - 04:00 PM',
    '04:30 PM - 06:00 PM'
  ];

  const basePrice = service.pricing[activeVehicle.type] || service.pricing.sedan || 449;
  const addonsTotal = stateAddons.reduce((acc, a) => acc + a.price, 0);
  const subtotal = basePrice + addonsTotal;

  // Apply Gold discount or coupon discount
  let memberDiscount = 0;
  if (!appliedCoupon && currentCustomer.membershipTier === 'Gold') {
    memberDiscount = Math.round(subtotal * 0.15);
  }

  const finalDiscount = appliedCoupon ? couponDiscount : memberDiscount;
  const taxable = Math.max(0, subtotal - finalDiscount);
  const taxAmount = Math.round(taxable * 0.18);
  const totalPayable = taxable + taxAmount;

  const handleApplyCoupon = () => {
    const found = MOCK_COUPONS.find((c) => c.code === couponCode.toUpperCase());
    if (found) {
      setAppliedCoupon(found.code);
      let disc = 0;
      if (found.discountType === 'percentage') {
        disc = Math.min((subtotal * found.discountValue) / 100, found.maxDiscountCap || 9999);
      } else {
        disc = found.discountValue;
      }
      setCouponDiscount(disc);
    }
  };

  const handleConfirmPayment = () => {
    const booking = createBooking(
      service as any,
      stateAddons,
      selectedDate,
      selectedSlot,
      paymentMethod,
      appliedCoupon || undefined,
      specialInstructions
    );

    setConfirmedBookingRef(booking.bookingRef);
    setStep('confirmed');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (step === 'confirmed') {
    return (
      <div className="p-4 sm:p-6 text-center space-y-5 pt-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <Badge variant="success" size="md">
            BOOKING CONFIRMED
          </Badge>
          <h2 className="text-xl font-bold text-[#0F172A] mt-2">Your Booking is Scheduled!</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Reference Number: <span className="font-mono font-bold text-[#0F172A]">{confirmedBookingRef}</span>
          </p>
        </div>

        <Card className="p-4 space-y-3 text-left bg-white">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <div className="text-xs font-bold text-[#0F172A]">{service.name}</div>
              <div className="text-[11px] text-[#64748B]">
                For {activeVehicle.make} {activeVehicle.model} ({activeVehicle.registrationNumber})
              </div>
            </div>
            <span className="font-bold text-sm text-[#0F172A]">₹{totalPayable}</span>
          </div>

          <div className="space-y-1.5 text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0088FF] shrink-0" />
              <span>{selectedDate} at {selectedSlot}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0088FF] shrink-0" />
              <span className="truncate">{activeAddress.line1}, {activeAddress.city}</span>
            </div>
          </div>
        </Card>

        <div className="bg-[#E0F2FE] p-4 rounded-2xl text-left border border-[#0088FF]/20 space-y-1">
          <div className="text-xs font-bold text-[#0088FF] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0088FF] animate-ping" />
            Matching Service Partner...
          </div>
          <p className="text-[11px] text-[#64748B]">
            Rahul Verma (4.9 ⭐) is being assigned to your booking. You can track his live location.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Button fullWidth size="lg" onClick={() => navigate('/customer/tracking')}>
            Track Live Partner →
          </Button>
          <Button fullWidth variant="secondary" onClick={() => navigate('/customer')}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5">
      {/* Header Back Step */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
          {step === 'slot' && '1. Select Date & Slot'}
          {step === 'summary' && '2. Review Booking Summary'}
          {step === 'payment' && '3. Complete Payment'}
        </h2>
        <span className="text-xs text-[#64748B] font-mono">Step {step === 'slot' ? '1/3' : step === 'summary' ? '2/3' : '3/3'}</span>
      </div>

      {/* Step 1: Slot Picker */}
      {step === 'slot' && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-2 uppercase tracking-wide">
              Pick Date
            </label>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {dateOptions.map((opt) => (
                <button
                  key={opt.date}
                  onClick={() => setSelectedDate(opt.date)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                    selectedDate === opt.date
                      ? 'border-[#0088FF] bg-[#0088FF] text-white shadow-xs'
                      : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="text-[10px] uppercase font-medium">{opt.day}</div>
                  <div className="text-xs font-bold mt-0.5 whitespace-nowrap">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-2 uppercase tracking-wide">
              Select Time Slot
            </label>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedSlot === slot
                      ? 'border-[#0088FF] bg-[#E0F2FE]/50 text-[#0088FF] font-semibold'
                      : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <Clock className="w-4 h-4 text-[#0088FF] shrink-0" />
                    <span>{slot}</span>
                  </div>
                  {selectedSlot === slot && <Badge variant="accent" size="sm">Selected</Badge>}
                </div>
              ))}
            </div>
          </div>

          <Button fullWidth size="lg" onClick={() => setStep('summary')}>
            Proceed to Summary →
          </Button>
        </div>
      )}

      {/* Step 2: Summary */}
      {step === 'summary' && (
        <div className="space-y-4">
          <Card className="space-y-3">
            <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Booking Details
            </div>
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#0F172A] text-sm">{service.name}</div>
              <div className="text-[#64748B]">Vehicle: {activeVehicle.make} {activeVehicle.model} ({activeVehicle.registrationNumber})</div>
              <div className="text-[#64748B]">Slot: {selectedDate} • {selectedSlot}</div>
              <div className="text-[#64748B] truncate">Address: {activeAddress.line1}, {activeAddress.city}</div>
            </div>
          </Card>

          {/* Add-ons list if any */}
          {stateAddons.length > 0 && (
            <Card className="space-y-2">
              <div className="text-xs font-bold text-[#0F172A]">Selected Add-ons</div>
              {stateAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between text-xs text-[#64748B]">
                  <span>{addon.name}</span>
                  <span className="font-semibold text-[#0F172A]">₹{addon.price}</span>
                </div>
              ))}
            </Card>
          )}

          {/* Coupon Code Field */}
          <Card className="space-y-2">
            <div className="text-xs font-bold text-[#0F172A]">Apply Offer Code</div>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. FIRSTWASH"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={handleApplyCoupon} variant="outline" className="shrink-0">
                Apply
              </Button>
            </div>

            {appliedCoupon && (
              <div className="text-xs text-[#10B981] font-semibold flex items-center gap-1 mt-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Coupon {appliedCoupon} applied (-₹{couponDiscount})</span>
              </div>
            )}
          </Card>

          {/* Special instructions */}
          <Input
            label="Special Instructions (Optional)"
            placeholder="e.g. Please take extra care of front door scratch..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />

          {/* Price Breakdown */}
          <Card className="space-y-2 bg-[#F8FAFC]">
            <div className="flex justify-between text-xs text-[#64748B]">
              <span>Base Service Price</span>
              <span>₹{basePrice}</span>
            </div>
            {addonsTotal > 0 && (
              <div className="flex justify-between text-xs text-[#64748B]">
                <span>Add-ons Total</span>
                <span>₹{addonsTotal}</span>
              </div>
            )}
            {finalDiscount > 0 && (
              <div className="flex justify-between text-xs text-[#10B981] font-semibold">
                <span>Discount Applied</span>
                <span>-₹{finalDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-[#64748B]">
              <span>Taxes (18% GST)</span>
              <span>₹{taxAmount}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2E8F0]">
              <span>Total Payable</span>
              <span>₹{totalPayable}</span>
            </div>
          </Card>

          <Button fullWidth size="lg" onClick={() => setStep('payment')}>
            Proceed to Payment • ₹{totalPayable} →
          </Button>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 'payment' && (
        <div className="space-y-4">
          <Card className="bg-[#0A0F17] text-white p-4">
            <div className="text-xs text-[#94A3B8]">Amount to Pay</div>
            <div className="text-2xl font-bold text-white mt-0.5">₹{totalPayable}</div>
            <div className="text-[11px] text-[#94A3B8] mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              256-Bit Encrypted Secure Transaction
            </div>
          </Card>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide">
              Choose Payment Method
            </label>

            <div
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === 'upi' ? 'border-[#0088FF] bg-[#E0F2FE]/50' : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0088FF] flex items-center justify-center font-bold text-xs shrink-0">
                  UPI
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">UPI (Google Pay, PhonePe, Paytm)</div>
                  <div className="text-[11px] text-[#64748B]">Instant 1-tap app redirect</div>
                </div>
              </div>
              {paymentMethod === 'upi' && <Badge variant="accent" size="sm">Selected</Badge>}
            </div>

            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                paymentMethod === 'card' ? 'border-[#0088FF] bg-[#E0F2FE]/50' : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">Credit / Debit Card</div>
                  <div className="text-[11px] text-[#64748B]">Visa, Mastercard, RuPay</div>
                </div>
              </div>
              {paymentMethod === 'card' && <Badge variant="accent" size="sm">Selected</Badge>}
            </div>
          </div>

          <Button fullWidth size="lg" onClick={handleConfirmPayment}>
            Pay ₹{totalPayable} & Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
};
