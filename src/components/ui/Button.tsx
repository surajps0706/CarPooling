import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[#2457FF] text-white hover:bg-[#1D46D8] active:bg-[#1D46D8] focus:ring-[#2457FF] shadow-sm',
    secondary: 'bg-[#F4F5F7] text-[#18181B] hover:bg-[#EFEFEF] active:bg-[#E5E7EB] focus:ring-[#18181B]',
    outline: 'border border-[#E5E7EB] bg-transparent text-[#18181B] hover:bg-[#F4F5F7] focus:ring-[#2457FF]',
    ghost: 'bg-transparent text-[#6B7280] hover:bg-[#F4F5F7] hover:text-[#18181B]',
    destructive: 'bg-[#FEF2F2] text-[#E5484D] hover:bg-[#E5484D] hover:text-white focus:ring-[#E5484D]'
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-11 px-4 text-sm gap-2',
    lg: 'h-13 px-6 text-base gap-2.5 font-semibold'
  };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
