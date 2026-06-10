import { type ComponentPropsWithoutRef } from 'react';
import { Store } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavItem } from './components/NavItem';
import { UserMenu } from './components/UserMenu';
import { sidebarData, type SidebarData } from './data/sidebar-data';
import { cn } from '@/lib/utils';

export type AppSidebarProps = Omit<
  ComponentPropsWithoutRef<typeof Sidebar>,
  'children'
> & {
  /** Data used to render the brand, user summary, and navigation groups. */
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
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar
      collapsible='icon'
      className={cn('border-r border-sidebar-border', className)}
      {...props}
    >
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-3 overflow-hidden'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <Store size={18} />
          </div>
          {!collapsed && (
            <div className='min-w-0'>
              <p className='truncate text-base font-semibold tracking-tight'>
                {data.brand.name}
              </p>
              <p className='truncate text-xs text-muted-foreground'>
                {data.brand.description}
              </p>
            </div>
          )}
        </div>
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
                    collapsed={collapsed}
                    item={item}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className='p-3'>
        <UserMenu
          collapsed={collapsed}
          user={data.user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
