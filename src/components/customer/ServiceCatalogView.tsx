import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, ShieldCheck, ChevronRight, Plus } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BottomSheet } from '../ui/BottomSheet';
import { SERVICE_CATEGORIES, SERVICE_ITEMS, ADDONS_CATALOG } from '../../constants/mockData';
import { ServiceItem, AddonItem } from '../../types';

export const ServiceCatalogView: React.FC = () => {
  const navigate = useNavigate();
  const { activeVehicle } = useBooking();

  const [activeCategoryId, setActiveCategoryId] = useState<string>('CAT-01');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<AddonItem[]>([]);
  const [isAddonSheetOpen, setIsAddonSheetOpen] = useState<boolean>(false);

  const filteredServices = SERVICE_ITEMS.filter(
    (srv) => srv.categoryId === activeCategoryId || activeCategoryId === 'ALL'
  );

  const handleSelectService = (srv: ServiceItem) => {
    setSelectedService(srv);
    setIsAddonSheetOpen(true);
  };

  const toggleAddon = (addon: AddonItem) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleProceedToBooking = () => {
    if (!selectedService) return;
    setIsAddonSheetOpen(false);
    navigate('/customer/book', {
      state: { service: selectedService, addons: selectedAddons }
    });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Title Bar */}
      <div>
        <h2 className="text-lg font-bold text-[#18181B] tracking-tight">Select Vehicle Service</h2>
        <p className="text-xs text-[#6B7280]">
          Showing prices for your <span className="font-semibold text-[#18181B]">{activeVehicle.make} {activeVehicle.model} ({activeVehicle.type})</span>
        </p>
      </div>

      {/* Category Tabs Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#E5E7EB]">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeCategoryId === cat.id
                ? 'bg-[#2457FF] text-white shadow-xs'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#18181B]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Service List Cards */}
      <div className="space-y-4">
        {filteredServices.map((srv) => {
          const price = srv.pricing[activeVehicle.type] || srv.pricing.sedan;
          const memberPrice = srv.memberPricing?.[activeVehicle.type] || Math.round(price * 0.85);

          return (
            <Card key={srv.id} className="p-4 space-y-3">
              <div className="flex gap-3">
                <img
                  src={srv.heroImage}
                  alt={srv.name}
                  className="w-28 h-28 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#18181B]">{srv.name}</h3>
                    {srv.isPopular && <Badge variant="accent">Popular</Badge>}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{srv.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#6B7280]">
                    <Clock className="w-3.5 h-3.5 text-[#2457FF]" />
                    <span>{srv.durationMinutes} mins duration</span>
                  </div>
                </div>
              </div>

              {/* Inclusions Bullet List */}
              <div className="bg-[#F4F5F7] p-3 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                  Service Inclusions:
                </div>
                {srv.inclusions.slice(0, 3).map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Check className="w-3.5 h-3.5 text-[#17A34A] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#18181B]">₹{price}</span>
                    <span className="text-xs text-[#17A34A] font-semibold">Gold: ₹{memberPrice}</span>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF]">Taxes included</span>
                </div>

                <Button onClick={() => handleSelectService(srv)}>
                  Select Service
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add-ons Selection Bottom Sheet */}
      <BottomSheet
        isOpen={isAddonSheetOpen}
        onClose={() => setIsAddonSheetOpen(false)}
        title={`Add-ons for ${selectedService?.name}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[#6B7280]">
            Enhance your service with these recommended add-on treatments:
          </p>

          <div className="space-y-2">
            {ADDONS_CATALOG.map((addon) => {
              const isSelected = selectedAddons.some((a) => a.id === addon.id);

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#2457FF] bg-[#EEF2FF]/40'
                      : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#18181B]">{addon.name}</span>
                      <span className="text-xs font-bold text-[#2457FF]">+₹{addon.price}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">{addon.description}</p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#2457FF] border-[#2457FF] text-white'
                        : 'border-[#D1D5DB] text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E7EB]">
            <Button fullWidth size="lg" onClick={handleProceedToBooking}>
              Continue to Date & Slot →
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};
