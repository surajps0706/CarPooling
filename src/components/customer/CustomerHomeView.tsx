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
  PhoneCall,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { WipeitLogo } from '../ui/WipeitLogo';
import { Badge } from '../ui/Badge';
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from '../../constants/mockData';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const CustomerHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { currentCustomer, vehicles, activeVehicle, setActiveVehicle, activeAddress, activeBooking } = useBooking();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const isBikeMode = activeVehicle.type === 'bike';

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

  // Filter Categories by vehicle target
  const categoryCount = useMemo(() => {
    return isBikeMode ? 11 : 12;
  }, [isBikeMode]);

  // Filter service items based on search and category filter
  const filteredPopularPicks = useMemo(() => {
    let items = [
      {
        id: 'wash-only',
        title: 'Wash Only',
        subtitle: 'High-pressure exterior wash',
        price: 399,
        bgClass: 'bg-blue-50 border-blue-100 text-[#0088FF]',
        icon: <Droplets className="w-6 h-6 text-[#0088FF]" />,
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=80',
        catId: 'CAT-CAR-01',
        type: 'exterior'
      },
      {
        id: 'cleaning',
        title: 'Cleaning',
        subtitle: 'Exterior foam wash + interior vacuum',
        price: 699,
        bgClass: 'bg-purple-50 border-purple-100 text-purple-600',
        icon: <Sparkles className="w-6 h-6 text-purple-600" />,
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&auto=format&fit=crop&q=80',
        catId: 'CAT-CAR-02',
        type: 'exterior'
      },
      {
        id: 'detailing',
        title: 'Detailing',
        subtitle: 'Full body paint correction',
        price: 2499,
        bgClass: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        icon: <Gem className="w-6 h-6 text-emerald-600" />,
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop&q=80',
        catId: 'CAT-CAR-04',
        type: 'exterior'
      },
      {
        id: 'general-service',
        title: 'General Service',
        subtitle: 'Full 50-point safety check',
        price: 999,
        bgClass: 'bg-orange-50 border-orange-100 text-orange-600',
        icon: <Wrench className="w-6 h-6 text-orange-600" />,
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80',
        catId: 'CAT-CAR-08',
        type: 'maintenance'
      },
      {
        id: 'bike-wash',
        title: 'Bike Foam Wash',
        subtitle: 'Foam bath & PTFE chain lube',
        price: 199,
        bgClass: 'bg-cyan-50 border-cyan-100 text-cyan-700',
        icon: <Bike className="w-6 h-6 text-cyan-700" />,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
        catId: 'CAT-BK-01',
        type: 'bike'
      }
    ];

    if (selectedFilter !== 'all') {
      items = items.filter(i => i.type === selectedFilter || (selectedFilter === 'bike' && i.id === 'bike-wash'));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q));
    }

    return items;
  }, [selectedFilter, searchQuery]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* BRANDING HEADER & SERVICE COUNT */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#F0F6FF] rounded-2xl border border-blue-100 shrink-0">
            <WipeitLogo size="md" variant="dark" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0F2537] tracking-tight">
                {isBikeMode ? 'Bike Wash & Care Services' : 'Car Services'}
              </h1>
              <Badge variant="success" className="text-[10px] font-extrabold uppercase tracking-wide">
                Doorstep Expert
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
              Choose the right service for your vehicle
            </p>
          </div>
        </div>

        {/* Counter Badge & Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Vehicle Mode Toggle Pills */}
          <div className="bg-[#F1F5F9] p-1 rounded-2xl flex items-center shadow-inner">
            <button
              onClick={() => handleToggleMode('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !isBikeMode
                  ? 'bg-[#0F2537] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0F2537]'
              }`}
            >
              <span>🚗</span>
              Car
            </button>
            <button
              onClick={() => handleToggleMode('bike')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isBikeMode
                  ? 'bg-[#0088FF] text-white shadow'
                  : 'text-[#64748B] hover:text-[#0F2537]'
              }`}
            >
              <span>🏍️</span>
              Bike
            </button>
          </div>

          <div className="bg-[#F0F6FF] border border-[#BFDBFE] px-3.5 py-2 rounded-2xl flex items-center gap-2 text-[#0088FF] font-black text-xs sm:text-sm shadow-xs">
            <Layers className="w-4 h-4 text-[#0088FF]" />
            <span>{categoryCount} Services</span>
          </div>
        </div>
      </div>

      {/* SEARCH BAR (Matching Reference Image 2) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a service, e.g. Wash, Detailing, AC, Oil change..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0088FF] focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
          >
            Clear
          </button>
        )}
      </div>

      {/* FILTER CATEGORY PILLS (Matching Image 2 Tab Strip) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Layers className="w-4 h-4" />
          All Services
        </button>

        <button
          onClick={() => setSelectedFilter('exterior')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'exterior'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Droplets className="w-4 h-4 text-[#0088FF]" />
          Exterior
        </button>

        <button
          onClick={() => setSelectedFilter('interior')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'interior'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
          Interior
        </button>

        <button
          onClick={() => setSelectedFilter('maintenance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'maintenance'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Wrench className="w-4 h-4 text-emerald-500" />
          Maintenance
        </button>

        <button
          onClick={() => setSelectedFilter('repair')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'repair'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Settings className="w-4 h-4 text-orange-500" />
          Repair
        </button>

        <button
          onClick={() => setSelectedFilter('bike')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedFilter === 'bike'
              ? 'bg-[#0088FF] text-white shadow-md'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0F2537]'
          }`}
        >
          <Bike className="w-4 h-4 text-cyan-600" />
          Bike Care
        </button>
      </div>

      {/* ACTIVE LOCATION & VEHICLE CONTEXT BAR */}
      <div className="bg-white rounded-2xl p-3 border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F0F6FF] flex items-center justify-center text-[#0088FF]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-[#0F2537]">{activeAddress.label}</div>
            <div className="text-[11px] text-[#64748B] truncate max-w-xs">{activeAddress.line1}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-sm">{activeVehicle.type === 'bike' ? '🏍️' : '🚗'}</span>
            <span className="font-bold text-[#0F2537]">{activeVehicle.make} {activeVehicle.model}</span>
            <span className="text-[10px] text-[#64748B]">({activeVehicle.registrationNumber})</span>
          </div>

          <button
            onClick={() => navigate('/customer/garage')}
            className="text-xs font-extrabold text-[#0088FF] hover:underline"
          >
            Change
          </button>
        </div>
      </div>

      {/* LIVE ACTIVE BOOKING NOTIFICATION (IF ANY) */}
      {activeBooking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/customer/tracking')}
          className="cursor-pointer bg-[#0F2537] text-white p-4 rounded-3xl shadow-xl border border-blue-900/40 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0088FF] animate-ping" />
              <span className="text-[11px] font-black text-[#0088FF] uppercase tracking-wider">
                LIVE SERVICE TRACKING
              </span>
            </div>
            <span className="bg-[#0088FF] text-white font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full">
              {getStatusBadgeVariant(activeBooking.status).label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-base text-white">{activeBooking.service.name}</h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Technician: {activeBooking.partner?.fullName} • {activeBooking.vehicle.make} {activeBooking.vehicle.model}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-white/80 shrink-0" />
          </div>
        </motion.div>
      )}

      {/* EMERGENCY PUNCTURE SOS STRIP */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => navigate('/customer/puncture')}
        className="cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 rounded-3xl shadow-lg border border-red-500/30 flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shrink-0">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base tracking-tight">EMERGENCY PUNCTURE REPAIR</h3>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                15-20 MIN DISPATCH
              </span>
            </div>
            <p className="text-xs text-red-100 font-medium mt-0.5">
              Tubeless plug, tube patch, air leak & valve replacement at your location
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-white shrink-0" />
      </motion.div>

      {/* POPULAR PICKS SECTION (Matching Reference Image 2 Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0F2537] tracking-tight">
            Popular Picks
          </h2>
          <button
            onClick={() => navigate('/customer/catalog')}
            className="text-xs sm:text-sm font-bold text-[#0088FF] hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Horizontal Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredPopularPicks.map((pick) => (
            <motion.div
              key={pick.id}
              whileHover={{ y: -3 }}
              onClick={() => navigate('/customer/catalog', { state: { categoryId: pick.catId } })}
              className="cursor-pointer bg-white rounded-3xl border border-[#E2E8F0] p-4 flex flex-col justify-between hover:shadow-md transition-all space-y-3"
            >
              {/* Graphic Icon Box */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${pick.bgClass}`}>
                {pick.icon}
              </div>

              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#0F2537] tracking-tight">
                  {pick.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#64748B] font-medium leading-tight mt-1 line-clamp-2">
                  {pick.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs sm:text-sm font-black text-[#0F2537]">
                  From ₹{pick.price}
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#0088FF]">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BROWSE BY CATEGORY — 2x2 LARGE BANNER CARDS (Matching Reference Image 2) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0F2537] tracking-tight">
            Browse by Category
          </h2>
          <span className="text-xs font-semibold text-[#64748B]">Professional Wash & Detailing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BANNER 1: EXTERIOR CARE */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="z-10 max-w-[65%] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0088FF] text-white flex items-center justify-center shadow-sm">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537] tracking-tight">
                    Exterior Care
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Make your car shine inside out
                  </p>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF]" />
                  Wash Only (High Pressure)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF]" />
                  Polishing & Wax Seal
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088FF]" />
                  Ceramic Detailing
                </li>
              </ul>

              <button
                onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-CAR-01' } })}
                className="mt-2 bg-[#0088FF] hover:bg-[#0066CC] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-sm inline-flex items-center gap-1.5 transition-all"
              >
                View 3 Services <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indian Car Wash Image Right side */}
            <div className="absolute right-0 bottom-0 top-0 w-2/5 overflow-hidden rounded-r-3xl">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80"
                alt="Exterior Car Wash"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFF6FF] via-transparent to-transparent" />
            </div>
          </div>

          {/* BANNER 2: INTERIOR CARE */}
          <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="z-10 max-w-[65%] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537] tracking-tight">
                    Interior Care
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Clean, fresh and hygienic cabin
                  </p>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                  Interior Vacuum & Wipedown
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                  Deep Seat & Roof Steam Clean
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                  AC Vent Gas & Sanitization
                </li>
              </ul>

              <button
                onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-CAR-05' } })}
                className="mt-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-sm inline-flex items-center gap-1.5 transition-all"
              >
                View 3 Services <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indian Car Interior Image Right side */}
            <div className="absolute right-0 bottom-0 top-0 w-2/5 overflow-hidden rounded-r-3xl">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80"
                alt="Car Interior Cleaning"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3FF] via-transparent to-transparent" />
            </div>
          </div>

          {/* BANNER 3: MAINTENANCE */}
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="z-10 max-w-[65%] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-sm">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537] tracking-tight">
                    Maintenance
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Regular care for smooth performance
                  </p>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  Synthetic Engine Oil Flush
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  Full 50-Point General Service
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  Battery Jumpstart & Check
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  Tyre Pressure & Brake Pads
                </li>
              </ul>

              <button
                onClick={() => navigate('/customer/catalog', { state: { categoryId: 'CAT-CAR-08' } })}
                className="mt-2 bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-sm inline-flex items-center gap-1.5 transition-all"
              >
                View 4 Services <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indian Car Maintenance Engine Image Right side */}
            <div className="absolute right-0 bottom-0 top-0 w-2/5 overflow-hidden rounded-r-3xl">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80"
                alt="Car Engine Maintenance"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ECFDF5] via-transparent to-transparent" />
            </div>
          </div>

          {/* BANNER 4: REPAIR & PARTS */}
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            <div className="z-10 max-w-[65%] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shadow-sm">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0F2537] tracking-tight">
                    Repair & Parts
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Fix issues and replace what's needed
                  </p>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  Doorstep Puncture Assistance
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  OEM Wiper & Spare Parts
                </li>
              </ul>

              <button
                onClick={() => navigate('/customer/puncture')}
                className="mt-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-sm inline-flex items-center gap-1.5 transition-all"
              >
                View 2 Services <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Indian Car Tyre Repair Image Right side */}
            <div className="absolute right-0 bottom-0 top-0 w-2/5 overflow-hidden rounded-r-3xl">
              <img
                src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"
                alt="Car Tyre Puncture Repair"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFF7ED] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* TWO-WHEELER BIKE WASH & DETAILING SPOTLIGHT BANNER */}
      <div className="bg-[#E0F2FE] border border-[#BAE6FD] rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative">
        <div className="z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#0088FF] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <span>🏍️</span> Dedicated Bike & Scooter Wash
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#0F2537]">
            Royal Enfield, Scooter & Superbike Wash
          </h3>
          <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed">
            High pressure foam bath, engine degrease, PTFE chain lube & ceramic wax polish delivered right to your doorstep.
          </p>
          <button
            onClick={() => {
              handleToggleMode('bike');
              navigate('/customer/catalog', { state: { categoryId: 'CAT-BK-01' } });
            }}
            className="mt-2 bg-[#0F2537] hover:bg-[#0A1828] text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all"
          >
            Explore Bike Wash Packages <ChevronRight className="w-4 h-4 text-[#0088FF]" />
          </button>
        </div>

        <div className="w-full md:w-64 h-36 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-white">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80"
            alt="Royal Enfield Bike Wash"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* WHY CHOOSE US? SECTION (Matching Reference Image 2) */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-black text-[#0F2537] tracking-tight">
          Why Choose Us?
        </h2>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xs">
          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F6FF] text-[#0088FF] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">
                Trusted Professionals
              </h4>
              <p className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                Certified experts and quality products
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F6FF] text-[#0088FF] flex items-center justify-center shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">
                Transparent Pricing
              </h4>
              <p className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                No hidden charges, what you see is what you pay
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F6FF] text-[#0088FF] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">
                Easy Booking
              </h4>
              <p className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                Book in minutes and choose your convenient time
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0F6FF] text-[#0088FF] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#0F2537]">
                Quality Assured
              </h4>
              <p className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                100% satisfaction or we make it right
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HERO CALLOUT BANNER (Matching Reference Image 2) */}
      <div className="bg-gradient-to-r from-[#EFF6FF] via-[#F0F6FF] to-[#E0EDFF] border border-[#BFDBFE] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden relative">
        <div className="max-w-xl space-y-3 z-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2537] tracking-tight">
            Keep Your Car & Bike in Top Condition
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] font-medium">
            Choose the best service and drive with confidence. Instant doorstep booking with verified technicians.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/customer/catalog')}
              className="bg-[#0088FF] hover:bg-[#0066CC] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              Book a Service Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sleek Indian White Sedan with Verified Check Badge */}
        <div className="relative w-full md:w-80 h-40 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80"
            alt="Keep your vehicle in top condition"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-[#0088FF] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
