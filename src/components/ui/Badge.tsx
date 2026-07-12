import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'purple';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border transition-colors duration-200';
  
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-light',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20 dark:bg-secondary/20 dark:text-secondary-light',
    success: 'bg-success/10 text-success border-success/20 dark:bg-success/20 dark:text-success-light',
    danger: 'bg-danger/10 text-danger border-danger/20 dark:bg-danger/20 dark:text-danger-light',
    warning: 'bg-warning/10 text-warning border-warning/20 dark:bg-warning/20 dark:text-warning-light',
    info: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700',
    purple: 'bg-purpleAccent/10 text-purpleAccent border-purpleAccent/20 dark:bg-purpleAccent/20 dark:text-purpleAccent-light'
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
