import type { BadgeProps } from '@/components/ui/badge';

export type BadgeVariant = NonNullable<BadgeProps['variant']>;

export type ProductStatus = 'Active' | 'Draft' | 'Low stock' | 'Archived';

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  audience: string;
  status: ProductStatus;
  price: number;
  stock: number;
  reserved: number;
  channel: string;
  updatedAt: string;
};

export const products: Product[] = [
  {
    id: 'prod-1001',
    name: 'Premium Canvas Tote',
    sku: 'BAG-001',
    category: 'Bags',
    audience: 'Women',
    status: 'Active',
    price: 128,
    stock: 42,
    reserved: 6,
    channel: 'Online + Retail',
    updatedAt: '2h ago',
  },
  {
    id: 'prod-1002',
    name: 'Ribbed Knit Jacket',
    sku: 'JKT-214',
    category: 'Outerwear',
    audience: 'Unisex',
    status: 'Low stock',
    price: 189,
    stock: 8,
    reserved: 3,
    channel: 'Online',
    updatedAt: '5h ago',
  },
  {
    id: 'prod-1003',
    name: 'Tailored Wide Trousers',
    sku: 'TRS-078',
    category: 'Bottoms',
    audience: 'Women',
    status: 'Active',
    price: 142,
    stock: 64,
    reserved: 12,
    channel: 'Online + Retail',
    updatedAt: 'Yesterday',
  },
  {
    id: 'prod-1004',
    name: 'Merino Half-Zip',
    sku: 'KNT-332',
    category: 'Knitwear',
    audience: 'Men',
    status: 'Draft',
    price: 164,
    stock: 25,
    reserved: 0,
    channel: 'Admin only',
    updatedAt: 'Yesterday',
  },
  {
    id: 'prod-1005',
    name: 'Structured Crossbody',
    sku: 'BAG-118',
    category: 'Bags',
    audience: 'Women',
    status: 'Active',
    price: 216,
    stock: 31,
    reserved: 4,
    channel: 'Online + Retail',
    updatedAt: '2d ago',
  },
  {
    id: 'prod-1006',
    name: 'Archive Denim Shirt',
    sku: 'SHR-420',
    category: 'Tops',
    audience: 'Unisex',
    status: 'Archived',
    price: 98,
    stock: 0,
    reserved: 0,
    channel: 'Hidden',
    updatedAt: '4d ago',
  },
];

export const productStatusVariant: Record<ProductStatus, BadgeVariant> = {
  Active: 'success',
  Draft: 'secondary',
  'Low stock': 'warning',
  Archived: 'outline',
};

export type OrderPaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';
export type OrderFulfillmentStatus =
  | 'Ready to pack'
  | 'Packed'
  | 'Shipped'
  | 'Delayed'
  | 'Awaiting payment';

export type Order = {
  id: string;
  customer: string;
  email: string;
  payment: OrderPaymentStatus;
  fulfillment: OrderFulfillmentStatus;
  total: number;
  items: number;
  priority: 'Normal' | 'High';
  placedAt: string;
};

export const orders: Order[] = [
  {
    id: 'ST-1048',
    customer: 'Olivia Martin',
    email: 'olivia@example.com',
    payment: 'Paid',
    fulfillment: 'Ready to pack',
    total: 1248,
    items: 4,
    priority: 'High',
    placedAt: '10:42 AM',
  },
  {
    id: 'ST-1047',
    customer: 'Jackson Lee',
    email: 'jackson@example.com',
    payment: 'Paid',
    fulfillment: 'Packed',
    total: 189,
    items: 1,
    priority: 'Normal',
    placedAt: '9:18 AM',
  },
  {
    id: 'ST-1046',
    customer: 'Isabella Nguyen',
    email: 'isabella@example.com',
    payment: 'Pending',
    fulfillment: 'Awaiting payment',
    total: 699,
    items: 2,
    priority: 'Normal',
    placedAt: 'Yesterday',
  },
  {
    id: 'ST-1045',
    customer: 'William Kim',
    email: 'william@example.com',
    payment: 'Paid',
    fulfillment: 'Shipped',
    total: 128,
    items: 1,
    priority: 'Normal',
    placedAt: 'Yesterday',
  },
  {
    id: 'ST-1044',
    customer: 'Ava Thompson',
    email: 'ava@example.com',
    payment: 'Failed',
    fulfillment: 'Delayed',
    total: 408,
    items: 3,
    priority: 'High',
    placedAt: '2d ago',
  },
];

export const paymentStatusVariant: Record<OrderPaymentStatus, BadgeVariant> = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'danger',
  Refunded: 'outline',
};

export const fulfillmentStatusVariant: Record<
  OrderFulfillmentStatus,
  BadgeVariant
> = {
  'Ready to pack': 'info',
  Packed: 'secondary',
  Shipped: 'success',
  Delayed: 'danger',
  'Awaiting payment': 'warning',
};

export type CategoryStatus = 'Visible' | 'Hidden' | 'Draft';

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  status: CategoryStatus;
  products: number;
  revenue: number;
  sortOrder: number;
  storefront: boolean;
  seoScore: number;
};

export const categories: Category[] = [
  {
    id: 'cat-bags',
    name: 'Bags',
    slug: 'bags',
    status: 'Visible',
    products: 38,
    revenue: 18420,
    sortOrder: 1,
    storefront: true,
    seoScore: 92,
  },
  {
    id: 'cat-crossbody',
    name: 'Crossbody',
    slug: 'crossbody',
    parent: 'Bags',
    status: 'Visible',
    products: 11,
    revenue: 7260,
    sortOrder: 2,
    storefront: true,
    seoScore: 86,
  },
  {
    id: 'cat-outerwear',
    name: 'Outerwear',
    slug: 'outerwear',
    status: 'Visible',
    products: 24,
    revenue: 44900,
    sortOrder: 3,
    storefront: true,
    seoScore: 88,
  },
  {
    id: 'cat-knitwear',
    name: 'Knitwear',
    slug: 'knitwear',
    status: 'Draft',
    products: 16,
    revenue: 12880,
    sortOrder: 4,
    storefront: false,
    seoScore: 73,
  },
  {
    id: 'cat-archive',
    name: 'Archive',
    slug: 'archive',
    status: 'Hidden',
    products: 52,
    revenue: 27540,
    sortOrder: 8,
    storefront: false,
    seoScore: 68,
  },
];

export const categoryStatusVariant: Record<CategoryStatus, BadgeVariant> = {
  Visible: 'success',
  Hidden: 'outline',
  Draft: 'secondary',
};

export type DashboardMetric = {
  label: string;
  value: string;
  comparison: string;
  trend: 'up' | 'down' | 'flat';
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'Revenue today',
    value: '$28.4K',
    comparison: '+18.2% vs yesterday',
    trend: 'up',
  },
  {
    label: 'Orders today',
    value: '384',
    comparison: '+11.7% vs last Wednesday',
    trend: 'up',
  },
  {
    label: 'Pending orders',
    value: '42',
    comparison: '12 past SLA',
    trend: 'down',
  },
  {
    label: 'Low-stock SKUs',
    value: '37',
    comparison: '9 need reorder today',
    trend: 'flat',
  },
];

export const revenueTrend = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 55 },
  { label: 'Wed', value: 48 },
  { label: 'Thu', value: 64 },
  { label: 'Fri', value: 78 },
  { label: 'Sat', value: 91 },
  { label: 'Sun', value: 84 },
];

export const orderStageSummary = [
  { label: 'Paid', value: 128, variant: 'success' },
  { label: 'Packing', value: 42, variant: 'info' },
  { label: 'Delayed', value: 12, variant: 'danger' },
  { label: 'Refunds', value: 6, variant: 'warning' },
] as const;

export const recentActivities = [
  {
    title: 'Bulk price update completed',
    detail: '38 SKUs updated by Store Owner',
    time: '12 min ago',
  },
  {
    title: 'Low-stock threshold reached',
    detail: 'Ribbed Knit Jacket has 5 available units',
    time: '36 min ago',
  },
  {
    title: 'Refund request opened',
    detail: 'Order ST-1041 requested store-credit refund',
    time: '1h ago',
  },
  {
    title: 'Promotion published',
    detail: 'Weekend edit campaign is active',
    time: '2h ago',
  },
];

export type ModuleId =
  | 'inventory'
  | 'inventory-movements'
  | 'returns'
  | 'customers'
  | 'promotions'
  | 'shipping'
  | 'reports'
  | 'staff'
  | 'roles'
  | 'settings'
  | 'audit-logs';

export type ModuleRecord = {
  id: string;
  name: string;
  owner: string;
  status: string;
  metric: string;
  updatedAt: string;
};

export type ModuleConfig = {
  title: string;
  description: string;
  primaryAction: string;
  permission: string;
  stats: readonly {
    label: string;
    value: string;
    detail: string;
    variant: BadgeVariant;
  }[];
  records: ModuleRecord[];
};

export const moduleConfigs: Record<ModuleId, ModuleConfig> = {
  inventory: {
    title: 'Inventory',
    description: 'Availability, reservations, warehouse risk, and replenishment.',
    primaryAction: 'Adjust stock',
    permission: 'inventory.adjust',
    stats: [
      {
        label: 'Available units',
        value: '12,840',
        detail: 'Across 3 warehouses',
        variant: 'info',
      },
      {
        label: 'Reserved',
        value: '842',
        detail: 'Held by open orders',
        variant: 'warning',
      },
      {
        label: 'Low stock',
        value: '37',
        detail: '9 critical today',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'INV-001',
        name: 'Premium Canvas Tote',
        owner: 'Main Warehouse',
        status: 'Low stock',
        metric: '36 available',
        updatedAt: '18 min ago',
      },
      {
        id: 'INV-002',
        name: 'Tailored Wide Trousers',
        owner: 'Retail Floor',
        status: 'Healthy',
        metric: '52 available',
        updatedAt: '1h ago',
      },
    ],
  },
  'inventory-movements': {
    title: 'Stock Movements',
    description: 'Stock in, stock out, transfers, reservations, and audits.',
    primaryAction: 'New movement',
    permission: 'inventory.adjust',
    stats: [
      {
        label: 'Movements today',
        value: '126',
        detail: '42 automated',
        variant: 'info',
      },
      {
        label: 'Pending review',
        value: '8',
        detail: 'Manual adjustments',
        variant: 'warning',
      },
      {
        label: 'Transfer delays',
        value: '3',
        detail: 'Past target SLA',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'MOV-912',
        name: 'Warehouse transfer',
        owner: 'North Warehouse',
        status: 'In transit',
        metric: '84 units',
        updatedAt: '22 min ago',
      },
      {
        id: 'MOV-911',
        name: 'Reservation release',
        owner: 'Online Store',
        status: 'Posted',
        metric: '12 units',
        updatedAt: '48 min ago',
      },
    ],
  },
  returns: {
    title: 'Returns',
    description: 'Return intake, refund decisions, exchanges, and service notes.',
    primaryAction: 'Create return',
    permission: 'order.refund',
    stats: [
      {
        label: 'Open requests',
        value: '18',
        detail: '6 awaiting item receipt',
        variant: 'warning',
      },
      {
        label: 'Refund value',
        value: '$4.8K',
        detail: 'Last 7 days',
        variant: 'info',
      },
      {
        label: 'Exceptions',
        value: '2',
        detail: 'Manual approval needed',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'RET-221',
        name: 'ST-1042 exchange request',
        owner: 'Customer Support',
        status: 'Review',
        metric: '$164',
        updatedAt: '32 min ago',
      },
      {
        id: 'RET-220',
        name: 'ST-1039 refund',
        owner: 'Accountant',
        status: 'Approved',
        metric: '$98',
        updatedAt: '2h ago',
      },
    ],
  },
  customers: {
    title: 'Customers',
    description: 'Customer profiles, segments, loyalty, and support signals.',
    primaryAction: 'Create segment',
    permission: 'customer.read',
    stats: [
      {
        label: 'Active customers',
        value: '18,920',
        detail: '824 new this month',
        variant: 'success',
      },
      {
        label: 'At-risk VIPs',
        value: '24',
        detail: 'No purchase in 90 days',
        variant: 'warning',
      },
      {
        label: 'Support flags',
        value: '11',
        detail: 'Open service notes',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'CUS-1022',
        name: 'Olivia Martin',
        owner: 'VIP',
        status: 'Active',
        metric: '$8.2K lifetime',
        updatedAt: '10 min ago',
      },
      {
        id: 'CUS-1021',
        name: 'Jackson Lee',
        owner: 'New customer',
        status: 'Active',
        metric: '$189 lifetime',
        updatedAt: '1h ago',
      },
    ],
  },
  promotions: {
    title: 'Promotions',
    description: 'Coupons, merchandising campaigns, and discount governance.',
    primaryAction: 'New promotion',
    permission: 'promotion.manage',
    stats: [
      {
        label: 'Active campaigns',
        value: '7',
        detail: '2 end today',
        variant: 'success',
      },
      {
        label: 'Redemptions',
        value: '1,284',
        detail: '+22% vs last week',
        variant: 'info',
      },
      {
        label: 'Margin alerts',
        value: '3',
        detail: 'Below target margin',
        variant: 'warning',
      },
    ],
    records: [
      {
        id: 'PRM-118',
        name: 'Weekend Edit',
        owner: 'Marketing',
        status: 'Active',
        metric: '18% conversion',
        updatedAt: '25 min ago',
      },
      {
        id: 'PRM-117',
        name: 'VIP Early Access',
        owner: 'Marketing',
        status: 'Scheduled',
        metric: 'Starts Friday',
        updatedAt: '3h ago',
      },
    ],
  },
  shipping: {
    title: 'Shipping',
    description: 'Providers, zones, rates, pickup windows, and delivery rules.',
    primaryAction: 'Add rule',
    permission: 'setting.manage',
    stats: [
      {
        label: 'Active providers',
        value: '4',
        detail: '2 express enabled',
        variant: 'success',
      },
      {
        label: 'Late shipments',
        value: '12',
        detail: 'Past carrier SLA',
        variant: 'danger',
      },
      {
        label: 'Pickup windows',
        value: '6',
        detail: 'Today',
        variant: 'info',
      },
    ],
    records: [
      {
        id: 'SHP-301',
        name: 'Domestic express',
        owner: 'DHL',
        status: 'Active',
        metric: '1-2 days',
        updatedAt: '1h ago',
      },
      {
        id: 'SHP-300',
        name: 'Metro same day',
        owner: 'Local Fleet',
        status: 'Limited',
        metric: '4 zones',
        updatedAt: '2h ago',
      },
    ],
  },
  reports: {
    title: 'Reports',
    description: 'Revenue, catalog, order, customer, and inventory reporting.',
    primaryAction: 'Export report',
    permission: 'report.view',
    stats: [
      {
        label: 'Scheduled exports',
        value: '12',
        detail: '3 due today',
        variant: 'info',
      },
      {
        label: 'Revenue variance',
        value: '+14%',
        detail: 'Month to date',
        variant: 'success',
      },
      {
        label: 'Failed exports',
        value: '1',
        detail: 'Retry available',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'RPT-088',
        name: 'Daily revenue summary',
        owner: 'Finance',
        status: 'Ready',
        metric: 'CSV + XLSX',
        updatedAt: '7 min ago',
      },
      {
        id: 'RPT-087',
        name: 'Low-stock forecast',
        owner: 'Operations',
        status: 'Scheduled',
        metric: 'Tomorrow 8 AM',
        updatedAt: '2h ago',
      },
    ],
  },
  staff: {
    title: 'Staff',
    description: 'Team access, invitations, role assignments, and account status.',
    primaryAction: 'Invite staff',
    permission: 'staff.invite',
    stats: [
      {
        label: 'Active staff',
        value: '28',
        detail: '6 roles assigned',
        variant: 'success',
      },
      {
        label: 'Pending invites',
        value: '4',
        detail: '2 expire today',
        variant: 'warning',
      },
      {
        label: 'Access reviews',
        value: '3',
        detail: 'Due this week',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'STF-009',
        name: 'Mina Park',
        owner: 'Store Manager',
        status: 'Active',
        metric: '4 permissions',
        updatedAt: '22 min ago',
      },
      {
        id: 'STF-008',
        name: 'Noah Carter',
        owner: 'Warehouse Staff',
        status: 'Invited',
        metric: 'Pending',
        updatedAt: '5h ago',
      },
    ],
  },
  roles: {
    title: 'Roles',
    description: 'Permission bundles, assignment coverage, and RBAC governance.',
    primaryAction: 'Create role',
    permission: 'role.manage',
    stats: [
      {
        label: 'Roles',
        value: '7',
        detail: 'Default policy set',
        variant: 'info',
      },
      {
        label: 'Unreviewed grants',
        value: '5',
        detail: 'Owner review needed',
        variant: 'warning',
      },
      {
        label: 'Sensitive changes',
        value: '14',
        detail: 'This month',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'ROL-001',
        name: 'Store Manager',
        owner: 'Operations',
        status: 'Active',
        metric: '18 permissions',
        updatedAt: '1h ago',
      },
      {
        id: 'ROL-002',
        name: 'Accountant',
        owner: 'Finance',
        status: 'Active',
        metric: '9 permissions',
        updatedAt: '3h ago',
      },
    ],
  },
  settings: {
    title: 'Settings',
    description: 'Store profile, localization, tax, payment, and policy defaults.',
    primaryAction: 'Save changes',
    permission: 'setting.manage',
    stats: [
      {
        label: 'Profile completion',
        value: '92%',
        detail: '1 policy missing',
        variant: 'warning',
      },
      {
        label: 'Payment methods',
        value: '5',
        detail: '3 live',
        variant: 'success',
      },
      {
        label: 'Tax regions',
        value: '12',
        detail: 'Auto-sync enabled',
        variant: 'info',
      },
    ],
    records: [
      {
        id: 'SET-001',
        name: 'Checkout policy',
        owner: 'Store Owner',
        status: 'Needs review',
        metric: 'Updated draft',
        updatedAt: '45 min ago',
      },
      {
        id: 'SET-002',
        name: 'Tax profile',
        owner: 'Accountant',
        status: 'Active',
        metric: '12 regions',
        updatedAt: '1d ago',
      },
    ],
  },
  'audit-logs': {
    title: 'Audit Logs',
    description: 'Sensitive activity, request IDs, actor context, and exports.',
    primaryAction: 'Export logs',
    permission: 'audit.read',
    stats: [
      {
        label: 'Events today',
        value: '482',
        detail: '28 sensitive',
        variant: 'info',
      },
      {
        label: 'Failed actions',
        value: '7',
        detail: 'Mostly permission denials',
        variant: 'warning',
      },
      {
        label: 'Critical events',
        value: '2',
        detail: 'Role changes',
        variant: 'danger',
      },
    ],
    records: [
      {
        id: 'AUD-901',
        name: 'Role permission changed',
        owner: 'Store Owner',
        status: 'Critical',
        metric: 'request_2f18',
        updatedAt: '14 min ago',
      },
      {
        id: 'AUD-900',
        name: 'Product archived',
        owner: 'Store Manager',
        status: 'Info',
        metric: 'request_2f11',
        updatedAt: '42 min ago',
      },
    ],
  },
};

export function getStatusVariant(status: string): BadgeVariant {
  const normalized = status.toLowerCase();

  if (
    normalized.includes('active') ||
    normalized.includes('healthy') ||
    normalized.includes('ready') ||
    normalized.includes('posted') ||
    normalized.includes('approved')
  ) {
    return 'success';
  }

  if (
    normalized.includes('low') ||
    normalized.includes('pending') ||
    normalized.includes('review') ||
    normalized.includes('scheduled') ||
    normalized.includes('limited') ||
    normalized.includes('needs')
  ) {
    return 'warning';
  }

  if (
    normalized.includes('critical') ||
    normalized.includes('failed') ||
    normalized.includes('delay') ||
    normalized.includes('exception')
  ) {
    return 'danger';
  }

  return 'secondary';
}
