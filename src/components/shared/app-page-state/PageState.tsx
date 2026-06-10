import {
  AlertTriangle,
  Ban,
  Boxes,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PageStateVariant = 'empty' | 'error' | 'forbidden' | 'loading';

const stateIcon: Record<PageStateVariant, LucideIcon> = {
  empty: Boxes,
  error: AlertTriangle,
  forbidden: Ban,
  loading: Loader2,
};

export type PageStateProps = {
  variant: PageStateVariant;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function PageState({
  variant,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: PageStateProps) {
  const Icon = stateIcon[variant];

  return (
    <Card
      className={cn(
        'flex min-h-64 flex-col items-center justify-center gap-4 p-6 text-center',
        className,
      )}
    >
      <div className='flex h-11 w-11 items-center justify-center rounded-md bg-muted text-muted-foreground'>
        <Icon
          className={cn('h-5 w-5', variant === 'loading' && 'animate-spin')}
        />
      </div>
      <div className='max-w-md space-y-1'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button
          variant={variant === 'error' ? 'default' : 'outline'}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
