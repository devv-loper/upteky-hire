'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, LayoutGrid, List, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SearchFilter } from '@/components/candidates/SearchFilter';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { CandidateDetail } from '@/components/candidates/CandidateDetail';
import { AddCandidateForm } from '@/components/candidates/AddCandidateForm';
import { APIUsersPanel } from '@/components/dashboard/APIUsersPanel';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCandidateStore, useFilteredCandidates } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { Candidate } from '@/types';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { setSelectedCandidate, selectedCandidate, setPage, currentPage, pageSize } = useCandidateStore();
  const { candidates, total, totalPages } = useFilteredCandidates();
  const { isDark } = useThemeStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(null);
    setEditCandidate(candidate);
  };

  return (
    <div className={cn('min-h-screen transition-colors duration-300', isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <Navbar onAddCandidate={() => setShowAddForm(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>
              Candidate Pipeline
            </h1>
            <p className={cn('mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500')}>
              Manage and track all internship applicants
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<UserPlus className="h-4 w-4" />}
            onClick={() => setShowAddForm(true)}
            className="hidden sm:inline-flex"
          >
            Add Candidate
          </Button>
        </motion.div>

        {/* Stats */}
        <DashboardStats />

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left: Candidates */}
          <div className="xl:col-span-3 space-y-4">
            <SearchFilter />

            {/* Results header */}
            <div className="flex items-center justify-between">
              <p className={cn('text-sm', isDark ? 'text-slate-400' : 'text-slate-500')}>
                Showing <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-800')}>{candidates.length}</span> of{' '}
                <span className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-800')}>{total}</span> candidates
              </p>
              <div className={cn('flex items-center gap-1 rounded-lg border p-1', isDark ? 'border-white/10' : 'border-slate-200')}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn('rounded-md p-1.5 transition-colors', viewMode === 'grid'
                    ? 'bg-violet-500/20 text-violet-400'
                    : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn('rounded-md p-1.5 transition-colors', viewMode === 'list'
                    ? 'bg-violet-500/20 text-violet-400'
                    : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Candidates grid/list */}
            {candidates.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  'flex flex-col items-center justify-center rounded-2xl border py-16 text-center',
                  isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'
                )}
              >
                <Users className="h-12 w-12 text-slate-600 mb-4" />
                <h3 className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-slate-900')}>No candidates found</h3>
                <p className={cn('mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500')}>
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="primary"
                  size="md"
                  icon={<UserPlus className="h-4 w-4" />}
                  onClick={() => setShowAddForm(true)}
                  className="mt-4"
                >
                  Add First Candidate
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                      : 'space-y-3'
                  }
                >
                  {candidates.map((candidate, i) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onClick={handleCandidateClick}
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <p className={cn('text-xs', isDark ? 'text-slate-500' : 'text-slate-400')}>
                  Page {currentPage} of {totalPages}
                </p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  darkMode={isDark}
                />
              </div>
            )}
          </div>

          {/* Right: API Panel */}
          <div className="xl:col-span-1">
            <APIUsersPanel />
          </div>
        </div>
      </main>

      {/* Candidate Detail Modal */}
      <Modal
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Candidate Profile"
        size="lg"
      >
        {selectedCandidate && (
          <CandidateDetail
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onEdit={handleEdit}
          />
        )}
      </Modal>

      {/* Add Candidate Modal */}
      <Modal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Candidate"
        size="xl"
      >
        <AddCandidateForm onSuccess={() => setShowAddForm(false)} />
      </Modal>

      {/* Edit Candidate Modal */}
      <Modal
        isOpen={!!editCandidate}
        onClose={() => setEditCandidate(null)}
        title="Edit Candidate"
        size="xl"
      >
        {editCandidate && (
          <AddCandidateForm
            initialData={editCandidate}
            onSuccess={() => setEditCandidate(null)}
          />
        )}
      </Modal>
    </div>
  );
}
