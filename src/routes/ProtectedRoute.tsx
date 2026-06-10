import { Navigate, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/routes';
import { PageState } from '@/components/shared/app-page-state';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-muted/30 p-6'>
        <PageState
          variant='loading'
          title='Checking session'
          description='Preparing the admin workspace.'
          className='w-full max-w-md'
        />
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={ROUTES.AUTH.SIGN_IN}
      replace
    />
  );
};
