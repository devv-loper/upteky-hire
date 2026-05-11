'use client';

import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useCandidateStore } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { STATUS_OPTIONS } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function SearchFilter() {
  const { filters, setFilters, resetFilters } = useCandidateStore();
  const { isDark } = useThemeStore();

  const hasActiveFilters = filters.search || filters.status !== 'All' || filters.skills.length > 0 || filters.college;

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    ...STATUS_OPTIONS.map((s) => ({ value: s, label: s })),
  ];

  const sortOptions = [
    { value: 'appliedDate', label: 'Date Applied' },
    { value: 'name', label: 'Name' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <div className={cn('rounded-2xl border p-4 space-y-3', isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-sm')}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, college, or skill..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            icon={<Search className="h-4 w-4" />}
            darkMode={isDark}
          />
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value as any })}
            options={statusOptions}
            darkMode={isDark}
          />
        </div>

        {/* Sort */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.sortBy}
            onChange={(e) => setFilters({ sortBy: e.target.value as any })}
            options={sortOptions}
            darkMode={isDark}
          />
        </div>

        {/* Sort Order */}
        <Button
          variant="secondary"
          size="md"
          icon={<ArrowUpDown className="h-4 w-4" />}
          onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
          className="w-full sm:w-auto"
        >
          {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </Button>

        {/* Clear */}
        {hasActiveFilters && (
          <Button variant="ghost" size="md" icon={<X className="h-4 w-4" />} onClick={resetFilters} className="w-full sm:w-auto text-rose-400 hover:text-rose-300">
            Clear
          </Button>
        )}
      </div>

      {/* Active filter pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', isDark ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-50 text-violet-700')}>
              <Search className="h-3 w-3" /> &ldquo;{filters.search}&rdquo;
              <button onClick={() => setFilters({ search: '' })} className="hover:text-white"><X className="h-3 w-3" /></button>
            </span>
          )}
          {filters.status !== 'All' && (
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700')}>
              <SlidersHorizontal className="h-3 w-3" /> {filters.status}
              <button onClick={() => setFilters({ status: 'All' })} className="hover:text-white"><X className="h-3 w-3" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
