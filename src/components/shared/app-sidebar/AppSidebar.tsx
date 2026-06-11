import { type ComponentPropsWithoutRef } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { LogOut, Store } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavItem } from './components/NavItem';
import { sidebarData, type SidebarData } from './data/sidebar-data';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

export type AppSidebarProps = Omit<
  ComponentPropsWithoutRef<typeof Sidebar>,
  'children'
> & {
  /** Data used to render the brand and navigation groups. */
  data?: SidebarData;
};

/**
 * Primary application sidebar for the authenticated admin layout.
 *
 * The sidebar is data-driven so navigation can later be wired to permissions,
 * remote menu config, or tenant-specific labels without rewriting the shell.
 */
export function AppSidebar({
  data = sidebarData,
  className,
  ...props
}: AppSidebarProps) {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate({ to: ROUTES.AUTH.SIGN_IN });
  };

  return (
    <Sidebar
      collapsible='icon'
      className={cn('border-r border-sidebar-border', className)}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size='lg'
              tooltip={data.brand.name}
            >
              <Link to={ROUTES.MAIN.DASHBOARD}>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Store size={18} />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {data.brand.name}
                  </span>
                  <span className='truncate text-xs'>
                    {data.brand.description}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {data.groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <NavItem
                    key={`${group.label}-${item.label}`}
                    item={item}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              aria-label={t('actions.logout')}
              tooltip={t('actions.logout')}
              className='text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/30'
            >
              <LogOut />
              <span>{t('actions.logout')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
