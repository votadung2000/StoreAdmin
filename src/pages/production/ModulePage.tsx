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
import {
  getStatusVariant,
  moduleConfigs,
  type ModuleId,
  type ModuleRecord,
} from '@/shared/demo/store-data';

export type ModulePageProps = {
  moduleId: ModuleId;
};

export const ModulePage = ({ moduleId }: ModulePageProps) => {
  const config = moduleConfigs[moduleId];
  const workflowSteps = ['Review', 'Apply', 'Audit'];
  const statusOptions = React.useMemo(
    () =>
      Array.from(new Set(config.records.map((record) => record.status))).map(
        (status) => ({ label: status, value: status }),
      ),
    [config.records],
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
            aria-label={`Select all ${config.title} records`}
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
        header: 'Name',
        cell: ({ row }) => (
          <div className='min-w-56'>
            <p className='font-medium'>{row.original.name}</p>
            <p className='text-sm text-muted-foreground'>{row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'metric',
        header: 'Metric',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated',
      },
    ],
    [config.title],
  );

  return (
    <PageShell
      title={config.title}
      description={config.description}
      actions={
        <div className='flex flex-wrap items-center gap-2'>
          <Badge variant='outline'>{config.permission}</Badge>
          <Button variant='outline'>
            <Download />
            Export
          </Button>
          <Button>
            <Plus />
            {config.primaryAction}
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
          <CardTitle>Workflow State</CardTitle>
          <CardDescription>
            A lightweight production path for action, review, and audit follow-up.
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
            <CardTitle>Operational Queue</CardTitle>
            <CardDescription>
              Prioritized items that need review or follow-up.
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
                  {record.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governance</CardTitle>
            <CardDescription>
              Ownership, approvals, exports, and audit coverage.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 sm:grid-cols-2'>
            {[
              'Owner approval',
              'Export cadence',
              'Sensitive changes',
              'Review window',
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
        searchPlaceholder={`Search ${config.title.toLowerCase()}`}
        filters={[
          {
            columnId: 'status',
            label: 'Status',
            options: statusOptions,
          },
        ]}
        emptyTitle={`No ${config.title.toLowerCase()} records`}
        emptyDescription='Records appear here after the backend API is connected.'
        bulkActions={(selectedRows) => (
          <Button
            type='button'
            variant='outline'
            size='sm'
          >
            Export {selectedRows.length}
          </Button>
        )}
      />
    </PageShell>
  );
};
