import { type ComponentPropsWithoutRef } from 'react';
import { Button } from '@/components/ui/button';
import AppleIcon from '@/assets/svgs/apple.svg';
import FacebookIcon from '@/assets/svgs/facebook.svg';
import GoogleIcon from '@/assets/svgs/google.svg';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type SocialProviderId = 'google' | 'apple' | 'facebook';

export type AppSocialAuthProvider = {
  id: SocialProviderId;
  label: string;
  iconSrc: string;
  iconClassName?: string;
};

export type AppSocialAuthProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'onClick'
> & {
  /** Text displayed in the separator above the provider buttons. */
  dividerLabel?: string;
  /** Providers to render. Defaults to Google, Apple, and Facebook. */
  providers?: readonly AppSocialAuthProvider[];
  /** Called when a provider button is selected. */
  onProviderClick?: (provider: AppSocialAuthProvider) => void;
};

const DEFAULT_SOCIAL_AUTH_PROVIDERS = [
  {
    id: 'google',
    label: 'Google',
    iconSrc: GoogleIcon,
    iconClassName: 'h-5 w-5',
  },
  {
    id: 'apple',
    label: 'Apple',
    iconSrc: AppleIcon,
    iconClassName: 'h-6 w-6',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    iconSrc: FacebookIcon,
    iconClassName: 'h-6 w-6',
  },
] satisfies readonly AppSocialAuthProvider[];

/**
 * Renders the shared social authentication action group used by auth screens.
 *
 * The provider list is configurable so product-specific auth strategies can be
 * added without duplicating the layout or button styling.
 */
export function AppSocialAuth({
  className,
  dividerLabel,
  providers = DEFAULT_SOCIAL_AUTH_PROVIDERS,
  onProviderClick,
  ...props
}: AppSocialAuthProps) {
  const { t } = useTranslation();
  const resolvedDividerLabel = dividerLabel ?? t('auth.social.divider');

  return (
    <div
      className={cn('space-y-6', className)}
      {...props}
    >
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            {resolvedDividerLabel}
          </span>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 sm:gap-6'>
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant='outline'
            type='button'
            disabled={!onProviderClick}
            className='flex h-14 items-center justify-center gap-2 rounded-md px-2 transition-colors sm:px-4'
            onClick={() => onProviderClick?.(provider)}
          >
            <img
              src={provider.iconSrc}
              alt=''
              aria-hidden='true'
              className={cn(provider.iconClassName)}
            />
            <span className='hidden text-sm font-medium xl:inline'>
              {provider.label}
            </span>
            <span className='sr-only'>
              {t('auth.social.continueWith', { provider: provider.label })}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
