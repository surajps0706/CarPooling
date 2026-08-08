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
      case 'Droplets': return <Droplets className="w-3.5 h-3.5 text-[#0088FF]" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#0088FF]" />;
      case 'Shield': return <Shield className="w-3.5 h-3.5 text-[#0088FF]" />;
      case 'Gem': return <Gem className="w-3.5 h-3.5 text-[#0088FF]" />;
      case 'Bike': return <Bike className="w-3.5 h-3.5 text-[#059669]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#0088FF]" />;
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

      {/* Service Categories — Grouped by Vehicle Type */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">Service Categories</h3>
          <button onClick={() => navigate('/customer/catalog')} className="text-xs font-semibold text-[#0088FF]">
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: 'car',
              label: 'Car Services',
              emoji: '🚗',
              color: 'bg-[#EFF6FF] border-[#BFDBFE]',
              labelColor: 'text-[#1D4ED8]',
              categories: SERVICE_CATEGORIES.filter(c => ['CAT-01','CAT-02','CAT-03','CAT-04'].includes(c.id)),
            },
            {
              id: 'bike',
              label: 'Bike Services',
              emoji: '🏍️',
              color: 'bg-[#F0FDF4] border-[#BBF7D0]',
              labelColor: 'text-[#15803D]',
              categories: SERVICE_CATEGORIES.filter(c => ['CAT-05'].includes(c.id)),
            },
          ].map((group) => (
            <div key={group.id} className={`rounded-2xl border p-3.5 ${group.color}`}>
              {/* Group header */}
              <button
                onClick={() => navigate('/customer/catalog', {
                  state: { categoryIds: group.categories.map(c => c.id) }
                })}
                className="flex items-center gap-2 mb-2.5 w-full text-left"
              >
                <span className="text-lg leading-none">{group.emoji}</span>
                <span className={`text-[13px] font-bold ${group.labelColor}`}>{group.label}</span>
                <span className={`ml-auto text-[10px] font-semibold ${group.labelColor} opacity-60`}>
                  {group.categories.length} {group.categories.length === 1 ? 'category' : 'categories'} →
                </span>
              </button>

              {/* Sub-category pills */}
              <div className="flex flex-wrap gap-1.5">
                {group.categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/customer/catalog', { state: { categoryId: cat.id } })}
                    className="flex items-center gap-1.5 bg-white border border-white/80 px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-[#374151] hover:border-[#0088FF] hover:text-[#0088FF] transition-all shadow-sm"
                  >
                    {getCategoryIcon(cat.iconName)}
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </div>
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
