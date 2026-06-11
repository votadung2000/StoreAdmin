import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Pencil } from 'lucide-react';
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
import { audienceKey, productStatusKey } from '@/constants/product';
import { ROUTES } from '@/constants/routes';
import { getValueTranslationKey } from '@/constants/translation';
import { formatCurrency } from '@/utils/helpers/format-currency.helper';
import { useTranslation } from 'react-i18next';
import { productStatusVariant, products } from '@/shared/demo/store-data';

export const ProductDetailPage = () => {
  const { t } = useTranslation();
  const params = useParams({ strict: false }) as { productId?: string };
  const product = products.find((item) => item.id === params.productId);

  if (!product) {
    return (
      <PageShell
        title={t('productDetail.notFoundTitle')}
        description={t('productDetail.notFoundDescription')}
      >
        <PageState
          variant='empty'
          title={t('productDetail.notFoundTitle')}
          description={t('productDetail.notFoundState')}
        />
      </PageShell>
    );
  }

  const availableStock = product.stock - product.reserved;
  const availablePercent = Math.max(
    0,
    Math.min(
      100,
      Math.round((availableStock / Math.max(product.stock, 1)) * 100),
    ),
  );

  return (
    <PageShell
      title={product.name}
      description={`${product.sku} / ${product.category} / ${product.channel}`}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            asChild
            variant='outline'
          >
            <Link to={ROUTES.MAIN.PRODUCTS}>
              <ArrowLeft />
              {t('actions.products')}
            </Link>
          </Button>
          <Button asChild>
            <Link
              to={ROUTES.MAIN.PRODUCT_EDIT}
              params={{ productId: product.id }}
            >
              <Pencil />
              {t('actions.edit')}
            </Link>
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 lg:grid-cols-[1fr_0.9fr]'>
        <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>{t('productDetail.catalogTitle')}</CardTitle>
              <CardDescription>
                {t('productDetail.catalogDescription')}
              </CardDescription>
            </div>
            <Badge variant={productStatusVariant[product.status]}>
              {t(productStatusKey[product.status])}
            </Badge>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>
                {t('field.price')}
              </p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatCurrency({ value: product.price })}
              </p>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>
                {t('productDetail.availableStock')}
              </p>
              <p className='mt-1 text-2xl font-semibold'>
                {String(availableStock)}
              </p>
              <div className='mt-3 h-2 overflow-hidden rounded-full bg-muted'>
                <div
                  className='h-full rounded-full bg-primary transition-[width] duration-500'
                  style={{ width: `${availablePercent}%` }}
                />
              </div>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>
                {t('field.audience')}
              </p>
              <p className='mt-1 font-medium'>
                {t(audienceKey[product.audience] ?? 'status.audience.unisex')}
              </p>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>
                {t('productDetail.lastUpdate')}
              </p>
              <p className='mt-1 font-medium'>
                {(() => {
                  const key = getValueTranslationKey(product.updatedAt);
                  return key ? t(key) : product.updatedAt;
                })()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>{t('productDetail.inventoryTitle')}</CardTitle>
            <CardDescription>
              {t('productDetail.inventoryDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {[
              [t('productDetail.onHand'), product.stock],
              [t('productDetail.reserved'), product.reserved],
              [
                t('productDetail.availableStock'),
                product.stock - product.reserved,
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className='flex items-center justify-between rounded-md border px-3 py-2 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40'
              >
                <span className='text-sm text-muted-foreground'>{label}</span>
                <span className='font-semibold'>{String(value)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        {[
          {
            title: t('productDetail.seoTitle'),
            description: t('productDetail.seoDescription'),
          },
          {
            title: t('productDetail.variantTitle'),
            description: t('productDetail.variantDescription'),
          },
          {
            title: t('productDetail.auditTitle'),
            description: t('productDetail.auditDescription'),
          },
        ].map((item) => (
          <Card
            key={item.title}
            className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </PageShell>
  );
};
