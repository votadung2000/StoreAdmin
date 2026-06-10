import {
  AlertTriangle,
  DollarSign,
  Download,
  PackageCheck,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/shared/app-page-shell';

const stats = [
  {
    label: 'Gross Revenue',
    value: '$128,430',
    change: '+18.2% from last month',
    icon: DollarSign,
  },
  {
    label: 'Orders',
    value: '2,384',
    change: '+11.7% from last month',
    icon: ShoppingCart,
  },
  {
    label: 'Customers',
    value: '18,920',
    change: '+824 new this month',
    icon: Users,
  },
  {
    label: 'Low Stock',
    value: '37 SKUs',
    change: '9 need reorder today',
    icon: AlertTriangle,
  },
];

const recentOrders = [
  {
    id: '#ST-1048',
    customer: 'Olivia Martin',
    item: 'Premium Tote',
    status: 'Paid',
    total: '$1,248.00',
  },
  {
    id: '#ST-1047',
    customer: 'Jackson Lee',
    item: 'Gift Bundle',
    status: 'Packed',
    total: '$189.00',
  },
  {
    id: '#ST-1046',
    customer: 'Isabella Nguyen',
    item: 'Studio Chair',
    status: 'Pending',
    total: '$699.00',
  },
  {
    id: '#ST-1045',
    customer: 'William Kim',
    item: 'Desk Lamp',
    status: 'Shipped',
    total: '$128.00',
  },
];

export const DashboardPage = () => {
  return (
    <PageShell
      title='Store Overview'
      description='Daily sales, fulfillment, and customer health at a glance.'
      actions={
        <Button>
          <Download />
          Export report
        </Button>
      }
    >
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-lg border bg-background p-4 shadow-sm'
          >
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-muted-foreground'>
                {stat.label}
              </p>
              <stat.icon
                size={18}
                className='text-muted-foreground'
              />
            </div>
            <p className='mt-3 text-2xl font-bold'>{stat.value}</p>
            <p className='mt-1 text-xs text-muted-foreground'>{stat.change}</p>
          </div>
        ))}
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.4fr_1fr]'>
        <div className='rounded-lg border bg-background p-4 shadow-sm'>
          <div className='mb-5 flex items-center justify-between'>
            <div>
              <h2 className='font-semibold'>Revenue Trend</h2>
              <p className='text-sm text-muted-foreground'>
                Monthly revenue across online and retail channels.
              </p>
            </div>
            <PackageCheck
              size={18}
              className='text-muted-foreground'
            />
          </div>
          <div className='flex h-64 items-end gap-3'>
            {[38, 44, 51, 58, 54, 66, 72, 79, 86, 91, 96, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className='flex h-full flex-1 flex-col items-center justify-end gap-2'
                >
                  <div
                    className='w-full rounded-t-md bg-primary/85 transition-all hover:bg-primary'
                    style={{ height: `${height}%` }}
                  />
                  <span className='text-xs text-muted-foreground'>
                    {index + 1}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className='rounded-lg border bg-background p-4 shadow-sm'>
          <div className='mb-5'>
            <h2 className='font-semibold'>Recent Orders</h2>
            <p className='text-sm text-muted-foreground'>
              Latest paid and fulfillment-ready orders.
            </p>
          </div>
          <div className='space-y-4'>
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className='flex items-center justify-between gap-3 rounded-md border p-3'
              >
                <div className='min-w-0'>
                  <p className='font-medium'>{order.id}</p>
                  <p className='truncate text-sm text-muted-foreground'>
                    {order.customer} - {order.item}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{order.total}</p>
                  <p className='text-xs text-muted-foreground'>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};
