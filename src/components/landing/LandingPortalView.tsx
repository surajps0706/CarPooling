import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Wrench,
  LayoutDashboard,
  Sparkles,
  Play,
  ShieldCheck,
  MapPin,
  Camera,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bike,
  Car,
  Clock,
  Star,
  Layers,
  ChevronRight,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const LandingPortalView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'customer' | 'partner' | 'admin'>('customer');

  const bikeServicesList = [
    { icon: '🛢️', title: 'Engine Oil Change', desc: 'Synthetic drain & sludge flush' },
    { icon: '🔋', title: 'Battery Check', desc: 'Voltage load & terminal polish' },
    { icon: '🧰', title: 'Clutch & Gear Service', desc: 'Cable tension & bite calibration' },
    { icon: '🏍️', title: 'Engine Tuning', desc: 'Carb/FI ultrasonic clean & RPM' },
    { icon: '🔩', title: 'Suspension Check', desc: 'Telescopic fork oil seal audit' },
    { icon: '💡', title: 'Electrical Check', desc: 'Lighting & wiring health check' },
    { icon: '🌫️', title: 'Air Filter Cleaning', desc: 'Airbox blowout & mesh clearance' },
    { icon: '🔥', title: 'Spark Plug Service', desc: 'Carbon removal & gap tuning' },
    { icon: '⛓️', title: 'Chain Clean & Lube', desc: 'PTFE non-fling synthetic lube' },
    { icon: '🛞', title: 'Tyre & Brake Care', desc: 'Disc pad mm & PSI inflation' },
    { icon: '⚙️', title: 'Spare Parts', desc: 'OEM fitment & bolt torque' },
    { icon: '🚚', title: 'Doorstep Pickup & Drop', desc: 'Safe rider transit & log' },
  ];

  return (
    <div className="flex-1 bg-[#06090E] text-white flex flex-col justify-between max-w-full w-full overflow-x-hidden min-h-screen">
      {/* Luxury Hero Banner */}
      <div className="relative border-b border-[#1E293B] bg-gradient-to-b from-[#0A0F17] via-[#080D15] to-[#06090E] px-4 sm:px-8 pt-10 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0088FF]/20 via-[#00D1FF]/10 to-[#F5B000]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#0088FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10 text-center">
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827]/90 border border-[#1E293B] text-xs font-semibold text-[#0088FF] shadow-inner"
          >
            <Zap className="w-3.5 h-3.5 text-[#F5B000] fill-[#F5B000]" />
            <span className="tracking-wide">✦ NEXT-GEN AUTOMOBILE & BIKE CARE ✦</span>
          </motion.div>

          {/* Title Showcase */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-none">
              Drive Clean. <span className="bg-gradient-to-r from-[#0088FF] via-[#38BDF8] to-[#F5B000] bg-clip-text text-transparent">Shine Always.</span>
            </h1>
            <p className="text-sm sm:text-lg text-[#94A3B8] max-w-2xl mx-auto font-normal leading-relaxed">
              Enterprise doorstep car detailing, comprehensive motorcycle engine servicing, real-time partner GPS dispatch, and transparent operational control.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => navigate('/customer')}
              className="bg-[#0088FF] hover:bg-[#0066CC] text-white px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-[#0088FF]/25 transition-all flex items-center gap-2"
            >
              Launch Customer App <Smartphone className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/partner')}
              className="bg-[#1E293B]/60 border-[#334155] text-white hover:bg-[#334155] px-6 py-3.5 rounded-2xl font-semibold transition-all flex items-center gap-2"
            >
              Partner Console <Wrench className="w-4 h-4 text-[#F5B000]" />
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto border-t border-[#1E293B]/80 text-center">
            <div className="p-3 rounded-2xl bg-[#0F172A]/50 border border-[#1E293B]/60">
              <div className="text-2xl font-black text-white">45,000+</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">Vehicles Cleaned</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A]/50 border border-[#1E293B]/60">
              <div className="text-2xl font-black text-[#0088FF]">18 Mins</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">Average Technician ETA</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A]/50 border border-[#1E293B]/60">
              <div className="text-2xl font-black text-[#F5B000]">100%</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">Photo Verified Audit</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A]/50 border border-[#1E293B]/60">
              <div className="text-2xl font-black text-emerald-400">4.9 / 5.0</div>
              <div className="text-xs text-[#94A3B8] mt-0.5">Verified CSAT Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Interactive App Explorer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 w-full space-y-10">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-[#0088FF] uppercase tracking-widest">Unified Platform Ecosystem</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Explore the Wipeit Surfaces</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Switch between the 3 distinct interfaces designed for customers, field partners, and business managers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-[#0F172A] p-1.5 rounded-2xl border border-[#1E293B] flex items-center gap-1 sm:gap-2 max-w-md w-full">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'customer'
                  ? 'bg-[#0088FF] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Customer
            </button>

            <button
              onClick={() => setActiveTab('partner')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'partner'
                  ? 'bg-[#F5B000] text-[#0A0F17] shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" /> Partner
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#38BDF8] text-[#0A0F17] shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Admin
            </button>
          </div>
        </div>

        {/* Active Tab Preview Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'customer' && (
            <motion.div
              key="customer-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-10 border border-[#334155] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0088FF]/20 text-[#38BDF8] text-xs font-bold">
                  <Smartphone className="w-3.5 h-3.5" /> Customer App Interface
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  1-Tap Doorstep Car & Bike Care Booking
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Discover foam washing, deep interior vacuuming, 9H ceramic spray, and complete motorcycle engine servicing with real-time GPS technician tracking.
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                    <span>Instant pricing tailored for Hatchbacks, Sedans, SUVs, and Motorcycles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                    <span>Live map displaying technician route & estimated arrival countdown</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                    <span>Transparent before & after photo audit uploaded straight to your app</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => navigate('/customer')}
                    className="bg-[#0088FF] hover:bg-[#0066CC] text-white px-6 py-3 rounded-xl font-bold"
                  >
                    Open Customer App <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Visual App Card Preview */}
              <div className="bg-[#0A0F17] p-5 rounded-2xl border border-[#334155] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                  <span className="font-mono text-[#0088FF]">Wipeit Customer View</span>
                  <span className="flex items-center gap-1 text-emerald-400">● Live GPS Connected</span>
                </div>
                <div className="bg-[#1E293B]/60 p-3 rounded-xl border border-[#334155]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0088FF]/20 text-[#0088FF] flex items-center justify-center font-bold">🚗</div>
                    <div>
                      <div className="text-xs font-bold text-white">Honda City ZX</div>
                      <div className="text-[10px] text-[#94A3B8]">KA01CQ5521 • Pearl White</div>
                    </div>
                  </div>
                  <Badge variant="accent" size="sm">Active</Badge>
                </div>
                <div className="bg-[#0088FF]/10 border border-[#0088FF]/40 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#38BDF8]">Premium Foam Wash & Wax</span>
                    <span className="font-bold text-white">₹449</span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">Technician Rahul Verma on the way (12 mins away)</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'partner' && (
            <motion.div
              key="partner-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-10 border border-[#334155] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B000]/20 text-[#F5B000] text-xs font-bold">
                  <Wrench className="w-3.5 h-3.5" /> Technician Partner Console
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Field Technician Job & Earnings Hub
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Engineered for outdoor clarity, high contrast UI, 1-tap turn-by-turn navigation, mandatory camera audit steps, and instant daily payout tracking.
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B000] shrink-0" />
                    <span>High-contrast sunlight readable interface for field technicians</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B000] shrink-0" />
                    <span>Enforced before & after photo upload checklist to guarantee quality</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B000] shrink-0" />
                    <span>Transparent daily earnings breakdown & weekly direct payout bank log</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => navigate('/partner')}
                    className="bg-[#F5B000] hover:bg-[#D99B00] text-[#0A0F17] px-6 py-3 rounded-xl font-bold"
                  >
                    Open Partner Console <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Visual App Card Preview */}
              <div className="bg-[#0A0F17] p-5 rounded-2xl border border-[#334155] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                  <span className="font-mono text-[#F5B000]">Wipeit Partner Dispatch</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">ON DUTY</span>
                </div>
                <div className="bg-[#FEF9C3]/10 border border-[#F5B000]/40 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#F5B000]">Job #ACP-20901 • Koramangala</span>
                    <span className="font-bold text-emerald-400">+₹1,850 Today</span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">Arjun Mehta • Premium Foam Wash + Tyre Shine</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-10 border border-[#334155] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-[#38BDF8] text-xs font-bold">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Executive Control Panel
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Real-Time Business Operations & Dispatch Command
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Full visibility over revenue metrics, technician route assignment, service catalog pricing configurations, and customer support management.
                </p>

                <div className="space-y-2.5 text-xs text-[#E2E8F0] pt-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Real-time dispatch drawer to reassign active technicians with 1 click</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Financial analytics engine with revenue, tax, and partner commission split</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Dynamic service catalog & multi-tier pricing grid management</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => navigate('/admin')}
                    className="bg-[#38BDF8] hover:bg-[#0284C7] text-[#0A0F17] px-6 py-3 rounded-xl font-bold"
                  >
                    Open Admin Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Visual App Card Preview */}
              <div className="bg-[#0A0F17] p-5 rounded-2xl border border-[#334155] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                  <span className="font-mono text-[#38BDF8]">Wipeit Admin Operations</span>
                  <span className="text-xs text-[#94A3B8]">Live Server Stream</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155]">
                    <div className="text-[10px] text-[#94A3B8]">Today's Revenue</div>
                    <div className="text-base font-extrabold text-white">₹48,920</div>
                  </div>
                  <div className="bg-[#1E293B] p-3 rounded-xl border border-[#334155]">
                    <div className="text-[10px] text-[#94A3B8]">Active Jobs</div>
                    <div className="text-base font-extrabold text-emerald-400">14 Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dedicated Bike Services Section */}
        <div className="pt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E293B] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2">
                <Bike className="w-3.5 h-3.5" /> Full Two-Wheeler Care Package
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Complete Bike Services Range</h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Precision doorstep maintenance, tuning, and detailing built specifically for motorcycles & scooters.
              </p>
            </div>

            <Button
              onClick={() => navigate('/customer/catalog')}
              className="bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155] text-xs font-semibold shrink-0"
            >
              Explore Bike Catalog <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Bike Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {bikeServicesList.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                onClick={() => navigate('/customer/catalog')}
                className="bg-[#0F172A] p-3.5 rounded-2xl border border-[#1E293B] hover:border-[#0088FF]/60 cursor-pointer transition-all space-y-1.5"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="text-xs font-bold text-white line-clamp-1">{item.title}</div>
                <div className="text-[11px] text-[#94A3B8] line-clamp-1">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#0088FF]/10 via-[#0F172A] to-[#F5B000]/10 p-4 sm:p-6 rounded-2xl border border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-[#F5B000]">✨ Plus Wash, Deep Cleaning, Polishing & Detailing</div>
              <div className="text-xs text-[#94A3B8]">Includes 9H Nano Ceramic Coating for fuel tanks, exhaust pipes & alloy wheels.</div>
            </div>
            <Button
              size="sm"
              onClick={() => navigate('/customer/catalog')}
              className="bg-[#0088FF] hover:bg-[#0066CC] text-white font-bold shrink-0"
            >
              Book Bike Care <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* End-to-End Workflow Section */}
        <div className="pt-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">How the Wipeit Engine Works</h3>
            <p className="text-xs text-[#94A3B8]">Seamless transparency from doorstep booking to verified job completion.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#0088FF]/20 text-[#0088FF] font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h4 className="font-bold text-xs text-white">Select Service & Slot</h4>
              <p className="text-[11px] text-[#94A3B8]">
                Choose car or bike care, select doorstep time slot, and lock upfront price.
              </p>
            </Card>

            <Card className="p-4 bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#F5B000]/20 text-[#F5B000] font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h4 className="font-bold text-xs text-white">Live Partner GPS Dispatch</h4>
              <p className="text-[11px] text-[#94A3B8]">
                Technician accepts job in partner app with turn-by-turn route navigation.
              </p>
            </Card>

            <Card className="p-4 bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <h4 className="font-bold text-xs text-white">Before / After Photo Audit</h4>
              <p className="text-[11px] text-[#94A3B8]">
                Technician uploads timestamped before & after photos for quality assurance.
              </p>
            </Card>

            <Card className="p-4 bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                4
              </div>
              <h4 className="font-bold text-xs text-white">Instant Revenue Sync</h4>
              <p className="text-[11px] text-[#94A3B8]">
                Admin dashboard updates metrics live and releases partner payout ledger.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="border-t border-[#1E293B] bg-[#0A0F17] py-6 px-4 text-center text-xs text-[#94A3B8] space-y-2">
        <div className="flex items-center justify-center gap-2">
          <img src="/wipeit-logo.png" alt="Wipeit" className="h-6 object-contain" />
          <span className="font-bold text-white">WIPEIT ENTERPRISE PLATFORM</span>
        </div>
        <p>© 2026 Wipeit Mobility & Detailing Technologies. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPortalView;
