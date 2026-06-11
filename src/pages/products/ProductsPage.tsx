import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Archive, Download, Eye, FileUp, Pencil, Plus } from 'lucide-react';
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
import { productStatusKey } from '@/constants/product';
import { ROUTES } from '@/constants/routes';
import { getValueTranslationKey } from '@/constants/translation';
import { formatCurrency } from '@/utils/helpers/format-currency.helper';
import { useTranslation } from 'react-i18next';
import {
  productStatusVariant,
  products,
  type Product,
} from '@/shared/demo/store-data';

export const ProductsPage = () => {
  const { t } = useTranslation();
  const catalogSummary = React.useMemo(
    () => [
      {
        label: t('products.summary.published.label'),
        value: String(
          products.filter((product) => product.status === 'Active').length,
        ),
        detail: t('products.summary.published.detail'),
        variant: 'success' as const,
      },
      {
        label: t('products.summary.needsStock.label'),
        value: String(
          products.filter((product) => product.status === 'Low stock').length,
        ),
        detail: t('products.summary.needsStock.detail'),
        variant: 'warning' as const,
      },
      {
        label: t('products.summary.drafts.label'),
        value: String(
          products.filter((product) => product.status === 'Draft').length,
        ),
        detail: t('products.summary.drafts.detail'),
        variant: 'secondary' as const,
      },
      {
        label: t('products.summary.inventoryValue.label'),
        value: formatCurrency({
          value: products.reduce(
            (total, product) => total + product.price * product.stock,
            0,
          ),
        }),
        detail: t('products.summary.inventoryValue.detail'),
        variant: 'info' as const,
      },
    ],
    [t],
  );

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label={t('products.selectAll')}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={t('products.selectProduct', {
              name: row.original.name,
            })}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: t('products.table.product'),
        cell: ({ row }) => (
          <div className='min-w-56'>
            <Link
              to={ROUTES.MAIN.PRODUCT_DETAIL}
              params={{ productId: row.original.id }}
              className='font-medium transition-colors hover:text-primary/70'
            >
              {row.original.name}
            </Link>
            <p className='text-sm text-muted-foreground'>
              {row.original.sku} / {row.original.audience}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: t('field.category'),
      },
      {
        accessorKey: 'status',
        header: t('field.status'),
        cell: ({ row }) => (
          <Badge variant={productStatusVariant[row.original.status]}>
            {t(productStatusKey[row.original.status])}
          </Badge>
        ),
      },
      {
        accessorKey: 'price',
        header: t('products.table.price'),
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency({ value: row.original.price })}
          </span>
        ),
      },
      {
        accessorKey: 'stock',
        header: t('products.table.available'),
        cell: ({ row }) => (
          <div>
            <p className='font-medium'>{String(row.original.stock)}</p>
            <p className='text-xs text-muted-foreground'>
              {t('products.table.reserved', {
                count: String(row.original.reserved),
              })}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'channel',
        header: t('products.table.channel'),
      },
      {
        accessorKey: 'updatedAt',
        header: t('products.table.updated'),
        cell: ({ row }) => {
          const key = getValueTranslationKey(row.original.updatedAt);
          return key ? t(key) : row.original.updatedAt;
        },
      },
      {
        id: 'actions',
        enableSorting: false,
        header: '',
        cell: ({ row }) => (
          <div className='flex justify-end gap-1'>
            <Button
              asChild
              variant='ghost'
              size='icon'
              aria-label={t('products.viewProduct', {
                name: row.original.name,
              })}
            >
              <Link
                to={ROUTES.MAIN.PRODUCT_DETAIL}
                params={{ productId: row.original.id }}
              >
                <Eye />
              </Link>
            </Button>
            <Button
              asChild
              variant='ghost'
              size='icon'
              aria-label={t('products.editProduct', {
                name: row.original.name,
              })}
            >
              <Link
                to={ROUTES.MAIN.PRODUCT_EDIT}
                params={{ productId: row.original.id }}
              >
                <Pencil />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [t],
  );

  return (
    <PageShell
      title={t('products.title')}
      description={t('products.description')}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            variant='outline'
            disabled
          >
            <FileUp />
            {t('actions.import')}
          </Button>
          <Button
            variant='outline'
            disabled
          >
            <Download />
            {t('actions.export')}
          </Button>
          <Button asChild>
            <Link to={ROUTES.MAIN.PRODUCT_NEW}>
              <Plus />
              {t('actions.addProduct')}
            </Link>
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {catalogSummary.map((item) => (
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
        data={products}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder={t('products.searchPlaceholder')}
        filters={[
          {
            columnId: 'status',
            label: t('field.status'),
            options: [
              { label: t('status.product.active'), value: 'Active' },
              { label: t('status.product.draft'), value: 'Draft' },
              { label: t('status.product.lowStock'), value: 'Low stock' },
              { label: t('status.product.archived'), value: 'Archived' },
            ],
          },
          {
            columnId: 'category',
            label: t('field.category'),
            options: Array.from(
              new Set(products.map((item) => item.category)),
            ).map((category) => ({ label: category, value: category })),
          },
        ]}
        emptyTitle={t('products.emptyTitle')}
        emptyDescription={t('products.emptyDescription')}
        bulkActions={(selectedRows) => (
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
              disabled
            >
              {t('products.bulk.publish', { count: selectedRows.length })}
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
              disabled
              className='text-destructive hover:text-destructive'
            >
              <Archive />
              {t('actions.archive')}
            </Button>
          </>
        )}
      />
    </PageShell>
  );
};
