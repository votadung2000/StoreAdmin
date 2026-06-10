import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';

type UserMenuProps = {
  collapsed: boolean;
  user: {
    name: string;
    email: string;
  };
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export const UserMenu = ({ collapsed, user }: UserMenuProps) => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2'>
        <Avatar className='h-9 w-9 rounded-lg'>
          <AvatarFallback className='rounded-lg'>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>{user.name}</p>
            <p className='truncate text-xs text-muted-foreground'>
              {user.email}
            </p>
          </div>
        )}
      </div>

      <Button
        variant='ghost'
        onClick={handleLogout}
        className='w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive'
      >
        <LogOut
          size={18}
          className='shrink-0'
        />
        {!collapsed && <span>Logout</span>}
      </Button>
    </div>
  );
};
