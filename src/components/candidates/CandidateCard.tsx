'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Calendar } from 'lucide-react';
import { Candidate } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate, cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: (candidate: Candidate) => void;
  index: number;
}

export function CandidateCard({ candidate, onClick, index }: CandidateCardProps) {
  const { isDark } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={() => onClick(candidate)}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300',
        isDark
          ? 'border-white/10 bg-white/5 hover:border-violet-500/40 hover:bg-white/8 hover:shadow-lg hover:shadow-violet-500/10'
          : 'border-slate-200 bg-white hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100'
      )}
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(139,92,246,0.04), transparent 40%)' }}
      />

      {/* Top row: Avatar + Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={candidate.name} size="md" />
          <div>
            <h3 className={cn('font-semibold leading-tight group-hover:text-violet-400 transition-colors', isDark ? 'text-white' : 'text-slate-900')}>
              {candidate.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Mail className="h-3 w-3 text-slate-500" />
              <span className="text-xs text-slate-500 truncate max-w-[160px]">{candidate.email}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={candidate.status} size="sm" />
      </div>

      {/* Meta info */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{candidate.college}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Applied {formatDate(candidate.appliedDate)}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className={cn(
              'rounded-md px-2 py-0.5 text-xs font-medium',
              isDark ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-600'
            )}
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="rounded-md px-2 py-0.5 text-xs font-medium text-slate-500">
            +{candidate.skills.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  );
}
