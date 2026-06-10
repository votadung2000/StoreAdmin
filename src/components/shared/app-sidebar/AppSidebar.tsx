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
import { sidebarData } from './data/sidebar-data';

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar
      collapsible='icon'
      className='border-r border-sidebar-border'
    >
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-3 overflow-hidden'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <Store size={18} />
          </div>
          {!collapsed && (
            <div className='min-w-0'>
              <p className='truncate text-base font-semibold tracking-tight'>
                {sidebarData.brand.name}
              </p>
              <p className='truncate text-xs text-muted-foreground'>
                {sidebarData.brand.description}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.groups.map((group) => (
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
          user={sidebarData.user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
