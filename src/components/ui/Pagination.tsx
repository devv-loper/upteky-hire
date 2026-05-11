'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  darkMode?: boolean;
}

export function Pagination({ currentPage, totalPages, onPageChange, darkMode = true }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = darkMode
    ? 'border-white/10 hover:bg-white/10 text-slate-400 hover:text-white'
    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900';

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed',
          btnBase
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dot-${i}`} className="px-1 text-slate-500">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all',
              page === currentPage
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : btnBase
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed',
          btnBase
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
