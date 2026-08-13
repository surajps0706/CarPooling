import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Car,
  Bike,
  Settings,
  MapPin,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Lock,
  ArrowRight,
  IndianRupee,
  Award,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { WipeitLogo } from '../ui/WipeitLogo';
import { getStatusBadgeVariant } from '../../utils/formatters';

export const CustomerHomeView: React.FC = () => {
  const navigate = useNavigate();
  const { activeVehicle, activeAddress, activeBooking } = useBooking();

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-12">
      {/* 1. HERO HEADER SECTION (NO IMAGES) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
        <div className="space-y-5 max-w-3xl">
          <div className="flex items-center gap-3">
            <WipeitLogo size="md" variant="dark" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0F2537] tracking-tight leading-tight">
            Doorstep vehicle care, <br className="hidden sm:inline" />
            done the <span className="text-[#0088FF]">right way.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
            Professional car, bike & emergency puncture services delivered at your doorstep.
          </p>

          {/* Quick Trust Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2537]">
              <div className="w-8 h-8 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              Verified Experts
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2537]">
              <div className="w-8 h-8 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              On-Time Service
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2537]">
              <div className="w-8 h-8 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
              Quality Assured
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F2537]">
              <div className="w-8 h-8 rounded-full bg-[#0088FF]/10 text-[#0088FF] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              Secure Payments
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

      {/* 2. DEDICATED SEPARATE PAGE CONCEPT CARDS ("What do you need today?") */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2537] tracking-tight">
            What do you need today?
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] font-medium">
            Click on a service below to open its dedicated page
          </p>
        </div>

        {/* 3 DISTINCT CATEGORY CONCEPT CARDS (Direct Separate Page Navigators) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* CARD 1: CAR CARE (NAVIGATES TO SEPARATE PAGE /customer/car-care) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate('/customer/car-care')}
            className="cursor-pointer rounded-3xl p-6 border-2 border-blue-100 bg-white hover:border-[#0088FF] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0088FF] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Car className="w-7 h-7" />
              </div>

              {/* Realistic Indian Car Image */}
              <div className="w-full h-40 rounded-2xl overflow-hidden border border-blue-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80"
                  alt="Car Care Wash"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Car Care</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  Wash, detailing, interior cleaning & general service packages.
                </p>
              </div>
            </div>

            <button className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm bg-[#0088FF] text-white shadow-md flex items-center justify-center gap-2 group-hover:bg-[#0066CC] transition-all">
              <span>Book Car Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* CARD 2: BIKE CARE (NAVIGATES TO SEPARATE PAGE /customer/bike-care) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate('/customer/bike-care')}
            className="cursor-pointer rounded-3xl p-6 border-2 border-amber-100 bg-white hover:border-amber-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Bike className="w-7 h-7" />
              </div>

              {/* Realistic Indian Bike Image */}
              <div className="w-full h-40 rounded-2xl overflow-hidden border border-amber-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80"
                  alt="Bike Care Wash"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Bike Care</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  Express foam wash, polishing, PTFE chain lube & superbike care.
                </p>
              </div>
            </div>

            <button className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm bg-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-2 group-hover:bg-amber-600 transition-all">
              <span>Book Bike Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* CARD 3: PUNCTURE SERVICE (NAVIGATES TO SEPARATE PAGE /customer/puncture) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate('/customer/puncture')}
            className="cursor-pointer rounded-3xl p-6 border-2 border-emerald-100 bg-white hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7" />
              </div>

              {/* Puncture Service Tire Image */}
              <div className="w-full h-40 rounded-2xl overflow-hidden border border-emerald-100 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"
                  alt="Emergency Puncture Repair"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#0F2537]">Puncture Service</h3>
                <p className="text-xs text-[#64748B] font-medium mt-1">
                  15-20 min emergency doorstep puncture repair for car & bike.
                </p>
              </div>
            </div>

            <button className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm bg-emerald-600 text-white shadow-md flex items-center justify-center gap-2 group-hover:bg-emerald-700 transition-all">
              <span>Book Puncture Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* 3. FOOTER TRUST STRIP */}
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
