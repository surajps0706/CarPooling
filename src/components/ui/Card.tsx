import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hoverable?: boolean;
  active?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  active = false,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, transition: { duration: 0.15 } } : undefined}
      className={cn(
        'bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-sm transition-all duration-200',
        hoverable && 'cursor-pointer hover:border-[#D1D5DB] hover:shadow-md',
        active && 'border-[#2457FF] ring-2 ring-[#2457FF]/15 bg-[#EEF2FF]/30',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
