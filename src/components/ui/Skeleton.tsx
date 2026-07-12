import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-md ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: ['-100%', '100%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 1.5
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
        }}
      />
    </div>
  );
};
