import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className
}) => {
  const variantStyles = {
    default: 'bg-[#F4F5F7] text-[#6B7280] border-[#E5E7EB]',
    neutral: 'bg-[#F4F5F7] text-[#18181B] border-[#D1D5DB]',
    success: 'bg-[#F0FDF4] text-[#17A34A] border-green-200',
    warning: 'bg-[#FFFBEB] text-[#F59E0B] border-amber-200',
    danger: 'bg-[#FEF2F2] text-[#E5484D] border-red-200',
    accent: 'bg-[#EEF2FF] text-[#2457FF] border-blue-200'
  };

  const dotColors = {
    default: 'bg-[#6B7280]',
    neutral: 'bg-[#18181B]',
    success: 'bg-[#17A34A]',
    warning: 'bg-[#F59E0B]',
    danger: 'bg-[#E5484D]',
    accent: 'bg-[#2457FF]'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-semibold'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-solid tracking-tight select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
