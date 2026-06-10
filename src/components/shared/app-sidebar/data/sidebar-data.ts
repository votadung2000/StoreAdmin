import { type ComponentType } from 'react';
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  Users,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export type SidebarBrand = {
  name: string;
  description: string;
};

export type SidebarUser = {
  name: string;
  email: string;
};

export type SidebarItem = {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  to: string;
  end?: boolean;
  badge?: string;
};

export type SidebarGroup = {
  label: string;
  items: readonly SidebarItem[];
};

export type SidebarData = {
  brand: SidebarBrand;
  user: SidebarUser;
  groups: readonly SidebarGroup[];
};

/** Default navigation model for the Store Admin shell. */
export const sidebarData = {
  brand: {
    name: 'Store Admin',
    description: 'Commerce Console',
  },
  user: {
    name: 'Store Owner',
    email: 'owner@store-admin.dev',
  },
  groups: [
    {
      label: 'Commerce',
      items: [
        {
          label: 'Overview',
          icon: LayoutDashboard,
          to: ROUTES.MAIN.DASHBOARD,
          end: true,
        },
        {
          label: 'Products',
          icon: Package,
          to: ROUTES.MAIN.PRODUCTS,
        },
        {
          label: 'Orders',
          icon: ShoppingCart,
          to: ROUTES.MAIN.ORDERS,
          badge: '12',
        },
        {
          label: 'Categories',
          icon: Tag,
          to: ROUTES.MAIN.CATEGORIES,
        },
      ],
    },
    {
      label: 'Operations',
      items: [
        {
          label: 'Inventory',
          icon: Boxes,
          to: ROUTES.MAIN.PRODUCTS,
        },
        {
          label: 'Fulfillment',
          icon: Truck,
          to: ROUTES.MAIN.ORDERS,
        },
        {
          label: 'Customers',
          icon: Users,
          to: ROUTES.MAIN.DASHBOARD,
        },
        {
          label: 'Reports',
          icon: ClipboardList,
          to: ROUTES.MAIN.DASHBOARD,
        },
      ],
    },
    {
      label: 'System',
      items: [
        {
          label: 'Store Settings',
          icon: Settings,
          to: ROUTES.MAIN.DASHBOARD,
        },
      ],
    },
  ],
} satisfies SidebarData;
