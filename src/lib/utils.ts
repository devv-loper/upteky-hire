import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApplicationStatus } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  Applied: {
    label: 'Applied',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border border-blue-500/30',
    dot: 'bg-blue-400',
  },
  Screening: {
    label: 'Screening',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border border-amber-500/30',
    dot: 'bg-amber-400',
  },
  Interview: {
    label: 'Interview',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border border-purple-500/30',
    dot: 'bg-purple-400',
  },
  Offer: {
    label: 'Offer',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  Rejected: {
    label: 'Rejected',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border border-red-500/30',
    dot: 'bg-red-400',
  },
};

export const STATUS_OPTIONS: ApplicationStatus[] = [
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
];

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getAvatarColor(name: string): string {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-indigo-500 to-blue-600',
    'from-fuchsia-500 to-violet-600',
    'from-teal-500 to-emerald-600',
  ];
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}
