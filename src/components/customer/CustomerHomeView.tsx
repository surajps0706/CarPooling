import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Sparkles, Droplets, Shield, Gem, Bike, Wrench, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from '../../constants/mockData';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const CustomerHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, vehicles, activeVehicle, setActiveVehicle, activeAddress, activeBooking } = useBooking();

  const isBikeMode = activeVehicle.type === 'bike';

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Droplets': return <Droplets className="w-3.5 h-3.5 text-[#0088FF]" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      case 'Shield': return <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'Gem': return <Gem className="w-3.5 h-3.5 text-[#06B6D4]" />;
      case 'Bike': return <Bike className="w-3.5 h-3.5 text-[#059669]" />;
      case 'Wrench': return <Wrench className="w-3.5 h-3.5 text-[#D97706]" />;
      case 'Zap': return <Zap className="w-3.5 h-3.5 text-[#10B981]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#0088FF]" />;
    }
  };

  const handleToggleMode = (mode: 'car' | 'bike') => {
    if (mode === 'bike') {
      const bikeVeh = vehicles.find((v) => v.type === 'bike') || {
        id: 'VEH-BK-TEMP',
        customerId: currentCustomer.id,
        make: 'Royal Enfield',
        model: 'Hunter 350',
        year: 2024,
        type: 'bike' as const,
        color: 'Dapper Ash',
        registrationNumber: 'KA01BK2024',
        isDefault: false
      };
      setActiveVehicle(bikeVeh);
    } else {
      const carVeh = vehicles.find((v) => v.type !== 'bike') || vehicles[0];
      if (carVeh) setActiveVehicle(carVeh);
    }
  };

  // Filter Categories by Mode
  const activeCategories = SERVICE_CATEGORIES.filter((c) =>
    isBikeMode ? c.targetVehicle === 'bike' : c.targetVehicle === 'car' || !c.targetVehicle
  );

  // Filter Packages by Mode
  const activePackages = SERVICE_ITEMS.filter((srv) => {
    if (isBikeMode) {
      return srv.vehicleTypes.includes('bike') && ['CAT-05', 'CAT-06', 'CAT-07', 'CAT-08'].includes(srv.categoryId);
    } else {
      return srv.vehicleTypes.some((t) => t !== 'bike') && !['CAT-05', 'CAT-06', 'CAT-07', 'CAT-08'].includes(srv.categoryId);
    }
  });

  return (
    <div className="p-4 space-y-5">
      {/* Wipeit Header Banner */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <img src="/wipeit-logo.png" alt="Wipeit" className="h-8 object-contain" />
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-extrabold text-sm text-[#0F172A]">WIPE</span>
              <span className="font-extrabold text-sm text-[#F5B000]">IT</span>
            </div>
            <div className="text-[9px] font-bold text-[#0088FF] uppercase tracking-wider">
              Drive Clean. Shine Always.
            </div>
          </div>
        </div>

        <Badge variant="accent">
          Doorstep Service
        </Badge>
      </div>

      {/* Car vs Bike Vehicle Mode Switcher */}
      <div className="bg-[#F1F5F9] p-1 rounded-2xl flex items-center shadow-inner">
        <button
          onClick={() => handleToggleMode('car')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
            !isBikeMode
              ? 'bg-white text-[#1D4ED8] shadow-md border border-[#BFDBFE]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span className="text-base">🚗</span>
          Car
        </button>
        <button
          onClick={() => handleToggleMode('bike')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
            isBikeMode
              ? 'bg-[#059669] text-white shadow-md'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span className="text-base">🏍️</span>
          Bike
        </button>
      </div>

      {/* Location Bar */}
      <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#0088FF]" />
          <span className="font-medium text-[#0F172A] truncate">
            {activeAddress.label} • {activeAddress.line1.slice(0, 26)}...
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#0088FF]">CHANGE</span>
      </div>

      {/* Active Booking Live Tracking Widget */}
      {activeBooking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/customer/tracking')}
          className="cursor-pointer bg-[#0A0F1D] text-white p-4 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                LIVE ACTIVE SERVICE
              </span>
            </div>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
              {getStatusBadgeVariant(activeBooking.status).label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-white">{activeBooking.service.name}</h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {activeBooking.partner?.fullName} is servicing your {activeBooking.vehicle.make} {activeBooking.vehicle.model}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 shrink-0" />
          </div>
        </motion.div>
      )}

      {/* Active Vehicle Selector Strip */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center font-bold text-base border border-[#E2E8F0]">
            {activeVehicle.type === 'bike' ? '🏍️' : activeVehicle.type === 'suv' || activeVehicle.type === 'muv' ? '🚙' : '🚗'}
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F172A]">
              {activeVehicle.make} {activeVehicle.model}
            </div>
            <div className="text-[11px] text-[#64748B]">
              {activeVehicle.registrationNumber} • {activeVehicle.color}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/customer/garage')}
          className="text-xs font-semibold text-[#0088FF] hover:underline"
        >
          Change Vehicle
        </button>
      </div>

      {/* Urgent Puncture Service SOS Quick Action Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/customer/puncture')}
        className="cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 rounded-2xl shadow-xl border border-red-500/40 relative overflow-hidden flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shrink-0">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-base text-white tracking-tight">PUNCTURE ASSISTANCE</h4>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase shadow-sm">
                15-20 MIN DISPATCH
              </span>
            </div>
            <p className="text-xs text-red-100 font-medium mt-0.5">
              Tubeless plug, tube patch, air leak & valve core replacement
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white shrink-0" />
      </motion.div>

      {/* Service Categories — Dynamically Filtered based on Mode */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
            Service Categories
          </h3>
          <button onClick={() => navigate('/customer/catalog')} className="text-xs font-semibold text-[#0088FF]">
            View All
          </button>
        </div>

        <div className={`rounded-2xl border p-3.5 ${isBikeMode ? 'bg-[#F0FDF4] border-[#BBF7D0]' : 'bg-[#EFF6FF] border-[#BFDBFE]'}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base leading-none">{isBikeMode ? '🏍️' : '🚗'}</span>
            <span className={`text-xs font-extrabold ${isBikeMode ? 'text-[#15803D]' : 'text-[#1D4ED8]'}`}>
              {isBikeMode ? 'Bike Packages' : 'Car Packages'}
            </span>
            <span className={`ml-auto text-[10px] font-bold ${isBikeMode ? 'text-[#15803D]' : 'text-[#1D4ED8]'} opacity-75`}>
              {activeCategories.length} Categories
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {activeCategories.map((cat) => {
              const isPunctureCat = cat.name.toLowerCase().includes('puncture') || cat.slug.toLowerCase().includes('puncture');
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isPunctureCat) {
                      navigate('/customer/puncture');
                    } else {
                      navigate('/customer/catalog', { state: { categoryId: cat.id } });
                    }
                  }}
                  className={`flex items-center gap-2 bg-white border p-2.5 rounded-xl text-[11.5px] font-semibold transition-all shadow-sm text-left ${
                    isPunctureCat ? 'text-red-700 bg-red-50/70 border-red-200 hover:border-red-400' : 'text-[#374151] border-slate-200/80 hover:border-[#0088FF]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isPunctureCat ? 'bg-red-100 text-red-600' : 'bg-[#F8FAFC]'}`}>
                    {isPunctureCat ? '🚨' : getCategoryIcon(cat.iconName)}
                  </div>
                  <div className="truncate">
                    <div className="font-bold leading-snug truncate">
                      {cat.name}
                    </div>
                    <div className="text-[9.5px] text-[#9CA3AF] font-normal truncate">{cat.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Service Packages (Distinct Visual Card Layout) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
            {isBikeMode ? 'Featured Bike Packages' : 'Featured Car Packages'}
          </h3>
          <span className="text-[11px] font-semibold text-[#64748B]">For {activeVehicle.make} {activeVehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {activePackages.slice(0, 4).map((srv) => {
            const rawPrice = srv.pricing[activeVehicle.type];
            const price = rawPrice && rawPrice > 0 ? rawPrice : (srv.pricing.bike || srv.pricing.sedan || 199);
            const memberPrice = srv.memberPricing ? (srv.memberPricing[activeVehicle.type] || Math.round(price * 0.85)) : Math.round(price * 0.85);

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Hero banner image with duration & popular badge overlays */}
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={srv.heroImage}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      ⏱️ {srv.durationMinutes} Mins
                    </span>
                  </div>

                  {srv.isPopular && (
                    <div className="absolute top-2 right-2 bg-[#F5B000] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                      POPULAR
                    </div>
                  )}

                  {/* Service Title over banner */}
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <h4 className="font-extrabold text-sm text-white drop-shadow-sm">{srv.name}</h4>
                  </div>
                </div>

                {/* Card Body & Feature Pills */}
                <div className="p-3 space-y-2.5">
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                    {srv.description}
                  </p>

                  {/* Key Inclusion Chips */}
                  {srv.inclusions && srv.inclusions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {srv.inclusions.slice(0, 3).map((inc, i) => (
                        <span key={i} className="text-[10px] font-semibold text-[#0088FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/80">
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Price & Direct Booking CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-[#0F172A]">₹{price}</span>
                        <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-1.5 py-0.5 rounded">
                          Gold: ₹{memberPrice}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => navigate('/customer/book', { state: { service: srv } })}
                      className="bg-[#0088FF] hover:bg-[#0066CC] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

