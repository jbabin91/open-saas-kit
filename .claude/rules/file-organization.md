---
paths: '**'
---

# File Organization Conventions

## Monorepo Structure

```sh
open-saas-kit/
├── apps/
│   └── web/                 # TanStack Start web application
├── packages/
│   ├── auth/                # Better Auth configuration
│   ├── config/              # Shared config (env validation)
│   ├── database/            # Drizzle ORM + schema
│   ├── ui/                  # React Aria components
│   ├── eslint-config/       # Shared ESLint config
│   └── typescript-config/   # Shared TypeScript config
└── turbo.json               # Turborepo config
```

## Web App Structure

```sh
apps/web/src/
├── assets/           # Static assets (images, fonts)
├── components/       # React components
│   ├── layout/       # Layout components (header, sidebar)
│   └── shared/       # Shared app-specific components
├── hooks/            # Custom React hooks
├── modules/          # Domain-specific logic
├── providers/        # React context providers
├── routes/           # File-based routing (TanStack Router)
│   ├── _app/         # Protected app routes (auth required)
│   ├── _auth/        # Auth routes (login, register)
│   ├── _public/      # Public routes
│   └── api/          # API endpoints
├── styles/           # Global CSS
└── test/             # Test utilities
```

## Route Organization

### Route Groups

| Directory  | Purpose                              | Auth Required |
| ---------- | ------------------------------------ | ------------- |
| `_public/` | Public pages (landing, marketing)    | No            |
| `_auth/`   | Auth pages (login, register, logout) | No            |
| `_app/`    | Protected application pages          | Yes           |
| `api/`     | REST API endpoints                   | Varies        |

### Route File Patterns

```sh
routes/
├── __root.tsx        # Root layout (shell, meta, CSS)
├── index.tsx         # Homepage (/)
├── _public/
│   └── route.tsx     # Public layout
├── _auth/
│   ├── route.tsx     # Auth layout (no guards, just layout)
│   ├── login.tsx     # /login
│   └── register.tsx  # /register
├── _app/
│   ├── route.tsx     # Auth guard + app layout
│   ├── index.tsx     # /app (dashboard)
│   └── settings.tsx  # /app/settings
└── api/
    ├── posts.ts      # /api/posts
    └── auth/$.ts     # /api/auth/* (Better Auth)
```

### route.tsx Pattern

The `route.tsx` file inside a route group folder serves dual purpose:

1. **Auth guards** via `beforeLoad`
2. **Layout** via `component`

```tsx
// _app/route.tsx
export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: '/login' });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

## Package Structure

### auth Package

```sh
packages/auth/
├── src/
│   ├── client.ts      # Auth client (React hooks)
│   ├── server.ts      # Auth server (Better Auth config)
│   └── index.ts       # Public exports
└── package.json
```

### database Package

```sh
packages/database/
├── src/
│   ├── client.ts      # Drizzle client
│   ├── schema/        # Drizzle schemas
│   │   ├── users.ts
│   │   ├── sessions.ts
│   │   ├── accounts.ts
│   │   ├── verifications.ts
│   │   └── index.ts
│   └── index.ts       # Public exports
├── drizzle.config.ts  # Drizzle config
└── package.json
```

### ui Package

```sh
packages/ui/
├── src/
│   ├── button.tsx     # Button component
│   ├── card.tsx       # Card component
│   ├── input.tsx      # Input component
│   ├── utils.ts       # cn() utility
│   ├── icons.ts       # Centralized icons (to create)
│   └── index.ts       # Public exports
└── package.json
```

## Component Placement Decision Tree

```text
Is it a shared UI primitive (button, input, card)?
  → Yes: packages/ui/src/

Is it used by multiple routes in the web app?
  → Yes: apps/web/src/components/shared/

Is it a layout component (header, sidebar)?
  → Yes: apps/web/src/components/layout/

Is it specific to one module (e.g., auth forms)?
  → Yes: apps/web/src/modules/[module]/components/

Is it only used in one route?
  → Keep it in the route file or route-local folder
```

## Naming Conventions

| Item         | Convention       | Example          |
| ------------ | ---------------- | ---------------- |
| Files        | kebab-case       | `login-form.tsx` |
| Components   | PascalCase       | `LoginForm`      |
| Functions    | camelCase        | `validateUser`   |
| Constants    | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`  |
| Types        | PascalCase       | `UserProfile`    |
| Route params | $prefix          | `$id.tsx`        |
| Packages     | @oakoss/name     | `@oakoss/ui`     |

## Importing Across Packages

Always use package names, not relative paths:

```ts
// Good
import { Button } from '@oakoss/ui';
import { db } from '@oakoss/database';
import { auth } from '@oakoss/auth/server';
import { env } from '@oakoss/config/env';

// Bad
import { Button } from '../../../packages/ui/src/button';
```

## When to Create a Package

Create a new package when:

1. **Shared across apps** - Logic used by multiple apps
2. **Domain isolation** - Self-contained domain (auth, email, payments)
3. **Independent versioning** - Could be versioned separately
4. **Type isolation** - Keeps types scoped to the domain

Don't create a package for:

1. App-specific logic
2. Simple utilities (keep in the app's `lib/`)
3. Components only used in one app
