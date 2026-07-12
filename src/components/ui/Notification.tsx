import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppState();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-danger" />,
    warning: <AlertCircle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-primary" />
  };

  const bgBorderStyles = {
    success: 'border-success/30 dark:border-success/20 bg-white/90 dark:bg-slate-900/90',
    error: 'border-danger/30 dark:border-danger/20 bg-white/90 dark:bg-slate-900/90',
    warning: 'border-warning/30 dark:border-warning/20 bg-white/90 dark:bg-slate-900/90',
    info: 'border-primary/30 dark:border-primary/20 bg-white/90 dark:bg-slate-900/90'
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-start gap-3.5 p-4 rounded-[16px] border backdrop-blur-md shadow-2xl pointer-events-auto ${bgBorderStyles[toast.type]}`}
          >
            <div className="mt-0.5 shrink-0">
              {icons[toast.type]}
            </div>
            <div className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
