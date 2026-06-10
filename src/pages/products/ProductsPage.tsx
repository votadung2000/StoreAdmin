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
import { ROUTES } from '@/constants/routes';
import {
  formatCurrency,
  formatNumber,
  productStatusVariant,
  products,
  type Product,
} from '@/shared/demo/store-data';

export const ProductsPage = () => {
  const catalogSummary = React.useMemo(
    () => [
      {
        label: 'Published',
        value: formatNumber(
          products.filter((product) => product.status === 'Active').length,
        ),
        detail: 'Live products',
        variant: 'success' as const,
      },
      {
        label: 'Needs stock',
        value: formatNumber(
          products.filter((product) => product.status === 'Low stock').length,
        ),
        detail: 'Reorder candidates',
        variant: 'warning' as const,
      },
      {
        label: 'Drafts',
        value: formatNumber(
          products.filter((product) => product.status === 'Draft').length,
        ),
        detail: 'Waiting for publish',
        variant: 'secondary' as const,
      },
      {
        label: 'Inventory value',
        value: formatCurrency(
          products.reduce(
            (total, product) => total + product.price * product.stock,
            0,
          ),
        ),
        detail: 'On-hand estimate',
        variant: 'info' as const,
      },
    ],
    [],
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
            aria-label='Select all products'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={`Select ${row.original.name}`}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Product',
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
        header: 'Category',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={productStatusVariant[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency(row.original.price)}
          </span>
        ),
      },
      {
        accessorKey: 'stock',
        header: 'Available',
        cell: ({ row }) => (
          <div>
            <p className='font-medium'>{formatNumber(row.original.stock)}</p>
            <p className='text-xs text-muted-foreground'>
              {formatNumber(row.original.reserved)} reserved
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'channel',
        header: 'Channel',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated',
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
              aria-label={`View ${row.original.name}`}
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
              aria-label={`Edit ${row.original.name}`}
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
    [],
  );

  return (
    <PageShell
      title='Products'
      description='Manage catalog items, SKU availability, merchandising status, and sales channels.'
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button variant='outline'>
            <FileUp />
            Import
          </Button>
          <Button variant='outline'>
            <Download />
            Export
          </Button>
          <Button asChild>
            <Link to={ROUTES.MAIN.PRODUCT_NEW}>
              <Plus />
              Add product
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
        searchPlaceholder='Search products, SKU, category'
        filters={[
          {
            columnId: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Draft', value: 'Draft' },
              { label: 'Low stock', value: 'Low stock' },
              { label: 'Archived', value: 'Archived' },
            ],
          },
          {
            columnId: 'category',
            label: 'Category',
            options: Array.from(new Set(products.map((item) => item.category))).map(
              (category) => ({ label: category, value: category }),
            ),
          },
        ]}
        emptyTitle='No products yet'
        emptyDescription='Products appear here after catalog import or product creation.'
        bulkActions={(selectedRows) => (
          <>
            <Button
              type='button'
              variant='outline'
              size='sm'
            >
              Publish {selectedRows.length}
            </Button>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='text-destructive hover:text-destructive'
            >
              <Archive />
              Archive
            </Button>
          </>
        )}
      />
    </PageShell>
  );
};
