import { type ComponentType } from 'react';
import { navigationGroups } from '@/constants/navigation';

export type SidebarBrand = {
  name: string;
  description: string;
};

export type SidebarItem = {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  to: string;
  permission: string;
  end?: boolean;
  badge?: string;
};

export type SidebarGroup = {
  label: string;
  items: readonly SidebarItem[];
};

export type SidebarData = {
  brand: SidebarBrand;
  groups: readonly SidebarGroup[];
};

/** Default navigation model for the Store Admin shell. */
export const sidebarData = {
  brand: {
    name: 'Store Admin',
    description: 'Commerce Console',
  },
  groups: navigationGroups,
} satisfies SidebarData;
