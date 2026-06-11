import * as React from 'react';
import { CheckCircle2, Download, Plus } from 'lucide-react';
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
import { getValueTranslationKey } from '@/constants/translation';
import { useTranslation } from 'react-i18next';
import {
  getStatusVariant,
  moduleConfigs,
  type ModuleId,
  type ModuleRecord,
} from '@/shared/demo/store-data';

export type ModulePageProps = {
  moduleId: ModuleId;
};

const moduleCopyKeys: Record<
  ModuleId,
  {
    title: string;
    description: string;
    primaryAction: string;
  }
> = {
  inventory: {
    title: 'nav.inventory.label',
    description: 'nav.inventory.description',
    primaryAction: 'module.primaryAction.inventory',
  },
  'inventory-movements': {
    title: 'nav.stockMovements.label',
    description: 'nav.stockMovements.description',
    primaryAction: 'module.primaryAction.inventoryMovements',
  },
  returns: {
    title: 'nav.returns.label',
    description: 'nav.returns.description',
    primaryAction: 'module.primaryAction.returns',
  },
  customers: {
    title: 'nav.customers.label',
    description: 'nav.customers.description',
    primaryAction: 'module.primaryAction.customers',
  },
  promotions: {
    title: 'nav.promotions.label',
    description: 'nav.promotions.description',
    primaryAction: 'module.primaryAction.promotions',
  },
  shipping: {
    title: 'nav.shipping.label',
    description: 'nav.shipping.description',
    primaryAction: 'module.primaryAction.shipping',
  },
  reports: {
    title: 'nav.reports.label',
    description: 'nav.reports.description',
    primaryAction: 'module.primaryAction.reports',
  },
  staff: {
    title: 'nav.staff.label',
    description: 'nav.staff.description',
    primaryAction: 'module.primaryAction.staff',
  },
  roles: {
    title: 'nav.roles.label',
    description: 'nav.roles.description',
    primaryAction: 'module.primaryAction.roles',
  },
  settings: {
    title: 'nav.settings.label',
    description: 'nav.settings.description',
    primaryAction: 'module.primaryAction.settings',
  },
  'audit-logs': {
    title: 'nav.auditLogs.label',
    description: 'nav.auditLogs.description',
    primaryAction: 'module.primaryAction.auditLogs',
  },
};

export const ModulePage = ({ moduleId }: ModulePageProps) => {
  const { t } = useTranslation();
  const config = moduleConfigs[moduleId];
  const copy = moduleCopyKeys[moduleId];
  const translatedTitle = t(copy.title);
  const workflowSteps = [
    t('module.common.workflow.review'),
    t('module.common.workflow.apply'),
    t('module.common.workflow.audit'),
  ];
  const statusOptions = React.useMemo(
    () =>
      Array.from(new Set(config.records.map((record) => record.status))).map(
        (status) => {
          const key = getValueTranslationKey(status);
          return { label: key ? t(key) : status, value: status };
        },
      ),
    [config.records, t],
  );

  const columns = React.useMemo<ColumnDef<ModuleRecord>[]>(
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
            aria-label={t('module.common.selectAll', {
              title: translatedTitle,
            })}
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
        header: t('module.table.name'),
        cell: ({ row }) => (
          <div className='min-w-56'>
            <p className='font-medium'>{row.original.name}</p>
            <p className='text-sm text-muted-foreground'>{row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: 'owner',
        header: t('module.table.owner'),
      },
      {
        accessorKey: 'status',
        header: t('field.status'),
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {(() => {
              const key = getValueTranslationKey(row.original.status);
              return key ? t(key) : row.original.status;
            })()}
          </Badge>
        ),
      },
      {
        accessorKey: 'metric',
        header: t('module.table.metric'),
      },
      {
        accessorKey: 'updatedAt',
        header: t('module.table.updated'),
        cell: ({ row }) => {
          const key = getValueTranslationKey(row.original.updatedAt);
          return key ? t(key) : row.original.updatedAt;
        },
      },
    ],
    [t, translatedTitle],
  );

  return (
    <PageShell
      title={translatedTitle}
      description={t(copy.description)}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='outline'>{config.permission}</Badge>
          <Button
            variant='outline'
            disabled
          >
            <Download />
            {t('actions.export')}
          </Button>
          <Button disabled>
            <Plus />
            {t(copy.primaryAction)}
          </Button>
        </div>
      }
    >
      <section className='grid gap-4 md:grid-cols-3'>
        {config.stats.map((stat) => (
          <Card
            key={stat.label}
            className='p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md'
          >
            <div className='flex items-start justify-between gap-3'>
              <p className='text-sm font-medium text-muted-foreground'>
                {stat.label}
              </p>
              <Badge variant={stat.variant}>{stat.value}</Badge>
            </div>
            <p className='mt-3 text-3xl font-semibold'>{stat.value}</p>
            <p className='mt-1 text-xs text-muted-foreground'>{stat.detail}</p>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('module.common.workflow.title')}</CardTitle>
          <CardDescription>
            {t('module.common.workflow.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3 md:grid-cols-3'>
          {workflowSteps.map((step, index) => (
            <div
              key={step}
              className='flex items-center gap-3 rounded-md border bg-background p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
            >
              <div className='grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground'>
                <CheckCircle2 className='h-4 w-4' />
              </div>
              <div className='min-w-0'>
                <p className='font-medium'>
                  {index + 1}. {step}
                </p>
                <p className='truncate text-sm text-muted-foreground'>
                  {config.permission}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className='grid gap-4 xl:grid-cols-[0.8fr_1.2fr]'>
        <Card>
          <CardHeader>
            <CardTitle>{t('module.common.operationalQueue.title')}</CardTitle>
            <CardDescription>
              {t('module.common.operationalQueue.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {config.records.map((record) => (
              <div
                key={record.id}
                className='flex items-center justify-between gap-3 rounded-md border p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
              >
                <div className='min-w-0'>
                  <p className='truncate font-medium'>{record.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {record.owner} / {record.updatedAt}
                  </p>
                </div>
                <Badge variant={getStatusVariant(record.status)}>
                  {(() => {
                    const key = getValueTranslationKey(record.status);
                    return key ? t(key) : record.status;
                  })()}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('module.common.governance.title')}</CardTitle>
            <CardDescription>
              {t('module.common.governance.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 sm:grid-cols-2'>
            {[
              t('module.common.governance.ownerApproval'),
              t('module.common.governance.exportCadence'),
              t('module.common.governance.sensitiveChanges'),
              t('module.common.governance.reviewWindow'),
            ].map((item) => (
              <div
                key={item}
                className='rounded-md border p-3 transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent/40 hover:shadow-sm'
              >
                <p className='font-medium'>{item}</p>
                <p className='text-sm text-muted-foreground'>
                  {config.permission}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <ProductionDataTable
        data={config.records}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder={t('module.common.searchPlaceholder', {
          title: translatedTitle.toLocaleLowerCase(),
        })}
        filters={[
          {
            columnId: 'status',
            label: t('field.status'),
            options: statusOptions,
          },
        ]}
        emptyTitle={t('module.common.emptyTitle', {
          title: translatedTitle.toLocaleLowerCase(),
        })}
        emptyDescription={t('module.common.emptyDescription')}
        bulkActions={(selectedRows) => (
          <Button
            type='button'
            variant='outline'
            size='sm'
            disabled
          >
            {t('module.common.bulkExport', { count: selectedRows.length })}
          </Button>
        )}
      />
    </PageShell>
  );
};
