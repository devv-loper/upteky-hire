'use client';

import { Moon, Sun, LogOut, UserPlus, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onAddCandidate: () => void;
}

export function Navbar({ onAddCandidate }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const { isDark, toggle } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={cn(
      'sticky top-0 z-40 border-b backdrop-blur-xl',
      isDark ? 'border-white/10 bg-slate-950/80' : 'border-slate-200 bg-white/80'
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <div>
              <span className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                Upteky
              </span>
              <span className="ml-1.5 rounded-md bg-violet-500/20 px-1.5 py-0.5 text-xs font-medium text-violet-400">
                Hire
              </span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              icon={isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              onClick={toggle}
              className="rounded-xl"
            />

            <button className={cn('relative rounded-xl p-2 transition-colors', isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600')}>
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
            </button>

            <Button variant="primary" size="sm" icon={<UserPlus className="h-4 w-4" />} onClick={onAddCandidate}>
              Add Candidate
            </Button>

            <div className={cn('flex items-center gap-2 rounded-xl border px-3 py-1.5', isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50')}>
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden md:block">
                <p className={cn('text-xs font-medium leading-none', isDark ? 'text-white' : 'text-slate-900')}>{user?.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="ml-1 rounded-lg p-1 text-slate-500 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn('sm:hidden rounded-xl p-2 transition-colors', isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600')}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden sm:hidden border-t border-white/10 pb-4"
            >
              <div className="space-y-2 pt-4">
                <div className={cn('flex items-center gap-3 rounded-xl p-3', isDark ? 'bg-white/5' : 'bg-slate-50')}>
                  <Avatar name={user?.name || 'User'} size="sm" />
                  <div>
                    <p className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-slate-900')}>{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.role} · {user?.email}</p>
                  </div>
                </div>
                <Button variant="primary" size="md" icon={<UserPlus className="h-4 w-4" />} onClick={() => { onAddCandidate(); setMenuOpen(false); }} className="w-full">
                  Add Candidate
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" size="md" icon={isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} onClick={toggle} className="flex-1">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                  <Button variant="danger" size="md" icon={<LogOut className="h-4 w-4" />} onClick={logout} className="flex-1">
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
