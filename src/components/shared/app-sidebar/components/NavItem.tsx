import { NavLink } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type SidebarItem } from '../data/sidebar-data';

export type NavItemProps = {
  /** Whether the parent sidebar is in icon-only mode. */
  collapsed: boolean;
  /** Navigation item to render. */
  item: SidebarItem;
};

/**
 * Renders a single sidebar navigation link with active and collapsed states.
 */
export function NavItem({ collapsed, item }: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.label}
      >
        <NavLink
          to={item.to}
          end={'end' in item ? item.end : undefined}
          className={({ isActive }) =>
            cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )
          }
        >
          <item.icon
            size={18}
            className='shrink-0'
          />
          {!collapsed && (
            <>
              <span className='truncate'>{item.label}</span>
              {'badge' in item && item.badge && (
                <span className='ms-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary'>
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
