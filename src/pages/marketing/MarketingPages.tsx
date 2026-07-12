import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Shield, BellRing, PieChart, Users, Network, Zap, Play, 
  ArrowRight, CheckCircle2, MessageSquare, Mail, Phone, MapPin, 
  Plus, Minus, GraduationCap 
} from 'lucide-react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';
import { useAppState } from '../../context/AppStateContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';



// ==========================================
// 1. LANDING PAGE
// ==========================================
export const LandingPage: React.FC = () => {
  const { setCurrentPage, setAuthSubPage, setCurrentTab } = useAppState();

  const handleCTA = () => {
    setCurrentPage('auth');
    setAuthSubPage('login');
  };

  return (
    <div className="flex flex-col overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-white via-[#F1F5F9] to-[#E0F2FE] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/30 blur-3xl" 
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" 
          />
          <motion.div 
            animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-purpleAccent/20 blur-3xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Headline & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/25 border border-primary/25 dark:border-primary/10 text-xs font-bold text-primary dark:text-primary-light animate-bounce">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Next-Gen Multi-School System</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Smart Attendance <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Management</span> for Modern Schools
            </h1>
            <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Digitize attendance, automate parent notifications, reduce administrative overhead, and orchestrate multiple campuses from a single secure platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <Button size="lg" variant="primary" onClick={handleCTA} className="group w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setCurrentTab('faq')} className="w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Demo
              </Button>
            </div>
            
            {/* Avatars floating */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-4"
            >
              <div className="flex -space-x-2.5">
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50" alt="" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50" alt="" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=50" alt="" />
              </div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                Trusted by 500+ educators worldwide
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-1000"
          >
            {/* Glassmorphic Mockup Container */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="glass-panel rounded-[24px] border border-white/40 dark:border-slate-800 shadow-2xl p-4 overflow-hidden relative group"
            >
              {/* Fake window controls */}
              <div className="flex items-center gap-1.5 mb-3 px-2">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
                <span className="text-[10px] font-bold text-slate-400 ml-2">dominova-dashboard.io</span>
              </div>
              {/* Mock Dashboard Representation */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 flex flex-col gap-4">
                {/* Header widget */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎓</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">Dominova Academy</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-success/10 border border-success/25 text-[9px] font-extrabold text-success">98.4% Attendance Today</span>
                </div>
                
                {/* Visual Stats widgets row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-2 text-center shadow-sm hover:scale-105 transition-transform">
                    <div className="text-[9px] font-semibold text-slate-400">Presents</div>
                    <div className="text-sm font-black text-success mt-0.5">1,184</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-2 text-center shadow-sm hover:scale-105 transition-transform">
                    <div className="text-[9px] font-semibold text-slate-400">Absents</div>
                    <div className="text-sm font-black text-danger mt-0.5">32</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-2 text-center shadow-sm hover:scale-105 transition-transform">
                    <div className="text-[9px] font-semibold text-slate-400">Late Entries</div>
                    <div className="text-sm font-black text-warning mt-0.5">24</div>
                  </div>
                </div>

                {/* SVG mock graph representing stats */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-3 shadow-sm flex flex-col gap-2">
                  <div className="text-[10px] font-extrabold text-slate-750 dark:text-white">Weekly Attendance Performance</div>
                  <svg viewBox="0 0 200 50" className="w-full h-auto overflow-visible">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                      d="M 10 40 Q 40 15 70 30 T 130 10 T 190 5" 
                      fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" 
                    />
                    <motion.circle 
                      cx="190" cy="5" r="3.5" fill="#2563EB" stroke="white" strokeWidth="1" 
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
                    />
                  </svg>
                </div>

                {/* Active alert indicator */}
                <div className="flex items-center justify-between px-3 py-2 bg-warning/10 border border-warning/20 rounded-lg text-[10px] font-bold text-warning">
                  <span>Parent Alerts Sent for 5 Absents</span>
                  <span>100% Delivered</span>
                </div>
              </div>
            </motion.div>
            
            {/* Background glowing rings */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 rounded-full bg-secondary/25 blur-xl" />
          </motion.div>
        </div>
      </section>

      {/* --- STATISTICS COUNTERS --- */}
      <section className="py-12 bg-white dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white"><AnimatedCounter to={100} />+</div>
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Schools Active</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white"><AnimatedCounter to={50000} />+</div>
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Students Monitored</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white"><AnimatedCounter to={10000} />+</div>
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Daily Attendance Logs</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col gap-1.5">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white">99.9%</div>
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Platform Uptime</div>
          </motion.div>
        </div>
      </section>

      {/* --- QUICK BRIEF FEATURES GRID (6 CARDS) --- */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need in One Unified Suite
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Ditch spreadsheets, manual paper sheets, and old legacy systems. Dominova combines simplicity with advanced enterprise capabilities.
          </p>
        </div>
        <FeaturesGrid />
      </motion.section>

      {/* --- HOW IT WORKS (TIMELINE) --- */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-250/30 dark:border-slate-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Sleek, Automated Workflow
            </h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Set up your school district structure in minutes, then let our automated routines manage the daily cycle.
            </p>
          </div>
          <Timeline />
        </div>
      </motion.section>

      {/* --- TESTIMONIALS --- */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Endorsed by District Leaders
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Hear from district superintendents, principals, and educators who have completely modernized their operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Dominova has cut our morning attendance processing time by 80%. Parents receive notifications instantly and teachers are thrilled with the speed-marking keyboard controls."
            author="Dr. Regina Geller"
            role="Superintendent, Heights Unified District"
            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
          />
          <TestimonialCard 
            quote="Managing multiple private campuses was a coordination nightmare. The Super Admin multi-tenant interface on Dominova gives us a real-time birds-eye view of student counts, subscriptions, and logs."
            author="Vance Hopper"
            role="Director of Operations, CyberTech Networks"
            avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100"
          />
          <TestimonialCard 
            quote="As a teacher, I want to teach, not click dozens of buttons. The bulk-marking shortcuts and responsive mobile swipe views let me complete morning rolls in less than 20 seconds. Flawless."
            author="Mrs. Sarah Jenkins"
            role="Science Teacher, Dominova Prep"
            avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
          />
        </div>
      </motion.section>

      {/* --- CONVERSION CTAS --- */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-12"
      >
        <Card variant="glow" className="relative p-10 md:p-14 overflow-hidden bg-gradient-to-br from-primary/10 via-white/80 to-secondary/10 dark:from-primary/15 dark:via-slate-900/80 dark:to-secondary/15 text-center flex flex-col gap-6 items-center border border-primary/20">
          <GraduationCap className="w-12 h-12 text-primary" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white leading-[1.2]">
            Ready to Revolutionize Your Campus Administration?
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            Join hundreds of classrooms already using Dominova. Experience zero administrative lag, 100% parental connectivity, and real-time operational safety.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
            <Button size="lg" variant="primary" onClick={handleCTA} className="w-full sm:w-auto shadow-xl">
              Start Your Free 30-Day Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentTab('contact')} className="w-full sm:w-auto">
              Contact Sales
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
};


// ==========================================
// 2. FEATURES PAGE
// ==========================================
export const FeaturesPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-16">
      <div className="text-center flex flex-col gap-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15]">
          A Fully Loaded <span className="text-primary">Enterprise</span> Attendance Suite
        </h1>
        <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
          Every tool, report, settings toggle, and notification channel is engineered for maximum reliability, speed, and ease of use.
        </p>
      </div>

      <FeaturesGrid />

      {/* Deep-dive details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-850 rounded-[24px] p-8 md:p-12 transition-colors duration-300">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-secondary select-none">High Productivity Focus</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed for 30-Second Class Operations
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            We studied classroom roll-call bottlenecks. Legacy systems require teachers to double-click fields, open sub-menus, or load separate screens for each student. Dominova introduces one-click toggles, native mobile swipe mechanics, and intuitive keyboard hotkeys (Up/Down, P/A/L/HD) to complete lists at breakneck speed.
          </p>
          <ul className="flex flex-col gap-3 text-xs font-bold text-slate-650 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" /> One-click toggles for rapid state updates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" /> Auto-bulk select present for quick roll initialization
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" /> Interactive review modals to check totals before submission
            </li>
          </ul>
        </div>
        <div className="glass-panel p-6 border border-white/20 dark:border-slate-800 rounded-[18px] shadow-xl flex flex-col gap-4 bg-white/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-extrabold text-slate-800 dark:text-white">Attendance Toggle Speeds</span>
            <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">Speed Test: Active</span>
          </div>
          {/* Visual representations */}
          <div className="flex flex-col gap-3.5">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>Traditional Software</span>
                <span>120+ seconds</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-400 dark:bg-slate-600 h-full w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>Spreadsheet (Manual entry)</span>
                <span>85 seconds</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-455 dark:bg-slate-555 h-full w-4/5" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-primary mb-1">
                <span>Dominova Platform</span>
                <span className="font-extrabold text-primary">18 seconds (Average)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. PRICING PAGE
// ==========================================
export const PricingPage: React.FC = () => {
  const { setCurrentPage, setAuthSubPage } = useAppState();
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Annual');

  const handleSelectPlan = () => {
    setCurrentPage('auth');
    setAuthSubPage('login');
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-12 items-center">
      <div className="text-center flex flex-col gap-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15]">
          Flexible Pricing Tailored for Any School Size
        </h1>
        <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
          Scale effortlessly from a single localized academy to an entire multi-city public school district.
        </p>
      </div>

      {/* Billing Switcher */}
      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-1 rounded-[14px]">
        <button
          onClick={() => setBillingCycle('Monthly')}
          className={`px-4 py-1.5 rounded-[10px] text-xs font-extrabold transition-all ${
            billingCycle === 'Monthly' 
              ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-750 dark:hover:text-slate-300'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('Annual')}
          className={`px-4 py-1.5 rounded-[10px] text-xs font-extrabold flex items-center gap-1.5 transition-all ${
            billingCycle === 'Annual' 
              ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-md' 
              : 'text-slate-400 hover:text-slate-750 dark:hover:text-slate-300'
          }`}
        >
          Annual 
          <span className="px-1.5 py-0.5 rounded-full bg-success/15 border border-success/30 text-[9px] font-extrabold text-success uppercase">
            Save 20%
          </span>
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-6 items-stretch">
        
        {/* Starter Plan */}
        <Card variant="glass" className="flex flex-col justify-between hover-glow p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Starter Plan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Perfect for small independent learning pods.</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-800 dark:text-white">
                ${billingCycle === 'Annual' ? '120' : '150'}
              </span>
              <span className="text-xs font-bold text-slate-400 ml-2">/ school / month</span>
            </div>
            <hr className="border-slate-100 dark:border-slate-800" />
            <ul className="flex flex-col gap-3 text-xs font-bold text-slate-550 dark:text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Up to 350 Students</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> 15 Teaching Staff Accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Core SMS & Email Alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Excel/CSV Attendance Exports</li>
            </ul>
          </div>
          <Button variant="outline" className="w-full mt-8" onClick={handleSelectPlan}>
            Start Free Trial
          </Button>
        </Card>

        {/* Professional Plan (Recommended / Glow variant) */}
        <Card variant="glow" className="flex flex-col justify-between hover-glow p-8 border-2 border-primary relative shadow-2xl">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3 py-1 rounded-full bg-primary text-[9px] font-black uppercase tracking-widest text-white">
            Most Popular
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-slate-850 dark:text-white">Professional</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Ideal for medium-sized secondary campuses.</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-800 dark:text-white">
                ${billingCycle === 'Annual' ? '360' : '450'}
              </span>
              <span className="text-xs font-bold text-slate-400 ml-2">/ school / month</span>
            </div>
            <hr className="border-slate-100 dark:border-slate-800" />
            <ul className="flex flex-col gap-3 text-xs font-bold text-slate-550 dark:text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Up to 1,000 Students</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> 50 Teaching Staff Accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Automated Parent Notifications</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Advanced Analytics & SVG Heatmaps</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Reports Center with PDF Exports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Holiday Calendar configuration</li>
            </ul>
          </div>
          <Button variant="primary" className="w-full mt-8" onClick={handleSelectPlan}>
            Start Free Trial
          </Button>
        </Card>

        {/* Enterprise Plan */}
        <Card variant="glass" className="flex flex-col justify-between hover-glow p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-black text-slate-805 dark:text-white">Enterprise Plan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">For large districts or collegiate networks.</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-slate-800 dark:text-white">Custom</span>
              <span className="text-xs font-bold text-slate-400 ml-2">Quote based pricing</span>
            </div>
            <hr className="border-slate-100 dark:border-slate-800" />
            <ul className="flex flex-col gap-3 text-xs font-bold text-slate-550 dark:text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Unlimited Students & Teachers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Multi-Tenant Super Admin Console</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> AI-Powered Predictive Insights</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> RBAC Permissions Matrix Configuration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Dedicated SLA Support & Webhooks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Dedicated Account Representative</li>
            </ul>
          </div>
          <Button variant="outline" className="w-full mt-8" onClick={handleSelectPlan}>
            Contact Sales
          </Button>
        </Card>

      </div>
    </div>
  );
};


// ==========================================
// 4. CONTACT PAGE
// ==========================================
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Direct Contact Info */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect with Our Education Advisors
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Have questions about onboarding, multi-tenant pricing models, security compliance, or district alignments? Get in touch with our team for a personalized platform demonstration.
          </p>
        </div>

        <div className="flex flex-col gap-5 text-sm font-semibold text-slate-650 dark:text-slate-350 mt-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold">Email Admissions & Support</div>
              <div className="text-slate-800 dark:text-slate-205">advisors@dominova.io</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold">District Sales hotline</div>
              <div className="text-slate-800 dark:text-slate-205">+1 (800) 555-0190</div>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold">Global Headquarters</div>
              <div className="text-slate-800 dark:text-slate-205">One Education Square, Suite 400, San Francisco, CA</div>
            </div>
          </div>
        </div>

        {/* Beautiful map representation */}
        <div className="glass-panel border border-white/30 dark:border-slate-800 h-48 rounded-[18px] bg-slate-200 dark:bg-slate-900/50 overflow-hidden relative shadow-md">
          <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-950/20 flex items-center justify-center font-bold text-slate-400 dark:text-slate-600 text-xs">
            [ Interactive District Map Mockup ]
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card variant="glass" className="p-8 shadow-2xl relative border border-white/40 dark:border-slate-800">
        {submitted ? (
          <div className="py-16 text-center flex flex-col items-center gap-5 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 text-success flex items-center justify-center font-bold text-2xl select-none">
              ✓
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">Message Sent!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-medium">
              Thank you for contacting Dominova. One of our district integration specialist team members will follow up within 4 business hours.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)} className="mt-4">
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Inquire About Onboarding</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Full Name</label>
                <input required type="text" placeholder="Sarah Jenkins" className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Work Email</label>
                <input required type="email" placeholder="principal@academy.edu" className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">School / Organization</label>
                <input required type="text" placeholder="Oakwood Prep" className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400">Student Enrollment Count</label>
                <select className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white">
                  <option>Under 250 students</option>
                  <option>250 - 1,000 students</option>
                  <option>1,000 - 5,000 students</option>
                  <option>District-wide (5,000+)</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400">Your Inquiry Details</label>
              <textarea required rows={4} placeholder="How can we help modernize your campus operations?" className="px-3 py-2.5 rounded-[10px] text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-primary/20 dark:text-white resize-none" />
            </div>
            <Button variant="primary" type="submit" className="w-full mt-2">
              Submit Inquiry
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};


// ==========================================
// 5. ABOUT US PAGE
// ==========================================
export const AboutUsPage: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      
      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary select-none">Our Genesis</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Modernizing Administrative Infrastructure
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Founded in 2024, Dominova emerged from a simple realization: school administration teams were drowning in outdated paperwork, disparate communication silos, and sluggish legacy databases. Teachers lost valuable learning hours marking manual rolls, while principals struggled to compile real-time district statistics.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Our mission is to build the world's most elegant, robust, and lightning-fast school administrative system. By combining high-speed attendance tooling, multi-tenant SaaS virtualization, and instant parental alerts, we bridge the gap between classroom compliance and real-time safety.
          </p>
        </div>
        <div className="glass-panel border border-white/30 dark:border-slate-800 h-72 rounded-[24px] bg-slate-200 dark:bg-slate-900/50 flex items-center justify-center font-bold text-slate-400 dark:text-slate-600 text-xs">
          [ Dominova Founder Story Visual ]
        </div>
      </div>

      {/* Core Values */}
      <div className="flex flex-col gap-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="glass" className="p-6 flex flex-col gap-4">
            <span className="text-2xl select-none">⚡</span>
            <h4 className="text-base font-black text-slate-800 dark:text-white">Operational Speed</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Every millisecond matters. We design keyboards, keyboard shortcuts, and swipe gestures to save administrative overhead.
            </p>
          </Card>
          <Card variant="glass" className="p-6 flex flex-col gap-4">
            <span className="text-2xl select-none">🔒</span>
            <h4 className="text-base font-black text-slate-800 dark:text-white">Privacy & Isolation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Multi-tenant architecture guarantees school data isolation, robust encryption, and strict role-based compliance.
            </p>
          </Card>
          <Card variant="glass" className="p-6 flex flex-col gap-4">
            <span className="text-2xl select-none">💬</span>
            <h4 className="text-base font-black text-slate-805 dark:text-white">Parent Partnership</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Automated pipelines keep parents informed in real-time about late entries, absences, and school announcements.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 6. FAQ PAGE
// ==========================================
export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is a multi-tenant SaaS architecture in Dominova?",
      a: "Multi-tenant SaaS means that multiple schools and school districts are hosted on a single unified cloud application infrastructure. Each school's database is securely virtualized and isolated, ensuring complete privacy, whilst allowing the platform owners (Super Admins) to manage subscriptions, audit compliance, and system scaling centrally."
    },
    {
      q: "How does the automated parent notification feature function?",
      a: "When a teacher marks a student absent or late and submits the roll, Dominova's communication dispatch pipeline automatically triggers a text message (SMS) or email template to the registered parent. Delivery statuses (Delivered, Sent, Failed) are tracked in real-time in the admin console."
    },
    {
      q: "Can school admins customize classes, sections, and holidays?",
      a: "Absolutely. The Academic Setup module allows School Admins to define academic years, establish classes (e.g., Grade 10, 9), configure sections (e.g., A, B), assign teachers, and log official holidays. The holiday calendar integrates dynamically with attendance calculations to ignore non-school days."
    },
    {
      q: "Does the teacher interface support mobile devices?",
      a: "Yes. Dominova is designed with a fully responsive mobile-first viewpoint. On phones, the attendance roll transforms into large, touch-friendly rows that support quick-tap controls, sticky bottom action sheets, and progress rings."
    },
    {
      q: "Is student data encrypted and WCAG compliant?",
      a: "Security and accessibility are built-in. Dominova encrypts all student and parent records at rest and in transit. The user interface conforms strictly to WCAG AA guidelines, supporting keyboard-only navigation, high contrast text options, and screen-reader accessibility."
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col gap-12">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
          Have queries about security, integrations, parent outreach, or system limits? Find quick answers here.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <Card 
              key={idx} 
              variant="glass" 
              className={`p-0 overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-primary/20 bg-white/95 dark:bg-slate-900/90 shadow-lg' : ''
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {faq.q}
                </span>
                <span className="shrink-0 ml-4 text-primary">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-40 border-t border-slate-100 dark:border-slate-850' : 'max-h-0'
                }`}
              >
                <p className="px-6 py-5 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed bg-slate-50/40 dark:bg-slate-950/20">
                  {faq.a}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};


// ==========================================
// INTERNAL SUB-COMPONENTS
// ==========================================

// Timeline component for "How It Works"
const Timeline: React.FC = () => {
  const steps = [
    { num: '01', title: 'Login & Authenticate', desc: 'Secure multi-tenant role entrance (Teacher, School Admin, or Super Admin).' },
    { num: '02', title: 'Select Class/Subject', desc: 'Assigned teaching directories and classes populate instantly.' },
    { num: '03', title: 'Mark Rolls in 1 Click', desc: 'Toggle P/A/L/HD statuses or trigger rapid keyboard hotkeys.' },
    { num: '04', title: 'Instant Parent SMS', desc: 'Parents receive real-time notifications about absentees.' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col gap-4 relative group">
          {/* Connector Line */}
          {idx < 3 && (
            <div className="hidden md:block absolute top-7 left-[65px] right-[-40px] h-0.5 bg-slate-200 dark:bg-slate-800 z-0 group-hover:bg-primary/30 transition-colors duration-300" />
          )}
          <div className="w-14 h-14 rounded-[14px] bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-md flex items-center justify-center font-black text-base text-primary relative z-10 select-none group-hover:border-primary/50 transition-colors">
            {step.num}
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{step.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Testimonial wrapper card
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, avatar }) => {
  return (
    <Card variant="glass" className="p-7 flex flex-col justify-between hover-glow h-full bg-white/70 dark:bg-slate-900/60">
      <div className="flex flex-col gap-4">
        <div className="text-primary text-2xl select-none">“</div>
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-350 leading-relaxed italic">
          {quote}
        </p>
      </div>
      <div className="flex items-center gap-3.5 mt-8 pt-4 border-t border-slate-100 dark:border-slate-850">
        <img className="w-9 h-9 rounded-full shrink-0 border border-slate-100" src={avatar} alt="" />
        <div className="min-w-0">
          <div className="text-xs font-extrabold text-slate-800 dark:text-white">{author}</div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold truncate mt-0.5">{role}</div>
        </div>
      </div>
    </Card>
  );
};

// Reusable features grid (6 cards)
const FeaturesGrid: React.FC = () => {
  const feats = [
    {
      icon: <Network className="w-5 h-5 text-purpleAccent" />,
      title: "Multi-School Management",
      desc: "Monitor enrollments, billing states, and active users across dozens of campuses under one single SaaS architecture."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      title: "Real-Time Attendance marking",
      desc: "Supercharge classroom rolls with one-click toggles, keyboard shortcuts, swipe mechanics, and bulletproof progress tickers."
    },
    {
      icon: <BellRing className="w-5 h-5 text-warning" />,
      title: "Automated Parent Alerts",
      desc: "Instantly fire SMS text messages or email alerts to parents the millisecond rolls are marked, reducing absentee overhead."
    },
    {
      icon: <PieChart className="w-5 h-5 text-secondary" />,
      title: "Advanced SVG Visuals",
      desc: "Review attendance trends, distribution metrics, class correlations, and term heatmaps with premium custom SVG analytics."
    },
    {
      icon: <Shield className="w-5 h-5 text-success" />,
      title: "Isolated Multi-Tenant Security",
      desc: "Robust student database isolation, strict transport encryption, and automatic audit logs tracking all manual changes."
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "Role-Based Permissions",
      desc: "Dedicated workspaces and dashboard perspectives tailored for Super Admins, School Admin, and Teaching staff."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {feats.map((f, idx) => (
        <Card key={idx} variant="glass" className="p-6 flex flex-col gap-4 hover-glow bg-white/70 dark:bg-slate-900/60 border border-white/30 dark:border-slate-800/40">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-150/50 dark:border-slate-800 shrink-0 w-fit">
            {f.icon}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-black text-slate-800 dark:text-white">{f.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{f.desc}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
