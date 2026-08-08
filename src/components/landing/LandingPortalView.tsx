import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Wrench,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Camera,
  Star,
  Shield,
  Clock,
  Car,
  ChevronRight,
  Users,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPortalView: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    { emoji: '🫧', name: 'Foam Wash', desc: 'Snow foam bath with hydrophobic finish', from: 249, time: '45 min' },
    { emoji: '🪥', name: 'Interior Deep Clean', desc: 'Full cabin vacuum, dashboard UV care', from: 599, time: '60 min' },
    { emoji: '💎', name: 'Ceramic Coating', desc: '9H nano ceramic — 12 months protection', from: 2499, time: '3 hrs' },
    { emoji: '🏍️', name: 'Bike Full Service', desc: 'Engine oil, chain lube, brake & electrical', from: 399, time: '30 min' },
    { emoji: '✨', name: 'Interior + Exterior', desc: 'Complete rejuvenation combo package', from: 849, time: '90 min' },
    { emoji: '⛓️', name: 'Chain & Suspension', desc: 'PTFE lube, fork seal audit, slack set', from: 249, time: '30 min' },
  ];

  const trust = [
    { value: '45,000+', label: 'Services Done', color: 'text-[#111827]' },
    { value: '4.9★', label: 'Customer Rating', color: 'text-[#059669]' },
    { value: '18 min', label: 'Avg. Technician ETA', color: 'text-[#2563EB]' },
    { value: '100%', label: 'Photo-Verified Jobs', color: 'text-[#D97706]' },
  ];

  const portals = [
    {
      id: 'customer',
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Customer App',
      subtitle: 'Book services, track live',
      bg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE]',
      iconColor: 'text-[#2563EB]',
      tag: 'Most used',
      tagColor: 'bg-[#DBEAFE] text-[#1D4ED8]',
      path: '/customer',
      features: [
        'Live GPS tracking of technician route',
        'Before & after photo audit in-app',
        'Instant price for your exact vehicle',
      ],
    },
    {
      id: 'partner',
      icon: <Wrench className="w-5 h-5" />,
      title: 'Technician App',
      subtitle: 'Jobs, earnings, navigation',
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A]',
      iconColor: 'text-[#D97706]',
      tag: 'Partner access',
      tagColor: 'bg-[#FEF3C7] text-[#92400E]',
      path: '/partner',
      features: [
        'Turn-by-turn navigation to customer',
        'Mandatory checklist & photo capture',
        'Daily earnings breakdown & payout log',
      ],
    },
    {
      id: 'admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: 'Admin Dashboard',
      subtitle: 'Operations & dispatch',
      bg: 'bg-[#F0FDF4]',
      border: 'border-[#BBF7D0]',
      iconColor: 'text-[#059669]',
      tag: 'Ops team',
      tagColor: 'bg-[#DCFCE7] text-[#166534]',
      path: '/admin',
      features: [
        'Assign & reassign technicians in 1 click',
        'Revenue, tax & partner commission split',
        'Service catalog pricing management',
      ],
    },
  ];

  return (
    <div className="flex-1 bg-[#FAFAF9] flex flex-col min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11.5px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                <Zap className="w-3 h-3 fill-[#1D4ED8]" />
                Doorstep Auto Care · Bangalore
              </div>

              <div>
                <h1
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className="text-[32px] sm:text-[44px] font-extrabold text-[#0D0D0D] leading-[1.12] tracking-[-0.022em]"
                >
                  Doorstep car & bike care,<br />
                  done by certified pros.
                </h1>
                <p className="text-[15px] text-[#4B5563] mt-5 leading-relaxed max-w-[420px] font-normal">
                  Book a service, track your technician live, and receive a photo-verified report — all from your phone.
                </p>
              </div>


              <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>Serving <strong>JP Nagar, Koramangala, HSR, Whitefield</strong> & more</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => navigate('/customer')}
                  className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
                >
                  Book a Service
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/partner')}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] font-semibold text-[14px] px-5 py-3.5 rounded-xl transition-all"
                >
                  <Wrench className="w-4 h-4 text-[#D97706]" />
                  Join as Technician
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { icon: <Shield className="w-3.5 h-3.5" />, text: 'Insured technicians' },
                  { icon: <Camera className="w-3.5 h-3.5" />, text: 'Photo audit every job' },
                  { icon: <Star className="w-3.5 h-3.5" />, text: '4.9 rated platform' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                    <span className="text-[#374151]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10.5px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-0.5">Active booking</p>
                    <p className="text-[13px] font-bold text-[#111827]">Premium Foam Wash</p>
                  </div>
                  <span className="flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse inline-block" />
                    On the way
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-xl p-3 border border-[#F0F1F3]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Technician"
                  />
                  <div className="flex-1">
                    <p className="text-[12.5px] font-bold text-[#111827]">Rahul Verma</p>
                    <p className="text-[11px] text-[#6B7280]">Arriving in 12 min · Honda Activa</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-[12px] font-bold text-[#111827]">4.9</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-1.5">
                    <span>Confirmed</span>
                    <span className="font-semibold text-[#2563EB]">En route</span>
                    <span>Arrived</span>
                    <span>Done</span>
                  </div>
                  <div className="h-1.5 bg-[#F0F1F3] rounded-full overflow-hidden">
                    <div className="h-full w-[55%] bg-[#2563EB] rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] pt-1 border-t border-[#F0F1F3]">
                  <div className="flex items-center gap-2 text-[#374151]">
                    <Car className="w-4 h-4 text-[#9CA3AF]" />
                    Honda City ZX · KA01CQ5521
                  </div>
                  <span className="font-bold text-[#111827]">₹449</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white border border-[#E5E7EB] shadow-lg rounded-xl px-3.5 py-2.5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#111827]">45,000+ services</p>
                  <p className="text-[10px] text-[#6B7280]">completed this year</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-3 bg-white border border-[#E5E7EB] shadow-lg rounded-xl px-3 py-2 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-[12px] font-bold text-[#111827]">4.9</span>
                <span className="text-[10px] text-[#9CA3AF]">avg rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trust.map((t, i) => (
            <div key={i}>
              <div className={`text-[22px] sm:text-[26px] font-black ${t.color} leading-none`}>{t.value}</div>
              <div className="text-[11.5px] text-[#9CA3AF] mt-1 font-medium">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">What we do</p>
              <h2 className="text-[22px] sm:text-[26px] font-black text-[#111827] tracking-tight">Cars and bikes, every service</h2>
            </div>
            <button onClick={() => navigate('/customer/catalog')} className="flex items-center gap-1 text-[13px] text-[#2563EB] font-semibold hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((srv, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => navigate('/customer/catalog')}
                className="bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-md rounded-xl p-3.5 cursor-pointer transition-all duration-150"
              >
                <div className="text-[24px] mb-2">{srv.emoji}</div>
                <div className="text-[12.5px] font-bold text-[#111827] leading-snug mb-0.5">{srv.name}</div>
                <div className="text-[10.5px] text-[#9CA3AF] leading-snug mb-2">{srv.desc}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-[#111827]">from ₹{srv.from}</span>
                  <span className="text-[10px] text-[#9CA3AF] flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />{srv.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL SELECTOR */}
      <section className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Three surfaces, one platform</p>
            <h2 className="text-[22px] sm:text-[28px] font-black text-[#111827] tracking-tight">Which interface are you?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {portals.map((p) => (
              <motion.button
                key={p.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(p.path)}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-150 w-full group ${p.bg} ${p.border} hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${p.border} ${p.iconColor}`}>
                    {p.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                </div>

                <p className="text-[14px] font-black text-[#111827]">{p.title}</p>
                <p className="text-[11.5px] text-[#6B7280] mt-0.5 mb-3">{p.subtitle}</p>

                <ul className="space-y-1.5 mb-4">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#374151]">
                      <CheckCircle2 className={`w-3 h-3 mt-0.5 shrink-0 ${p.iconColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-1.5 text-[12px] font-bold ${p.iconColor}`}>
                  Open {p.title}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <h2 className="text-[18px] sm:text-[22px] font-black text-[#111827] mb-6 tracking-tight">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: '01', icon: <Smartphone className="w-5 h-5" />, title: 'Pick a service & slot', desc: 'Choose car or bike service, lock your price, set a time.', color: 'bg-[#EFF6FF] text-[#2563EB]' },
              { step: '02', icon: <Users className="w-5 h-5" />, title: 'Technician dispatched', desc: 'A verified technician accepts and navigates to your location.', color: 'bg-[#FFFBEB] text-[#D97706]' },
              { step: '03', icon: <Camera className="w-5 h-5" />, title: 'Photo audit done', desc: 'Before & after timestamped photos uploaded to your account.', color: 'bg-[#F5F3FF] text-[#7C3AED]' },
              { step: '04', icon: <CheckCircle2 className="w-5 h-5" />, title: 'Rate & done', desc: 'Review your report, rate the tech, payment auto-settled.', color: 'bg-[#F0FDF4] text-[#059669]' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>{item.icon}</div>
                <div>
                  <span className="text-[10px] font-black text-[#D1D5DB] uppercase tracking-widest">{item.step}</span>
                  <h3 className="text-[13px] font-bold text-[#111827] mt-0.5">{item.title}</h3>
                  <p className="text-[11.5px] text-[#6B7280] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/wipeit-logo.png" alt="Wipeit" className="h-8 object-contain" />
            <div>
              <p className="text-[13px] font-black tracking-tight">WIPE<span className="text-[#F59E0B]">IT</span></p>
              <p className="text-[10px] text-[#6B7280]">Drive Clean. Shine Always.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-[#9CA3AF]">
            <button onClick={() => navigate('/customer')} className="hover:text-white transition-colors">Customer App</button>
            <button onClick={() => navigate('/partner')} className="hover:text-white transition-colors">Partner Console</button>
            <button onClick={() => navigate('/admin')} className="hover:text-white transition-colors">Admin Dashboard</button>
          </div>
          <p className="text-[11px] text-[#4B5563]">© 2026 Wipeit Technologies</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPortalView;
