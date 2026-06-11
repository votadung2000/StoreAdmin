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

export const navigationGroupTranslationKeys: Record<
  NavigationGroupLabel,
  string
> = {
  Commerce: 'nav.group.commerce',
  Operations: 'nav.group.operations',
  System: 'nav.group.system',
};

export type NavigationItem = {
  label: string;
  labelKey: string;
  description: string;
  descriptionKey: string;
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
    labelKey: 'nav.dashboard.label',
    description: 'Sales, fulfillment, inventory, and customer overview.',
    descriptionKey: 'nav.dashboard.description',
    icon: LayoutDashboard,
    to: ROUTES.MAIN.DASHBOARD,
    group: 'Commerce',
    permission: 'dashboard.read',
    end: true,
  },
  {
    label: 'Products',
    labelKey: 'nav.products.label',
    description: 'Catalog, variants, SKU pricing, and publishing status.',
    descriptionKey: 'nav.products.description',
    icon: Package,
    to: ROUTES.MAIN.PRODUCTS,
    group: 'Commerce',
    permission: 'product.read',
  },
  {
    label: 'Categories',
    labelKey: 'nav.categories.label',
    description: 'Category tree, merchandising, storefront visibility, and SEO.',
    descriptionKey: 'nav.categories.description',
    icon: Tag,
    to: ROUTES.MAIN.CATEGORIES,
    group: 'Commerce',
    permission: 'category.read',
  },
  {
    label: 'Orders',
    labelKey: 'nav.orders.label',
    description: 'Payments, packing, fulfillment, and customer communication.',
    descriptionKey: 'nav.orders.description',
    icon: ShoppingCart,
    to: ROUTES.MAIN.ORDERS,
    group: 'Commerce',
    permission: 'order.read',
    badge: '12',
  },
  {
    label: 'Inventory',
    labelKey: 'nav.inventory.label',
    description: 'Availability, reservations, movements, and low-stock risk.',
    descriptionKey: 'nav.inventory.description',
    icon: Boxes,
    to: ROUTES.MAIN.INVENTORY,
    group: 'Operations',
    permission: 'inventory.read',
    badge: '9',
  },
  {
    label: 'Returns',
    labelKey: 'nav.returns.label',
    description: 'Refund requests, exchange approvals, and return intake.',
    descriptionKey: 'nav.returns.description',
    icon: RotateCcw,
    to: ROUTES.MAIN.RETURNS,
    group: 'Operations',
    permission: 'order.refund',
  },
  {
    label: 'Customers',
    labelKey: 'nav.customers.label',
    description: 'Customer profiles, order history, support tags, and segments.',
    descriptionKey: 'nav.customers.description',
    icon: Users,
    to: ROUTES.MAIN.CUSTOMERS,
    group: 'Operations',
    permission: 'customer.read',
  },
  {
    label: 'Promotions',
    labelKey: 'nav.promotions.label',
    description: 'Coupons, campaigns, discount rules, and usage limits.',
    descriptionKey: 'nav.promotions.description',
    icon: Percent,
    to: ROUTES.MAIN.PROMOTIONS,
    group: 'Operations',
    permission: 'promotion.manage',
  },
  {
    label: 'Shipping',
    labelKey: 'nav.shipping.label',
    description: 'Shipping providers, zones, rates, and fulfillment rules.',
    descriptionKey: 'nav.shipping.description',
    icon: Truck,
    to: ROUTES.MAIN.SHIPPING,
    group: 'Operations',
    permission: 'setting.manage',
  },
  {
    label: 'Reports',
    labelKey: 'nav.reports.label',
    description: 'Revenue, product, inventory, order, and customer reporting.',
    descriptionKey: 'nav.reports.description',
    icon: ClipboardList,
    to: ROUTES.MAIN.REPORTS,
    group: 'Operations',
    permission: 'report.view',
  },
  {
    label: 'Staff',
    labelKey: 'nav.staff.label',
    description: 'Team members, invitations, roles, and access status.',
    descriptionKey: 'nav.staff.description',
    icon: ShieldCheck,
    to: ROUTES.MAIN.STAFF,
    group: 'System',
    permission: 'staff.invite',
  },
  {
    label: 'Roles',
    labelKey: 'nav.roles.label',
    description: 'Permission groups, assignment rules, and RBAC coverage.',
    descriptionKey: 'nav.roles.description',
    icon: Archive,
    to: ROUTES.MAIN.ROLES,
    group: 'System',
    permission: 'role.manage',
  },
  {
    label: 'Settings',
    labelKey: 'nav.settings.label',
    description: 'Store profile, payment, tax, localization, and policy defaults.',
    descriptionKey: 'nav.settings.description',
    icon: Settings,
    to: ROUTES.MAIN.SETTINGS,
    group: 'System',
    permission: 'setting.manage',
  },
  {
    label: 'Audit Logs',
    labelKey: 'nav.auditLogs.label',
    description: 'Sensitive changes, user activity, request IDs, and exports.',
    descriptionKey: 'nav.auditLogs.description',
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
  labelKey: navigationGroupTranslationKeys[group],
  items: navigationItems.filter((item) => item.group === group),
}));

const routeMatchers: readonly RouteMeta[] = [
  ...navigationItems,
  {
    label: 'Create Product',
    labelKey: 'route.createProduct.label',
    description: 'Build product identity, pricing, inventory, and SEO.',
    descriptionKey: 'route.createProduct.description',
    icon: Package,
    to: ROUTES.MAIN.PRODUCT_NEW,
    group: 'Commerce',
    permission: 'product.create',
  },
  {
    label: 'Edit Product',
    labelKey: 'route.editProduct.label',
    description: 'Update product identity, pricing, inventory, and SEO.',
    descriptionKey: 'route.editProduct.description',
    icon: Package,
    to: ROUTES.MAIN.PRODUCT_EDIT,
    group: 'Commerce',
    permission: 'product.update',
    match: (pathname) => productEditPattern.test(pathname),
  },
  {
    label: 'Product Detail',
    labelKey: 'route.productDetail.label',
    description: 'SKU, inventory, activity, and publication context.',
    descriptionKey: 'route.productDetail.description',
    icon: Package,
    to: '/products/',
    group: 'Commerce',
    permission: 'product.read',
    match: (pathname) => productDetailPattern.test(pathname),
  },
  {
    label: 'Order Detail',
    labelKey: 'route.orderDetail.label',
    description: 'Payment, fulfillment, timeline, and customer service context.',
    descriptionKey: 'route.orderDetail.description',
    icon: ShoppingCart,
    to: '/orders/',
    group: 'Commerce',
    permission: 'order.read',
    match: (pathname) => orderDetailPattern.test(pathname),
  },
  {
    label: 'Customer Detail',
    labelKey: 'route.customerDetail.label',
    description: 'Profile, loyalty, service notes, and order history.',
    descriptionKey: 'route.customerDetail.description',
    icon: Users,
    to: '/customers/',
    group: 'Operations',
    permission: 'customer.read',
    match: (pathname) => customerDetailPattern.test(pathname),
  },
  {
    label: 'Stock Movements',
    labelKey: 'nav.stockMovements.label',
    description: 'Adjustments, transfers, reservations, and audit trail.',
    descriptionKey: 'nav.stockMovements.description',
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
