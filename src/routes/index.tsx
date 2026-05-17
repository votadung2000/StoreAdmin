import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { OTPPage } from '@/pages/auth/OTPPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ProductsPage } from '@/pages/products/ProductsPage';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { CategoriesPage } from '@/pages/categories/CategoriesPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { PublicRoute } from '@/routes/PublicRoute';

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.SIGN_IN,
            element: <SignInPage />,
          },
          {
            path: ROUTES.AUTH.SIGN_UP,
            element: <SignUpPage />,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: ROUTES.AUTH.OTP,
            element: <OTPPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.MAIN.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.MAIN.PRODUCTS,
            element: <ProductsPage />,
          },
          {
            path: ROUTES.MAIN.ORDERS,
            element: <OrdersPage />,
          },
          {
            path: ROUTES.MAIN.CATEGORIES,
            element: <CategoriesPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
