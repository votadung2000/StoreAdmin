import { Navigate, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/routes';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
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
