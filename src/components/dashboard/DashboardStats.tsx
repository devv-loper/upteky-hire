'use client';

import { motion } from 'framer-motion';
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { useCandidateStore } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { ApplicationStatus } from '@/types';

export function DashboardStats() {
  const { candidates } = useCandidateStore();
  const { isDark } = useThemeStore();

  const getCount = (status: ApplicationStatus) =>
    candidates.filter((c) => c.status === status).length;

  const stats = [
    {
      title: 'Total Applicants',
      value: candidates.length,
      icon: <Users className="h-5 w-5 text-violet-400" />,
      color: 'bg-violet-500/20',
      change: `+${Math.max(1, Math.round(candidates.length * 0.12))} this week`,
      delay: 0,
    },
    {
      title: 'In Interview',
      value: getCount('Interview'),
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      color: 'bg-purple-500/20',
      delay: 0.05,
    },
    {
      title: 'Offers Extended',
      value: getCount('Offer'),
      icon: <UserCheck className="h-5 w-5 text-emerald-400" />,
      color: 'bg-emerald-500/20',
      change: 'Ready to onboard',
      delay: 0.1,
    },
    {
      title: 'Screening Rate',
      value: `${candidates.length > 0 ? Math.round(((getCount('Interview') + getCount('Offer')) / candidates.length) * 100) : 0}%`,
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      color: 'bg-blue-500/20',
      delay: 0.15,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} darkMode={isDark} />
      ))}
    </div>
  );
}
