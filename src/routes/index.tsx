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
import { ProductDetailPage } from '@/pages/products/ProductDetailPage';
import { ProductFormPage } from '@/pages/products/ProductFormPage';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { OrderDetailPage } from '@/pages/orders/OrderDetailPage';
import { CategoriesPage } from '@/pages/categories/CategoriesPage';
import { ModulePage } from '@/pages/production/ModulePage';
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

const productNewRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCT_NEW,
  component: () => <ProductFormPage mode='create' />,
});

const productDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCT_DETAIL,
  component: ProductDetailPage,
});

const productEditRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCT_EDIT,
  component: () => <ProductFormPage mode='edit' />,
});

const ordersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.ORDERS,
  component: OrdersPage,
});

const orderDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.ORDER_DETAIL,
  component: OrderDetailPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CATEGORIES,
  component: CategoriesPage,
});

const inventoryRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.INVENTORY,
  component: () => <ModulePage moduleId='inventory' />,
});

const inventoryMovementsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.INVENTORY_MOVEMENTS,
  component: () => <ModulePage moduleId='inventory-movements' />,
});

const returnsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.RETURNS,
  component: () => <ModulePage moduleId='returns' />,
});

const customersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CUSTOMERS,
  component: () => <ModulePage moduleId='customers' />,
});

const customerDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CUSTOMER_DETAIL,
  component: () => <ModulePage moduleId='customers' />,
});

const promotionsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PROMOTIONS,
  component: () => <ModulePage moduleId='promotions' />,
});

const shippingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.SHIPPING,
  component: () => <ModulePage moduleId='shipping' />,
});

const reportsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.REPORTS,
  component: () => <ModulePage moduleId='reports' />,
});

const staffRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.STAFF,
  component: () => <ModulePage moduleId='staff' />,
});

const rolesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.ROLES,
  component: () => <ModulePage moduleId='roles' />,
});

const settingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.SETTINGS,
  component: () => <ModulePage moduleId='settings' />,
});

const auditLogsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.AUDIT_LOGS,
  component: () => <ModulePage moduleId='audit-logs' />,
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
      productNewRoute,
      productDetailRoute,
      productEditRoute,
      ordersRoute,
      orderDetailRoute,
      categoriesRoute,
      inventoryRoute,
      inventoryMovementsRoute,
      returnsRoute,
      customersRoute,
      customerDetailRoute,
      promotionsRoute,
      shippingRoute,
      reportsRoute,
      staffRoute,
      rolesRoute,
      settingsRoute,
      auditLogsRoute,
    ]),
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
