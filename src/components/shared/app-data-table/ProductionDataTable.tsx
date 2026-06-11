import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageState } from '@/components/shared/app-page-state';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type DataTableSelectFilter = {
  columnId: string;
  label: string;
  options: readonly {
    label: string;
    value: string;
  }[];
};

export type ProductionDataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  searchPlaceholder: string;
  filters?: readonly DataTableSelectFilter[];
  toolbarActions?: React.ReactNode;
  bulkActions?: (selectedRows: TData[]) => React.ReactNode;
  emptyTitle: string;
  emptyDescription?: string;
  filteredEmptyTitle?: string;
  filteredEmptyDescription?: string;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  initialPageSize?: number;
  pageSizeOptions?: readonly number[];
  getRowId?: (row: TData, index: number) => string;
};

function getSortIcon(isSorted: false | 'asc' | 'desc') {
  if (isSorted === 'asc') return ArrowUp;
  if (isSorted === 'desc') return ArrowDown;
  return ArrowUpDown;
}

export function ProductionDataTable<TData, TValue>({
  data,
  columns,
  searchPlaceholder,
  filters = [],
  toolbarActions,
  bulkActions,
  emptyTitle,
  emptyDescription,
  filteredEmptyTitle,
  filteredEmptyDescription,
  isLoading = false,
  error,
  onRetry,
  initialPageSize = 8,
  pageSizeOptions = [8, 12, 20],
  getRowId,
}: ProductionDataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [searchInput, setSearchInput] = React.useState('');
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setGlobalFilter(searchInput);
      setPagination((current) => ({ ...current, pageIndex: 0 }));
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
      globalFilter,
    },
    getRowId,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);
  const resolvedFilteredEmptyTitle =
    filteredEmptyTitle ?? t('table.filteredEmptyTitle');
  const resolvedFilteredEmptyDescription =
    filteredEmptyDescription ?? t('table.filteredEmptyDescription');
  const hasFilters = searchInput.length > 0 || columnFilters.length > 0;
  const rows = table.getRowModel().rows;
  const leafColumnCount = table.getAllLeafColumns().length;
  const activeFilters = filters.flatMap((filter) => {
    const value = table.getColumn(filter.columnId)?.getFilterValue() as
      | string
      | undefined;

    if (!value) return [];

    const label =
      filter.options.find((option) => option.value === value)?.label ?? value;

    return [
      {
        columnId: filter.columnId,
        label: filter.label,
        value,
        displayValue: label,
      },
    ];
  });

  const resetFilters = () => {
    setSearchInput('');
    setGlobalFilter('');
    setColumnFilters([]);
    setRowSelection({});
    setSorting([]);
    setPagination((current) => ({ ...current, pageIndex: 0 }));
  };

  return (
    <div className='space-y-3'>
      <div className='flex flex-col gap-3 rounded-md border bg-background p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center'>
          <div className='relative min-w-0 md:max-w-sm md:flex-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={searchPlaceholder}
              className='pl-9 pr-9 transition-[border-color,box-shadow] focus-visible:shadow-sm'
              aria-label={searchPlaceholder}
            />
            {searchInput && (
              <button
                type='button'
                onClick={() => setSearchInput('')}
                className='absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
                aria-label={t('table.clearSearch')}
              >
                <X className='h-3.5 w-3.5' />
              </button>
            )}
          </div>

          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            const value = (column?.getFilterValue() as string | undefined) ?? '';

            return (
              <label
                key={filter.columnId}
                className='flex min-w-44 items-center gap-2 text-sm text-muted-foreground'
              >
                <span className='shrink-0'>{filter.label}</span>
                <select
                  value={value}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    column?.setFilterValue(nextValue || undefined);
                    setPagination((current) => ({ ...current, pageIndex: 0 }));
                  }}
                  className='h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring'
                >
                  <option value=''>{t('table.all')}</option>
                  {filter.options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {hasFilters && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={resetFilters}
            >
              <RotateCcw />
              {t('table.reset')}
            </Button>
          )}
          {toolbarActions}
        </div>
      </div>

      {hasFilters && (
        <div className='flex flex-wrap items-center gap-2 rounded-md border border-dashed bg-background px-3 py-2 text-sm text-muted-foreground motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1'>
          <Filter className='h-4 w-4' />
          {searchInput && (
            <span className='inline-flex h-7 items-center gap-2 rounded-md bg-muted px-2 text-foreground'>
              {t('table.searchPrefix', { query: searchInput })}
              <button
                type='button'
                onClick={() => setSearchInput('')}
                className='text-muted-foreground transition-colors hover:text-foreground'
                aria-label={t('table.clearSearchFilter')}
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </span>
          )}
          {activeFilters.map((filter) => (
            <span
              key={filter.columnId}
              className='inline-flex h-7 items-center gap-2 rounded-md bg-muted px-2 text-foreground'
            >
              {filter.label}: {filter.displayValue}
              <button
                type='button'
                onClick={() => {
                  table.getColumn(filter.columnId)?.setFilterValue(undefined);
                  setPagination((current) => ({ ...current, pageIndex: 0 }));
                }}
                className='text-muted-foreground transition-colors hover:text-foreground'
                aria-label={`${t('table.clearSearchFilter')}: ${filter.label}`}
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </span>
          ))}
        </div>
      )}

      {selectedRows.length > 0 && bulkActions && (
        <div className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1'>
          <span className='font-medium'>
            {t('table.selected', { count: selectedRows.length })}
          </span>
          <div className='flex flex-wrap items-center gap-2'>
            {bulkActions(selectedRows)}
          </div>
        </div>
      )}

      <div className='overflow-hidden rounded-md border bg-background shadow-sm'>
        <Table className='min-w-[960px]'>
          <TableHeader className='bg-muted/60'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='hover:bg-muted/60'
              >
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  const SortIcon = getSortIcon(isSorted);
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      className='h-11 whitespace-nowrap'
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type='button'
                          onClick={header.column.getToggleSortingHandler()}
                          className='inline-flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground'
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <SortIcon className='h-3.5 w-3.5' />
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
                <TableRow key={`loading-${rowIndex}`}>
                  {Array.from({ length: leafColumnCount }).map((__, cellIndex) => (
                    <TableCell key={`loading-${rowIndex}-${cellIndex}`}>
                      <Skeleton className='h-5 w-full max-w-36' />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && error && (
              <TableRow>
                <TableCell colSpan={leafColumnCount}>
                  <PageState
                    variant='error'
                    title={t('table.couldNotLoadRecords')}
                    description={error}
                    actionLabel={onRetry ? t('table.retry') : undefined}
                    onAction={onRetry}
                    className='min-h-56 border-0 shadow-none'
                  />
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !error &&
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className='transition-[background-color,box-shadow] motion-safe:animate-in motion-safe:fade-in-0 hover:shadow-[inset_3px_0_0_var(--primary)]'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={leafColumnCount}>
                  <PageState
                    variant='empty'
                    title={hasFilters ? resolvedFilteredEmptyTitle : emptyTitle}
                    description={
                      hasFilters
                        ? resolvedFilteredEmptyDescription
                        : emptyDescription
                    }
                    className='min-h-56 border-0 shadow-none'
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col gap-3 rounded-md border bg-background px-3 py-3 text-sm text-muted-foreground shadow-sm md:flex-row md:items-center md:justify-between'>
        <div aria-live='polite'>
          {hasFilters
            ? t('table.showingFiltered', {
                visible: rows.length,
                total: table.getFilteredRowModel().rows.length,
                all: data.length,
              })
            : t('table.showing', {
                visible: rows.length,
                total: table.getFilteredRowModel().rows.length,
              })}
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <label className='flex items-center gap-2'>
            {t('table.rows')}
            <select
              value={pagination.pageSize}
              onChange={(event) => {
                table.setPageSize(Number(event.target.value));
              }}
              className='h-9 rounded-md border border-input bg-background px-2 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring'
            >
              {pageSizeOptions.map((size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              ))}
            </select>
          </label>
          <span className='min-w-24 text-center text-foreground'>
            {t('table.page', {
              page: table.getState().pagination.pageIndex + 1,
              total: Math.max(table.getPageCount(), 1),
            })}
          </span>
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t('table.previousPage')}
            className={cn('h-9 w-9')}
          >
            <ChevronLeft />
          </Button>
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t('table.nextPage')}
            className='h-9 w-9'
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
