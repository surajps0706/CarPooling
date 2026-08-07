import React from 'react';
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
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const LandingPortalView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#FAFAF8] text-[#0F172A] flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-10 py-8">
      {/* Premium Hero Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-br from-[#0A0F17] via-[#0F172A] to-[#1E293B] text-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-[#334155] overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0088FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B000]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
          {/* Logo Showcase */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#0088FF]/30 blur-xl rounded-full group-hover:bg-[#0088FF]/50 transition-all" />
            <img
              src="/wipeit-logo.png"
              alt="Wipeit Logo"
              className="relative h-28 sm:h-36 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Title & Slogan */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B]/80 border border-[#334155] text-xs font-semibold text-[#38BDF8]">
              <Zap className="w-3.5 h-3.5 text-[#F5B000] fill-[#F5B000]" />
              Enterprise Automobile Care Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              WIPE<span className="text-[#F5B000]">IT</span>
            </h1>

            <p className="text-sm sm:text-base font-extrabold text-[#0088FF] tracking-widest uppercase">
              ✦ DRIVE CLEAN. SHINE ALWAYS. ✦
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
            A technology platform built for premium vehicle detailing, doorstep washing, real-time technician dispatch, and business management.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-3 gap-3 sm:gap-8 border-t border-[#334155]/60 w-full max-w-xl text-center">
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white">3 Apps</div>
              <div className="text-[10px] sm:text-xs text-[#94A3B8]">Connected Platform</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0088FF]">Real-Time</div>
              <div className="text-[10px] sm:text-xs text-[#94A3B8]">Live Dispatch</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#F5B000]">100%</div>
              <div className="text-[10px] sm:text-xs text-[#94A3B8]">Photo Verified</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Select Product Surface to Explore
        </h2>
        <p className="text-xs text-[#64748B]">
          Three distinct interfaces powered by one unified real-time backend engine.
        </p>
      </div>

      {/* 3 Application Launchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer App Launcher */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.15 }}>
          <Card
            onClick={() => navigate('/customer')}
            className="p-6 space-y-5 bg-white border-2 border-[#E2E8F0] hover:border-[#0088FF] hover:shadow-xl cursor-pointer transition-all group relative overflow-hidden h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] text-[#0088FF] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7" />
                </div>
                <Badge variant="accent" size="sm">Mobile First</Badge>
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-[#0F172A] group-hover:text-[#0088FF] transition-colors">
                  Wipeit Customer
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Mobile application for vehicle owners to discover services, pick slots, track partners live, and manage subscriptions.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs text-[#0F172A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                  <span>Doorstep Foam Wash & Detailing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                  <span>Live Partner GPS Tracking Map</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0" />
                  <span>Executive Gold & Platinum Club</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#0088FF] border-t border-[#F1F5F9]">
              <span>Launch Customer App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </motion.div>

        {/* Partner App Launcher */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.15 }}>
          <Card
            onClick={() => navigate('/partner')}
            className="p-6 space-y-5 bg-white border-2 border-[#E2E8F0] hover:border-[#F5B000] hover:shadow-xl cursor-pointer transition-all group relative overflow-hidden h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#FEF9C3] text-[#D99B00] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <Wrench className="w-7 h-7" />
                </div>
                <Badge variant="warning" size="sm">High Contrast</Badge>
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-[#0F172A] group-hover:text-[#D99B00] transition-colors">
                  Wipeit Partner
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Field technician execution app optimized for outdoor sunlight, turn-by-turn navigation, and mandatory photo verification.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs text-[#0F172A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99B00] shrink-0" />
                  <span>1-Tap Job Acceptance & Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99B00] shrink-0" />
                  <span>Before/After Camera Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D99B00] shrink-0" />
                  <span>Weekly Earnings & Payout Ledger</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#D99B00] border-t border-[#F1F5F9]">
              <span>Launch Technician App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </motion.div>

        {/* Admin Dashboard Launcher */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.15 }}>
          <Card
            onClick={() => navigate('/admin')}
            className="p-6 space-y-5 bg-white border-2 border-[#E2E8F0] hover:border-[#0F172A] hover:shadow-xl cursor-pointer transition-all group relative overflow-hidden h-full flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-7 h-7" />
                </div>
                <Badge variant="neutral" size="sm">Desktop First</Badge>
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-[#0F172A] group-hover:text-[#0088FF] transition-colors">
                  Wipeit Admin
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Executive dashboard for business owners to monitor real-time revenue, manage bookings, reassign technicians, and configure pricing.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs text-[#0F172A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Live Operations & Revenue KPIs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Dispatch & Reassignment Drawer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Service Catalog & Pricing Grid</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#0F172A] border-t border-[#F1F5F9]">
              <span>Launch Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Lifecycle Demo Flow Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-[#0A0F17] via-[#0F172A] to-[#1E293B] text-white rounded-3xl shadow-2xl border border-[#334155] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B000]/20 text-[#F5B000] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#F5B000] animate-ping" />
            Interactive Client Demo Workflow
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Test the Full End-to-End Booking Lifecycle
          </h3>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
            1. Book a wash in Customer App → 2. See instant job dispatch in Partner App → 3. Complete photo verification → 4. Watch live revenue update in Admin Dashboard.
          </p>
        </div>

        <Button
          size="lg"
          className="bg-[#0088FF] hover:bg-[#0066CC] text-white shrink-0 shadow-lg"
          onClick={() => navigate('/customer/catalog')}
        >
          Start Live Demo Flow <Play className="w-4 h-4 ml-2 fill-current" />
        </Button>
      </Card>

      {/* Core Platform Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white space-y-2 border border-[#E2E8F0]">
          <div className="p-2.5 rounded-xl bg-[#E0F2FE] text-[#0088FF] w-fit">
            <Camera className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#0F172A]">Photo Audit Accountability</h4>
          <p className="text-[11px] text-[#64748B]">
            Mandatory before & after photo uploads with timestamping and angle verification.
          </p>
        </Card>

        <Card className="p-4 bg-white space-y-2 border border-[#E2E8F0]">
          <div className="p-2.5 rounded-xl bg-[#FEF9C3] text-[#D99B00] w-fit">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#0F172A]">Live GPS Tracking</h4>
          <p className="text-[11px] text-[#64748B]">
            Real-time partner tracking map and arrival notifications for customers.
          </p>
        </Card>

        <Card className="p-4 bg-white space-y-2 border border-[#E2E8F0]">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#0F172A]">Managed Platform</h4>
          <p className="text-[11px] text-[#64748B]">
            Centralized control over service catalog, pricing rules, and technician assignments.
          </p>
        </Card>

        <Card className="p-4 bg-white space-y-2 border border-[#E2E8F0]">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#0F172A]">Revenue & Payout Engine</h4>
          <p className="text-[11px] text-[#64748B]">
            Automated partner revenue split calculations and financial reconciliation.
          </p>
        </Card>
      </div>
    </div>
  );
};
