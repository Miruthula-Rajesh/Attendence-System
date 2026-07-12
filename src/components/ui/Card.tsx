import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'flat' | 'glow' | 'neumorphic';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'glass', 
  hoverEffect = false,
  className = '',
  ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hoverEffect) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!hoverEffect) return;
    x.set(0);
    y.set(0);
  };

  const baseStyle = 'rounded-[18px] p-6 transition-colors duration-300 relative overflow-hidden';
  
  const variants = {
    glass: 'glass-panel border border-white/20 dark:border-white/5 shadow-lg',
    flat: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm',
    glow: 'glass-panel border border-primary/20 dark:border-primary/10 shadow-lg',
    neumorphic: 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[4px_4px_10px_rgba(0,0,0,0.03),-4px_-4px_10px_rgba(255,255,255,0.7)] dark:shadow-none'
  };

  const dynamicProps = hoverEffect ? {
    style: { rotateX, rotateY, transformStyle: "preserve-3d" } as any,
    whileHover: { scale: 1.02, zIndex: 10, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  } : {};

  return (
    <motion.div
      ref={ref}
      className={cn(baseStyle, variants[variant], className)}
      {...dynamicProps}
      {...(props as any)}
    >
      <div className="relative z-10 w-full h-full" style={hoverEffect ? { transform: "translateZ(30px)" } : {}}>
        {children}
      </div>
    </motion.div>
  );
};
