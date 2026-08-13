import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Sparkles,
  Droplets,
  Shield,
  Gem,
  Bike,
  Wrench,
  Zap,
  Car,
  Settings,
  MapPin,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Award,
  Layers,
  Check,
  Clock,
  ThumbsUp,
  Lock,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { WipeitLogo } from '../ui/WipeitLogo';
import { Badge } from '../ui/Badge';
import { getStatusBadgeVariant } from '../../utils/formatters';

type ServiceMode = 'car' | 'bike' | 'puncture';

export const CustomerHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, vehicles, activeVehicle, setActiveVehicle, activeAddress, activeBooking } = useBooking();

  // Active mode concept state: 'car' | 'bike' | 'puncture'
  const [activeMode, setActiveMode] = useState<ServiceMode>(
    activeVehicle.type === 'bike' ? 'bike' : 'car'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [carFilter, setCarFilter] = useState<string>('all');
  const [bikeFilter, setBikeFilter] = useState<string>('all');

  // Handle switching mode concept card
  const handleSelectMode = (mode: ServiceMode) => {
    setActiveMode(mode);
    setSearchQuery('');

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
    } else if (mode === 'car') {
      const carVeh = vehicles.find((v) => v.type !== 'bike') || vehicles[0];
      if (carVeh) setActiveVehicle(carVeh);
    }
  };

  // --- CAR POPULAR PICKS ---
  const carPopularPicks = [
    {
      id: 'car-wash',
      title: 'Wash Only',
      subtitle: 'High-pressure exterior foam wash',
      price: 399,
      bgClass: 'bg-blue-50 border-blue-100 text-[#0088FF]',
      icon: <Droplets className="w-6 h-6 text-[#0088FF]" />,
      catId: 'CAT-CAR-01',
      filterTag: 'exterior'
    },
    {
      id: 'car-cleaning',
      title: 'Cleaning',
      subtitle: 'Exterior foam wash + interior vacuum',
      price: 699,
      bgClass: 'bg-purple-50 border-purple-100 text-purple-600',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      catId: 'CAT-CAR-02',
      filterTag: 'exterior'
    },
    {
      id: 'car-detailing',
      title: 'Detailing',
      subtitle: 'Full body paint correction & wax',
      price: 2499,
      bgClass: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      icon: <Gem className="w-6 h-6 text-emerald-600" />,
      catId: 'CAT-CAR-04',
      filterTag: 'exterior'
    },
    {
      id: 'car-general-service',
      title: 'General Service',
      subtitle: 'Full 50-point safety checkup',
      price: 999,
      bgClass: 'bg-orange-50 border-orange-100 text-orange-600',
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
      catId: 'CAT-CAR-08',
      filterTag: 'maintenance'
    }
  ];

  // --- BIKE POPULAR PICKS ---
  const bikePopularPicks = [
    {
      id: 'bike-express-wash',
      title: 'Express Bike Wash',
      subtitle: 'High pressure foam wash & microfiber dry',
      price: 199,
      bgClass: 'bg-amber-50 border-amber-100 text-amber-600',
      icon: <Bike className="w-6 h-6 text-amber-600" />,
      catId: 'CAT-BK-01',
      filterTag: 'wash'
    },
    {
      id: 'bike-foam-polish',
      title: 'Foam Clean & Polish',
      subtitle: 'Deep engine degrease + liquid wax seal',
      price: 349,
      bgClass: 'bg-yellow-50 border-yellow-100 text-yellow-700',
      icon: <Sparkles className="w-6 h-6 text-yellow-700" />,
      catId: 'CAT-BK-02',
      filterTag: 'polish'
    },
    {
      id: 'bike-chain-lube',
      title: 'Chain Clean & Lube',
      subtitle: 'PTFE non-fling chain lube & tension check',
      price: 299,
      bgClass: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      icon: <Settings className="w-6 h-6 text-emerald-700" />,
      catId: 'CAT-BK-06',
      filterTag: 'chain'
    },
    {
      id: 'bike-full-detailing',
      title: 'Superbike Detailing',
      subtitle: 'Ceramic matte & chrome shine coating',
      price: 1499,
      bgClass: 'bg-blue-50 border-blue-100 text-[#0088FF]',
      icon: <Gem className="w-6 h-6 text-[#0088FF]" />,
      catId: 'CAT-BK-04',
      filterTag: 'polish'
    }
  ];

  // Filtered lists based on search & tab filter
  const filteredCarPicks = useMemo(() => {
    let items = carPopularPicks;
    if (carFilter !== 'all') {
      items = items.filter((i) => i.filterTag === carFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q));
    }
    return items;
  }, [carFilter, searchQuery]);

  const filteredBikePicks = useMemo(() => {
    let items = bikePopularPicks;
    if (bikeFilter !== 'all') {
      items = items.filter((i) => i.filterTag === bikeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q));
    }
    return items;
  }, [bikeFilter, searchQuery]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-12">
      {/* 1. HERO HEADER SECTION (Matching Reference Image 3 Layout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <WipeitLogo size="md" variant="dark" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0F2537] tracking-tight leading-tight">
            Doorstep vehicle care, <br className="hidden sm:inline" />
            done the <span className="text-[#0088FF]">right way.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
            Professional car, bike & emergency puncture services delivered at your doorstep.
          </p>

          {/* Quick Trust Badges Strip (Reference Image 3 Header Badges) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2537]">
              <div className="w-7 h-7 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              Verified Experts
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2537]">
              <div className="w-7 h-7 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              On-Time Service
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2537]">
              <div className="w-7 h-7 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
              Quality Assured
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2537]">
              <div className="w-7 h-7 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              Secure Payments
            </div>
          </div>
        </div>

        {/* Hero Vehicle Image Banner (Reference Image 3 Right Side Graphic) */}
        <div className="relative w-full md:w-96 h-56 sm:h-64 rounded-3xl overflow-hidden shadow-lg border-2 border-white shrink-0 bg-gradient-to-br from-blue-500 to-blue-700">
          <img
            src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80"
            alt="Doorstep Car and Bike Wash"
            className="w-full h-full object-cover mix-blend-overlay opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537]/80 via-transparent to-transparent flex items-end p-4 text-white">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-blue-300">Wipeit Doorstep Care</div>
              <div className="text-sm font-bold">100% Eco-Friendly Water & Foam Wash</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE LOCATION BAR */}
      <div className="bg-white rounded-2xl p-3 border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F0F6FF] flex items-center justify-center text-[#0088FF]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-[#0F2537]">{activeAddress.label}: </span>
            <span className="text-[#64748B] font-medium">{activeAddress.line1}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#64748B]">Active Vehicle:</span>
          <span className="font-extrabold text-[#0F2537] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-slate-200">
            {activeVehicle.make} {activeVehicle.model} ({activeVehicle.registrationNumber})
          </span>
          <button onClick={() => navigate('/customer/garage')} className="text-xs font-extrabold text-[#0088FF] hover:underline">
            Change
          </button>
        </div>
      </div>

      {/* LIVE ACTIVE BOOKING NOTIFICATION */}
      {activeBooking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/customer/tracking')}
          className="cursor-pointer bg-[#0F2537] text-white p-4 rounded-3xl shadow-xl border border-blue-900/40 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#0088FF] animate-ping" />
            <div>
              <div className="text-[11px] font-black text-[#0088FF] uppercase tracking-wider">
                LIVE ACTIVE BOOKING TRACKING
              </div>
              <div className="font-extrabold text-sm">{activeBooking.service.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#0088FF] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              {getStatusBadgeVariant(activeBooking.status).label}
            </span>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>
      )}

      {/* 2. MAIN CONCEPT SELECTOR: "What do you need today?" (Exact layout of Reference Image 3) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2537] tracking-tight">
            What do you need today?
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] font-medium">
            Select a service category below to view dedicated packages
          </p>
        </div>

        {/* 3 DISTINCT CATEGORY CONCEPT CARDS (Car Care vs Bike Care vs Puncture Service) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* CARD 1: CAR CARE */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleSelectMode('car')}
            className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeMode === 'car'
                ? 'bg-gradient-to-b from-blue-50/80 to-white border-[#0088FF] shadow-lg ring-4 ring-blue-500/10'
                : 'bg-white border-[#E2E8F0] hover:border-blue-300 shadow-sm'
            }`}
          >
            {activeMode === 'car' && (
              <div className="absolute top-4 right-4 bg-[#0088FF] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Active Selection
              </div>
            )}

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0088FF] text-white flex items-center justify-center shadow-md">
                <Car className="w-7 h-7" />
              </div>

              {/* Realistic Indian Car Image */}
              <div className="w-full h-36 rounded-2xl overflow-hidden border border-blue-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80"
                  alt="Car Care Wash"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Car Care</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  Wash, detailing, interior cleaning & general service packages.
                </p>
              </div>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeMode === 'car'
                  ? 'bg-[#0088FF] text-white shadow-md'
                  : 'bg-slate-100 text-[#0F2537] hover:bg-[#0088FF] hover:text-white'
              }`}
            >
              <span>Book Car Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* CARD 2: BIKE CARE */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleSelectMode('bike')}
            className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeMode === 'bike'
                ? 'bg-gradient-to-b from-amber-50/80 to-white border-amber-500 shadow-lg ring-4 ring-amber-500/10'
                : 'bg-white border-[#E2E8F0] hover:border-amber-300 shadow-sm'
            }`}
          >
            {activeMode === 'bike' && (
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Active Selection
              </div>
            )}

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                <Bike className="w-7 h-7" />
              </div>

              {/* Realistic Indian Bike Image */}
              <div className="w-full h-36 rounded-2xl overflow-hidden border border-amber-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80"
                  alt="Bike Care Wash"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Bike Care</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  Express foam wash, polishing, PTFE chain lube & superbike care.
                </p>
              </div>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeMode === 'bike'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-100 text-[#0F2537] hover:bg-amber-500 hover:text-slate-950'
              }`}
            >
              <span>Book Bike Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* CARD 3: PUNCTURE SERVICE */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleSelectMode('puncture')}
            className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden ${
              activeMode === 'puncture'
                ? 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-600 shadow-lg ring-4 ring-emerald-500/10'
                : 'bg-white border-[#E2E8F0] hover:border-emerald-300 shadow-sm'
            }`}
          >
            {activeMode === 'puncture' && (
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Active Selection
              </div>
            )}

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Settings className="w-7 h-7" />
              </div>

              {/* Puncture Service Tire Image */}
              <div className="w-full h-36 rounded-2xl overflow-hidden border border-emerald-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"
                  alt="Emergency Puncture Repair"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Puncture Service</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  15-20 min emergency doorstep puncture repair for car & bike.
                </p>
              </div>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeMode === 'puncture'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-[#0F2537] hover:bg-emerald-600 hover:text-white'
              }`}
            >
              <span>Book Puncture Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3. DEDICATED FOCUSED SECTION FOR THE SELECTED MODE (Separate Content View) */}
      <AnimatePresence mode="wait">
        {/* === MODE A: DEDICATED CAR CARE SERVICES VIEW === */}
        {activeMode === 'car' && (
          <motion.div
            key="car-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4 border-t border-[#E2E8F0]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚗</span>
                  <h3 className="text-lg font-black text-[#0F2537]">Dedicated Car Services</h3>
                </div>
                <p className="text-xs text-[#475569] font-medium">
                  Showing packages customized for {activeVehicle.make} {activeVehicle.model}
                </p>
              </div>

              {/* Car Search Input */}
              <div className="relative min-w-[280px]">
                <Search className="h-4 w-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search car services..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0088FF]"
                />
              </div>
            </div>

            {/* Car Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setCarFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  carFilter === 'all'
                    ? 'bg-[#0088FF] text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                All Car Packages
              </button>
              <button
                onClick={() => setCarFilter('exterior')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  carFilter === 'exterior'
                    ? 'bg-[#0088FF] text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                Wash & Detailing
              </button>
              <button
                onClick={() => setCarFilter('maintenance')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  carFilter === 'maintenance'
                    ? 'bg-[#0088FF] text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                General Service & Repair
              </button>
            </div>

            {/* Car Popular Picks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCarPicks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/customer/catalog', { state: { categoryId: item.catId } })}
                  className="cursor-pointer bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col justify-between hover:shadow-md transition-all space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bgClass}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0F2537]">{item.title}</h4>
                    <p className="text-xs text-[#64748B] font-medium leading-tight mt-1">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-sm font-black text-[#0F2537]">From ₹{item.price}</span>
                    <span className="text-xs font-extrabold text-[#0088FF]">Book &gt;</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2x2 Car Category Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-3xl p-5 flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-base text-[#0F2537]">Exterior Wash & Detailing</h4>
                  <p className="text-xs text-[#475569]">Foam wash, body polish, ceramic coating.</p>
                  <button
                    onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-CAR-01' } })}
                    className="bg-[#0088FF] text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-xs"
                  >
                    Explore Exterior &gt;
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=300&auto=format&fit=crop&q=80"
                  alt="Car Wash"
                  className="w-28 h-24 object-cover rounded-2xl shadow-sm shrink-0"
                />
              </div>

              <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-3xl p-5 flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="font-black text-base text-[#0F2537]">Interior Cleaning & AC</h4>
                  <p className="text-xs text-[#475569]">Cabin vacuuming, seat shampoo, AC gas topup.</p>
                  <button
                    onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-CAR-05' } })}
                    className="bg-purple-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-xs"
                  >
                    Explore Interior &gt;
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&auto=format&fit=crop&q=80"
                  alt="Car Interior"
                  className="w-28 h-24 object-cover rounded-2xl shadow-sm shrink-0"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* === MODE B: DEDICATED BIKE CARE SERVICES VIEW === */}
        {activeMode === 'bike' && (
          <motion.div
            key="bike-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4 border-t border-[#E2E8F0]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏍️</span>
                  <h3 className="text-lg font-black text-[#0F2537]">Dedicated Bike & Two-Wheeler Services</h3>
                </div>
                <p className="text-xs text-[#475569] font-medium">
                  Customized doorstep packages for Royal Enfield, Scooters & Superbikes
                </p>
              </div>

              {/* Bike Search Input */}
              <div className="relative min-w-[280px]">
                <Search className="h-4 w-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bike services..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-amber-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Bike Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setBikeFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  bikeFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                All Bike Packages
              </button>
              <button
                onClick={() => setBikeFilter('wash')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  bikeFilter === 'wash'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                Foam Wash
              </button>
              <button
                onClick={() => setBikeFilter('polish')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  bikeFilter === 'polish'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                Polish & Detailing
              </button>
              <button
                onClick={() => setBikeFilter('chain')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  bikeFilter === 'chain'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                Chain & Engine
              </button>
            </div>

            {/* Bike Popular Picks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredBikePicks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/customer/catalog', { state: { categoryId: item.catId } })}
                  className="cursor-pointer bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col justify-between hover:shadow-md transition-all space-y-3"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bgClass}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0F2537]">{item.title}</h4>
                    <p className="text-xs text-[#64748B] font-medium leading-tight mt-1">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-sm font-black text-[#0F2537]">From ₹{item.price}</span>
                    <span className="text-xs font-extrabold text-amber-600">Book &gt;</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bike Care Feature Spotlight Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-2">
                <h4 className="text-lg font-black tracking-tight">Royal Enfield & Scooter Specialty Wash</h4>
                <p className="text-xs font-bold text-slate-900">
                  Includes degreasing engine, high pressure snow foam bath, microfiber dry & PTFE chain lube.
                </p>
                <button
                  onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-BK-01' } })}
                  className="bg-slate-950 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow"
                >
                  View Full Bike Catalog &gt;
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80"
                alt="Royal Enfield"
                className="w-32 h-24 object-cover rounded-2xl shadow border-2 border-white shrink-0"
              />
            </div>
          </motion.div>
        )}

        {/* === MODE C: DEDICATED PUNCTURE EMERGENCY REPAIR VIEW === */}
        {activeMode === 'puncture' && (
          <motion.div
            key="puncture-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pt-4 border-t border-[#E2E8F0]"
          >
            <div className="bg-emerald-50 border-2 border-emerald-500 p-6 rounded-3xl space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0F2537]">Emergency Doorstep Puncture Dispatch</h3>
                    <p className="text-xs text-emerald-800 font-bold">
                      ⚡ 15-20 Min Average Technician Arrival Time
                    </p>
                  </div>
                </div>

                <Badge variant="success" className="text-xs font-black uppercase px-3 py-1">
                  Technicians Available Nearby
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1">
                  <div className="font-extrabold text-[#0F2537]">Tubeless Tyre Plug</div>
                  <div className="text-[#64748B]">High-grade rubber plug repair</div>
                  <div className="font-black text-emerald-700 pt-1">₹199 flat</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1">
                  <div className="font-extrabold text-[#0F2537]">Tube Patch Repair</div>
                  <div className="text-[#64748B]">Cold vulcanized patch seal</div>
                  <div className="font-black text-emerald-700 pt-1">₹249 flat</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1">
                  <div className="font-extrabold text-[#0F2537]">Air Pressure Leak & Valve</div>
                  <div className="text-[#64748B]">Valve core replacement & topup</div>
                  <div className="font-black text-emerald-700 pt-1">₹99 flat</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-emerald-900 font-medium">
                  Dispatching technician to: <span className="font-extrabold">{activeAddress.line1}</span>
                </div>
                <button
                  onClick={() => navigate('/customer/puncture')}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Request Urgent SOS Technician Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FOOTER TRUST STRIP (Exact Reference Image 3 Bottom Bar) */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">Doorstep Service</h4>
            <p className="text-[11px] text-[#64748B] font-medium">We come directly to you</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">Trained Experts</h4>
            <p className="text-[11px] text-[#64748B] font-medium">Skilled & background verified</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">Safe & Reliable</h4>
            <p className="text-[11px] text-[#64748B] font-medium">Your vehicle is in safe hands</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">Transparent Pricing</h4>
            <p className="text-[11px] text-[#64748B] font-medium">No hidden charges</p>
          </div>
        </div>
      </div>
    </div>
  );
};
