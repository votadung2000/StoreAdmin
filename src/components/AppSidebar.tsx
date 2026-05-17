import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  LogOut,
  Store,
} from 'lucide-react';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: ROUTES.MAIN.DASHBOARD,
    end: true,
  },
  {
    label: 'All Products',
    icon: Package,
    to: ROUTES.MAIN.PRODUCTS,
  },
  {
    label: 'Order List',
    icon: ShoppingCart,
    to: ROUTES.MAIN.ORDERS,
  },
  {
    label: 'Categories',
    icon: Tag,
    to: ROUTES.MAIN.CATEGORIES,
  },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <Sidebar
      collapsible='icon'
      className='border-r border-sidebar-border'
    >
      {/* Header */}
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-3 overflow-hidden'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Store size={18} />
          </div>
          {!isCollapsed && (
            <span className='font-semibold text-base tracking-tight truncate'>
              Store Admin
            </span>
          )}
        </div>
      </SidebarHeader>

      {/* Main nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      )
                    }
                  >
                    <item.icon
                      size={18}
                      className='shrink-0'
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Logout */}
      <SidebarFooter className='p-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className='w-full text-destructive hover:bg-destructive/10 hover:text-destructive'
              tooltip='Logout'
            >
              <LogOut
                size={18}
                className='shrink-0'
              />
              {!isCollapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
