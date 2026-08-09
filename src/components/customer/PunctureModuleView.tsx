import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Camera,
  AlertTriangle,
  Zap,
  Clock,
  Check,
  ChevronLeft,
  Navigation,
  Upload,
  Info,
  Shield,
  PhoneCall,
  X
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TyreType, PunctureProblemType, Booking, ServiceItem } from '../../types';
import { SERVICE_ITEMS } from '../../constants/mockData';

export const PunctureModuleView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, activeAddress, addDirectBooking, vehicles, activeVehicle } = useBooking();

  // 1. Vehicle Selection state (default to current active vehicle type or car)
  const [vehicleCategory, setVehicleCategory] = useState<'car' | 'bike'>(
    activeVehicle?.type === 'bike' ? 'bike' : 'car'
  );

  // 2. Tyre Type state (Tubeless, Tube Type, Run-Flat)
  const [tyreType, setTyreType] = useState<TyreType>('tubeless');

  // 3. Problem selection state
  const [selectedProblem, setSelectedProblem] = useState<PunctureProblemType>('puncture');

  // 4. Location state (Current Location, Select on Map, Enter Address)
  const [locationType, setLocationType] = useState<'current' | 'map' | 'address'>('current');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [mapPinCoords, setMapPinCoords] = useState<{ lat: number; lng: number }>({
    lat: activeAddress?.latitude || 12.892,
    lng: activeAddress?.longitude || 77.584
  });
  const [isPinMoved, setIsPinMoved] = useState(false);

  // 5. Photo Upload state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 6. Urgency state (Emergency SOS vs Normal Scheduled)
  const [isEmergency, setIsEmergency] = useState<boolean>(true);

  // Handle vehicle type toggle & reset run-flat if bike
  const handleSelectVehicleCategory = (cat: 'car' | 'bike') => {
    setVehicleCategory(cat);
    if (cat === 'bike' && tyreType === 'run_flat') {
      setTyreType('tubeless');
    }
  };

  // Pricing calculations
  const getProblemPrice = () => {
    let base = vehicleCategory === 'car' ? 249 : 149;
    switch (selectedProblem) {
      case 'puncture': base += 0; break;
      case 'air_leak': base += 50; break;
      case 'valve_problem': base += 80; break;
      case 'tyre_removal': base += 100; break;
      case 'tyre_replacement': base += 150; break;
    }
    if (tyreType === 'run_flat') base += 100;
    if (isEmergency) base += 50; // Express emergency dispatch charge
    return base;
  };

  const calculatedPrice = getProblemPrice();

  // Photo upload handlers
  const handleSimulatedPhotoUpload = (sampleUrl: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setPhotoUrl(sampleUrl);
      setIsUploading(false);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Puncture Booking submission
  const handleBookPunctureService = () => {
    // Find matching Puncture ServiceItem or create custom fallback
    const targetSrvId = vehicleCategory === 'car' ? 'SRV-CAR-12' : 'SRV-BK-11';
    const foundSrv = SERVICE_ITEMS.find((s) => s.id === targetSrvId);

    const problemLabels: Record<PunctureProblemType, string> = {
      puncture: 'Puncture Plug / Patch Repair',
      air_leak: 'Tyre Air Leak Inspection',
      valve_problem: 'Tyre Valve Core Repair',
      tyre_removal: 'Tyre Removal & Wheel Service',
      tyre_replacement: 'Tyre Replacement / Spare Swap'
    };

    const serviceItem: ServiceItem = foundSrv || {
      id: targetSrvId,
      categoryId: vehicleCategory === 'car' ? 'CAT-CAR-12' : 'CAT-BK-11',
      name: `${vehicleCategory === 'car' ? 'Four Wheeler' : 'Two Wheeler'} Puncture Service`,
      slug: 'puncture-service',
      description: problemLabels[selectedProblem],
      durationMinutes: 20,
      vehicleTypes: [vehicleCategory === 'car' ? 'sedan' : 'bike'],
      pricing: { hatchback: calculatedPrice, sedan: calculatedPrice, suv: calculatedPrice, muv: calculatedPrice, bike: calculatedPrice, truck: calculatedPrice },
      inclusions: ['On-site technician dispatch', 'Air pressure check & inflation', 'Valve & leak check'],
      checklist: ['Locate leak', 'Perform repair', 'Inflate to PSI'],
      minPhotosBefore: 1,
      minPhotosAfter: 1,
      heroImage: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80'
    };

    const selectedVeh = vehicles.find((v) =>
      vehicleCategory === 'car' ? v.type !== 'bike' : v.type === 'bike'
    ) || activeVehicle;

    let targetLocationAddress = activeAddress ? `${activeAddress.line1}, ${activeAddress.city}` : 'JP Nagar 7th Phase, Bangalore';
    if (locationType === 'address' && customAddress.trim()) {
      targetLocationAddress = customAddress;
    } else if (locationType === 'map') {
      targetLocationAddress = `Pin Drop: (${mapPinCoords.lat.toFixed(4)}, ${mapPinCoords.lng.toFixed(4)}) Near Outer Ring Road`;
    }

    const newBooking: Booking = {
      id: `BK-PUNC-${Date.now().toString().slice(-5)}`,
      bookingRef: `WP-PNC${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: currentCustomer.id,
      customerName: currentCustomer.fullName,
      customerPhone: currentCustomer.phone,
      customerAddress: {
        ...activeAddress,
        line1: targetLocationAddress
      },
      vehicle: selectedVeh,
      service: serviceItem,
      addons: [],
      scheduledDate: 'Today',
      scheduledSlot: isEmergency ? 'IMMEDIATE SOS (15-20 Min ETA)' : 'Next Available Slot (30 Mins)',
      status: 'CONFIRMED',
      subtotal: calculatedPrice,
      discountAmount: 0,
      taxAmount: Math.round(calculatedPrice * 0.18),
      totalAmount: Math.round(calculatedPrice * 1.18),
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      photos: photoUrl ? [{ id: 'P1', bookingId: 'BK-PUNC', type: 'before', angleLabel: 'other', photoUrl, uploadedAt: new Date().toISOString() }] : [],
      checklistCompleted: [],
      createdAt: new Date().toISOString(),
      partnerId: 'PRTNR-001',
      partner: {
        id: 'PRTNR-001',
        fullName: 'Rahul Verma',
        phone: '+91 94443 21111',
        profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 4.9,
        totalRatings: 184,
        completionRate: 99.2,
        punctualityScore: 98.5,
        specialization: 'Emergency Puncture & Mobile Tyre Specialist',
        vehicleAssigned: 'Honda Activa 6G • KA03EQ1122',
        isAvailable: true,
        currentLatitude: mapPinCoords.lat + 0.005,
        currentLongitude: mapPinCoords.lng + 0.005,
        totalJobsToday: 5,
        earningsToday: 2150,
        branch: 'South Bangalore Rapid Response Unit'
      },
      punctureDetails: {
        vehicleCategory,
        tyreType,
        problem: selectedProblem,
        locationType,
        locationAddress: targetLocationAddress,
        photoUrl: photoUrl || undefined,
        isEmergency
      }
    };

    addDirectBooking(newBooking);
    navigate('/customer/tracking');
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-28">
      {/* Header Bar */}
      <div className="bg-[#0F172A] text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full bg-[#1E293B] hover:bg-[#334155] text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center justify-center gap-1.5">
              <span>🚨</span> PUNCTURE ASSISTANCE
            </h1>
            <p className="text-[10px] text-[#94A3B8]">Doorstep & Highway On-Demand Tyre Repair</p>
          </div>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Urgent Emergency SOS Banner */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white p-3.5 rounded-2xl shadow-lg relative overflow-hidden flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-yellow-300">
                24/7 Rapid Emergency Response
              </span>
            </div>
            <p className="text-xs font-medium text-red-50">Technicians arrive in ~15-20 Mins at your location</p>
          </div>
          <Zap className="w-8 h-8 text-yellow-300 animate-bounce shrink-0" />
        </div>

        {/* STEP 1: Select Vehicle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">1</span>
            Select Vehicle
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSelectVehicleCategory('car')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                vehicleCategory === 'car'
                  ? 'border-[#0088FF] bg-blue-50/50 shadow-md'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              {vehicleCategory === 'car' && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0088FF] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-3xl">🚗</span>
              <div className="text-center">
                <span className="font-bold text-sm text-[#0F172A] block">Four Wheeler</span>
                <span className="text-[10px] text-[#64748B]">Car / SUV / Sedan</span>
              </div>
            </button>

            <button
              onClick={() => handleSelectVehicleCategory('bike')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                vehicleCategory === 'bike'
                  ? 'border-[#059669] bg-emerald-50/50 shadow-md'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              {vehicleCategory === 'bike' && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#059669] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-3xl">🏍️</span>
              <div className="text-center">
                <span className="font-bold text-sm text-[#0F172A] block">Two Wheeler</span>
                <span className="text-[10px] text-[#64748B]">Bike / Scooter</span>
              </div>
            </button>
          </div>
        </div>

        {/* STEP 2: Select Tyre Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">2</span>
            Select Tyre Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTyreType('tubeless')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                tyreType === 'tubeless'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
              }`}
            >
              🛡️ Tubeless
            </button>
            <button
              onClick={() => setTyreType('tube_type')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                tyreType === 'tube_type'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
              }`}
            >
              ⭕ Tube Type
            </button>
            {vehicleCategory === 'car' ? (
              <button
                onClick={() => setTyreType('run_flat')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  tyreType === 'run_flat'
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                }`}
              >
                ⚡ Run-Flat
              </button>
            ) : (
              <div className="py-2.5 px-3 rounded-xl border text-xs font-medium text-[#94A3B8] bg-[#F8FAFC] border-dashed border-[#CBD5E1] text-center flex items-center justify-center">
                N/A for Bike
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: Select Problem */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">3</span>
            Select Problem
          </label>
          <div className="space-y-2">
            {[
              { id: 'puncture', title: 'Puncture', desc: 'Plug strip / tube rubber patch repair', icon: '🛠️' },
              { id: 'air_leak', title: 'Tyre Air Leak', desc: 'Slow pressure loss inspection & bead seal', icon: '💨' },
              { id: 'valve_problem', title: 'Valve Problem', desc: 'Broken valve stem / core replace', icon: '🔧' },
              { id: 'tyre_removal', title: 'Tyre Removal', desc: 'Jack up vehicle & unbolt wheel rim', icon: '🏎️' },
              { id: 'tyre_replacement', title: 'Tyre Replacement', desc: 'Spare tire fitment or new tire replacement', icon: '🔄' }
            ].map((prob) => {
              const isSelected = selectedProblem === prob.id;
              return (
                <div
                  key={prob.id}
                  onClick={() => setSelectedProblem(prob.id as PunctureProblemType)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#0088FF] bg-blue-50/40 shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{prob.icon}</span>
                    <div>
                      <span className="font-bold text-xs text-[#0F172A] block">{prob.title}</span>
                      <span className="text-[11px] text-[#64748B]">{prob.desc}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-[#0088FF] bg-[#0088FF] text-white' : 'border-[#CBD5E1]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Location */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">4</span>
            Location
          </label>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 space-y-3">
            {/* Location mode sub-tabs */}
            <div className="bg-[#F1F5F9] p-1 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setLocationType('current')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  locationType === 'current' ? 'bg-white text-[#0088FF] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                🎯 Current Location
              </button>
              <button
                onClick={() => setLocationType('map')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  locationType === 'map' ? 'bg-white text-[#0088FF] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                🗺️ Select on Map
              </button>
              <button
                onClick={() => setLocationType('address')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  locationType === 'address' ? 'bg-white text-[#0088FF] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                ✍️ Enter Address
              </button>
            </div>

            {/* Current Location view */}
            {locationType === 'current' && (
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <Navigation className="w-5 h-5 text-[#0088FF] shrink-0 mt-0.5 animate-pulse" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0F172A]">Detected GPS Location</span>
                    <Badge variant="accent" size="sm">GPS Active</Badge>
                  </div>
                  <p className="text-xs text-[#475569] mt-1 font-medium">
                    {activeAddress ? `${activeAddress.line1}, ${activeAddress.landmark}, ${activeAddress.city}` : 'JP Nagar 7th Phase, Bangalore (Lat: 12.892, Lng: 77.584)'}
                  </p>
                </div>
              </div>
            )}

            {/* Map Simulator view */}
            {locationType === 'map' && (
              <div className="space-y-2">
                <div className="relative h-44 rounded-xl bg-slate-200 overflow-hidden border border-[#CBD5E1] shadow-inner flex items-center justify-center bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
                  {/* Visual simulated road map grid */}
                  <div className="absolute inset-0 bg-blue-900/10 flex flex-col justify-around opacity-40 pointer-events-none">
                    <div className="h-4 bg-slate-300 w-full transform -rotate-12" />
                    <div className="h-6 bg-slate-300 w-full" />
                    <div className="h-4 bg-slate-300 w-full transform rotate-45" />
                  </div>

                  {/* Center pin marker */}
                  <motion.div
                    animate={{ y: isPinMoved ? [0, -8, 0] : 0 }}
                    className="z-10 flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      setIsPinMoved(true);
                      setMapPinCoords({ lat: 12.895 + Math.random() * 0.01, lng: 77.588 + Math.random() * 0.01 });
                    }}
                  >
                    <div className="bg-[#0088FF] text-white px-2 py-1 rounded-full text-[10px] font-extrabold shadow-md mb-1 flex items-center gap-1 whitespace-nowrap">
                      <span>📍 Drag/Tap to adjust pin</span>
                    </div>
                    <MapPin className="w-8 h-8 text-[#DC2626] drop-shadow-md animate-bounce" />
                  </motion.div>

                  <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#0F172A] shadow">
                    Lat: {mapPinCoords.lat.toFixed(4)} | Lng: {mapPinCoords.lng.toFixed(4)}
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B] text-center font-medium">
                  Tap on map to reposition puncture emergency drop point
                </p>
              </div>
            )}

            {/* Manual Address view */}
            {locationType === 'address' && (
              <div className="space-y-2">
                <textarea
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="Enter full address, landmark or highway mile marker details..."
                  className="w-full text-xs p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#0088FF] focus:outline-none min-h-[70px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* STEP 5: Upload Photo */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">5</span>
              Upload Photo (Optional)
            </span>
            <span className="text-[10px] text-[#64748B]">Helps tech bring right tools</span>
          </label>

          {photoUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm group">
              <img src={photoUrl} alt="Puncture Tyre Issue" className="w-full h-40 object-cover" />
              <button
                onClick={() => setPhotoUrl(null)}
                className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-1 rounded-md font-semibold">
                Photo attached
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#CBD5E1] p-4 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0088FF] mx-auto flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Take or Upload Tyre Photo</p>
                <p className="text-[11px] text-[#64748B]">Capture puncture nail, valve damage, or flat tyre</p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <label className="cursor-pointer bg-[#0F172A] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#1E293B] transition-colors inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>

                {/* Sample Preset Photo Uploads */}
                <button
                  type="button"
                  onClick={() => handleSimulatedPhotoUpload('https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80')}
                  className="bg-blue-50 text-[#0088FF] px-2.5 py-1.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  📷 Add Sample Tyre Photo
                </button>
              </div>

              {isUploading && (
                <p className="text-xs text-[#0088FF] font-medium animate-pulse">Uploading photo...</p>
              )}
            </div>
          )}
        </div>

        {/* STEP 6: Emergency / Normal Mode Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center text-[10px]">6</span>
            Service Speed & Urgency
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsEmergency(true)}
              className={`p-3.5 rounded-2xl border-2 transition-all text-left relative ${
                isEmergency
                  ? 'border-[#DC2626] bg-red-50/60 shadow-md'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-[#DC2626] flex items-center gap-1">
                  ⚡ EMERGENCY SOS
                </span>
                <span className="text-[10px] font-bold bg-[#DC2626] text-white px-1.5 py-0.5 rounded">
                  15-20 MINS
                </span>
              </div>
              <p className="text-[11px] text-[#475569]">Immediate priority dispatch of mobile puncture technician.</p>
            </button>

            <button
              onClick={() => setIsEmergency(false)}
              className={`p-3.5 rounded-2xl border-2 transition-all text-left ${
                !isEmergency
                  ? 'border-[#0088FF] bg-blue-50/60 shadow-md'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                  📅 NORMAL
                </span>
                <span className="text-[10px] font-semibold text-[#64748B]">Standard</span>
              </div>
              <p className="text-[11px] text-[#475569]">Scheduled doorstep repair at your convenient slot.</p>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-full md:max-w-[430px] mx-auto bg-white border-t border-[#E2E8F0] p-4 z-40 shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Estimated Total</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#0F172A]">₹{calculatedPrice}</span>
              <span className="text-xs text-[#64748B] line-through">₹{calculatedPrice + 100}</span>
              <span className="text-[10px] font-extrabold text-[#059669]">TAX INCLUDED</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold text-[#DC2626] flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 animate-spin" />
              <span>{isEmergency ? 'ETA ~15-20 Mins' : 'Slot Available'}</span>
            </div>
            <div className="text-[10px] text-[#64748B]">Doorstep Service Guaranteed</div>
          </div>
        </div>

        <Button
          onClick={handleBookPunctureService}
          fullWidth
          size="lg"
          className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-[#B91C1C] hover:to-[#DC2626] text-white font-extrabold text-sm shadow-xl py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <span>🚨</span>
          <span>BOOK PUNCTURE SERVICE NOW</span>
        </Button>
      </div>
    </div>
  );
};
