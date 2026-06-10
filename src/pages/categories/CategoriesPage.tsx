import * as React from 'react';
import { Archive, Eye, GripVertical, Plus, Save } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageShell } from '@/components/shared/app-page-shell';
import { ProductionDataTable } from '@/components/shared/app-data-table';
import {
  categories,
  categoryStatusVariant,
  formatCurrency,
  formatNumber,
  type Category,
} from '@/shared/demo/store-data';

export const CategoriesPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categories[0]?.id ?? '',
  );
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];
  const categorySummary = React.useMemo(
    () => [
      {
        label: 'Visible',
        value: formatNumber(
          categories.filter((category) => category.status === 'Visible').length,
        ),
        detail: 'Storefront areas',
        variant: 'success' as const,
      },
      {
        label: 'Hidden or draft',
        value: formatNumber(
          categories.filter((category) => category.status !== 'Visible').length,
        ),
        detail: 'Needs review',
        variant: 'warning' as const,
      },
      {
        label: 'Category revenue',
        value: formatCurrency(
          categories.reduce((total, category) => total + category.revenue, 0),
        ),
        detail: '30-day total',
        variant: 'info' as const,
      },
      {
        label: 'Average SEO',
        value: formatNumber(
          Math.round(
            categories.reduce((total, category) => total + category.seoScore, 0) /
              categories.length,
          ),
        ),
        detail: 'Readiness score',
        variant: 'secondary' as const,
      },
    ],
    [],
  );

  const columns = React.useMemo<ColumnDef<Category>[]>(
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
            aria-label='Select all categories'
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
        header: 'Category',
        cell: ({ row }) => (
          <button
            type='button'
            onClick={() => setSelectedCategoryId(row.original.id)}
            className='min-w-52 text-left transition-colors hover:text-primary/70'
          >
            <span className='block font-medium'>{row.original.name}</span>
            <span className='block text-sm text-muted-foreground'>
              /{row.original.slug}
            </span>
          </button>
        ),
      },
      {
        accessorKey: 'parent',
        header: 'Parent',
        cell: ({ row }) => row.original.parent ?? 'Root',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={categoryStatusVariant[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'products',
        header: 'Products',
        cell: ({ row }) => formatNumber(row.original.products),
      },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency(row.original.revenue)}
          </span>
        ),
      },
      {
        accessorKey: 'seoScore',
        header: 'SEO',
        cell: ({ row }) => (
          <Badge variant={row.original.seoScore >= 85 ? 'success' : 'warning'}>
            {row.original.seoScore}
          </Badge>
        ),
      },
      {
        accessorKey: 'sortOrder',
        header: 'Sort',
      },
    ],
    [],
  );

  return (
    <PageShell
      title='Categories'
      description='Organize products by category hierarchy, merchandising priority, storefront visibility, and SEO readiness.'
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button variant='outline'>
            <Save />
            Save order
          </Button>
          <Button>
            <Plus />
            Add category
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {categorySummary.map((item) => (
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

      <section className='grid gap-4 xl:grid-cols-[0.85fr_1.35fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Category Tree</CardTitle>
            <CardDescription>
              Root and child categories ordered for storefront navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            {categories.map((category) => (
              <button
                key={category.id}
                type='button'
                onClick={() => setSelectedCategoryId(category.id)}
                className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm ${
                  selectedCategory?.id === category.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-background'
                } ${category.parent ? 'ml-5 w-[calc(100%-1.25rem)]' : ''}`}
              >
                <GripVertical className='h-4 w-4 text-muted-foreground' />
                <span className='min-w-0 flex-1'>
                  <span className='block truncate font-medium'>
                    {category.name}
                  </span>
                  <span className='block text-xs text-muted-foreground'>
                    {category.products} products / order {category.sortOrder}
                  </span>
                </span>
                <Badge variant={categoryStatusVariant[category.status]}>
                  {category.status}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>{selectedCategory?.name ?? 'Category'}</CardTitle>
              <CardDescription>
                Merchandising summary and operational checks.
              </CardDescription>
            </div>
            {selectedCategory && (
              <Badge variant={categoryStatusVariant[selectedCategory.status]}>
                {selectedCategory.status}
              </Badge>
            )}
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>Products</p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatNumber(selectedCategory?.products ?? 0)}
              </p>
            </div>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>30-day revenue</p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatCurrency(selectedCategory?.revenue ?? 0)}
              </p>
            </div>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>SEO score</p>
              <p className='mt-1 text-2xl font-semibold'>
                {selectedCategory?.seoScore ?? 0}
              </p>
              <div className='mt-3 h-2 overflow-hidden rounded-full bg-muted'>
                <div
                  className='h-full rounded-full bg-primary transition-[width] duration-500'
                  style={{ width: `${selectedCategory?.seoScore ?? 0}%` }}
                />
              </div>
            </div>
            <div className='rounded-md border p-3 md:col-span-3'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <p className='font-medium'>Storefront visibility</p>
                  <p className='text-sm text-muted-foreground'>
                    {selectedCategory?.storefront
                      ? 'Visible in storefront navigation'
                      : 'Hidden from storefront navigation'}
                  </p>
                </div>
                <Badge variant={selectedCategory?.storefront ? 'success' : 'outline'}>
                  {selectedCategory?.storefront ? 'Visible' : 'Hidden'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <ProductionDataTable
        data={categories}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder='Search categories, slug, parent'
        filters={[
          {
            columnId: 'status',
            label: 'Status',
            options: [
              { label: 'Visible', value: 'Visible' },
              { label: 'Hidden', value: 'Hidden' },
              { label: 'Draft', value: 'Draft' },
            ],
          },
        ]}
        toolbarActions={
          <Button
            type='button'
            variant='outline'
            size='sm'
          >
            <Eye />
            Preview navigation
          </Button>
        }
        emptyTitle='No categories yet'
        emptyDescription='Categories appear here after merchandising setup.'
        bulkActions={() => (
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='text-destructive hover:text-destructive'
          >
            <Archive />
            Archive
          </Button>
        )}
      />
    </PageShell>
  );
};
