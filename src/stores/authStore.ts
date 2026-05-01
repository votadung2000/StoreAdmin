import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      isLoading: false,
      login: (token: string) =>
        set({ isAuthenticated: true, token, isLoading: false }),
      logout: () =>
        set({ isAuthenticated: false, token: null, isLoading: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
