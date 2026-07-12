import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-[12px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20 focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-md shadow-secondary/20 focus:ring-secondary',
    success: 'bg-success hover:bg-success-dark text-white shadow-md shadow-success/20 focus:ring-success',
    danger: 'bg-danger hover:bg-danger-dark text-white shadow-md shadow-danger/20 focus:ring-danger',
    warning: 'bg-warning hover:bg-warning-dark text-white shadow-md shadow-warning/20 focus:ring-warning',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400',
    outline: 'border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400',
    glass: 'backdrop-blur-md bg-white/10 dark:bg-black/20 text-slate-800 dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || isLoading}
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...(props as any)}
    >
      <div className="absolute inset-0 z-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        <span className="flex items-center gap-1.5">{children}</span>
      </div>
    </motion.button>
  );
};
