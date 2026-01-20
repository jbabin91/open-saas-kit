# Agent Instructions

Guidance for AI agents working in this TanStack Start + Turborepo monorepo.

## Commands

```bash
# Development
pnpm dev                    # Start all packages in dev mode
pnpm build                  # Build all packages
pnpm lint                   # Lint all packages
pnpm lint:fix               # Lint and auto-fix
pnpm typecheck              # Type check all packages
pnpm format                 # Format with Prettier
pnpm format:check           # Check formatting

# Testing
pnpm test                   # Run all tests
pnpm --filter web test      # Run tests in web app only
pnpm --filter web exec vitest run src/path/to/file.test.tsx  # Single test file
pnpm --filter web exec vitest run -t "test name"             # Single test by name

# Database (in @oakoss/database)
pnpm db:push                # Push schema to database (dev)
pnpm db:generate            # Generate migrations
pnpm db:migrate             # Run migrations (production)

# Infrastructure
docker-compose up -d        # Start PostgreSQL
```

## Architecture

```sh
apps/web/                   # TanStack Start app (SSR React)
packages/
├── auth/                   # Better Auth (server/client split)
├── config/                 # Zod-validated env vars
├── database/               # Drizzle ORM + PostgreSQL
├── eslint-config/          # Shared ESLint config
├── typescript-config/      # Shared TypeScript config
└── ui/                     # React Aria Components
```

## Code Style

### File Naming

- **kebab-case** for all files: `user-profile.tsx`, `get-posts.ts`
- Exception: Route params use `$`: `$id.tsx`, `$slug.tsx`
- Test files: `*.test.ts` or `*.test.tsx`

### Imports

```tsx
// 1. Sort imports automatically (enforced by eslint)
// 2. Use inline type imports
import { type User, getUser } from '@oakoss/database';

// 3. No relative parent imports - use aliases
import { Button } from '@/components/button'; // ✓
import { Button } from '../../../button'; // ✗

// 4. Workspace packages
import { db } from '@oakoss/database';
import { auth } from '@oakoss/auth/server';
import { env } from '@oakoss/config';
```

### TypeScript

```tsx
// Use `type` not `interface`
type User = { id: string; name: string }; // ✓
interface User {
  id: string;
  name: string;
} // ✗

// Prefix unused vars with underscore
function handler(_req: Request) {}

// Use strict equality
if (value === null) {
} // ✓
if (value == null) {
} // ✗

// Infer types from Drizzle schemas
type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;
```

### Object Keys

Sort object keys alphabetically (3+ keys):

```tsx
// ✓ Correct
const config = { a: 1, b: 2, c: 3 };

// ✗ Wrong
const config = { c: 3, a: 1, b: 2 };
```

### React Components

```tsx
// Function components with explicit return types optional
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <AriaButton className={cn(baseStyles, variants[variant])} {...props} />
  );
}

// Props types use intersection, not extension
type ButtonProps = { variant?: 'primary' | 'secondary' } & AriaButtonProps;
```

### Server Functions

```tsx
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

// Use z.email() not z.string().email() (Zod v4)
const createUser = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ name: z.string().min(1), email: z.email() }))
  .handler(async ({ data, request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return { error: 'Unauthorized', code: 'AUTH_REQUIRED' };
    }
    // Return structured results, don't throw
    return { data: user };
  });
```

### Error Handling

- Return `{ error: string, code: string }` from server functions
- Use error boundaries for React component errors
- Standard codes: `AUTH_REQUIRED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`

### Testing

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Key Patterns

- **Protected routes**: Place under `_app/` directory
- **Auth check**: `auth.api.getSession({ headers: request.headers })`
- **Class merging**: Use `cn()` from `@oakoss/ui` (clsx + tailwind-merge)
- **Console logs**: Allowed only in `env.ts`, `logger.ts`, `seed/`, tests

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(auth): add OAuth provider support
fix(database): resolve connection pooling issue
docs: update API documentation
chore: upgrade dependencies
```

## Session Workflow

### Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:

   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```

5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
