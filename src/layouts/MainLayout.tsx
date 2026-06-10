import { Outlet } from 'react-router-dom';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export const MainLayout = () => {
  return (
    <SidebarProvider className='min-h-svh w-full overflow-hidden bg-muted/30'>
      <AppSidebar />

      <SidebarInset className='min-w-0 overflow-hidden bg-muted/30'>
        <header className='sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
          <SidebarTrigger className='text-muted-foreground hover:text-foreground' />
          <div className='h-5 w-px bg-border' />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium'>Store Admin</p>
            <p className='truncate text-xs text-muted-foreground'>
              Commerce operations workspace
            </p>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='hidden gap-2 md:flex'
          >
            <Search size={16} />
            Search
          </Button>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Notifications'
          >
            <Bell size={18} />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Settings'
          >
            <Settings size={18} />
          </Button>
        </header>

        <div className='min-h-0 flex-1 overflow-y-auto'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
