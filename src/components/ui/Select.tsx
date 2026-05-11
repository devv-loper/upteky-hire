'use client';

import { cn } from '@/lib/utils';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  darkMode?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, darkMode = true, options, ...props }, ref) => {
    const baseSelect = darkMode
      ? 'bg-white/5 border-white/10 text-white focus:border-violet-500/70'
      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-500';

    return (
      <div className="w-full">
        {label && (
          <label className={cn('mb-1.5 block text-sm font-medium', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            {label}
            {props.required && <span className="ml-1 text-rose-400">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20',
              baseSelect,
              error && 'border-red-500/50',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
