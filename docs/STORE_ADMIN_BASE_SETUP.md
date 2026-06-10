# Store Admin Base Setup

## Goal

This project is the active Store Admin project. The setup adapts the shadcn-admin base memory into the current codebase without forcing a full router/framework migration.

## Current Technology

- Vite
- React
- TypeScript
- React Router DOM
- Zustand
- shadcn/ui components
- Tailwind CSS v4
- Radix UI
- lucide-react
- react-hook-form
- zod

## Architecture Decision

The shadcn-admin memory recommends:

- stable app shell
- data-driven sidebar
- business modules separated by feature
- reusable UI primitives
- clear dashboard and table/list patterns

This project currently uses `react-router-dom`, not TanStack Router. The base setup keeps React Router to avoid a disruptive migration.

## Setup Applied

### UI Shell Fixes

Applied after the full project review:

- Removed the unused Vite template `App.css` import from `src/App.tsx`.
- Deleted the stale `src/App.css` file to avoid future global CSS side effects.
- Added base `body` and `#root` layout resets in `src/index.css`.
- Updated `src/layouts/MainLayout.tsx` so `SidebarInset` is the actual content shell beside the sidebar.
- Added `min-w-0` and overflow boundaries to prevent page content from sliding under or overflowing behind the fixed sidebar.
- Replaced the nested `<main>` inside `SidebarInset` with a scrollable content `<div>`.
- Added `SidebarRail` to the shared sidebar for safer collapse/expand behavior.

### Sidebar

Created a shared sidebar module:

- `src/components/shared/app-sidebar/AppSidebar.tsx`
- `src/components/shared/app-sidebar/data/sidebar-data.ts`
- `src/components/shared/app-sidebar/components/NavItem.tsx`
- `src/components/shared/app-sidebar/components/UserMenu.tsx`

The old `src/components/AppSidebar.tsx` now re-exports the shared sidebar, so existing layout imports continue to work.

Sidebar groups:

- Commerce: Overview, Products, Orders, Categories
- Operations: Inventory, Fulfillment, Customers, Reports
- System: Store Settings

### Main Layout

Updated `src/layouts/MainLayout.tsx`:

- sticky top bar
- sidebar trigger
- workspace title
- search action
- notification and settings buttons
- consistent content background and height

### Dashboard

Updated `src/pages/dashboard/DashboardPage.tsx`:

- Store Overview title
- KPI cards for revenue, orders, customers, and low stock
- deterministic revenue trend visualization
- recent orders list
- export report action

### Store Pages

Updated:

- `src/pages/orders/OrdersPage.tsx`
- `src/pages/products/ProductsPage.tsx`
- `src/pages/categories/CategoriesPage.tsx`

Each page now has practical Store Admin base content instead of placeholder text.

Added:

- `src/components/shared/layout/PageShell.tsx`

`PageShell` standardizes page width, padding, header layout, descriptions, and action slots across setup-level pages.

### Auth Compatibility

Added:

- `src/components/shared/auth/index.ts`
- `src/components/shared/auth/app-social-auth/AppSocialAuth.tsx`

Auth components now export through the shared auth barrel while keeping each app component in its own folder.

## Preserved

- Existing route config in `src/routes/index.tsx`
- Existing route constants in `src/constants/routes.ts`
- Existing auth guard structure
- Existing Zustand auth store
- Existing shadcn/ui component setup
- Existing package manager and dependency choices

## Next Recommended Work

1. Add real data table patterns for Products and Orders.
2. Add product create/edit drawer.
3. Add order details drawer.
4. Add inventory low-stock workflow.
5. Add customer module and route.
6. Add store settings route.
7. Add query layer when APIs are available.
8. Add focused tests after business logic is introduced.

## Verification

Run:

```bash
yarn lint
yarn build
```

or use local binaries if package manager commands are unavailable:

```bash
./node_modules/.bin/eslint .
./node_modules/.bin/tsc -b
./node_modules/.bin/vite build
```
