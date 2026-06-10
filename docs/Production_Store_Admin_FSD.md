# Production Store Admin FSD

## 1. Purpose

This document defines the functional scope, architecture target, production
requirements, and delivery rules for the Store Admin project.

The previous version covered the main business domains, but it was not enough
for a production build because it did not define API contracts, RBAC rules,
module ownership, state transitions, validation, error handling, testing,
security, observability, or a realistic migration path from the current source.

This version is both:

- a business FSD for the retail admin product, and
- an implementation guide for turning the current React/Vite codebase into a
  production-ready admin application.

## 2. Current Source Baseline

As of this document update, the repository is a Store Admin base application,
not a complete production admin system.

Implemented baseline:

- Vite, React, TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, lucide-react.
- React Router DOM route setup.
- Public auth layout and protected main layout.
- Zustand auth store with persisted mock token.
- Sign in, sign up, forgot password, OTP pages with React Hook Form and Zod.
- Main admin shell with sidebar, sticky top bar, search action, notification
  action, and profile summary.
- Static dashboard, products, orders, and categories pages.
- Shared UI primitives under `src/components/ui`.
- Shared app modules under `src/components/shared`.

Not production-ready yet:

- Auth is mock-only and stores a fake token.
- No API client, request interceptor, response normalization, or typed service
  layer.
- No TanStack Query provider or query hooks for server state.
- No backend error model or API contract.
- No real RBAC/permission checks.
- No data tables with pagination, filters, sorting, selection, or bulk actions.
- No create/edit/detail workflows for products, categories, inventory, orders,
  customers, promotions, staff, or settings.
- No test suite beyond TypeScript/lint/build validation.
- No observability, audit log integration, environment validation, or CI/CD
  production gates.

## 3. Product Scope

The admin system manages the operational back office of a retail or clothing
store. It should support catalog setup, inventory control, order fulfillment,
customer operations, promotions, reporting, staff permissions, and auditability.

Core domains:

- Authentication and authorization
- Dashboard
- Product, variant, and SKU management
- Category and merchandising management
- Inventory and warehouse operations
- Order and fulfillment management
- Payment, return, and refund management
- Customer management
- Promotion and discount management
- Shipping provider management
- Staff, role, and permission management
- Reporting and analytics
- Store settings
- Audit logs

## 4. Production Principles

Implementation should follow these rules:

- Keep the current React Router DOM setup unless a dedicated migration ticket
  is created. The package may contain TanStack Router, but the active source
  uses React Router DOM.
- Use TanStack Query for all server state after APIs are introduced.
- Keep local UI state in React component state or small colocated hooks.
- Keep global client state limited to auth/session, UI preferences, and
  cross-page app state that truly needs to be shared.
- Use React Hook Form plus Zod for all forms.
- Reuse shadcn/ui primitives and existing shared components before creating new
  UI building blocks.
- Keep pages thin. Pages compose shell, route-level loading/error boundaries,
  widgets, and feature workflows.
- Keep business workflows in feature modules.
- Keep reusable business types, schemas, queries, and display helpers in entity
  modules.
- Never rely on mock data for production pages. Mocks are allowed only behind a
  clearly named development flag.
- Every production module must have typed API contracts, loading states, empty
  states, error states, and permission-aware UI.

## 5. Target Frontend Architecture

The current source does not need an immediate folder migration, but new work
should move toward this structure incrementally.

```text
src/
+-- app/
|   +-- providers/
|   +-- router/
|   +-- config/
|   +-- error-boundary/
+-- pages/
|   +-- dashboard/
|   +-- products/
|   +-- categories/
|   +-- inventory/
|   +-- orders/
|   +-- customers/
|   +-- promotions/
|   +-- reports/
|   +-- settings/
+-- widgets/
|   +-- admin-sidebar/
|   +-- admin-header/
|   +-- data-table/
|   +-- metric-card/
|   +-- activity-feed/
+-- features/
|   +-- auth/
|   +-- product-create/
|   +-- product-update/
|   +-- product-archive/
|   +-- category-sort/
|   +-- inventory-adjust/
|   +-- order-cancel/
|   +-- order-refund/
|   +-- promotion-create/
|   +-- staff-invite/
|   +-- report-export/
+-- entities/
|   +-- user/
|   +-- role/
|   +-- product/
|   +-- category/
|   +-- sku/
|   +-- inventory/
|   +-- order/
|   +-- payment/
|   +-- customer/
|   +-- promotion/
|   +-- audit-log/
+-- shared/
    +-- api/
    +-- config/
    +-- hooks/
    +-- lib/
    +-- schemas/
    +-- types/
    +-- ui/
    +-- assets/
```

Migration rule:

- Do not move existing code only for folder purity.
- When a page becomes API-backed or gains complex workflows, extract the new
  business logic into `features` and `entities`.
- Keep compatibility exports if an import path is already used in the app.
- Add module-level barrel exports only when they reduce import drift. Avoid one
  large shared barrel that hides ownership.

## 6. Application Shell

The admin shell is the primary workspace for authenticated users.

Required shell behavior:

- Left sidebar with grouped navigation.
- Collapsible sidebar with accessible labels and stable layout dimensions.
- Header with page context, global search entry point, notifications, and user
  menu.
- Scrollable main content area that never slides under the sidebar.
- Responsive mobile behavior using the existing shadcn sidebar primitives.
- Active route highlighting driven by route constants.
- Navigation visibility filtered by permissions.

Current navigation groups:

- Commerce: Overview, Products, Orders, Categories
- Operations: Inventory, Fulfillment, Customers, Reports
- System: Store Settings

Production navigation target:

- Dashboard
- Products
- Categories
- Inventory
- Orders
- Returns
- Customers
- Promotions
- Shipping
- Reports
- Staff and Roles
- Settings
- Audit Logs

## 7. Route Map

Current routes:

```text
/sign-in
/sign-up
/forgot-password
/otp
/
/products
/orders
/categories
*
```

Production routes:

```text
/                                  Dashboard
/products                          Product list
/products/new                      Create product
/products/:productId               Product detail
/products/:productId/edit          Edit product
/categories                        Category tree/list
/inventory                         Inventory overview
/inventory/movements               Stock movement log
/orders                            Order list
/orders/:orderId                   Order detail
/returns                           Return/refund list
/customers                         Customer list
/customers/:customerId             Customer detail
/promotions                        Promotion/coupon list
/shipping                          Shipping rules/providers
/reports                           Reports hub
/staff                             Staff list
/roles                             Role and permission management
/settings                          Store settings
/audit-logs                        Audit log viewer
```

Route requirements:

- Protected routes must verify session state before rendering business data.
- Each route must have page-level loading, empty, error, and forbidden states.
- Each route must define a required permission key.
- Unknown routes must render the not-found page.
- Unauthorized users must be redirected to sign in.
- Authenticated users without permission must see a 403-style page, not a 404.

## 8. Authentication

Required auth flows:

- Sign in by email and password.
- Sign up or invite acceptance, depending on backend policy.
- Forgot password.
- OTP or verification code.
- Session refresh.
- Logout.
- Optional social auth only if backend supports it.

Production session requirements:

- Replace the mock token with a real auth API.
- Prefer secure HTTP-only refresh cookies with short-lived access tokens.
- If access tokens are kept in memory, restore sessions through refresh.
- If any token is persisted in browser storage, document the security tradeoff
  and keep TTL short.
- Clear session state on 401, expired refresh, logout, or account deactivation.
- Auth APIs must return the user profile, role list, permission keys, and store
  context needed to render the admin shell.

Minimum auth API contract:

```ts
type SignInRequest = {
  email: string;
  password: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  permissions: string[];
};

type SignInResponse = {
  accessToken: string;
  user: AuthUser;
};
```

## 9. Roles and Permissions

Default roles:

- Owner
- Admin
- Store Manager
- Warehouse Staff
- Customer Support
- Accountant
- Marketing

Permission naming convention:

```text
domain.action
```

Examples:

```text
dashboard.read
product.read
product.create
product.update
product.archive
product.delete
category.read
category.update
inventory.read
inventory.adjust
order.read
order.update
order.cancel
order.refund
customer.read
promotion.manage
report.view
staff.invite
role.manage
audit.read
setting.manage
```

RBAC rules:

- Permission checks must exist at route level and action level.
- Hidden buttons are not enough. Backend APIs must enforce permissions too.
- Sidebar items must be generated from route metadata and permission keys.
- Role management must support assigning, revoking, and auditing permissions.
- Destructive actions require confirmation and audit log entries.

## 10. API Layer

Required frontend API structure:

```text
src/shared/api/
+-- client.ts
+-- errors.ts
+-- pagination.ts
+-- query-client.ts
```

Client requirements:

- Read base URL from `VITE_API_BASE_URL`.
- Attach `Authorization` header when an access token is available.
- Attach request ID when provided by the backend or generated client-side.
- Normalize backend errors into a single frontend error shape.
- Handle 401 centrally.
- Handle network timeout and retry policy consistently.
- Never call `fetch` directly from page components.

Standard list request:

```ts
type ListRequest = {
  page: number;
  pageSize: number;
  search?: string;
  sort?: string;
  filters?: Record<string, string | number | boolean | string[]>;
};
```

Standard list response:

```ts
type ListResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
```

Standard API error:

```ts
type ApiError = {
  status: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  requestId?: string;
};
```

## 11. Data Table Standard

Production list pages must use one reusable table pattern.

Required table capabilities:

- Server-side pagination.
- Server-side sorting.
- Search with debounced query state.
- Column filters.
- Status filter chips or select controls.
- Row action menu.
- Bulk selection when bulk actions exist.
- Empty state for no data.
- Empty state for filtered data.
- Loading skeleton.
- Error state with retry.
- Responsive horizontal scroll for dense data.
- URL-synced query params for page, page size, sort, search, and filters.

Recommended stack:

- TanStack Table for table state.
- TanStack Query for data fetching and cache invalidation.
- shadcn/ui table, dropdown, checkbox, button, badge, input, select, and dialog
  primitives.

## 12. Dashboard

Purpose:

- Give operators a fast overview of sales, orders, fulfillment, customers, and
  inventory risk.

Production widgets:

- Revenue today.
- Revenue this month.
- Orders today.
- Pending orders.
- Low-stock SKUs.
- Refund requests.
- Active customers.
- Revenue trend.
- Order trend.
- Top-selling products.
- Sales by category.
- Payment method distribution.
- Recent activities.
- Inventory alerts.
- Failed payments.

Acceptance criteria:

- Dashboard data is fetched from APIs, not hardcoded arrays.
- Date ranges are explicit and timezone-aware.
- Metric cards include value, comparison, trend direction, and loading state.
- Widgets degrade gracefully when a permission or data source is unavailable.
- Export report action triggers a real backend export or is hidden.

## 13. Product, Variant, and SKU Management

Product fields:

- ID
- Name
- Slug
- Description
- Brand
- Category IDs
- Gender or audience
- Material
- Tags
- Images
- Status
- SEO title
- SEO description
- Created at
- Updated at

Product statuses:

```text
draft
active
inactive
out_of_stock
archived
```

SKU fields:

- ID
- Product ID
- SKU
- Barcode
- Size
- Color
- Material
- Price
- Sale price
- Cost price
- On-hand stock
- Reserved stock
- Available stock
- Weight
- Image
- Status

Variant requirements:

- Product can have one or many SKU variants.
- Variant attributes must be configurable by product category.
- SKU code must be unique.
- Price and sale price must validate currency and sale period.
- Product archive must not delete historical order references.

Required workflows:

- Product list.
- Product detail.
- Create product.
- Edit product.
- Archive product.
- Restore product.
- Bulk status update.
- CSV import.
- CSV export.
- Image upload.
- SEO metadata update.

Acceptance criteria:

- Product list uses the standard data table.
- Product forms use React Hook Form and Zod.
- Create/edit flows validate required images, category, SKU uniqueness, and
  price constraints.
- Archive and delete-like actions require confirmation.
- Changes invalidate product, category, inventory, and dashboard queries as
  needed.

## 14. Category and Merchandising Management

Purpose:

- Organize products into a tree or curated merchandising groups.

Required capabilities:

- Category tree.
- Category list view.
- Create, edit, archive category.
- Drag/drop or explicit sort order.
- Parent/child category selection.
- Category image.
- SEO metadata.
- Product count and revenue summary.
- Visibility status for storefront/admin navigation.

Category fields:

- ID
- Parent ID
- Name
- Slug
- Description
- Image URL
- Sort order
- Status
- SEO title
- SEO description
- Product count
- Created at
- Updated at

Acceptance criteria:

- Category sort operations are persisted through an API.
- Category tree handles empty, loading, and failed states.
- Deleting or archiving a category with products requires backend validation.
- Sidebar category navigation can be API-backed, but must fall back only in
  development or documented demo mode.

## 15. Inventory and Warehouse

Inventory formula:

```text
available_stock = on_hand_stock - reserved_stock
```

Core operations:

- Stock in.
- Stock out.
- Manual adjustment.
- Warehouse transfer.
- Inventory count.
- Reservation release.
- Low-stock threshold update.

Stock movement fields:

- ID
- SKU ID
- Warehouse ID
- Type
- Quantity delta
- Previous quantity
- New quantity
- Reason
- Reference type
- Reference ID
- Actor ID
- Created at

Acceptance criteria:

- Every stock change creates an immutable movement record.
- Manual adjustments require a reason.
- Reserved stock is controlled by order lifecycle events.
- Low-stock alerts are based on configurable thresholds.
- Inventory pages never allow negative available stock unless backend policy
  explicitly permits backorders.

## 16. Order and Fulfillment Management

Order statuses:

```text
pending
confirmed
paid
packing
shipped
delivered
cancelled
returned
refunded
```

Fulfillment statuses:

```text
unfulfilled
ready_to_pack
packing
shipped
delivered
failed
returned
```

Required workflows:

- Order list.
- Order detail.
- Timeline.
- Confirm order.
- Cancel order.
- Mark packing.
- Create shipment.
- Update tracking code.
- Print invoice.
- Print shipping label.
- Refund order.

Acceptance criteria:

- Status transitions are enforced by a state machine or backend contract.
- Invalid transitions are disabled in UI and rejected by API.
- Order detail shows customer, items, payments, fulfillment, notes, and audit
  timeline.
- Inventory reservation and release behavior is visible in the timeline.
- Order list supports status, payment, date range, customer, and fulfillment
  filters.

## 17. Payment, Return, and Refund

Payment statuses:

```text
unpaid
authorized
paid
partially_refunded
refunded
failed
expired
```

Return statuses:

```text
requested
approved
rejected
received
restocked
refunded
closed
```

Return reasons:

- Wrong size.
- Wrong color.
- Damaged product.
- Changed mind.
- Late delivery.
- Other.

Required capabilities:

- View transaction details.
- View payment provider response summary.
- Create return request.
- Approve or reject return.
- Restock returned items.
- Issue partial refund.
- Issue full refund.
- Link refunds to payment provider transaction IDs.

Acceptance criteria:

- Refund amount cannot exceed refundable amount.
- Partial refund must specify line items or reason.
- Refund actions require permission and confirmation.
- Payment provider failures are surfaced with request ID or provider reference.

## 18. Customer Management

Customer fields:

- ID
- Name
- Email
- Phone
- Default address
- Total orders
- Total spending
- Last order date
- Segment
- Marketing consent
- Created at
- Updated at

Segments:

- New customer
- Returning customer
- VIP customer
- Inactive customer

Required capabilities:

- Customer list.
- Customer detail.
- Order history.
- Address view.
- Notes.
- Support timeline.
- Export customers with permission.

Acceptance criteria:

- PII fields are permission-gated.
- Customer exports are audited.
- Search supports email, phone, and name.
- Customer detail never exposes payment secrets.

## 19. Promotion and Discount Management

Promotion types:

- Percentage discount.
- Fixed amount discount.
- Free shipping.
- Buy X get Y.

Coupon fields:

- ID
- Code
- Type
- Value
- Start date
- End date
- Usage limit
- Usage count
- Minimum order amount
- Eligible products/categories
- Customer segment
- Status

Acceptance criteria:

- Coupon code is unique.
- Date range and usage limit validation happens on frontend and backend.
- Expired promotions are read-only unless reactivation is explicitly allowed.
- Promotion preview shows expected discount before save.

## 20. Shipping Management

Required capabilities:

- Shipping providers.
- Shipping zones.
- Shipping rules.
- Rate rules.
- Tracking management.
- Label generation.
- Failed shipment handling.

Acceptance criteria:

- Shipping provider credentials are never exposed in frontend code.
- Tracking links are generated from provider metadata.
- Shipment creation validates package weight, destination, and service type.

## 21. Staff, Roles, and Store Settings

Staff management:

- Staff list.
- Invite staff.
- Resend invite.
- Disable staff.
- Assign roles.
- View last login.
- Audit staff actions.

Store settings:

- Store profile.
- Currency.
- Timezone.
- Tax settings.
- Notification settings.
- Low-stock defaults.
- Branding assets.

Acceptance criteria:

- Only users with `staff.invite`, `role.manage`, or `setting.manage` can access
  sensitive settings.
- Role updates require confirmation.
- Timezone and currency changes warn about reporting impact.

## 22. Reporting and Analytics

Reports:

- Revenue by day, week, month, year.
- Sales by category.
- Sales by product.
- Inventory movement.
- Low-stock and dead-stock.
- Customer retention.
- Customer lifetime value.
- Refund rate.
- Promotion performance.

Requirements:

- Reports must support date range, export, and permission checks.
- Long-running exports should be asynchronous.
- Export files should expire after a backend-defined TTL.
- Revenue reports must define whether values are gross, net, tax-inclusive, or
  refund-adjusted.

## 23. Audit Logs

Audit log events must be created for sensitive actions.

Examples:

- User signed in.
- Staff invited.
- Role permissions changed.
- Product price updated.
- Product archived.
- Stock adjusted.
- Order cancelled.
- Refund issued.
- Customer data exported.
- Store settings changed.

Audit log fields:

- ID
- Actor ID
- Actor name
- Action
- Entity type
- Entity ID
- Before value
- After value
- IP address
- User agent
- Request ID
- Created at

Acceptance criteria:

- Audit logs are immutable.
- Audit log viewer is permission-gated.
- Sensitive values are masked.
- Audit list supports actor, action, entity, and date filters.

## 24. Form Standard

Every production form must define:

- Zod schema.
- Default values.
- Submit loading state.
- Field-level errors.
- API error mapping.
- Dirty-state confirmation when leaving a form with unsaved changes.
- Success toast or inline confirmation.
- Query invalidation after mutation.
- Accessibility labels and descriptions where needed.

Validation rules:

- Frontend validation improves UX but never replaces backend validation.
- Backend field errors must map back to the matching form fields.
- Unknown backend errors must show a safe generic message and request ID.

## 25. Error, Loading, and Empty States

Required states:

- Initial loading skeleton.
- Background refresh indicator for stale data.
- Empty state for no records.
- Empty state for filtered results.
- Forbidden state for missing permission.
- Not found state for missing entity.
- Recoverable error with retry.
- Fatal route error boundary.

Rules:

- Avoid blocking the full app shell for route-level fetches.
- Keep the shell visible while route content loads.
- Do not show mock data after a real API failure in production.
- Display request ID when the backend provides one.

## 26. Security Requirements

Frontend security:

- No secrets in frontend environment variables.
- Validate environment variables at app startup.
- Sanitize and encode user-generated content before display.
- Use Content Security Policy in deployment.
- Avoid `dangerouslySetInnerHTML` unless explicitly reviewed.
- Mask PII in tables unless permission allows full view.
- Disable actions while mutations are pending.
- Prevent double-submit on forms.
- Confirm destructive actions.

Backend/API security expectations:

- Enforce RBAC server-side.
- Use rate limiting on auth endpoints.
- Use secure cookies if cookie-based refresh is implemented.
- Use CSRF protection for cookie-authenticated mutations.
- Log sensitive operations with actor and request ID.

## 27. Accessibility and UX Requirements

Accessibility:

- Keyboard navigation for menus, dialogs, tables, and forms.
- Visible focus states.
- Proper labels for icon-only buttons.
- Dialogs must trap focus.
- Color contrast must meet WCAG AA.
- Form errors must be screen-reader accessible.

UX:

- Use compact, operational layouts for admin workflows.
- Tables should prioritize scanning and repeated actions.
- Use badges for statuses.
- Use icons for common toolbar actions.
- Keep page titles, descriptions, and primary actions consistent through
  `PageShell`.
- Avoid layout shift when data loads.

## 28. Performance Requirements

Targets:

- Initial admin shell should load quickly on a normal business laptop.
- Route-level code splitting should be added when modules become large.
- Lists must be server-paginated.
- Images must use optimized URLs or thumbnails.
- Long tables must avoid rendering thousands of rows at once.
- Expensive chart calculations should be memoized or moved server-side.
- Query caching and invalidation must be explicit.

React rules:

- Do not fetch data directly in render paths.
- Avoid recreating large arrays/objects in render when they drive expensive
  children.
- Keep table column definitions stable.
- Prefer composition over global state for page-local UI.
- Use optimistic updates only when rollback behavior is defined.

## 29. Observability

Production app should include:

- Client error reporting.
- API request IDs surfaced in error UI.
- Route change analytics if product analytics are required.
- Performance monitoring for page load and route transitions.
- Audit events from backend for sensitive operations.

Minimum logged context:

- Environment.
- Route.
- User ID when available.
- Store/tenant ID when available.
- Request ID.
- Error code.

Never log:

- Passwords.
- Tokens.
- Full payment data.
- Sensitive customer PII unless explicitly approved and masked.

## 30. Testing Strategy

Required checks:

- TypeScript build.
- ESLint.
- Vite production build.
- Unit tests for pure helpers and schemas.
- Component tests for shared forms, table controls, and permission guards.
- Query/mutation tests with mocked API responses.
- E2E tests for critical flows.

Critical E2E flows:

- Sign in and logout.
- Protected route redirect.
- Product create/edit/archive.
- Category create/sort/archive.
- Inventory adjustment.
- Order status update.
- Refund request.
- Staff invite and role assignment.

Recommended production validation command set:

```bash
yarn lint
yarn build
```

When tests are added:

```bash
yarn test
yarn test:e2e
```

## 31. Environment and Release Gates

Required environment variables:

```text
VITE_API_BASE_URL
VITE_APP_ENV
```

Optional environment variables:

```text
VITE_SENTRY_DSN
VITE_ANALYTICS_KEY
VITE_ENABLE_MOCKS
```

Release gates:

- No TypeScript errors.
- No lint errors.
- Production build passes.
- No mock auth in production.
- No `console.log` in committed production code except approved diagnostics.
- Environment variables validated.
- API error handling verified.
- Core E2E flows pass when test suite exists.
- Security review completed for auth, RBAC, PII, and destructive operations.

## 32. Delivery Roadmap

Phase 0 - Hardening current base:

- Add app providers for QueryClient and route error boundary.
- Add API client, API error model, and environment config.
- Replace mock sign-in with real auth contract or a documented mock flag.
- Add permission model to route metadata and sidebar.
- Add production-ready PageShell and shared state components.
- Fix documentation drift around shared component paths.

Phase 1 - Core commerce:

- Products API-backed list with standard data table.
- Product create/edit/archive workflows.
- Category API-backed list/tree and sort workflow.
- SKU and image upload support.

Phase 2 - Operations:

- Inventory overview.
- Stock movement log.
- Inventory adjustment workflow.
- Low-stock alert workflow.
- Warehouse support if backend supports multiple warehouses.

Phase 3 - Orders and money:

- Orders API-backed list.
- Order detail.
- Order timeline.
- Fulfillment status updates.
- Payment view.
- Return and refund workflows.

Phase 4 - Customers and promotions:

- Customer list/detail.
- Customer segments.
- Promotion/coupon list.
- Promotion create/edit.
- Promotion performance basics.

Phase 5 - Staff, settings, and audit:

- Staff invite/disable.
- Role and permission management.
- Store settings.
- Audit log viewer.

Phase 6 - Reporting and optimization:

- Reports hub.
- Async export flows.
- Observability.
- E2E coverage.
- Route-level code splitting and performance pass.

## 33. Definition of Done

A module is production-ready only when all items below are true:

- Route exists and is protected by permission metadata.
- Page uses production shell and consistent PageShell layout.
- API calls live outside page components.
- Query keys and invalidation are defined.
- Forms use React Hook Form and Zod.
- Lists use the standard data table pattern.
- Loading, empty, error, forbidden, and not-found states are implemented.
- Destructive actions require confirmation.
- Mutations show pending and success/error feedback.
- Backend field errors map to UI fields.
- Audit requirements are documented or implemented.
- TypeScript, lint, and production build pass.
- Tests are added when business logic or shared behavior is introduced.
- No mock data or mock auth is enabled in production.

## 34. Open Decisions

These decisions must be confirmed with backend/product before final production
implementation:

- Auth storage strategy: HTTP-only refresh cookie, bearer token, or hybrid.
- Whether sign up is public or invite-only.
- Whether the store is single-tenant or multi-tenant.
- Exact API pagination format.
- Exact backend error format.
- Currency, tax, and timezone policy.
- Product variant model and allowed attributes.
- Inventory warehouse model.
- Order cancellation and refund rules.
- Payment provider list.
- Shipping provider list.
- Audit retention period.
- Data export retention period.
