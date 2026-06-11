import { Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { PageState } from '@/components/shared/app-page-state';
import { useTranslation } from 'react-i18next';

export const SignInPage = lazy(() =>
  import('@/pages/auth/SignInPage').then((module) => ({
    default: module.SignInPage,
  })),
);

export const SignUpPage = lazy(() =>
  import('@/pages/auth/SignUpPage').then((module) => ({
    default: module.SignUpPage,
  })),
);

export const ForgotPasswordPage = lazy(() =>
  import('@/pages/auth/ForgotPasswordPage').then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);

export const OTPPage = lazy(() =>
  import('@/pages/auth/OTPPage').then((module) => ({
    default: module.OTPPage,
  })),
);

export const DashboardPage = lazy(() =>
  import('@/pages/dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
);

export const ProductsPage = lazy(() =>
  import('@/pages/products/ProductsPage').then((module) => ({
    default: module.ProductsPage,
  })),
);

export const ProductDetailPage = lazy(() =>
  import('@/pages/products/ProductDetailPage').then((module) => ({
    default: module.ProductDetailPage,
  })),
);

export const OrdersPage = lazy(() =>
  import('@/pages/orders/OrdersPage').then((module) => ({
    default: module.OrdersPage,
  })),
);

export const OrderDetailPage = lazy(() =>
  import('@/pages/orders/OrderDetailPage').then((module) => ({
    default: module.OrderDetailPage,
  })),
);

export const CategoriesPage = lazy(() =>
  import('@/pages/categories/CategoriesPage').then((module) => ({
    default: module.CategoriesPage,
  })),
);

export const ProductCreatePage = lazy(() =>
  import('@/pages/products/ProductFormPage').then(({ ProductFormPage }) => ({
    default: function ProductCreatePage() {
      return <ProductFormPage mode='create' />;
    },
  })),
);

export const ProductEditPage = lazy(() =>
  import('@/pages/products/ProductFormPage').then(({ ProductFormPage }) => ({
    default: function ProductEditPage() {
      return <ProductFormPage mode='edit' />;
    },
  })),
);

export const InventoryPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function InventoryPage() {
      return <ModulePage moduleId='inventory' />;
    },
  })),
);

export const InventoryMovementsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function InventoryMovementsPage() {
      return <ModulePage moduleId='inventory-movements' />;
    },
  })),
);

export const ReturnsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function ReturnsPage() {
      return <ModulePage moduleId='returns' />;
    },
  })),
);

export const CustomersPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function CustomersPage() {
      return <ModulePage moduleId='customers' />;
    },
  })),
);

export const PromotionsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function PromotionsPage() {
      return <ModulePage moduleId='promotions' />;
    },
  })),
);

export const ShippingPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function ShippingPage() {
      return <ModulePage moduleId='shipping' />;
    },
  })),
);

export const ReportsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function ReportsPage() {
      return <ModulePage moduleId='reports' />;
    },
  })),
);

export const StaffPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function StaffPage() {
      return <ModulePage moduleId='staff' />;
    },
  })),
);

export const RolesPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function RolesPage() {
      return <ModulePage moduleId='roles' />;
    },
  })),
);

export const SettingsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function SettingsPage() {
      return <ModulePage moduleId='settings' />;
    },
  })),
);

export const AuditLogsPage = lazy(() =>
  import('@/pages/production/ModulePage').then(({ ModulePage }) => ({
    default: function AuditLogsPage() {
      return <ModulePage moduleId='audit-logs' />;
    },
  })),
);

export function RootRouteComponent() {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className='flex min-h-svh items-center justify-center bg-muted/30 p-6'>
          <PageState
            variant='loading'
            title={t('loading.sessionTitle')}
            description={t('loading.authDescription')}
            className='w-full max-w-md'
          />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}
