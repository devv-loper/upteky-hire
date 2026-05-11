import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@upteky.com': {
    password: 'admin123',
    user: { id: '1', name: 'Admin User', email: 'admin@upteky.com', role: 'Admin' },
  },
  'recruiter@upteky.com': {
    password: 'recruit123',
    user: { id: '2', name: 'Sarah Recruiter', email: 'recruiter@upteky.com', role: 'Recruiter' },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string): Promise<boolean> => {
        await new Promise((r) => setTimeout(r, 800));
        const record = DEMO_USERS[email.toLowerCase()];
        if (record && record.password === password) {
          set({ user: record.user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'upteky-auth' }
  )
);
