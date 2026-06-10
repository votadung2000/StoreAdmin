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
import { ROUTES } from '@/constants/routes';
import {
  formatCurrency,
  fulfillmentStatusVariant,
  orders,
  paymentStatusVariant,
  type Order,
} from '@/shared/demo/store-data';

export const OrdersPage = () => {
  const orderSummary = React.useMemo(
    () => [
      {
        label: 'Paid revenue',
        value: formatCurrency(
          orders
            .filter((order) => order.payment === 'Paid')
            .reduce((total, order) => total + order.total, 0),
        ),
        detail: 'Ready to fulfill',
        variant: 'success' as const,
      },
      {
        label: 'Packing queue',
        value: String(
          orders.filter((order) => order.fulfillment === 'Ready to pack')
            .length,
        ),
        detail: 'Warehouse action',
        variant: 'info' as const,
      },
      {
        label: 'Exceptions',
        value: String(
          orders.filter(
            (order) => order.payment === 'Failed' || order.priority === 'High',
          ).length,
        ),
        detail: 'Needs review',
        variant: 'danger' as const,
      },
      {
        label: 'Pending payment',
        value: String(
          orders.filter((order) => order.payment === 'Pending').length,
        ),
        detail: 'Follow-up list',
        variant: 'warning' as const,
      },
    ],
    [],
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
            aria-label='Select all orders'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={`Select order ${row.original.id}`}
          />
        ),
      },
      {
        accessorKey: 'id',
        header: 'Order',
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
        header: 'Customer',
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
        header: 'Payment',
        cell: ({ row }) => (
          <Badge variant={paymentStatusVariant[row.original.payment]}>
            {row.original.payment}
          </Badge>
        ),
      },
      {
        accessorKey: 'fulfillment',
        header: 'Fulfillment',
        cell: ({ row }) => (
          <Badge variant={fulfillmentStatusVariant[row.original.fulfillment]}>
            {row.original.fulfillment}
          </Badge>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => (
          <Badge variant={row.original.priority === 'High' ? 'danger' : 'outline'}>
            {row.original.priority}
          </Badge>
        ),
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency(row.original.total)}
          </span>
        ),
      },
      {
        accessorKey: 'placedAt',
        header: 'Placed',
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
            aria-label={`View order ${row.original.id}`}
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
    [],
  );

  return (
    <PageShell
      title='Orders'
      description='Track payment health, packing workload, fulfillment status, and support exceptions.'
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button variant='outline'>
            <Printer />
            Print slips
          </Button>
          <Button>
            <Download />
            Export
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
        searchPlaceholder='Search orders, customer, email'
        filters={[
          {
            columnId: 'payment',
            label: 'Payment',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Failed', value: 'Failed' },
              { label: 'Refunded', value: 'Refunded' },
            ],
          },
          {
            columnId: 'fulfillment',
            label: 'Fulfillment',
            options: [
              { label: 'Ready to pack', value: 'Ready to pack' },
              { label: 'Packed', value: 'Packed' },
              { label: 'Shipped', value: 'Shipped' },
              { label: 'Delayed', value: 'Delayed' },
              { label: 'Awaiting payment', value: 'Awaiting payment' },
            ],
          },
        ]}
        emptyTitle='No orders yet'
        emptyDescription='New orders will appear here once checkout is connected.'
        bulkActions={(selectedRows) => (
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
            >
              <PackageCheck />
              Mark packed
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
            >
              Print {selectedRows.length}
            </Button>
          </>
        )}
      />
    </PageShell>
  );
};
