# open-saas-kit

An open-source TanStack Start SaaS starter kit - fully featured, community-driven.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (SSR React)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- **UI Components**: [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Build**: [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/oakoss/open-saas-kit.git
cd open-saas-kit

# Install dependencies
pnpm install

# Start PostgreSQL
docker-compose up -d

# Set up environment
cp .env.example .env

# Push database schema
pnpm db:push

# Start development
pnpm dev
```

## Project Structure

```sh
open-saas-kit/
├── apps/
│   └── web/                    # TanStack Start application
├── packages/
│   ├── auth/                   # Better Auth configuration
│   ├── config/                 # Environment validation
│   ├── database/               # Drizzle ORM schemas
│   ├── eslint-config/          # Shared ESLint config
│   ├── typescript-config/      # Shared TypeScript config
│   └── ui/                     # React Aria Components
├── docker-compose.yml          # Local PostgreSQL
└── turbo.json                  # Turborepo config
```

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages
pnpm db:push      # Push schema to database
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/open_saas_kit"
SESSION_SECRET="your-32-char-secret"

# OAuth (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT - see [LICENSE](./LICENSE)
