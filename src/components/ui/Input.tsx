'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  darkMode?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, darkMode = true, ...props }, ref) => {
    const baseInput = darkMode
      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/70 focus:bg-white/8'
      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:bg-white';

    return (
      <div className="w-full">
        {label && (
          <label className={cn('mb-1.5 block text-sm font-medium', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            {label}
            {props.required && <span className="ml-1 text-rose-400">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20',
              baseInput,
              icon && 'pl-10',
              error && 'border-red-500/50 focus:border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
