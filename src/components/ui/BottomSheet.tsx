import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl z-10 overflow-hidden border-t border-[#E5E7EB] max-h-[85vh] flex flex-col"
          >
            {/* Drag Handle Indicator */}
            <div className="w-full flex items-center justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 bg-[#E5E7EB] rounded-full" />
            </div>

            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E7EB]">
                <h3 className="text-base font-semibold text-[#18181B]">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 text-[#6B7280] hover:text-[#18181B] hover:bg-[#F4F5F7] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="p-5 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
