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
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            !isBikeMode
              ? 'bg-white text-[#1D4ED8] shadow-md border border-[#BFDBFE]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span className="text-base">🚗</span>
          Car Services
        </button>
        <button
          onClick={() => handleToggleMode('bike')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            isBikeMode
              ? 'bg-[#059669] text-white shadow-md'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span className="text-base">🏍️</span>
          Bike Services
        </button>
      </div>

      {/* Location Bar */}
      <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs">
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
          className="cursor-pointer bg-gradient-to-r from-[#0A0F17] to-[#0F172A] text-white p-4 rounded-2xl shadow-lg border border-[#1E293B] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B000] animate-ping" />
              <span className="text-xs font-bold text-[#F5B000] uppercase tracking-wide">
                Live Active Service
              </span>
            </div>
            <Badge variant="warning" size="sm">
              {getStatusBadgeVariant(activeBooking.status).label}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-white">{activeBooking.service.name}</h4>
              <p className="text-xs text-[#94A3B8]">
                {activeBooking.partner?.fullName} is servicing your {activeBooking.vehicle.make} {activeBooking.vehicle.model}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </div>
        </motion.div>
      )}

      {/* Active Vehicle Selector Strip */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center font-bold text-sm">
            {activeVehicle.type === 'sedan' ? '🚗' : activeVehicle.type === 'suv' ? '🚙' : '🏍️'}
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
        className="cursor-pointer bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] text-white p-3.5 rounded-2xl shadow-lg border border-red-500/30 relative overflow-hidden flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shrink-0">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm text-white tracking-tight">PUNCTURE ASSISTANCE</h4>
              <span className="bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                15-20 MIN DISPATCH
              </span>
            </div>
            <p className="text-[11px] text-red-100 font-medium">
              Tubeless plug, tube patch, air leak & valve core replacement
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/80 shrink-0" />
      </motion.div>

      {/* Service Categories — Dynamically Filtered based on Mode */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
            {isBikeMode ? '🏍️ Bike Service Categories' : '🚗 Car Service Categories'}
          </h3>
          <button onClick={() => navigate('/customer/catalog')} className="text-xs font-semibold text-[#0088FF]">
            View All
          </button>
        </div>

        <div className={`rounded-2xl border p-3.5 ${isBikeMode ? 'bg-[#F0FDF4] border-[#BBF7D0]' : 'bg-[#EFF6FF] border-[#BFDBFE]'}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-lg leading-none">{isBikeMode ? '🏍️' : '🚗'}</span>
            <span className={`text-[13px] font-bold ${isBikeMode ? 'text-[#15803D]' : 'text-[#1D4ED8]'}`}>
              {isBikeMode ? 'Bike Care Packages' : 'Car Care Packages'}
            </span>
            <span className={`ml-auto text-[10px] font-semibold ${isBikeMode ? 'text-[#15803D]' : 'text-[#1D4ED8]'} opacity-60`}>
              {activeCategories.length} categories
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
                  className={`flex items-center gap-2 bg-white border border-white/80 p-2.5 rounded-xl text-[11.5px] font-semibold hover:border-[#0088FF] transition-all shadow-sm text-left ${
                    isPunctureCat ? 'text-red-700 bg-red-50/50 border-red-200' : 'text-[#374151]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isPunctureCat ? 'bg-red-100 text-red-600' : 'bg-[#F8FAFC]'}`}>
                    {isPunctureCat ? '🚨' : getCategoryIcon(cat.iconName)}
                  </div>
                  <div className="truncate">
                    <div className="font-bold leading-snug truncate flex items-center gap-1">
                      <span>{cat.name}</span>
                    </div>
                    <div className="text-[9.5px] text-[#9CA3AF] font-normal truncate">{cat.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
            {isBikeMode ? 'Wipeit Bike Services' : 'Wipeit Car Services'}
          </h3>
          <span className="text-xs text-[#64748B]">Price for {activeVehicle.make}</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {activePackages.slice(0, 4).map((srv) => {
            const price = srv.pricing[activeVehicle.type] || srv.pricing.bike || srv.pricing.sedan || 199;

            return (
              <Card key={srv.id} hoverable onClick={() => navigate('/customer/catalog')}>
                <div className="flex gap-3">
                  <img
                    src={srv.heroImage}
                    alt={srv.name}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-[#0F172A] line-clamp-1">{srv.name}</h4>
                        {srv.isPopular && (
                          <Badge variant="accent" size="sm">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                      <div>
                        <span className="text-xs text-[#64748B]">{srv.durationMinutes} mins • </span>
                        <span className="font-bold text-sm text-[#0F172A]">₹{price}</span>
                      </div>
                      <Button size="sm" onClick={() => navigate('/customer/catalog')}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

