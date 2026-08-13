import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Droplets,
  Sparkles,
  Gem,
  Wrench,
  Settings,
  Car,
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { SERVICE_ITEMS } from '../../constants/mockData';
import { WipeitLogo } from '../ui/WipeitLogo';

export const CarCareView: React.FC = () => {
  const navigate = useNavigate();
  const { activeVehicle, activeAddress } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Car Services from mockData
  const carServices = useMemo(() => {
    return SERVICE_ITEMS.filter(
      (srv) => srv.vehicleTypes.some((t) => t !== 'bike') && !['CAT-BK-01', 'CAT-BK-02', 'CAT-BK-06'].includes(srv.categoryId)
    );
  }, []);

  const filteredServices = useMemo(() => {
    let list = carServices;

    if (selectedCategory === 'wash') {
      list = list.filter((s) => s.categoryId === 'CAT-CAR-01' || s.categoryId === 'CAT-CAR-02');
    } else if (selectedCategory === 'detailing') {
      list = list.filter((s) => s.categoryId === 'CAT-CAR-03' || s.categoryId === 'CAT-CAR-04');
    } else if (selectedCategory === 'interior') {
      list = list.filter((s) => s.categoryId === 'CAT-CAR-05' || s.categoryId === 'CAT-CAR-07');
    } else if (selectedCategory === 'maintenance') {
      list = list.filter((s) => s.categoryId === 'CAT-CAR-06' || s.categoryId === 'CAT-CAR-08' || s.categoryId === 'CAT-CAR-09' || s.categoryId === 'CAT-CAR-10');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }

    return list;
  }, [carServices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* TOP HEADER WITH BACK BUTTON */}
      <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/customer')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F0F6FF] text-[#0088FF] hover:bg-[#0088FF] hover:text-white font-extrabold text-xs sm:text-sm transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#0F2537] tracking-tight flex items-center gap-2">
              <span>🚗</span> Car Wash, Detailing & Care
            </h1>
            <p className="text-xs text-[#64748B] font-medium hidden sm:block">
              Premium doorstep services for {activeVehicle.make} {activeVehicle.model}
            </p>
          </div>
        </div>

        <WipeitLogo size="sm" variant="dark" />
      </div>

      {/* ACTIVE CAR & LOCATION STRIP */}
      <div className="bg-[#F0F6FF] rounded-2xl p-3.5 border border-[#BFDBFE] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#0F2537] font-bold">
          <MapPin className="w-4 h-4 text-[#0088FF]" />
          <span>Location: {activeAddress.label} • {activeAddress.line1.slice(0, 32)}...</span>
        </div>
        <div className="flex items-center gap-2 text-[#0088FF] font-extrabold bg-white px-3 py-1 rounded-xl border border-blue-100 shadow-xs">
          <span>🚗 {activeVehicle.make} {activeVehicle.model} ({activeVehicle.registrationNumber})</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="h-5 w-5 text-[#94A3B8] absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search car wash, foam clean, detailing, AC, engine oil..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
          >
            Clear
          </button>
        )}
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF]'
          }`}
        >
          All Car Services ({carServices.length})
        </button>
        <button
          onClick={() => setSelectedCategory('wash')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'wash'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF]'
          }`}
        >
          🧽 Exterior Wash
        </button>
        <button
          onClick={() => setSelectedCategory('detailing')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'detailing'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF]'
          }`}
        >
          ✨ Ceramic Polish & Detailing
        </button>
        <button
          onClick={() => setSelectedCategory('interior')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'interior'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF]'
          }`}
        >
          💺 Interior & AC Care
        </button>
        <button
          onClick={() => setSelectedCategory('maintenance')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'maintenance'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF]'
          }`}
        >
          🔧 Engine & Maintenance
        </button>
      </div>

      {/* 2x2 FEATURED CATEGORY CARDS WITH REAL INDIAN CAR IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exterior Wash */}
        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-3xl p-5 flex items-center justify-between">
          <div className="space-y-2 max-w-[60%]">
            <span className="bg-[#0088FF] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Most Popular
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537]">High-Pressure Exterior Wash</h3>
            <p className="text-xs text-[#475569]">Snow foam bath, tire shine & underbody jet wash.</p>
            <div className="text-sm font-black text-[#0088FF]">From ₹249</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=80"
            alt="Exterior Wash"
            className="w-32 h-28 object-cover rounded-2xl shadow-sm shrink-0 border border-white"
          />
        </div>

        {/* Interior Deep Clean */}
        <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-3xl p-5 flex items-center justify-between">
          <div className="space-y-2 max-w-[60%]">
            <span className="bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Hygienic Cabin
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537]">Interior Steam & Vacuum</h3>
            <p className="text-xs text-[#475569]">Deep seat shampoo, dashboard UV wipe & vent clean.</p>
            <div className="text-sm font-black text-purple-600">From ₹449</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80"
            alt="Car Interior"
            className="w-32 h-28 object-cover rounded-2xl shadow-sm shrink-0 border border-white"
          />
        </div>
      </div>

      {/* CAR SERVICES LIST GRID */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-black text-[#0F2537]">
          Available Car Services ({filteredServices.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((srv) => {
            const rawPrice = srv.pricing[activeVehicle.type] || srv.pricing.sedan || 249;
            const memberPrice = srv.memberPricing?.[activeVehicle.type] || Math.round(rawPrice * 0.85);

            return (
              <motion.div
                key={srv.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-3xl border border-[#E2E8F0] p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <img
                    src={srv.heroImage}
                    alt={srv.name}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-[#0F2537]">{srv.name}</h3>
                      {srv.isPopular && (
                        <span className="bg-[#F5B000] text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">{srv.description}</p>
                    <div className="text-[11px] font-bold text-[#0088FF] flex items-center gap-1 pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{srv.durationMinutes} Mins Duration</span>
                    </div>
                  </div>
                </div>

                {srv.inclusions && srv.inclusions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {srv.inclusions.slice(0, 3).map((inc, i) => (
                      <span key={i} className="text-[10px] font-bold text-[#0088FF] bg-blue-50 px-2 py-0.5 rounded-md">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-black text-[#0F2537]">₹{rawPrice}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-2">
                      Gold: ₹{memberPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('/customer/book', { state: { service: srv } })}
                    className="bg-[#0088FF] hover:bg-[#0066CC] text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
