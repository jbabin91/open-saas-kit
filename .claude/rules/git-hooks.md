# Git Hooks & Commit Conventions

## Hook Ownership

Hooks are split between two systems to avoid terminal escape sequence issues:

| Hook                 | Owner    | Purpose                           |
| -------------------- | -------- | --------------------------------- |
| `pre-commit`         | beads    | Chains to lefthook for linting    |
| `pre-commit.old`     | lefthook | typecheck, lint, format (chained) |
| `commit-msg`         | lefthook | commitlint validation             |
| `pre-push`           | beads    | Stale JSONL check                 |
| `post-merge`         | beads    | Import JSONL after pull           |
| `post-checkout`      | beads    | Import JSONL after checkout       |
| `prepare-commit-msg` | beads    | Add agent identity trailers       |

## Lefthook (Code Quality)

Pre-commit hooks run in parallel on staged files (via beads chain):

| Hook      | Files                                   | Action                    |
| --------- | --------------------------------------- | ------------------------- |
| typecheck | `*.{ts,tsx}`                            | `pnpm typecheck`          |
| lint      | `*.{ts,tsx,js,jsx,cjs,mjs}`             | ESLint with `--fix`       |
| lint-md   | `*.md`                                  | markdownlint with `--fix` |
| format    | `*.{ts,tsx,js,jsx,cjs,mjs,json,md,mdx}` | Prettier                  |

All fix commands auto-stage their changes (`stage_fixed: true`).

Commit-msg hook runs commitlint to validate commit messages.

## Beads (Issue Tracking Sync)

Beads manages its hooks directly via `bd hooks install --chain`. This avoids
terminal escape sequence issues that occur when lefthook processes beads output.

## Reinstalling Hooks

If you need to update lefthook config, follow this sequence:

```bash
# 1. Uninstall beads hooks
bd hooks uninstall

# 2. Reinstall lefthook
pnpm exec lefthook install

# 3. Reinstall beads with chaining
bd hooks install --chain

# 4. Clean up orphaned .old files (keep only pre-commit.old)
rm -f .git/hooks/post-*.old .git/hooks/pre-push.old .git/hooks/prepare-commit-msg.old
```

Do NOT run `pnpm exec lefthook install` directly—it will fail because
`pre-commit.old` already exists from beads chaining.

## Commit Message Format (Conventional Commits)

```sh
type(scope): subject

body (optional)

footer (optional)
```

### Types

| Type       | Description                               |
| ---------- | ----------------------------------------- |
| `feat`     | New features                              |
| `fix`      | Bug fixes                                 |
| `docs`     | Documentation changes                     |
| `style`    | Code style (formatting, no logic changes) |
| `refactor` | Code changes (neither fix nor feature)    |
| `perf`     | Performance improvements                  |
| `test`     | Adding or correcting tests                |
| `chore`    | Dependencies, tooling, build              |
| `ci`       | CI configuration changes                  |
| `revert`   | Revert a previous commit                  |

### Scopes

| Category | Scopes                                                                   |
| -------- | ------------------------------------------------------------------------ |
| Apps     | `web`                                                                    |
| Packages | `auth`, `config`, `database`, `ui`, `eslint-config`, `typescript-config` |
| Tooling  | `deps`, `ci`                                                             |

Custom scopes allowed. Scope is optional.

### Rules

- Subject: imperative mood, no period, lowercase
- Header max length: 200 characters
- Body: optional, use `|` for line breaks in interactive mode

## Markdownlint Rules

**CRITICAL - MD040**: All fenced code blocks MUST have a language specifier:

```markdown
<!-- Bad - will fail lint -->

` ` `src/routes/
├── index.tsx` ` `

<!-- Good - has language -->

` ` `sh
src/routes/
├── index.tsx
` ` `
```

Common language specifiers:

| Content Type       | Language   |
| ------------------ | ---------- |
| TypeScript/TSX     | `tsx`      |
| JavaScript         | `js`       |
| Shell/directories  | `sh`       |
| JSON               | `json`     |
| Markdown templates | `markdown` |
| Plain text/output  | `text`     |
| Bash commands      | `bash`     |

Enabled rules with overrides:

| Rule  | Setting         | Description                 |
| ----- | --------------- | --------------------------- |
| MD007 | `indent: 2`     | 2-space list indentation    |
| MD040 | enabled         | Fenced blocks need language |
| MD046 | `style: fenced` | Use fenced code blocks      |

Disabled rules:

- MD001 - Heading level increments
- MD012 - Multiple blank lines
- MD013 - Line length
- MD024 - Duplicate heading content
- MD025 - Multiple top-level headings
- MD026 - Trailing punctuation in headings
- MD029 - Ordered list prefix style
- MD033 - Inline HTML
- MD036 - Emphasis as heading
- MD037 - Spaces in emphasis
- MD041 - First line must be heading
- MD060 - Table column alignment

Uses `.gitignore` patterns automatically.

### Running Markdownlint

```sh
# Correct - uses configured glob pattern
pnpm lint:md

# Correct - specific markdown files
pnpm lint:md .claude/rules/react.md

# Wrong - directory path overrides glob, may lint non-md files
pnpm lint:md .claude/
```
