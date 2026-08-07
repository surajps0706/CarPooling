import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#6B7280] tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-12 rounded-xl bg-white border border-[#E5E7EB] text-[#18181B] text-sm px-4 placeholder-[#9CA3AF]',
              'transition-all duration-150 focus:outline-none focus:border-[#2457FF] focus:ring-3 focus:ring-[#2457FF]/15',
              icon && 'pl-10',
              rightElement && 'pr-12',
              error && 'border-[#E5484D] focus:border-[#E5484D] focus:ring-[#E5484D]/15',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-[#6B7280]">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#E5484D] font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
