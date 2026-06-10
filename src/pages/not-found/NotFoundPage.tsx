import { ROUTES } from '@/constants/routes';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageState } from '@/components/shared/app-page-state';

export const NotFoundPage = () => {
  return (
    <div className='flex min-h-svh items-center justify-center bg-muted/30 p-6'>
      <PageState
        variant='empty'
        title='Page not found'
        description='The requested admin workspace route does not exist.'
        className='w-full max-w-lg'
      />
      <Button
        asChild
        className='fixed bottom-6'
      >
        <Link to={ROUTES.MAIN.DASHBOARD}>
          <ArrowLeft />
          Dashboard
        </Link>
      </Button>
    </div>
  );
};
