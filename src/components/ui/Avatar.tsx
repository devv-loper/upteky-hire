'use client';

import { cn, getInitials, getAvatarColor } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const gradient = getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ring-2 ring-white/10 flex-shrink-0',
        gradient,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
