import { Link, useLocation } from '@tanstack/react-router';
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type SidebarItem } from '../data/sidebar-data';

export type NavItemProps = {
  /** Navigation item to render. */
  item: SidebarItem;
};

/**
 * Renders a single sidebar navigation link using the shared sidebar primitives.
 */
export function NavItem({ item }: NavItemProps) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isActive = item.end
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.label}
        className='data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary data-[active=true]:hover:text-sidebar-primary-foreground'
      >
        <Link
          to={item.to}
          activeOptions={{ exact: item.end }}
        >
          <item.icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
      {'badge' in item && item.badge && (
        <SidebarMenuBadge className='peer-data-[active=true]/menu-button:text-sidebar-primary-foreground'>
          {item.badge}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
