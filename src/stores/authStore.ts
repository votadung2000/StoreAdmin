import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { navigationItems } from '@/constants/navigation';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

const ownerPermissions = Array.from(
  new Set([
    ...navigationItems.map((item) => item.permission),
    'product.create',
    'product.update',
    'product.archive',
    'inventory.adjust',
    'order.update',
    'order.cancel',
    'order.refund',
    'staff.invite',
    'role.manage',
    'setting.manage',
    'audit.read',
  ]),
);

export const defaultAuthUser: AuthUser = {
  id: 'usr-store-owner',
  name: 'Store Owner',
  email: 'owner@store-admin.dev',
  roles: ['Owner', 'Admin'],
  permissions: ownerPermissions,
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (token: string, user?: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
      signIn: (token: string, user = defaultAuthUser) =>
        set({ isAuthenticated: true, token, user, isLoading: false }),
      logout: () =>
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
