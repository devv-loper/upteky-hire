'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Zap } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export function LoginPage() {
  const { login } = useAuthStore();
  const { isDark } = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) {
      toast.error('Invalid credentials. Try admin@upteky.com / admin123');
      setErrors({ password: 'Invalid email or password' });
    } else {
      toast.success('Welcome back!');
    }
  };

  const demoLogin = async (role: 'admin' | 'recruiter') => {
    const creds = role === 'admin'
      ? { email: 'admin@upteky.com', password: 'admin123' }
      : { email: 'recruiter@upteky.com', password: 'recruit123' };
    setEmail(creds.email);
    setPassword(creds.password);
    setLoading(true);
    await login(creds.email, creds.password);
    setLoading(false);
    toast.success('Logged in successfully!');
  };

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4 relative overflow-hidden', isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-violet-50 to-indigo-100')}>
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
        className={cn(
          'relative w-full max-w-md rounded-3xl border p-8 shadow-2xl',
          isDark ? 'border-white/10 bg-slate-900/90 backdrop-blur-xl' : 'border-white/60 bg-white/90 backdrop-blur-xl shadow-violet-200/50'
        )}
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/40"
          >
            <Zap className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-slate-900')}>Welcome to Upteky Hire</h1>
          <p className={cn('mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500')}>
            Candidate Management Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@upteky.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
            icon={<Mail className="h-4 w-4" />}
            error={errors.email}
            darkMode={isDark}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              icon={<Lock className="h-4 w-4" />}
              error={errors.password}
              darkMode={isDark}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} icon={<ArrowRight className="h-4 w-4" />} className="w-full mt-6">
            Sign In
          </Button>
        </form>

        {/* Demo credentials */}
        <div className={cn('mt-6 rounded-2xl border p-4 space-y-3', isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50')}>
          <p className={cn('text-xs font-semibold uppercase tracking-wide', isDark ? 'text-slate-500' : 'text-slate-400')}>Quick Demo Access</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => demoLogin('admin')}
              className={cn(
                'rounded-xl border p-3 text-left transition-all hover:border-violet-500/50',
                isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-violet-50'
              )}
            >
              <p className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-slate-900')}>Admin User</p>
              <p className="mt-0.5 text-xs text-slate-500">admin@upteky.com</p>
            </button>
            <button
              onClick={() => demoLogin('recruiter')}
              className={cn(
                'rounded-xl border p-3 text-left transition-all hover:border-violet-500/50',
                isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-violet-50'
              )}
            >
              <p className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-slate-900')}>Recruiter</p>
              <p className="mt-0.5 text-xs text-slate-500">recruiter@upteky.com</p>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
