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
import { fulfillmentStatusKey, priorityStatusKey } from '@/constants/order';
import { paymentStatusKey } from '@/constants/payment';
import { ROUTES } from '@/constants/routes';
import { genericStatusKey } from '@/constants/status';
import { getValueTranslationKey } from '@/constants/translation';
import { formatCurrency } from '@/utils/helpers/format-currency.helper';
import { useTranslation } from 'react-i18next';
import {
  fulfillmentStatusVariant,
  orders,
  paymentStatusVariant,
} from '@/shared/demo/store-data';

export const OrderDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams({ strict: false }) as { orderId?: string };
  const order = orders.find((item) => item.id === params.orderId);

  if (!order) {
    return (
      <PageShell
        title={t('orderDetail.notFoundTitle')}
        description={t('orderDetail.notFoundDescription')}
      >
        <PageState
          variant='empty'
          title={t('orderDetail.notFoundTitle')}
          description={t('orderDetail.notFoundState')}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`#${order.id}`}
      description={t('orderDetail.description', {
        customer: order.customer,
        items: order.items,
        placedAt: getValueTranslationKey(order.placedAt)
          ? t(getValueTranslationKey(order.placedAt)!)
          : order.placedAt,
      })}
      actions={
        <Button
          asChild
          variant='outline'
        >
          <Link to={ROUTES.MAIN.ORDERS}>
            <ArrowLeft />
            {t('orders.title')}
          </Link>
        </Button>
      }
    >
      <section className='grid gap-4 lg:grid-cols-3'>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>{t('orderDetail.payment.title')}</CardTitle>
            <CardDescription>{order.email}</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center justify-between'>
            <Badge variant={paymentStatusVariant[order.payment]}>
              {t(paymentStatusKey[order.payment])}
            </Badge>
            <span className='text-2xl font-semibold'>
              {formatCurrency({ value: order.total })}
            </span>
          </CardContent>
        </Card>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>{t('orderDetail.fulfillment.title')}</CardTitle>
            <CardDescription>
              {t('orderDetail.fulfillment.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={fulfillmentStatusVariant[order.fulfillment]}>
              {t(fulfillmentStatusKey[order.fulfillment])}
            </Badge>
          </CardContent>
        </Card>
        <Card className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>{t('orderDetail.priority.title')}</CardTitle>
            <CardDescription>
              {t('orderDetail.priority.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={order.priority === 'High' ? 'danger' : 'outline'}>
              {t(priorityStatusKey[order.priority])}
            </Badge>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-3 md:grid-cols-3'>
        {[
          [
            t('orderDetail.fraudReview'),
            order.priority === 'High' ? 'Required' : 'Clear',
          ],
          [
            t('orderDetail.packingSla'),
            order.fulfillment === 'Delayed' ? 'Missed' : 'On track',
          ],
          [
            t('orderDetail.customerContact'),
            order.payment === 'Failed' ? 'Needed' : 'Optional',
          ],
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
              {t(genericStatusKey[value] ?? 'status.generic.clear')}
            </Badge>
          </div>
        ))}
      </section>

      <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
        <CardHeader>
          <CardTitle>{t('orderDetail.timeline.title')}</CardTitle>
          <CardDescription>
            {t('orderDetail.timeline.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3 md:grid-cols-3'>
          {[
            {
              icon: CreditCard,
              title: t('orderDetail.paymentAuthorized.title'),
              detail: `${t(paymentStatusKey[order.payment])} / ${formatCurrency({ value: order.total })}`,
            },
            {
              icon: PackageCheck,
              title: t('orderDetail.warehouseQueue.title'),
              detail: t(fulfillmentStatusKey[order.fulfillment]),
            },
            {
              icon: Truck,
              title: t('orderDetail.carrierHandoff.title'),
              detail:
                order.fulfillment === 'Shipped'
                  ? t('orderDetail.carrierHandoff.detail.shipped')
                  : t('orderDetail.carrierHandoff.detail.waiting'),
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
