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
import { categoryStatusKey } from '@/constants/category';
import { formatCurrency } from '@/utils/helpers/format-currency.helper';
import { useTranslation } from 'react-i18next';
import {
  categories,
  categoryStatusVariant,
  type Category,
} from '@/shared/demo/store-data';

export const CategoriesPage = () => {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    categories[0]?.id ?? '',
  );
  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ??
    categories[0];
  const categorySummary = React.useMemo(
    () => [
      {
        label: t('categories.summary.visible.label'),
        value: String(
          categories.filter((category) => category.status === 'Visible').length,
        ),
        detail: t('categories.summary.visible.detail'),
        variant: 'success' as const,
      },
      {
        label: t('categories.summary.hiddenOrDraft.label'),
        value: String(
          categories.filter((category) => category.status !== 'Visible').length,
        ),
        detail: t('categories.summary.hiddenOrDraft.detail'),
        variant: 'warning' as const,
      },
      {
        label: t('categories.summary.categoryRevenue.label'),
        value: formatCurrency({
          value: categories.reduce(
            (total, category) => total + category.revenue,
            0,
          ),
        }),
        detail: t('categories.summary.categoryRevenue.detail'),
        variant: 'info' as const,
      },
      {
        label: t('categories.summary.averageSeo.label'),
        value: String(
          Math.round(
            categories.reduce(
              (total, category) => total + category.seoScore,
              0,
            ) / categories.length,
          ),
        ),
        detail: t('categories.summary.averageSeo.detail'),
        variant: 'secondary' as const,
      },
    ],
    [t],
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
            aria-label={t('categories.selectAll')}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label={t('categories.selectCategory', {
              name: row.original.name,
            })}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: t('field.category'),
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
        header: t('categories.table.parent'),
        cell: ({ row }) => row.original.parent ?? t('categories.table.root'),
      },
      {
        accessorKey: 'status',
        header: t('field.status'),
        cell: ({ row }) => (
          <Badge variant={categoryStatusVariant[row.original.status]}>
            {t(categoryStatusKey[row.original.status])}
          </Badge>
        ),
      },
      {
        accessorKey: 'products',
        header: t('categories.table.products'),
        cell: ({ row }) => String(row.original.products),
      },
      {
        accessorKey: 'revenue',
        header: t('categories.table.revenue'),
        cell: ({ row }) => (
          <span className='font-medium'>
            {formatCurrency({ value: row.original.revenue })}
          </span>
        ),
      },
      {
        accessorKey: 'seoScore',
        header: t('categories.table.seo'),
        cell: ({ row }) => (
          <Badge variant={row.original.seoScore >= 85 ? 'success' : 'warning'}>
            {row.original.seoScore}
          </Badge>
        ),
      },
      {
        accessorKey: 'sortOrder',
        header: t('categories.table.sort'),
      },
    ],
    [t],
  );

  return (
    <PageShell
      title={t('categories.title')}
      description={t('categories.description')}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            variant='outline'
            disabled
          >
            <Save />
            {t('actions.saveOrder')}
          </Button>
          <Button disabled>
            <Plus />
            {t('actions.addCategory')}
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
            <CardTitle>{t('categories.tree.title')}</CardTitle>
            <CardDescription>
              {t('categories.tree.description')}
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
                    {t('categories.tree.itemMeta', {
                      count: String(category.products),
                      order: category.sortOrder,
                    })}
                  </span>
                </span>
                <Badge variant={categoryStatusVariant[category.status]}>
                  {t(categoryStatusKey[category.status])}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex-row items-start justify-between gap-4'>
            <div>
              <CardTitle>
                {selectedCategory?.name ?? t('field.category')}
              </CardTitle>
              <CardDescription>
                {t('categories.detail.description')}
              </CardDescription>
            </div>
            {selectedCategory && (
              <Badge variant={categoryStatusVariant[selectedCategory.status]}>
                {t(categoryStatusKey[selectedCategory.status])}
              </Badge>
            )}
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>
                {t('categories.table.products')}
              </p>
              <p className='mt-1 text-2xl font-semibold'>
                {String(selectedCategory?.products ?? 0)}
              </p>
            </div>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>
                {t('categories.detail.revenue30d')}
              </p>
              <p className='mt-1 text-2xl font-semibold'>
                {formatCurrency({ value: selectedCategory?.revenue ?? 0 })}
              </p>
            </div>
            <div className='rounded-md border p-3'>
              <p className='text-sm text-muted-foreground'>
                {t('categories.detail.seoScore')}
              </p>
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
                  <p className='font-medium'>
                    {t('categories.detail.storefrontTitle')}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {selectedCategory?.storefront
                      ? t('categories.detail.storefrontVisible')
                      : t('categories.detail.storefrontHidden')}
                  </p>
                </div>
                <Badge
                  variant={selectedCategory?.storefront ? 'success' : 'outline'}
                >
                  {selectedCategory?.storefront
                    ? t('status.storefront.visible')
                    : t('status.storefront.hidden')}
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
        searchPlaceholder={t('categories.searchPlaceholder')}
        filters={[
          {
            columnId: 'status',
            label: t('field.status'),
            options: [
              { label: t('status.category.visible'), value: 'Visible' },
              { label: t('status.category.hidden'), value: 'Hidden' },
              { label: t('status.category.draft'), value: 'Draft' },
            ],
          },
        ]}
        toolbarActions={
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled
          >
            <Eye />
            {t('actions.previewNavigation')}
          </Button>
        }
        emptyTitle={t('categories.emptyTitle')}
        emptyDescription={t('categories.emptyDescription')}
        bulkActions={() => (
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
        )}
      />
    </PageShell>
  );
};
