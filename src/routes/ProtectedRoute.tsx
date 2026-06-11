import { Navigate, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/routes';
import { PageState } from '@/components/shared/app-page-state';
import { useTranslation } from 'react-i18next';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className='flex min-h-svh items-center justify-center bg-muted/30 p-6'>
        <PageState
          variant='loading'
          title={t('loading.sessionTitle')}
          description={t('loading.sessionDescription')}
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
