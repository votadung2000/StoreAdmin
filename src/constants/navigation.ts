import {
  Archive,
  Boxes,
  ClipboardList,
  FileClock,
  LayoutDashboard,
  Package,
  Percent,
  RotateCcw,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export type NavigationGroupLabel = 'Commerce' | 'Operations' | 'System';

export type NavigationItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  to: string;
  group: NavigationGroupLabel;
  permission: string;
  end?: boolean;
  badge?: string;
};

type RouteMeta = NavigationItem & {
  match?: (pathname: string) => boolean;
};

const productDetailPattern = /^\/products\/[^/]+$/;
const productEditPattern = /^\/products\/[^/]+\/edit$/;
const orderDetailPattern = /^\/orders\/[^/]+$/;
const customerDetailPattern = /^\/customers\/[^/]+$/;

export const navigationItems = [
  {
    label: 'Dashboard',
    description: 'Sales, fulfillment, inventory, and customer overview.',
    icon: LayoutDashboard,
    to: ROUTES.MAIN.DASHBOARD,
    group: 'Commerce',
    permission: 'dashboard.read',
    end: true,
  },
  {
    label: 'Products',
    description: 'Catalog, variants, SKU pricing, and publishing status.',
    icon: Package,
    to: ROUTES.MAIN.PRODUCTS,
    group: 'Commerce',
    permission: 'product.read',
  },
  {
    label: 'Categories',
    description: 'Category tree, merchandising, storefront visibility, and SEO.',
    icon: Tag,
    to: ROUTES.MAIN.CATEGORIES,
    group: 'Commerce',
    permission: 'category.read',
  },
  {
    label: 'Orders',
    description: 'Payments, packing, fulfillment, and customer communication.',
    icon: ShoppingCart,
    to: ROUTES.MAIN.ORDERS,
    group: 'Commerce',
    permission: 'order.read',
    badge: '12',
  },
  {
    label: 'Inventory',
    description: 'Availability, reservations, movements, and low-stock risk.',
    icon: Boxes,
    to: ROUTES.MAIN.INVENTORY,
    group: 'Operations',
    permission: 'inventory.read',
    badge: '9',
  },
  {
    label: 'Returns',
    description: 'Refund requests, exchange approvals, and return intake.',
    icon: RotateCcw,
    to: ROUTES.MAIN.RETURNS,
    group: 'Operations',
    permission: 'order.refund',
  },
  {
    label: 'Customers',
    description: 'Customer profiles, order history, support tags, and segments.',
    icon: Users,
    to: ROUTES.MAIN.CUSTOMERS,
    group: 'Operations',
    permission: 'customer.read',
  },
  {
    label: 'Promotions',
    description: 'Coupons, campaigns, discount rules, and usage limits.',
    icon: Percent,
    to: ROUTES.MAIN.PROMOTIONS,
    group: 'Operations',
    permission: 'promotion.manage',
  },
  {
    label: 'Shipping',
    description: 'Shipping providers, zones, rates, and fulfillment rules.',
    icon: Truck,
    to: ROUTES.MAIN.SHIPPING,
    group: 'Operations',
    permission: 'setting.manage',
  },
  {
    label: 'Reports',
    description: 'Revenue, product, inventory, order, and customer reporting.',
    icon: ClipboardList,
    to: ROUTES.MAIN.REPORTS,
    group: 'Operations',
    permission: 'report.view',
  },
  {
    label: 'Staff',
    description: 'Team members, invitations, roles, and access status.',
    icon: ShieldCheck,
    to: ROUTES.MAIN.STAFF,
    group: 'System',
    permission: 'staff.invite',
  },
  {
    label: 'Roles',
    description: 'Permission groups, assignment rules, and RBAC coverage.',
    icon: Archive,
    to: ROUTES.MAIN.ROLES,
    group: 'System',
    permission: 'role.manage',
  },
  {
    label: 'Settings',
    description: 'Store profile, payment, tax, localization, and policy defaults.',
    icon: Settings,
    to: ROUTES.MAIN.SETTINGS,
    group: 'System',
    permission: 'setting.manage',
  },
  {
    label: 'Audit Logs',
    description: 'Sensitive changes, user activity, request IDs, and exports.',
    icon: FileClock,
    to: ROUTES.MAIN.AUDIT_LOGS,
    group: 'System',
    permission: 'audit.read',
  },
] as const satisfies readonly NavigationItem[];

const navigationGroupLabels = [
  'Commerce',
  'Operations',
  'System',
] as const satisfies readonly NavigationGroupLabel[];

export const navigationGroups = navigationGroupLabels.map((group) => ({
  label: group,
  items: navigationItems.filter((item) => item.group === group),
}));

const routeMatchers: readonly RouteMeta[] = [
  ...navigationItems,
  {
    label: 'Create Product',
    description: 'Build product identity, pricing, inventory, and SEO.',
    icon: Package,
    to: ROUTES.MAIN.PRODUCT_NEW,
    group: 'Commerce',
    permission: 'product.create',
  },
  {
    label: 'Edit Product',
    description: 'Update product identity, pricing, inventory, and SEO.',
    icon: Package,
    to: ROUTES.MAIN.PRODUCT_EDIT,
    group: 'Commerce',
    permission: 'product.update',
    match: (pathname) => productEditPattern.test(pathname),
  },
  {
    label: 'Product Detail',
    description: 'SKU, inventory, activity, and publication context.',
    icon: Package,
    to: '/products/',
    group: 'Commerce',
    permission: 'product.read',
    match: (pathname) => productDetailPattern.test(pathname),
  },
  {
    label: 'Order Detail',
    description: 'Payment, fulfillment, timeline, and customer service context.',
    icon: ShoppingCart,
    to: '/orders/',
    group: 'Commerce',
    permission: 'order.read',
    match: (pathname) => orderDetailPattern.test(pathname),
  },
  {
    label: 'Customer Detail',
    description: 'Profile, loyalty, service notes, and order history.',
    icon: Users,
    to: '/customers/',
    group: 'Operations',
    permission: 'customer.read',
    match: (pathname) => customerDetailPattern.test(pathname),
  },
  {
    label: 'Stock Movements',
    description: 'Adjustments, transfers, reservations, and audit trail.',
    icon: Boxes,
    to: ROUTES.MAIN.INVENTORY_MOVEMENTS,
    group: 'Operations',
    permission: 'inventory.read',
  },
];

/**
 * Resolves route metadata for shell headings and route-level permission checks.
 * Dynamic routes use explicit matchers so nested actions are classified correctly.
 */
export function getRouteMeta(pathname: string): NavigationItem | undefined {
  return routeMatchers.find(
    (item) => item.to === pathname || item.match?.(pathname),
  );
}

/**
 * Empty permissions mean legacy/mock persisted sessions can still render, while
 * explicit permission arrays are enforced for production-shaped user payloads.
 */
export function canUsePermission(
  permissions: readonly string[],
  permission?: string,
): boolean {
  if (!permission || permissions.length === 0) return true;
  return permissions.includes(permission) || permissions.includes('*');
}

export function filterNavigationGroupsByPermissions(
  permissions: readonly string[],
) {
  return navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        canUsePermission(permissions, item.permission),
      ),
    }))
    .filter((group) => group.items.length > 0);
}

export function searchNavigationItems(
  query: string,
  permissions: readonly string[],
) {
  const normalizedQuery = query.trim().toLowerCase();
  const permittedItems = navigationItems.filter((item) =>
    canUsePermission(permissions, item.permission),
  );

  if (!normalizedQuery) {
    return permittedItems;
  }

  return permittedItems.filter((item) => {
    const haystack =
      `${item.label} ${item.description} ${item.group} ${item.permission}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
