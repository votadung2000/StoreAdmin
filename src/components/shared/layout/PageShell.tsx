import { type ReactNode } from 'react';

type PageShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const PageShell = ({
  title,
  description,
  actions,
  children,
}: PageShellProps) => {
  return (
    <section className='mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='min-w-0'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {title}
          </h1>
          {description && (
            <p className='mt-1 text-muted-foreground'>{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
};
