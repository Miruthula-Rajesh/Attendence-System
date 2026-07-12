import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || Math.random().toString(36).substring(2, 9);
  
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">
          {label}
        </label>
      )}
      <motion.div 
        className="relative flex items-center"
        animate={error ? { x: [-5, 5, -5, 5, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {icon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <motion.input
          whileFocus={error ? {} : { scale: 1.01, boxShadow: "0px 0px 15px rgba(37,99,235,0.15)" }}
          transition={{ duration: 0.2 }}
          id={inputId}
          className={`w-full text-sm font-medium bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white rounded-[12px] border ${
            error 
              ? 'border-danger focus:ring-danger/20 focus:border-danger' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-primary/20 focus:border-primary'
          } ${
            icon ? 'pl-11' : 'pl-4'
          } pr-4 py-2.5 transition-colors duration-200 focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 neumorphic-inset ${className}`}
          {...(props as any)}
        />
      </motion.div>
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-danger font-medium"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};
