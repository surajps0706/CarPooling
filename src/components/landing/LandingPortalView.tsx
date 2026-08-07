import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Wrench, LayoutDashboard, Sparkles, Play, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const LandingPortalView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#FAFAF8] text-[#0F172A] flex flex-col justify-between p-6 max-w-6xl mx-auto w-full space-y-10 py-10">
      {/* Hero Section with Official Logo */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src="/wipeit-logo.png"
            alt="Wipeit Logo"
            className="h-28 object-contain drop-shadow-md"
          />
          <Badge variant="accent" size="md">
            Official Commercial Product Ecosystem • Wipeit
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
          WIPE<span className="text-[#F5B000]">IT</span>
        </h1>
        <p className="text-sm md:text-base font-semibold text-[#0088FF] tracking-wider uppercase">
          DRIVE CLEAN. SHINE ALWAYS.
        </p>
        <p className="text-xs md:text-sm text-[#64748B] max-w-2xl mx-auto leading-relaxed">
          The complete technology platform powering Wipeit vehicle detailing, washing, and technician dispatch operations across Customer App, Partner App, and Admin Dashboard.
        </p>
      </div>

      {/* 3 Application Launchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer App Launcher */}
        <Card hoverable onClick={() => navigate('/customer')} className="p-6 space-y-4 bg-white border-2 border-transparent hover:border-[#0088FF] group">
          <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0088FF] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#0F172A]">Wipeit Customer</h3>
              <Badge variant="accent" size="sm">Mobile First</Badge>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
              Doorstep vehicle wash & detailing booking, garage management, live partner tracking map, and membership club.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-[#0088FF] group-hover:translate-x-1 transition-transform">
            Launch Customer Experience →
          </div>
        </Card>

        {/* Partner App Launcher */}
        <Card hoverable onClick={() => navigate('/partner')} className="p-6 space-y-4 bg-white border-2 border-transparent hover:border-[#0088FF] group">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] text-[#D99B00] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#0F172A]">Wipeit Partner</h3>
              <Badge variant="warning" size="sm">High Contrast</Badge>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
              Field technician job execution app with turn-by-turn navigation, mandatory before/after photos camera audit, and checklist.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-[#D99B00] group-hover:translate-x-1 transition-transform">
            Launch Technician App →
          </div>
        </Card>

        {/* Admin Dashboard Launcher */}
        <Card hoverable onClick={() => navigate('/admin')} className="p-6 space-y-4 bg-white border-2 border-transparent hover:border-[#0088FF] group">
          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#0F172A]">Wipeit Admin</h3>
              <Badge variant="neutral" size="sm">Desktop First</Badge>
            </div>
            <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
              Executive nerve center featuring real-time KPIs, live dispatch table, technician allocation, revenue analytics, and catalog management.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-[#0F172A] group-hover:translate-x-1 transition-transform">
            Launch Admin Dashboard →
          </div>
        </Card>
      </div>

      {/* Guided Client Demo Scenario Banner */}
      <Card className="p-6 bg-gradient-to-r from-[#0A0F17] via-[#0F172A] to-[#1E293B] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#334155] shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B000] animate-ping" />
            <span className="text-xs font-bold text-[#F5B000] uppercase tracking-wider">
              Interactive Demo Simulation
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">Full Booking Lifecycle Simulation</h3>
          <p className="text-xs text-[#94A3B8] max-w-xl">
            Book a Foam Wash in Wipeit Customer App → See instant dispatch in Partner App → Perform photo verification → Watch real-time revenue update in Admin Dashboard.
          </p>
        </div>

        <Button size="lg" className="bg-[#0088FF] hover:bg-[#0066CC]" onClick={() => navigate('/customer/catalog')}>
          Start Live Demo Flow <Play className="w-4 h-4 ml-2 fill-current" />
        </Button>
      </Card>
    </div>
  );
};
