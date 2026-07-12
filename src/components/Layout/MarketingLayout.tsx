import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../context/AppStateContext';
import { DarkModeToggle } from '../DarkModeToggle';
import { Button } from '../ui/Button';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  const { currentTab, setCurrentTab, setCurrentPage, setAuthSubPage } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'features', label: 'Features' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'about', label: 'About Us' },
    { key: 'contact', label: 'Contact' },
    { key: 'faq', label: 'FAQ' }
  ] as const;

  const handleNavClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    setCurrentPage('auth');
    setAuthSubPage('login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      {/* Sticky Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-40 w-full glass-panel border-b border-white/20 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-primary focus:outline-none"
          >
            <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary animate-pulse-slow">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              Dominova
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                className={`text-sm font-semibold transition-colors duration-200 focus:outline-none relative ${
                  currentTab === link.key 
                    ? 'text-primary dark:text-primary-light' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {currentTab === link.key && (
                  <motion.div layoutId="marketing-nav-indicator" className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-primary rounded-t-md" />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle />
            <button 
              onClick={() => { setCurrentPage('auth'); setAuthSubPage('login'); }}
              className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </button>
            <Button variant="primary" size="sm" onClick={handleGetStarted} className="group">
              Get Started
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-30 bg-slate-950/20 backdrop-blur-xs md:hidden" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-16 left-0 right-0 z-35 glass-panel border-b border-slate-200 dark:border-slate-850 bg-white/95 dark:bg-slate-900/95 shadow-2xl p-6 md:hidden flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.key)}
                    className={`text-left text-base font-bold transition-colors ${
                      currentTab === link.key 
                        ? 'text-primary dark:text-primary-light' 
                        : 'text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setCurrentPage('auth'); setAuthSubPage('login'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2.5 rounded-[12px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  Sign In
                </button>
                <Button variant="primary" onClick={handleGetStarted}>
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Main Content */}
      <main className="flex-1 overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-6 h-6 fill-current" />
                <span className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-white">
                  Dominova
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                Smart attendance management and communications ecosystem for modern multi-tenant school districts and private learning networks.
              </p>
            </div>
            {/* Links Columns */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                <li><button onClick={() => handleNavClick('features')} className="hover:text-primary">Features & Tooling</button></li>
                <li><button onClick={() => handleNavClick('pricing')} className="hover:text-primary">Pricing Plans</button></li>
                <li><a href="#" className="hover:text-primary">API Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Security Audits</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                <li><button onClick={() => handleNavClick('about')} className="hover:text-primary">About Our Vision</button></li>
                <li><a href="#" className="hover:text-primary">Careers (We're Hiring!)</a></li>
                <li><a href="#" className="hover:text-primary">Partner Program</a></li>
                <li><button onClick={() => handleNavClick('contact')} className="hover:text-primary">Contact Support</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Legal & Contact</h4>
              <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li className="mt-1 font-bold text-slate-600 dark:text-slate-455">
                  Email: info@dominova.io
                </li>
                <li className="font-bold text-slate-600 dark:text-slate-455">
                  Phone: +1 (800) 555-0190
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-slate-200/55 dark:border-slate-900 my-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-slate-400 dark:text-slate-500">
            <span>© {new Date().getFullYear()} Dominova Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Twitter</a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">GitHub</a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
