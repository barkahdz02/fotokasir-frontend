import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/api';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  hasRole: (kode: string) => boolean;
  isSuperAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        localStorage.setItem('fotokasir_token', token);
        localStorage.setItem('fotokasir_user', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('fotokasir_token');
        localStorage.removeItem('fotokasir_user');
        set({ token: null, user: null, isAuthenticated: false });
      },

      hasRole: (kode: string) => {
        const user = get().user;
        if (!user) return false;
        if (user.is_super_admin) return true;
        return user.roles?.some((r) => r.kode === kode) ?? false;
      },

      isSuperAdmin: () => {
        return get().user?.is_super_admin ?? false;
      },
    }),
    {
      name: 'fotokasir_auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
