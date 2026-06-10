import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, CreditCard, PackageCheck, Truck } from 'lucide-react';
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
import { PageState } from '@/components/shared/app-page-state';
import { ROUTES } from '@/constants/routes';
import {
  formatCurrency,
  fulfillmentStatusVariant,
  orders,
  paymentStatusVariant,
} from '@/shared/demo/store-data';

export const OrderDetailPage = () => {
  const params = useParams({ strict: false }) as { orderId?: string };
  const order = orders.find((item) => item.id === params.orderId);

  if (!order) {
    return (
      <PageShell
        title='Order not found'
        description='The requested order is not available.'
      >
        <PageState
          variant='empty'
          title='Order not found'
          description='Check the order ID or return to the order list.'
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`#${order.id}`}
      description={`${order.customer} / ${order.items} items / ${order.placedAt}`}
      actions={
        <Button
          asChild
          variant='outline'
        >
          <Link to={ROUTES.MAIN.ORDERS}>
            <ArrowLeft />
            Orders
          </Link>
        </Button>
      }
    >
      <section className='grid gap-4 lg:grid-cols-3'>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>{order.email}</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center justify-between'>
            <Badge variant={paymentStatusVariant[order.payment]}>
              {order.payment}
            </Badge>
            <span className='text-2xl font-semibold'>
              {formatCurrency(order.total)}
            </span>
          </CardContent>
        </Card>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>Fulfillment</CardTitle>
            <CardDescription>Warehouse execution state.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={fulfillmentStatusVariant[order.fulfillment]}>
              {order.fulfillment}
            </Badge>
          </CardContent>
        </Card>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>Priority</CardTitle>
            <CardDescription>Service and SLA handling.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={order.priority === 'High' ? 'danger' : 'outline'}>
              {order.priority}
            </Badge>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-3 md:grid-cols-3'>
        {[
          ['Fraud review', order.priority === 'High' ? 'Required' : 'Clear'],
          ['Packing SLA', order.fulfillment === 'Delayed' ? 'Missed' : 'On track'],
          ['Customer contact', order.payment === 'Failed' ? 'Needed' : 'Optional'],
        ].map(([label, value]) => (
          <div
            key={label}
            className='flex items-center justify-between rounded-md border bg-background p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
          >
            <span className='text-sm text-muted-foreground'>{label}</span>
            <Badge
              variant={
                value === 'Required' || value === 'Missed' || value === 'Needed'
                  ? 'warning'
                  : 'success'
              }
            >
              {value}
            </Badge>
          </div>
        ))}
      </section>

      <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>
            Payment, packing, handoff, and carrier events.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3 md:grid-cols-3'>
          {[
            {
              icon: CreditCard,
              title: 'Payment authorized',
              detail: `${order.payment} / ${formatCurrency(order.total)}`,
            },
            {
              icon: PackageCheck,
              title: 'Warehouse queue',
              detail: order.fulfillment,
            },
            {
              icon: Truck,
              title: 'Carrier handoff',
              detail:
                order.fulfillment === 'Shipped'
                  ? 'Tracking available'
                  : 'Waiting for shipment',
            },
          ].map((event) => (
            <div
              key={event.title}
              className='rounded-md border p-4 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
            >
              <event.icon className='mb-4 h-5 w-5 text-muted-foreground' />
              <p className='font-medium'>{event.title}</p>
              <p className='text-sm text-muted-foreground'>{event.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
};
