'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  change?: string;
  delay?: number;
  darkMode?: boolean;
}

export function StatCard({ title, value, icon, color, change, delay = 0, darkMode = true }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 transition-all duration-300',
        darkMode
          ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
          : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-sm font-medium', darkMode ? 'text-slate-400' : 'text-slate-500')}>{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1, type: 'spring' }}
            className={cn('mt-1 text-3xl font-bold', darkMode ? 'text-white' : 'text-slate-900')}
          >
            {value}
          </motion.p>
          {change && (
            <p className="mt-1 text-xs text-emerald-400">{change}</p>
          )}
        </div>
        <div className={cn('rounded-xl p-3', color)}>{icon}</div>
      </div>
      <div className={cn('absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-10', color)} />
    </motion.div>
  );
}
