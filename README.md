# Store Admin

Commerce admin dashboard built with Vite, React, TypeScript, React Router, Tailwind CSS, and shadcn/ui.

## Base Setup

The project has been prepared as a Store Admin base:

- shared app sidebar
- commerce navigation
- store overview dashboard
- orders/products/categories base pages
- auth and main layouts
- shadcn/ui design primitives

See [Store Admin Base Setup](docs/STORE_ADMIN_BASE_SETUP.md) for implementation details and next steps.

## Commands

```bash
yarn install
yarn dev
yarn lint
yarn build
```

If `yarn` is unavailable in the current shell, use the local binaries:

```bash
./node_modules/.bin/vite
./node_modules/.bin/eslint .
./node_modules/.bin/tsc -b
./node_modules/.bin/vite build
```
