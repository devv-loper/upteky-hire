'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, RefreshCw, User, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { fetchAPIUsers } from '@/lib/api';
import { APIUser } from '@/types';
import { useCandidateStore } from '@/store/candidateStore';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export function APIUsersPanel() {
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addCandidate } = useCandidateStore();
  const { isDark } = useThemeStore();

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPIUsers();
      setUsers(data.slice(0, 6));
    } catch (err) {
      setError('Failed to fetch users from API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const importUser = (user: APIUser) => {
    const skills = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'];
    addCandidate({
      name: user.name,
      email: user.email,
      phone: user.phone,
      college: `${user.company.name} University`,
      degree: 'B.Tech Computer Science',
      graduationYear: 2024,
      skills: skills.slice(0, Math.floor(Math.random() * 3) + 2),
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      experience: 'Fresher',
      location: user.address.city,
      linkedIn: `https://linkedin.com`,
      portfolio: `https://${user.website}`,
    });
    toast.success(`${user.name} imported as candidate!`);
  };

  return (
    <div className={cn('rounded-2xl border p-5', isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-sm')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
            <Globe className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className={cn('font-semibold', isDark ? 'text-white' : 'text-slate-900')}>API Integration</h3>
            <p className="text-xs text-slate-500">JSONPlaceholder Users</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" icon={<RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />} onClick={loadUsers} loading={loading}>
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 mb-4">
          {error}
        </div>
      )}

      {loading && !users.length ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={cn('h-14 animate-pulse rounded-xl', isDark ? 'bg-white/5' : 'bg-slate-100')} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-center gap-3 rounded-xl p-3 transition-all',
                isDark ? 'hover:bg-white/8' : 'hover:bg-slate-50'
              )}
            >
              <Avatar name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', isDark ? 'text-white' : 'text-slate-900')}>{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => importUser(user)}>
                Import
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <p className={cn('mt-3 text-center text-xs', isDark ? 'text-slate-600' : 'text-slate-400')}>
        Source: jsonplaceholder.typicode.com
      </p>
    </div>
  );
}
