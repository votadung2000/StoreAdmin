import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type AppPasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  /** Ref forwarded to the native input element for form libraries and focus control. */
  ref?: React.Ref<HTMLInputElement>;
  /** Optional className for the input wrapper. */
  classNameContainer?: string;
  /** Optional className for the native input element. */
  classNameInput?: string;
};

/**
 * Password input with a built-in visibility toggle.
 *
 * This component intentionally owns only the reveal state and keeps all normal
 * input props pass-through so it stays compatible with React Hook Form and
 * plain controlled inputs.
 */
export function AppPasswordInput({
  classNameContainer,
  classNameInput,
  disabled,
  ref,
  ...props
}: AppPasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();
  const togglePasswordVisibility = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const visibilityLabel = showPassword
    ? t('auth.visibility.hidePassword')
    : t('auth.visibility.showPassword');

  return (
    <div className={cn('relative rounded-md', classNameContainer)}>
      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-base font-sans placeholder:font-sans file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          classNameInput,
        )}
        {...props}
      />
      <Button
        type='button'
        size='icon'
        variant='ghost'
        disabled={disabled}
        className='absolute inset-e-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground'
        onClick={togglePasswordVisibility}
        aria-label={visibilityLabel}
        aria-pressed={showPassword}
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        <span className='sr-only'>{visibilityLabel}</span>
      </Button>
    </div>
  );
}
