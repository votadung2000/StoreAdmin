import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type PageShellProps = {
  /** Primary page heading. */
  title: string;
  /** Optional supporting copy displayed under the title. */
  description?: string;
  /** Optional right-aligned controls such as filters or create buttons. */
  actions?: ReactNode;
  /** Page content rendered below the heading row. */
  children: ReactNode;
  /** Optional className for the outer page container. */
  className?: string;
  /** Optional className for the title/actions row. */
  headerClassName?: string;
};

/**
 * Shared page frame for authenticated store admin screens.
 *
 * Use this for feature pages so spacing, max width, and heading rhythm remain
 * consistent across dashboard, catalog, and order workflows.
 */
export function PageShell({
  title,
  description,
  actions,
  children,
  className,
  headerClassName,
}: PageShellProps) {
  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 sm:p-5 lg:p-6',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-start justify-between gap-4',
          headerClassName,
        )}
      >
        <div className='min-w-0'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          {description && (
            <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
