import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, UserCircle2, ChevronDown } from 'lucide-react';
import { useAppState, UserRole } from '../../context/AppStateContext';

export const RoleBadge: React.FC = () => {
  const { currentRole, setCurrentRole, setCurrentTab, addToast } = useAppState();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { key: 'super-admin', label: 'Super Admin', desc: 'Platform SaaS Ecosystem Manager', icon: <ShieldCheck className="w-4 h-4 text-purpleAccent" /> },
    { key: 'school-admin', label: 'School Admin', desc: 'Principal/School Operations', icon: <UserCircle2 className="w-4 h-4 text-primary" /> },
    { key: 'teacher', label: 'Teacher', desc: 'Class Attendance Workspace', icon: <GraduationCap className="w-4 h-4 text-success" /> }
  ] as const;

  const current = roles.find(r => r.key === currentRole) || roles[0];

  const handleRoleSwitch = (roleKey: UserRole) => {
    setCurrentRole(roleKey);
    setCurrentTab('overview');
    setIsOpen(false);
    addToast('success', `Context switched to ${roleKey === 'super-admin' ? 'Super Admin' : roleKey === 'school-admin' ? 'School Admin' : 'Teacher'}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 text-xs font-bold text-slate-700 dark:text-slate-250 border border-slate-250/30 dark:border-slate-800 focus:outline-none"
      >
        <span className="shrink-0">{current.icon}</span>
        <span className="truncate">{current.label}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-[16px] bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-2xl z-50 p-2 animate-scale-in">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
              Select Demo Perspective
            </div>
            {roles.map(r => (
              <button
                key={r.key}
                onClick={() => handleRoleSwitch(r.key)}
                className={`w-full flex items-start gap-3 p-2.5 rounded-[12px] text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all ${
                  currentRole === r.key ? 'bg-primary/5 border border-primary/15' : 'border border-transparent'
                }`}
              >
                <div className="mt-0.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-855 shrink-0">
                  {r.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    {r.label}
                    {currentRole === r.key && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                    {r.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
