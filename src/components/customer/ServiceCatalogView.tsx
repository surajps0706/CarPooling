import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Clock, ChevronRight, Droplets, Sparkles, Shield, Gem, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../ui/Button';
import { BottomSheet } from '../ui/BottomSheet';
import { SERVICE_CATEGORIES, SERVICE_ITEMS, ADDONS_CATALOG } from '../../constants/mockData';
import { ServiceItem, AddonItem } from '../../types';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Shield: <Shield className="w-3.5 h-3.5" />,
  Gem: <Gem className="w-3.5 h-3.5" />,
  Bike: <Bike className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<string, { badge: string; text: string }> = {
  'CAT-01': { badge: 'bg-blue-100 text-blue-700',    text: 'text-blue-600' },
  'CAT-02': { badge: 'bg-violet-100 text-violet-700', text: 'text-violet-600' },
  'CAT-03': { badge: 'bg-amber-100 text-amber-700',   text: 'text-amber-600' },
  'CAT-04': { badge: 'bg-cyan-100 text-cyan-700',     text: 'text-cyan-600' },
  'CAT-05': { badge: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-600' },
};

export const ServiceCatalogView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeVehicle } = useBooking();

  const navState = location.state as { categoryId?: string; categoryIds?: string[] } | null;

  // Pre-select category if navigated from home screen — single cat or group (array)
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    navState?.categoryId ?? 'ALL'
  );
  // Multi-category filter (used when tapping a vehicle group header)
  const [activeCategoryIds, setActiveCategoryIds] = useState<string[] | null>(
    navState?.categoryIds ?? null
  );
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<AddonItem[]>([]);
  const [isAddonSheetOpen, setIsAddonSheetOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'ALL', name: 'All', iconName: 'Sparkles' },
    ...SERVICE_CATEGORIES
  ];

  // When user picks a tab, clear the group filter
  const handleTabChange = (id: string) => {
    setActiveCategoryId(id);
    setActiveCategoryIds(null);
  };

  const filteredServices = activeCategoryIds
    ? SERVICE_ITEMS.filter((srv) => activeCategoryIds.includes(srv.categoryId))
    : activeCategoryId === 'ALL'
      ? SERVICE_ITEMS
      : SERVICE_ITEMS.filter((srv) => srv.categoryId === activeCategoryId);

  const handleSelectService = (srv: ServiceItem) => {
    setSelectedService(srv);
    setSelectedAddons([]);
    setIsAddonSheetOpen(true);
  };

  const toggleAddon = (addon: AddonItem) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleProceedToBooking = () => {
    if (!selectedService) return;
    setIsAddonSheetOpen(false);
    navigate('/customer/book', {
      state: { service: selectedService, addons: selectedAddons }
    });
  };

  return (
    <div className="flex flex-col">
      {/* ── Sticky header + tabs ── */}
      <div className="px-4 pt-4 pb-3 bg-[#FAFAF8] border-b border-[#EBEBED]">
        <div className="mb-1">
          <h2 className="text-[17px] font-bold text-[#111827] tracking-tight">Service Catalog</h2>
          <p className="text-[11.5px] text-[#6B7280] mt-0.5">
            Prices for{' '}
            <span className="font-semibold text-[#374151]">{activeVehicle.make} {activeVehicle.model}</span>
            {' '}·{' '}
            <span className="font-semibold text-[#374151] capitalize">{activeVehicle.type}</span>
          </p>
        </div>

        {/* Category pill tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pt-3 -mx-1 px-1">
          {tabs.map((cat) => {
            const count = cat.id === 'ALL'
              ? SERVICE_ITEMS.length
              : SERVICE_ITEMS.filter((s) => s.categoryId === cat.id).length;
            const isActive = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-semibold
                  whitespace-nowrap shrink-0 transition-all duration-150
                  ${isActive
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#374151] hover:border-[#D1D5DB]'
                  }
                `}
              >
                {cat.id !== 'ALL' && (
                  <span className={isActive ? 'text-white' : CATEGORY_COLORS[cat.id]?.text}>
                    {CATEGORY_ICONS[cat.iconName]}
                  </span>
                )}
                <span>{cat.name}</span>
                <span className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none
                  ${isActive ? 'bg-white/20 text-white' : 'bg-[#F4F5F7] text-[#374151]'}
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Service list ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="p-4 space-y-3"
        >
          {filteredServices.map((srv) => {
            const cat = SERVICE_CATEGORIES.find((c) => c.id === srv.categoryId);
            const colors = CATEGORY_COLORS[srv.categoryId];
            const rawPrice = srv.pricing[activeVehicle.type];
            const price = rawPrice && rawPrice > 0 ? rawPrice : (srv.pricing.bike || srv.pricing.sedan || 249);

            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-[#EBEBED] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-200"
              >
                {/* Image + details row */}
                <div className="flex gap-3 p-4 pb-3">
                  <div className="relative shrink-0">
                    <img
                      src={srv.heroImage}
                      alt={srv.name}
                      className="w-[76px] h-[76px] rounded-xl object-cover"
                    />
                    {srv.isPopular && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#F5B000] text-[#0A0F17] text-[8.5px] font-black px-1.5 py-[3px] rounded-full uppercase tracking-wide leading-none">
                        HOT
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Category chip — only in All view */}
                    {cat && activeCategoryId === 'ALL' && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-[3px] rounded-md mb-1.5 ${colors?.badge}`}>
                        {CATEGORY_ICONS[cat.iconName]}
                        {cat.name}
                      </span>
                    )}

                    <h3 className="font-bold text-[13px] text-[#111827] leading-snug line-clamp-2">
                      {srv.name}
                    </h3>

                    <div className="flex items-center gap-1 mt-1 mb-1.5">
                      <Clock className="w-3 h-3 text-[#9CA3AF]" />
                      <span className="text-[11px] text-[#9CA3AF]">{srv.durationMinutes} min</span>
                    </div>

                    <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mx-4 mb-3 bg-[#F9FAFB] rounded-xl px-3 py-2.5 border border-[#F0F1F3]">
                  <p className="text-[9.5px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                    What's included
                  </p>
                  <div className="space-y-1">
                    {srv.inclusions.slice(0, 3).map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2 h-2 text-[#059669]" />
                        </div>
                        <span className="text-[11px] text-[#4B5563] leading-tight">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#F0F1F3]">
                  <div>
                    <span className="text-[18px] font-black text-[#111827] tracking-tight">₹{price}</span>
                    <p className="text-[10px] text-[#9CA3AF] leading-none mt-0.5">incl. taxes & doorstep</p>
                  </div>
                  <button
                    onClick={() => handleSelectService(srv)}
                    className="flex items-center gap-1.5 bg-[#111827] hover:bg-[#1F2937] active:scale-95 text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-150"
                  >
                    Book
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── Add-ons Bottom Sheet ── */}
      <BottomSheet
        isOpen={isAddonSheetOpen}
        onClose={() => setIsAddonSheetOpen(false)}
        title={`Enhance: ${selectedService?.name}`}
      >
        <div className="space-y-3">
          <p className="text-[12px] text-[#6B7280] leading-relaxed">
            Optional add-ons to complement your service.
          </p>

          <div className="space-y-2">
            {ADDONS_CATALOG.map((addon) => {
              const isSelected = selectedAddons.some((a) => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`
                    p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150
                    ${isSelected
                      ? 'border-[#111827] bg-[#F9FAFB] shadow-sm'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                    }
                  `}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[12.5px] font-semibold text-[#111827]">{addon.name}</span>
                      <span className="text-[11.5px] font-bold text-[#6B7280]">+₹{addon.price}</span>
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5 leading-snug">{addon.description}</p>
                  </div>

                  <div className={`
                    w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-all
                    ${isSelected ? 'bg-[#111827] border-[#111827]' : 'border-[#D1D5DB]'}
                  `}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedAddons.length > 0 && (
            <div className="flex items-center justify-between text-[12px] bg-[#F9FAFB] px-3 py-2 rounded-lg border border-[#F0F1F3]">
              <span className="text-[#6B7280]">{selectedAddons.length} add-on{selectedAddons.length > 1 ? 's' : ''} selected</span>
              <span className="font-bold text-[#111827]">+₹{selectedAddons.reduce((s, a) => s + a.price, 0)}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#F0F1F3]">
            <Button fullWidth size="lg" onClick={handleProceedToBooking}>
              Continue to Date & Slot →
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

