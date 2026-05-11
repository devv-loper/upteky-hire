'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Calendar, ExternalLink, GitBranch, Link, Globe, Trash2, Edit } from 'lucide-react';
import { Candidate } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { useCandidateStore } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CandidateDetailProps {
  candidate: Candidate;
  onClose: () => void;
  onEdit?: (candidate: Candidate) => void;
}

export function CandidateDetail({ candidate, onClose, onEdit }: CandidateDetailProps) {
  const { deleteCandidate } = useCandidateStore();
  const { isDark } = useThemeStore();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove ${candidate.name}?`)) {
      deleteCandidate(candidate.id);
      toast.success(`${candidate.name} removed successfully`);
      onClose();
    }
  };

  const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5 flex-shrink-0', isDark ? 'text-slate-400' : 'text-slate-500')}>{icon}</div>
        <div>
          <p className={cn('text-xs font-medium uppercase tracking-wide', isDark ? 'text-slate-500' : 'text-slate-400')}>{label}</p>
          <p className={cn('mt-0.5 text-sm', isDark ? 'text-slate-200' : 'text-slate-800')}>{value}</p>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar name={candidate.name} size="xl" />
        <div className="flex-1 min-w-0">
          <h2 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>{candidate.name}</h2>
          <p className={cn('text-sm mt-1', isDark ? 'text-slate-400' : 'text-slate-500')}>{candidate.degree}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={candidate.status} />
            {candidate.experience && (
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600')}>
                {candidate.experience}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className={cn('rounded-xl border p-4 grid grid-cols-1 sm:grid-cols-2 gap-4', isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50')}>
        <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={candidate.email} />
        <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={candidate.phone} />
        <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={candidate.location} />
        <InfoRow icon={<Calendar className="h-4 w-4" />} label="Applied" value={formatDate(candidate.appliedDate)} />
        <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="College" value={candidate.college} />
        <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="Graduation Year" value={candidate.graduationYear?.toString()} />
        {candidate.gpa && <InfoRow icon={<span className="text-xs font-bold">GPA</span>} label="GPA / CGPA" value={candidate.gpa} />}
      </div>

      {/* Skills */}
      <div>
        <h3 className={cn('mb-3 text-sm font-semibold uppercase tracking-wide', isDark ? 'text-slate-400' : 'text-slate-500')}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                'rounded-lg px-3 py-1 text-sm font-medium',
                isDark ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20' : 'bg-violet-50 text-violet-700 border border-violet-200'
              )}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      {(candidate.linkedIn || candidate.github || candidate.portfolio) && (
        <div>
          <h3 className={cn('mb-3 text-sm font-semibold uppercase tracking-wide', isDark ? 'text-slate-400' : 'text-slate-500')}>Links</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.linkedIn && (
              <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                <Link className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {candidate.github && (
              <a href={candidate.github} target="_blank" rel="noopener noreferrer"
                className={cn('inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors border',
                  isDark ? 'bg-white/10 text-slate-300 hover:bg-white/20 border-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200')}>
                <GitBranch className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {candidate.portfolio && (
              <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                <Globe className="h-4 w-4" /> Portfolio <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {candidate.notes && (
        <div>
          <h3 className={cn('mb-2 text-sm font-semibold uppercase tracking-wide', isDark ? 'text-slate-400' : 'text-slate-500')}>Notes</h3>
          <p className={cn('rounded-xl border p-3 text-sm', isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700')}>{candidate.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-white/10">
        {onEdit && (
          <Button variant="secondary" size="sm" icon={<Edit className="h-4 w-4" />} onClick={() => onEdit(candidate)} className="flex-1">
            Edit Candidate
          </Button>
        )}
        <Button variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />} onClick={handleDelete}>
          Remove
        </Button>
      </div>
    </motion.div>
  );
}
