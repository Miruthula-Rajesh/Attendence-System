import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const DarkModeToggle: React.FC = () => {
  const { darkMode, setDarkMode } = useAppState();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-[10px] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-200 transition-colors duration-200 focus:outline-none"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
