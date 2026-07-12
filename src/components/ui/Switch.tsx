import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  id
}) => {
  const switchId = id || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className="flex items-center gap-3">
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex ${
          checked ? 'bg-primary justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0"
        />
      </button>
      {label && (
        <label htmlFor={switchId} className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
};
