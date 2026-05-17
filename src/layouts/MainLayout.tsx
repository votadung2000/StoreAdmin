import { Outlet } from 'react-router-dom';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export const MainLayout = () => {
  return (
    <SidebarProvider className='flex-row'>
      <AppSidebar />

      <SidebarInset>
        {/* Top bar */}
        <header className='flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4'>
          <SidebarTrigger className='text-muted-foreground hover:text-foreground' />
          <div className='h-5 w-px bg-border' />
          <span className='text-sm text-muted-foreground'>Store Admin</span>
        </header>

        {/* Page content */}
        <main className='flex-1 overflow-y-auto bg-muted/30'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
