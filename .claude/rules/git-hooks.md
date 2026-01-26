---
paths: '.git/hooks/**,lefthook.yml,.lefthook/**'
---

# Git Hooks

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

For commit message format (conventional commits), see the `git-workflow` skill.
For markdownlint configuration, see the `markdown.md` rule.
