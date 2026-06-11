import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Download, Eye, PackageCheck, Printer } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { PageShell } from '@/components/shared/app-page-shell';
import { ProductionDataTable } from '@/components/shared/app-data-table';
import { fulfillmentStatusKey, priorityStatusKey } from '@/constants/order';
import { paymentStatusKey } from '@/constants/payment';
import { ROUTES } from '@/constants/routes';
import { getValueTranslationKey } from '@/constants/translation';
import { formatCurrency } from '@/utils/helpers/format-currency.helper';
import { useTranslation } from 'react-i18next';
import {
  fulfillmentStatusVariant,
  orders,
  paymentStatusVariant,
  type Order,
} from '@/shared/demo/store-data';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const orderSummary = React.useMemo(
    () => [
      {
        label: t('orders.summary.paidRevenue.label'),
        value: formatCurrency({
          value: orders
            .filter((order) => order.payment === 'Paid')
            .reduce((total, order) => total + order.total, 0),
        }),
        detail: t('orders.summary.paidRevenue.detail'),
        variant: 'success' as const,
      },
      {
        label: t('orders.summary.packingQueue.label'),
        value: String(
          orders.filter((order) => order.fulfillment === 'Ready to pack')
            .length,
        ),
        detail: t('orders.summary.packingQueue.detail'),
        variant: 'info' as const,
      },
      {
        label: t('orders.summary.exceptions.label'),
        value: String(
          orders.filter(
            (order) => order.payment === 'Failed' || order.priority === 'High',
          ).length,
        ),
        detail: t('orders.summary.exceptions.detail'),
        variant: 'danger' as const,
      },
      {
        label: t('orders.summary.pendingPayment.label'),
        value: String(
          orders.filter((order) => order.payment === 'Pending').length,
        ),
        detail: t('orders.summary.pendingPayment.detail'),
        variant: 'warning' as const,
      },
    ],
    [t],
  );

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: 'select',
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label={t('orders.selectAll')}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={t('orders.selectOrder', { id: row.original.id })}
          />
        ),
      },
      {
        accessorKey: 'id',
        header: t('orders.table.order'),
        cell: ({ row }) => (
          <Link
            to={ROUTES.MAIN.ORDER_DETAIL}
            params={{ orderId: row.original.id }}
            className='font-medium transition-colors hover:text-primary/70'
          >
            #{row.original.id}
          </Link>
        ),
      },
      {
        accessorKey: 'customer',
        header: t('orders.table.customer'),
        cell: ({ row }) => (
          <div className='min-w-48'>
            <p className='font-medium'>{row.original.customer}</p>
            <p className='text-sm text-muted-foreground'>
              {row.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'payment',
        header: t('orders.table.payment'),
        cell: ({ row }) => (
          <Badge variant={paymentStatusVariant[row.original.payment]}>
            {t(paymentStatusKey[row.original.payment])}
          </Badge>
        ),
      },
      {
        accessorKey: 'fulfillment',
        header: t('orders.table.fulfillment'),
        cell: ({ row }) => (
          <Badge variant={fulfillmentStatusVariant[row.original.fulfillment]}>
            {t(fulfillmentStatusKey[row.original.fulfillment])}
          </Badge>
        ),
      },
      {
        accessorKey: 'priority',
        header: t('orders.table.priority'),
        cell: ({ row }) => (
          <Badge
            variant={row.original.priority === 'High' ? 'danger' : 'outline'}
          >
            {t(priorityStatusKey[row.original.priority])}
          </Badge>
        ),
      },
      {
        accessorKey: 'total',
        header: t('orders.table.total'),
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency({ value: row.original.total })}
          </span>
        ),
      },
      {
        accessorKey: 'placedAt',
        header: t('orders.table.placed'),
        cell: ({ row }) => {
          const key = getValueTranslationKey(row.original.placedAt);
          return key ? t(key) : row.original.placedAt;
        },
      },
      {
        id: 'actions',
        enableSorting: false,
        header: '',
        cell: ({ row }) => (
          <Button
            asChild
            variant='ghost'
            size='icon'
            aria-label={t('orders.viewOrder', { id: row.original.id })}
          >
            <Link
              to={ROUTES.MAIN.ORDER_DETAIL}
              params={{ orderId: row.original.id }}
            >
              <Eye />
            </Link>
          </Button>
        ),
      },
    ],
    [t],
  );

  return (
    <PageShell
      title={t('orders.title')}
      description={t('orders.description')}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            variant='outline'
            disabled
          >
            <Printer />
            {t('actions.printSlips')}
          </Button>
          <Button disabled>
            <Download />
            {t('actions.export')}
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {orderSummary.map((item) => (
          <Card
            key={item.label}
            className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'
          >
            <CardHeader className='p-4'>
              <div className='flex items-start justify-between gap-3'>
                <CardDescription>{item.label}</CardDescription>
                <Badge variant={item.variant}>{item.detail}</Badge>
              </div>
              <CardTitle className='text-2xl'>{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <ProductionDataTable
        data={orders}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder={t('orders.searchPlaceholder')}
        filters={[
          {
            columnId: 'payment',
            label: t('orders.table.payment'),
            options: [
              { label: t('status.payment.paid'), value: 'Paid' },
              { label: t('status.payment.pending'), value: 'Pending' },
              { label: t('status.payment.failed'), value: 'Failed' },
              { label: t('status.payment.refunded'), value: 'Refunded' },
            ],
          },
          {
            columnId: 'fulfillment',
            label: t('orders.table.fulfillment'),
            options: [
              {
                label: t('status.fulfillment.readyToPack'),
                value: 'Ready to pack',
              },
              { label: t('status.fulfillment.packed'), value: 'Packed' },
              { label: t('status.fulfillment.shipped'), value: 'Shipped' },
              { label: t('status.fulfillment.delayed'), value: 'Delayed' },
              {
                label: t('status.fulfillment.awaitingPayment'),
                value: 'Awaiting payment',
              },
            ],
          },
        ]}
        emptyTitle={t('orders.emptyTitle')}
        emptyDescription={t('orders.emptyDescription')}
        bulkActions={(selectedRows) => (
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
              disabled
            >
              <PackageCheck />
              {t('actions.markPacked')}
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
              disabled
            >
              {t('orders.bulk.print', { count: selectedRows.length })}
            </Button>
          </>
        )}
      />
    </PageShell>
  );
};
