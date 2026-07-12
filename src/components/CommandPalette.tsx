import React, { useEffect, useState, useRef } from 'react';
import { Search, Compass, Terminal, ShieldAlert, GraduationCap, X, User } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    schools,
    students,
    teachers,
    setCurrentRole,
    setCurrentPage,
    setAuthSubPage,
    setCurrentTab,
    darkMode,
    setDarkMode,
    addToast
  } = useAppState();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  // Focus input on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };

    if (isCommandPaletteOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Build commands list based on query
  const staticCommands = [
    { category: 'Navigation', name: 'Go to Landing Page', icon: <Compass className="w-4 h-4" />, action: () => { setCurrentPage('marketing'); setCommandPaletteOpen(false); } },
    { category: 'Authentication', name: 'Sign Out / Go to Login', icon: <User className="w-4 h-4" />, action: () => { setCurrentPage('auth'); setAuthSubPage('login'); setCommandPaletteOpen(false); } },
    { category: 'Roles Switch', name: 'Log in as Teacher (Mrs. Jenkins)', icon: <GraduationCap className="w-4 h-4" />, action: () => { setCurrentPage('dashboard'); setCurrentRole('teacher'); setCommandPaletteOpen(false); addToast('success', 'Logged in as Teacher'); } },
    { category: 'Roles Switch', name: 'Log in as School Admin (Dr. Pendelton)', icon: <GraduationCap className="w-4 h-4" />, action: () => { setCurrentPage('dashboard'); setCurrentRole('school-admin'); setCurrentTab('overview'); setCommandPaletteOpen(false); addToast('success', 'Logged in as School Admin'); } },
    { category: 'Roles Switch', name: 'Log in as Super Admin', icon: <GraduationCap className="w-4 h-4" />, action: () => { setCurrentPage('dashboard'); setCurrentRole('super-admin'); setCurrentTab('overview'); setCommandPaletteOpen(false); addToast('success', 'Logged in as Super Admin'); } },
    { category: 'System Action', name: `Toggle ${darkMode ? 'Light' : 'Dark'} Mode`, icon: <Terminal className="w-4 h-4" />, action: () => { setDarkMode(!darkMode); setCommandPaletteOpen(false); } },
    { category: 'System Action', name: 'Reset Demo Database', icon: <ShieldAlert className="w-4 h-4" />, action: () => { localStorage.clear(); window.location.reload(); } }
  ];

  // Dynamic entities matching query
  const matchingSchools = query ? schools.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map(s => ({
    category: 'Schools Directory',
    name: `View school: ${s.name} (${s.plan} Plan)`,
    icon: <span className="text-sm">{s.logo}</span>,
    action: () => { setCurrentPage('dashboard'); setCurrentRole('super-admin'); setCurrentTab('schools'); setCommandPaletteOpen(false); }
  })) : [];

  const matchingStudents = query ? students.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map(s => ({
    category: 'Student Records',
    name: `Student: ${s.name} (Class ${s.className}-${s.section}, Roll: ${s.rollNumber})`,
    icon: <GraduationCap className="w-4 h-4" />,
    action: () => { setCurrentPage('dashboard'); setCurrentRole('school-admin'); setCurrentTab('students'); setCommandPaletteOpen(false); }
  })) : [];

  const matchingTeachers = query ? teachers.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).map(t => ({
    category: 'Teaching Staff',
    name: `Teacher: ${t.name} (${t.department})`,
    icon: <GraduationCap className="w-4 h-4" />,
    action: () => { setCurrentPage('dashboard'); setCurrentRole('school-admin'); setCurrentTab('teachers'); setCommandPaletteOpen(false); }
  })) : [];

  const allItems = [
    ...matchingSchools,
    ...matchingStudents,
    ...matchingTeachers,
    ...staticCommands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
  ];

  // Handle keyboard traversal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/65 backdrop-blur-md animate-fade-in" />

      {/* Palette Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-lg rounded-[20px] bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl animate-scale-in flex flex-col z-10"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, student, or school..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto p-2 flex flex-col">
          {allItems.length > 0 ? (
            allItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[12px] cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`shrink-0 ${isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isSelected 
                      ? 'bg-white/20 border-white/10 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-semibold text-slate-400 dark:text-slate-600">
              No matching commands, schools, or students found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
