import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Bike,
  Sparkles,
  Gem,
  Settings,
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

export const BikeCareView: React.FC = () => {
  const navigate = useNavigate();
  const { activeVehicle, activeAddress } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Bike Services from mockData
  const bikeServices = useMemo(() => {
    return SERVICE_ITEMS.filter(
      (srv) => srv.vehicleTypes.includes('bike') || ['CAT-BK-01', 'CAT-BK-02', 'CAT-BK-06'].includes(srv.categoryId)
    );
  }, []);

  const filteredServices = useMemo(() => {
    let list = bikeServices;

    if (selectedCategory === 'wash') {
      list = list.filter((s) => s.categoryId === 'CAT-BK-01' || s.categoryId === 'CAT-BK-02');
    } else if (selectedCategory === 'polish') {
      list = list.filter((s) => s.categoryId === 'CAT-BK-03' || s.categoryId === 'CAT-BK-04');
    } else if (selectedCategory === 'chain') {
      list = list.filter((s) => s.categoryId === 'CAT-BK-05' || s.categoryId === 'CAT-BK-06');
    } else if (selectedCategory === 'maintenance') {
      list = list.filter((s) => s.categoryId === 'CAT-BK-07' || s.categoryId === 'CAT-BK-08' || s.categoryId === 'CAT-BK-09');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }

    return list;
  }, [bikeServices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* TOP HEADER WITH BACK BUTTON */}
      <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/customer')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#0F2537] tracking-tight flex items-center gap-2">
              <span>🏍️</span> Bike Wash, Polishing & Detailing
            </h1>
            <p className="text-xs text-[#64748B] font-medium hidden sm:block">
              Dedicated two-wheeler packages for Royal Enfield, Scooters & Superbikes
            </p>
          </div>
        </div>

        <WipeitLogo size="sm" variant="dark" />
      </div>

      {/* ACTIVE BIKE & LOCATION STRIP */}
      <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#0F2537] font-bold">
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>Location: {activeAddress.label} • {activeAddress.line1.slice(0, 32)}...</span>
        </div>
        <div className="flex items-center gap-2 text-amber-800 font-extrabold bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
          <span>🏍️ {activeVehicle.make} {activeVehicle.model} ({activeVehicle.registrationNumber})</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="h-5 w-5 text-[#94A3B8] absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search bike foam wash, chain lube, ceramic polish, engine degrease..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-amber-500'
          }`}
        >
          All Bike Services ({bikeServices.length})
        </button>
        <button
          onClick={() => setSelectedCategory('wash')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'wash'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-amber-500'
          }`}
        >
          🧽 Foam Wash
        </button>
        <button
          onClick={() => setSelectedCategory('polish')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'polish'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-amber-500'
          }`}
        >
          ✨ Polish & Ceramic Coating
        </button>
        <button
          onClick={() => setSelectedCategory('chain')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            selectedCategory === 'chain'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-amber-500'
          }`}
        >
          ⚙️ Chain Lube & Engine Oil
        </button>
      </div>

      {/* 2x2 FEATURED CATEGORY CARDS WITH REAL INDIAN MOTORCYCLE IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Express Bike Foam Wash */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-center justify-between">
          <div className="space-y-2 max-w-[60%]">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Doorstep Express
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537]">Express Bike Foam Wash</h3>
            <p className="text-xs text-[#475569]">pH neutral snow foam, engine wash & microfiber hand dry.</p>
            <div className="text-sm font-black text-amber-700">From ₹199</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80"
            alt="Bike Wash"
            className="w-32 h-28 object-cover rounded-2xl shadow-sm shrink-0 border border-white"
          />
        </div>

        {/* Superbike Ceramic Polish */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-5 flex items-center justify-between">
          <div className="space-y-2 max-w-[60%]">
            <span className="bg-yellow-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              High Gloss
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537]">Liquid Wax & Ceramic Polish</h3>
            <p className="text-xs text-[#475569]">Matte & gloss body wax, chrome polish & PTFE chain lube.</p>
            <div className="text-sm font-black text-yellow-700">From ₹349</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80"
            alt="Superbike Detailing"
            className="w-32 h-28 object-cover rounded-2xl shadow-sm shrink-0 border border-white"
          />
        </div>
      </div>

      {/* BIKE SERVICES LIST GRID */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-black text-[#0F2537]">
          Available Bike Services ({filteredServices.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((srv) => {
            const rawPrice = srv.pricing.bike || 199;
            const memberPrice = srv.memberPricing?.bike || Math.round(rawPrice * 0.85);

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
                        <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">{srv.description}</p>
                    <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{srv.durationMinutes} Mins Duration</span>
                    </div>
                  </div>
                </div>

                {srv.inclusions && srv.inclusions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {srv.inclusions.slice(0, 3).map((inc, i) => (
                      <span key={i} className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
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
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5"
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
