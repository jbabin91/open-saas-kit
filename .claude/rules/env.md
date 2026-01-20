---
paths: '{packages/config/src/env.ts,.env*,**/env*.ts}'
---

# Environment Variables

## Overview

| Tool                 | Purpose                                   |
| -------------------- | ----------------------------------------- |
| **@t3-oss/env-core** | Runtime validation & type-safety with Zod |

## Validation with @t3-oss/env-core

Type-safe environment variables with Zod validation in `packages/config/src/env.ts`:

```ts
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    SESSION_SECRET: z.string().min(32),

    // OAuth Providers (optional)
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },

  clientPrefix: 'VITE_',
  client: {
    VITE_APP_URL: z.url().optional(),
  },

  runtimeEnv: process.env,
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
```

### Usage

```ts
import { env } from '@oakoss/config/env';

// Fully typed, validated at startup
const dbUrl = env.DATABASE_URL; // string (validated URL)
const secret = env.SESSION_SECRET; // string (min 32 chars)

// Server vars throw if accessed on client
if (typeof window !== 'undefined') {
  env.DATABASE_URL; // Error: Cannot access server variable
}
```

### Zod Schema Types

```ts
// URLs
z.url();

// Strings
z.string().min(1);
z.string().min(32);

// Numbers from strings
z.string().transform(Number);
z.coerce.number();

// Booleans from strings
z.coerce.boolean(); // Truthy/falsy coercion

// Enums
z.enum(['development', 'production', 'test']);

// Optional with defaults
z.string().default('localhost');
z.coerce.number().default(3000);
```

## Environment Files

| File           | Purpose                        | Commit? |
| -------------- | ------------------------------ | ------- |
| `.env`         | Local development values       | No      |
| `.env.example` | Template with placeholder keys | Yes     |

## Adding New Variables

1. Add to `packages/config/src/env.ts` with Zod schema
2. Add to `.env.example` with placeholder value
3. Add to `turbo.json` globalEnv array
4. Import from `@oakoss/config/env` where needed

## Turbo Global Env

All environment variables used across packages must be listed in `turbo.json`:

```json
{
  "globalEnv": [
    "DATABASE_URL",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "NODE_ENV",
    "SESSION_SECRET",
    "SKIP_ENV_VALIDATION",
    "VITE_APP_URL"
  ]
}
```
