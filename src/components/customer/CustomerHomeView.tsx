import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, ShieldCheck, Sparkles, Droplets, Shield, Gem, Bike } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from '../../constants/mockData';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const CustomerHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, activeVehicle, activeAddress, activeBooking } = useBooking();

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Droplets': return <Droplets className="w-6 h-6 text-[#0088FF]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#0088FF]" />;
      case 'Shield': return <Shield className="w-6 h-6 text-[#0088FF]" />;
      case 'Gem': return <Gem className="w-6 h-6 text-[#0088FF]" />;
      case 'Bike': return <Bike className="w-6 h-6 text-[#0088FF]" />;
      default: return <Sparkles className="w-6 h-6 text-[#0088FF]" />;
    }
  };

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
          Change
        </button>
      </div>

      {/* Service Categories Horizontal Scroller */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">Service Categories</h3>
          <button onClick={() => navigate('/customer/catalog')} className="text-xs font-semibold text-[#0088FF]">
            View All
          </button>
        </div>


        <div className="grid grid-cols-3 gap-2.5">
          {SERVICE_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/customer/catalog')}
              className="p-3 bg-white border border-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#0088FF] hover:shadow-sm transition-all"
            >
              <div className="p-2 bg-[#E0F2FE] rounded-xl">
                {getCategoryIcon(cat.iconName)}
              </div>
              <span className="text-[11px] font-semibold text-[#0F172A] text-center leading-tight">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Popular Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">Wipeit Packages</h3>
          <span className="text-xs text-[#64748B]">Price for {activeVehicle.type}</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {SERVICE_ITEMS.slice(0, 3).map((srv) => {
            const price = srv.pricing[activeVehicle.type] || srv.pricing.sedan;

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
                        <h4 className="font-bold text-xs text-[#0F172A]">{srv.name}</h4>
                        {srv.isPopular && (
                          <Badge variant="accent" size="sm">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-2 mt-1">
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
