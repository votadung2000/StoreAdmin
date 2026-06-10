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
import { ROUTES } from '@/constants/routes';
import {
  formatCurrency,
  formatNumber,
  productStatusVariant,
  products,
} from '@/shared/demo/store-data';

export const ProductDetailPage = () => {
  const params = useParams({ strict: false }) as { productId?: string };
  const product = products.find((item) => item.id === params.productId);

  if (!product) {
    return (
      <PageShell
        title='Product not found'
        description='The requested product is not available.'
      >
        <PageState
          variant='empty'
          title='Product not found'
          description='Check the product ID or return to the product list.'
        />
      </PageShell>
    );
  }

  const availableStock = product.stock - product.reserved;
  const availablePercent = Math.max(
    0,
    Math.min(100, Math.round((availableStock / Math.max(product.stock, 1)) * 100)),
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
              Products
            </Link>
          </Button>
          <Button asChild>
            <Link
              to={ROUTES.MAIN.PRODUCT_EDIT}
              params={{ productId: product.id }}
            >
              <Pencil />
              Edit
            </Link>
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 lg:grid-cols-[1fr_0.9fr]'>
        <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>Catalog Summary</CardTitle>
              <CardDescription>
                Product identity, publishing state, and merchandising context.
              </CardDescription>
            </div>
            <Badge variant={productStatusVariant[product.status]}>
              {product.status}
            </Badge>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>Price</p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>Available stock</p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatNumber(availableStock)}
              </p>
              <div className='mt-3 h-2 overflow-hidden rounded-full bg-muted'>
                <div
                  className='h-full rounded-full bg-primary transition-[width] duration-500'
                  style={{ width: `${availablePercent}%` }}
                />
              </div>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>Audience</p>
              <p className='mt-1 font-medium'>{product.audience}</p>
            </div>
            <div className='rounded-md border p-3 transition-colors hover:bg-accent/40'>
              <p className='text-sm text-muted-foreground'>Last update</p>
              <p className='mt-1 font-medium'>{product.updatedAt}</p>
            </div>
          </CardContent>
        </Card>

        <Card className='transition-[box-shadow,border-color] duration-200 hover:border-primary/25 hover:shadow-md'>
          <CardHeader>
            <CardTitle>Inventory Ledger</CardTitle>
            <CardDescription>
              Available stock follows on-hand minus reserved units.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {[
              ['On hand', product.stock],
              ['Reserved', product.reserved],
              ['Available', product.stock - product.reserved],
            ].map(([label, value]) => (
              <div
                key={label}
                className='flex items-center justify-between rounded-md border px-3 py-2 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40'
              >
                <span className='text-sm text-muted-foreground'>{label}</span>
                <span className='font-semibold'>{formatNumber(Number(value))}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-3'>
        {['SEO metadata', 'Variant rules', 'Audit readiness'].map((title) => (
          <Card
            key={title}
            className='transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {title === 'SEO metadata'
                  ? 'Title, slug, description, and search preview are ready for validation.'
                  : title === 'Variant rules'
                    ? 'SKU uniqueness, attributes, and price constraints are enforced in form state.'
                    : 'Archive, publish, and price changes require explicit operator action.'}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </PageShell>
  );
};
