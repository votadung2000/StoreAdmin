import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Minus,
  PackageCheck,
  RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageShell } from '@/components/shared/app-page-shell';
import { getValueTranslationKey } from '@/constants/translation';
import { useTranslation } from 'react-i18next';
import {
  dashboardMetrics,
  orderStageSummary,
  products,
  recentActivities,
  revenueTrend,
} from '@/shared/demo/store-data';

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
};

const trendClassName = {
  up: 'text-emerald-600',
  down: 'text-red-600',
  flat: 'text-muted-foreground',
};

const metricCopyKeys: Record<
  string,
  {
    label: string;
    comparison: string;
  }
> = {
  'Revenue today': {
    label: 'dashboard.metric.revenueToday.label',
    comparison: 'dashboard.metric.revenueToday.comparison',
  },
  'Orders today': {
    label: 'dashboard.metric.ordersToday.label',
    comparison: 'dashboard.metric.ordersToday.comparison',
  },
  'Pending orders': {
    label: 'dashboard.metric.pendingOrders.label',
    comparison: 'dashboard.metric.pendingOrders.comparison',
  },
  'Low-stock SKUs': {
    label: 'dashboard.metric.lowStockSkus.label',
    comparison: 'dashboard.metric.lowStockSkus.comparison',
  },
};

const orderStageLabelKeys = {
  Paid: 'status.payment.paid',
  Packing: 'dashboard.orderFlow.packing',
  Delayed: 'status.fulfillment.delayed',
  Refunds: 'dashboard.orderFlow.refunds',
} as const satisfies Record<string, string>;

const recentActivityCopyKeys: Record<
  string,
  {
    title: string;
    detail: string;
  }
> = {
  'Bulk price update completed': {
    title: 'dashboard.recentActivity.bulkPrice.title',
    detail: 'dashboard.recentActivity.bulkPrice.detail',
  },
  'Low-stock threshold reached': {
    title: 'dashboard.recentActivity.lowStock.title',
    detail: 'dashboard.recentActivity.lowStock.detail',
  },
  'Refund request opened': {
    title: 'dashboard.recentActivity.refund.title',
    detail: 'dashboard.recentActivity.refund.detail',
  },
  'Promotion published': {
    title: 'dashboard.recentActivity.promotion.title',
    detail: 'dashboard.recentActivity.promotion.detail',
  },
};

export const DashboardPage = () => {
  const { t } = useTranslation();
  const maxRevenue = Math.max(...revenueTrend.map((item) => item.value));
  const lowStockProducts = products
    .filter((product) => product.status === 'Low stock' || product.stock < 12)
    .slice(0, 3);

  const focusItems = [
    {
      title: t('dashboard.focus.packOrders.title'),
      detail: t('dashboard.focus.packOrders.detail'),
      badge: t('dashboard.focus.packOrders.badge'),
      variant: 'info' as const,
    },
    {
      title: t('dashboard.focus.reviewStock.title'),
      detail: t('dashboard.focus.reviewStock.detail'),
      badge: t('dashboard.focus.reviewStock.badge'),
      variant: 'danger' as const,
    },
    {
      title: t('dashboard.focus.approveRefunds.title'),
      detail: t('dashboard.focus.approveRefunds.detail'),
      badge: t('dashboard.focus.approveRefunds.badge'),
      variant: 'warning' as const,
    },
  ];

  return (
    <PageShell
      title={t('dashboard.title')}
      description={t('dashboard.description')}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <select
            disabled
            className='h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring'
            aria-label={t('dashboard.dateRange.ariaLabel')}
            defaultValue='today'
          >
            <option value='today'>{t('dashboard.dateRange.today')}</option>
            <option value='7d'>{t('dashboard.dateRange.7d')}</option>
            <option value='30d'>{t('dashboard.dateRange.30d')}</option>
          </select>
          <Button
            variant='outline'
            disabled
          >
            <RefreshCw />
            {t('actions.refresh')}
          </Button>
          <Button disabled>
            <Download />
            {t('actions.export')}
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {dashboardMetrics.map((metric) => {
          const TrendIcon = trendIcon[metric.trend];

          return (
            <Card
              key={metric.label}
              className='p-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md'
            >
              <div className='flex items-start justify-between gap-3'>
                <p className='text-sm font-medium text-muted-foreground'>
                  {t(metricCopyKeys[metric.label].label)}
                </p>
                <TrendIcon
                  className={`h-4 w-4 ${trendClassName[metric.trend]}`}
                />
              </div>
              <p className='mt-3 text-3xl font-semibold'>{metric.value}</p>
              <p className='mt-1 text-xs text-muted-foreground'>
                {t(metricCopyKeys[metric.label].comparison)}
              </p>
            </Card>
          );
        })}
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        {focusItems.map((item) => (
          <Card
            key={item.title}
            className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'
          >
            <CardHeader className='flex-row items-start justify-between gap-4'>
              <div>
                <CardTitle className='text-base'>{item.title}</CardTitle>
                <CardDescription>{item.detail}</CardDescription>
              </div>
              <Badge variant={item.variant}>{item.badge}</Badge>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.45fr_0.9fr]'>
        <Card>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>{t('dashboard.revenueTrend.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.revenueTrend.description')}
              </CardDescription>
            </div>
            <Badge variant='info'>UTC+07</Badge>
          </CardHeader>
          <CardContent>
            <div className='flex h-72 items-end gap-3 rounded-md bg-muted/40 p-4'>
              {revenueTrend.map((item) => {
                const height = Math.round((item.value / maxRevenue) * 100);

                return (
                  <div
                    key={item.label}
                    className='flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2'
                  >
                    <div
                      className='w-full rounded-md bg-primary/85 transition-[height,background-color] duration-300 hover:bg-primary'
                      style={{ height: `${height}%` }}
                    />
                    <span className='text-xs text-muted-foreground'>
                      {item.label}
                    </span>
                    <span className='text-xs font-medium'>
                      ${item.value}K
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.orderFlow.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.orderFlow.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {orderStageSummary.map((stage) => (
              <div
                key={stage.label}
                className='flex items-center justify-between gap-3 rounded-md border p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
              >
                <div className='min-w-0'>
                  <p className='font-medium'>
                    {t(orderStageLabelKeys[stage.label])}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {t('dashboard.orderFlow.orders', {
                      count: String(stage.value),
                    })}
                  </p>
                </div>
                <Badge variant={stage.variant}>
                  {t(orderStageLabelKeys[stage.label])}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[1fr_1fr]'>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.recentActivity.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {recentActivities.map((activity) => (
              <div
                key={`${activity.title}-${activity.time}`}
                className='flex gap-3 rounded-md p-2 transition-colors hover:bg-accent/40'
              >
                <div className='mt-1 h-2.5 w-2.5 rounded-full bg-primary' />
                <div className='min-w-0 flex-1 border-b pb-4 last:border-b-0 last:pb-0'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <p className='font-medium'>
                      {t(recentActivityCopyKeys[activity.title].title)}
                    </p>
                    <span className='text-xs text-muted-foreground'>
                      {(() => {
                        const key = getValueTranslationKey(activity.time);
                        return key ? t(key) : activity.time;
                      })()}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {t(recentActivityCopyKeys[activity.title].detail)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>{t('dashboard.inventoryAlerts.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.inventoryAlerts.description')}
              </CardDescription>
            </div>
            <PackageCheck className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='space-y-3'>
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className='grid gap-3 rounded-md border p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm md:grid-cols-[1fr_auto]'
              >
                <div className='min-w-0'>
                  <p className='truncate font-medium'>{product.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {product.sku} / {product.category}
                  </p>
                </div>
                <div className='text-left md:text-right'>
                  <p className='font-semibold'>
                    {t('dashboard.inventoryAlerts.onHand', {
                      count: String(product.stock),
                    })}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {t('dashboard.inventoryAlerts.reserved', {
                      count: String(product.reserved),
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
};
