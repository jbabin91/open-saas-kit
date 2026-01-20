# Contributing to open-saas-kit

Thank you for your interest in contributing to open-saas-kit! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local PostgreSQL)

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/oakoss/open-saas-kit.git
   cd open-saas-kit
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the PostgreSQL database:

   ```bash
   docker-compose up -d
   ```

4. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

5. Push the database schema:

   ```bash
   pnpm db:push
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

## Project Structure

```sh
open-saas-kit/
├── apps/
│   └── web/                 # TanStack Start web app
├── packages/
│   ├── auth/                # Better Auth configuration
│   ├── config/              # Environment validation
│   ├── database/            # Drizzle ORM + schemas
│   ├── eslint-config/       # Shared ESLint config
│   ├── typescript-config/   # Shared TypeScript config
│   └── ui/                  # React Aria Components
└── turbo.json               # Monorepo task pipeline
```

## Making Changes

### Branches

- `main` - Production-ready code
- `develop` - Development branch (if applicable)
- Feature branches should follow the pattern: `feat/description` or `fix/description`

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting: `pnpm lint && pnpm typecheck`
5. Submit a pull request

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic

## Questions?

Feel free to open an issue for any questions or discussions.
