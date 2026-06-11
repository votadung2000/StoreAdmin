import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { PublicRoute } from '@/routes/PublicRoute';
import {
  AuditLogsPage,
  CategoriesPage,
  CustomersPage,
  DashboardPage,
  ForgotPasswordPage,
  InventoryMovementsPage,
  InventoryPage,
  OrderDetailPage,
  OrdersPage,
  OTPPage,
  ProductCreatePage,
  ProductDetailPage,
  ProductEditPage,
  ProductsPage,
  PromotionsPage,
  ReportsPage,
  ReturnsPage,
  RolesPage,
  RootRouteComponent,
  SettingsPage,
  ShippingPage,
  SignInPage,
  SignUpPage,
  StaffPage,
} from '@/routes/route-components';

const rootRoute = createRootRoute({
  component: RootRouteComponent,
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
  component: ProductCreatePage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCT_DETAIL,
  component: ProductDetailPage,
});

const productEditRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PRODUCT_EDIT,
  component: ProductEditPage,
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
  component: InventoryPage,
});

const inventoryMovementsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.INVENTORY_MOVEMENTS,
  component: InventoryMovementsPage,
});

const returnsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.RETURNS,
  component: ReturnsPage,
});

const customersRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CUSTOMERS,
  component: CustomersPage,
});

const customerDetailRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.CUSTOMER_DETAIL,
  component: CustomersPage,
});

const promotionsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.PROMOTIONS,
  component: PromotionsPage,
});

const shippingRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.SHIPPING,
  component: ShippingPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.REPORTS,
  component: ReportsPage,
});

const staffRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.STAFF,
  component: StaffPage,
});

const rolesRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.ROLES,
  component: RolesPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.SETTINGS,
  component: SettingsPage,
});

const auditLogsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: ROUTES.MAIN.AUDIT_LOGS,
  component: AuditLogsPage,
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
