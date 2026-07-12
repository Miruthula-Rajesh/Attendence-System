import React, { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, duration = 2.5 }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a premium, snappy start and smooth finish
        onUpdate(value) {
          if (nodeRef.current) {
            let display = Math.round(value).toString();
            // Format thousands
            if (to >= 1000 && to % 1000 === 0) {
              display = (Math.round(value) / 1000) + 'k';
            } else {
              display = display.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            nodeRef.current.textContent = display;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef as any}>{from}</span>;
};
