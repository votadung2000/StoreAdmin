import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
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

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundPage,
});

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicRoute,
});

const authLayoutRoute = createRoute({
  getParentRoute: () => publicRoute,
  id: 'auth-layout',
  component: AuthLayout,
});

const signInRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: ROUTES.AUTH.SIGN_IN,
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: ROUTES.AUTH.SIGN_UP,
  component: SignUpPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: ROUTES.AUTH.FORGOT_PASSWORD,
  component: ForgotPasswordPage,
});

const otpRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: ROUTES.AUTH.OTP,
  component: OTPPage,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedRoute,
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: 'main-layout',
  component: MainLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.DASHBOARD,
  component: DashboardPage,
});

const productsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCTS,
  component: ProductsPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.ORDERS,
  component: OrdersPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CATEGORIES,
  component: CategoriesPage,
});

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    authLayoutRoute.addChildren([
      signInRoute,
      signUpRoute,
      forgotPasswordRoute,
      otpRoute,
    ]),
  ]),
  protectedRoute.addChildren([
    mainLayoutRoute.addChildren([
      dashboardRoute,
      productsRoute,
      ordersRoute,
      categoriesRoute,
    ]),
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
