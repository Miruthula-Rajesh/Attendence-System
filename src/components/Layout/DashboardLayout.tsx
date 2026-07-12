import React, { useState } from 'react';
import { 
  LayoutDashboard, School, CreditCard, History, Settings, Users, GraduationCap, 
  CalendarRange, LineChart, FileSpreadsheet, Sparkles, LogOut, Bell, Search, 
  Menu, X, CheckSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState, UserRole } from '../../context/AppStateContext';
import { DarkModeToggle } from '../DarkModeToggle';
import { RoleBadge } from './RoleBadge';
import { Skeleton } from '../ui/Skeleton';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { 
    currentRole, 
    currentTab, 
    setCurrentTab, 
    setCurrentPage, 
    setCommandPaletteOpen,
    notifications,
    activeTeacherClass
  } = useAppState();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Define Nav items per role
  const menuItems: Record<UserRole, { tab: string; label: string; icon: React.ReactNode }[]> = {
    marketing: [],
    'super-admin': [
      { tab: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { tab: 'schools', label: 'Schools', icon: <School className="w-4 h-4" /> },
      { tab: 'subscriptions', label: 'Subscriptions', icon: <CreditCard className="w-4 h-4" /> },
      { tab: 'audit-logs', label: 'Audit Logs', icon: <History className="w-4 h-4" /> },
      { tab: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
    ],
    'school-admin': [
      { tab: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { tab: 'students', label: 'Students', icon: <GraduationCap className="w-4 h-4" /> },
      { tab: 'teachers', label: 'Teachers', icon: <Users className="w-4 h-4" /> },
      { tab: 'academic-setup', label: 'Academic Setup', icon: <CalendarRange className="w-4 h-4" /> },
      { tab: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
      { tab: 'reports', label: 'Reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
      { tab: 'audit-logs', label: 'Audit Logs', icon: <History className="w-4 h-4" /> }
    ],
    teacher: [
      { tab: 'overview', label: 'My Classes', icon: <LayoutDashboard className="w-4 h-4" /> },
      { tab: 'attendance-marking', label: 'Mark Attendance', icon: <CheckSquare className="w-4 h-4" /> },
      { tab: 'reports', label: 'Reports', icon: <FileSpreadsheet className="w-4 h-4" /> }
    ]
  };

  const activeMenu = menuItems[currentRole] || [];

  const handleLogout = () => {
    setCurrentPage('marketing');
  };

  // Get recent 3 notifications for notification popover
  const recentNotifs = notifications.slice(0, 3);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* --- SIDEBAR (DESKTOP) --- */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/60 dark:border-slate-850 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 h-screen p-5 justify-between">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white select-none">
              Dominova
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {activeMenu.map(item => {
              // Disable attendance-marking in sidebar unless a class is actively selected for the teacher
              const isDisabled = item.tab === 'attendance-marking' && !activeTeacherClass;
              const isActive = currentTab === item.tab;
              
              return (
                <button
                  key={item.tab}
                  disabled={isDisabled || isNavigating}
                  onClick={() => { 
                    setIsNavigating(true);
                    setTimeout(() => {
                      setCurrentTab(item.tab);
                      setIsNavigating(false);
                    }, 400); // Simulated loading delay
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-150 text-left focus:outline-none ${
                    isDisabled 
                      ? 'opacity-30 cursor-not-allowed' 
                      : isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="flex flex-col gap-4">
          <hr className="border-slate-100 dark:border-slate-800" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2 rounded-[12px] text-sm font-semibold text-slate-550 dark:text-slate-400 hover:bg-danger/10 hover:text-danger dark:hover:text-danger-light transition-all text-left focus:outline-none"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs lg:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed top-0 bottom-0 left-0 z-45 w-64 glass-panel border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-2xl p-5 flex flex-col justify-between lg:hidden animate-fade-in">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5 fill-current" />
                  <span className="text-lg font-black tracking-tight text-slate-800 dark:text-white">Dominova</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col gap-1">
                {activeMenu.map(item => {
                  const isDisabled = item.tab === 'attendance-marking' && !activeTeacherClass;
                  const isActive = currentTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      disabled={isDisabled || isNavigating}
                      onClick={() => { 
                        setSidebarOpen(false);
                        setIsNavigating(true);
                        setTimeout(() => {
                          setCurrentTab(item.tab);
                          setIsNavigating(false);
                        }, 400);
                      }}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-sm font-bold text-left ${
                        isDisabled 
                          ? 'opacity-30 cursor-not-allowed'
                          : isActive 
                            ? 'bg-primary text-white' 
                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2 rounded-[12px] text-sm font-bold text-slate-500 hover:text-danger text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}

      {/* --- MAIN PAGE CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* --- HEADER --- */}
        <header className="h-16 border-b border-slate-200/60 dark:border-slate-850 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Toggle & Global search */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 lg:hidden focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global search launcher */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-3.5 py-2 rounded-[12px] bg-slate-100 dark:bg-slate-850 hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-455 hover:text-slate-700 dark:text-slate-500 text-xs font-semibold cursor-pointer select-none border border-slate-250/20 dark:border-slate-800 max-w-[180px] sm:max-w-xs w-full transition-all"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 font-sans text-[9px] uppercase font-bold tracking-wider">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right: Notifications, Theme Switcher, Role Selector, User Profile */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />

            {/* Notification Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-550 dark:text-slate-400 focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-danger border-2 border-white dark:border-slate-900 animate-pulse" />
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-[16px] bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-2xl z-50 p-2 animate-scale-in">
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                      Recent Activity Alerts
                    </div>
                    <div className="flex flex-col gap-1">
                      {recentNotifs.map(n => (
                        <div key={n.id} className="p-2 rounded-[10px] hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500">
                            <span>{n.type} • {n.status}</span>
                            <span>{n.timestamp.split(' ')[1] || ''}</span>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate mt-0.5">
                            {n.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <RoleBadge />

            {/* Avatar Profile representation */}
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary border border-primary/20 flex items-center justify-center font-extrabold text-xs select-none">
              {currentRole === 'teacher' ? 'SJ' : currentRole === 'school-admin' ? 'AP' : 'DA'}
            </div>
          </div>
        </header>

        {/* --- DYNAMIC DASHBOARD SCROLLING VIEWPORT --- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isNavigating ? 'loading' : currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isNavigating ? (
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex gap-4 items-center">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-48 h-6" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="w-full h-32" />
                    <Skeleton className="w-full h-32" />
                    <Skeleton className="w-full h-32" />
                  </div>
                  <Skeleton className="w-full h-64 mt-4" />
                </div>
              ) : (
                children
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION BAR (PORTRAIT UX) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-around px-2 z-35 shadow-2xl">
        {activeMenu.slice(0, 4).map(item => {
          const isDisabled = item.tab === 'attendance-marking' && !activeTeacherClass;
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              disabled={isDisabled}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex flex-col items-center justify-center gap-1 w-14 focus:outline-none ${
                isDisabled ? 'opacity-30' : isActive ? 'text-primary' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-bold tracking-tight truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 w-14 text-slate-400 hover:text-danger focus:outline-none"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[9px] font-bold tracking-tight">Logout</span>
        </button>
      </nav>
    </div>
  );
};
