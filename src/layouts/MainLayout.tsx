import { Outlet } from '@tanstack/react-router';
import * as React from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared/app-sidebar/AppSidebar';
import { PageState } from '@/components/shared/app-page-state';
import {
  canUsePermission,
  filterNavigationGroupsByPermissions,
  getRouteMeta,
  navigationGroupTranslationKeys,
  navigationItems,
} from '@/constants/navigation';
import { useAuthStore } from '@/stores/authStore';
import {
  sidebarData,
  type SidebarData,
} from '@/components/shared/app-sidebar/data/sidebar-data';
import { AppLanguageSwitcher } from '@/components/shared/app-language-switcher';
import { useTranslation } from 'react-i18next';

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'SO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

const emptyPermissions: readonly string[] = [];

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();
  const routeMeta = getRouteMeta(location.pathname);
  const permissions = user?.permissions ?? emptyPermissions;
  const canAccessRoute = canUsePermission(permissions, routeMeta?.permission);
  const [query, setQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const sidebar = React.useMemo<SidebarData>(
    () => ({
      ...sidebarData,
      brand: {
        name: t('app.brand.name'),
        description: t('app.brand.description'),
      },
      groups: filterNavigationGroupsByPermissions(permissions).map((group) => ({
        label: t(group.labelKey),
        items: group.items.map((item) => ({
          ...item,
          label: t(item.labelKey),
        })),
      })),
    }),
    [permissions, t],
  );

  const searchResults = React.useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const permittedItems = navigationItems
      .filter((item) => canUsePermission(permissions, item.permission))
      .map((item) => ({
        ...item,
        label: t(item.labelKey),
        description: t(item.descriptionKey),
        group: t(navigationGroupTranslationKeys[item.group]),
      }));

    if (!normalizedQuery) {
      return permittedItems.slice(0, 6);
    }

    return permittedItems
      .filter((item) => {
        const haystack =
          `${item.label} ${item.description} ${item.group} ${item.permission}`.toLocaleLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [permissions, query, t]);

  const runSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firstResult = searchResults[0];
    if (!firstResult) return;

    setQuery('');
    setIsSearchFocused(false);
    navigate({ to: firstResult.to });
  };

  return (
    <SidebarProvider className='min-h-svh w-full overflow-hidden bg-muted/30'>
      <AppSidebar data={sidebar} />

      <SidebarInset className='h-svh min-w-0 basis-0 overflow-hidden bg-muted/30 md:w-auto'>
        <header className='sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
          <SidebarTrigger className='text-muted-foreground hover:text-foreground' />
          <div className='h-5 w-px bg-border' />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>
              {routeMeta ? t(routeMeta.labelKey) : t('app.defaultTitle')}
            </p>
            <p className='truncate text-xs text-muted-foreground'>
              {routeMeta
                ? t(routeMeta.descriptionKey)
                : t('app.defaultDescription')}
            </p>
          </div>

          <form
            onSubmit={runSearch}
            className='relative hidden min-w-[17rem] md:block lg:min-w-[22rem]'
          >
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setIsSearchFocused(false), 120);
              }}
              placeholder={t('layout.search.placeholder')}
              className='h-9 pl-9 pr-3'
              aria-label={t('layout.search.placeholder')}
            />
            {isSearchFocused && (
              <div className='absolute right-0 top-11 z-40 w-full overflow-hidden rounded-md border bg-popover shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95'>
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.to}
                      type='button'
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setQuery('');
                        setIsSearchFocused(false);
                        navigate({ to: item.to });
                      }}
                      className='flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent'
                    >
                      <item.icon className='mt-0.5 h-4 w-4 shrink-0 text-muted-foreground' />
                      <span className='min-w-0'>
                        <span className='block font-medium'>{item.label}</span>
                        <span className='block truncate text-xs text-muted-foreground'>
                          {item.group} / {item.permission}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <div className='px-3 py-4 text-sm text-muted-foreground'>
                    {t('layout.search.noMatch')}
                  </div>
                )}
              </div>
            )}
          </form>

          <AppLanguageSwitcher className='hidden sm:inline-flex' />
          <Button
            variant='ghost'
            size='icon'
            aria-label={t('layout.notifications')}
            className='relative'
          >
            <Bell size={18} />
            <span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500' />
          </Button>
          <Button
            variant='ghost'
            className='h-10 gap-2 px-2'
            aria-label={t('layout.profile')}
          >
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarFallback className='rounded-lg text-xs'>
                {getInitials(user?.name ?? t('app.user.fallbackName'))}
              </AvatarFallback>
            </Avatar>
            <div className='hidden text-left leading-tight lg:block'>
              <p className='text-sm font-medium'>
                {user?.name ?? t('app.user.fallbackName')}
              </p>
              <p className='text-xs text-muted-foreground'>
                {user?.roles[0] ?? t('app.user.fallbackRole')}
              </p>
            </div>
          </Button>
        </header>

        <div className='min-h-0 min-w-0 flex-1 overflow-y-auto'>
          {canAccessRoute ? (
            <Outlet />
          ) : (
            <section className='mx-auto w-full max-w-4xl p-6'>
              <PageState
                variant='forbidden'
                title={t('layout.forbidden.title')}
                description={t('layout.forbidden.description', {
                  permission: routeMeta?.permission ?? 'unknown',
                })}
              />
            </section>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
