---
paths: '**/*.md'
---

# Markdown Rules

## Fenced Code Blocks (MD040)

**ALWAYS specify a language** for fenced code blocks:

```markdown
<!-- WRONG - will fail markdownlint -->

` ` `const x = 1;` ` `

<!-- CORRECT -->

` ` `tsx
const x = 1;
` ` `
```

## Language Reference

| Content              | Language   |
| -------------------- | ---------- |
| TypeScript/React     | `tsx`      |
| TypeScript (no JSX)  | `ts`       |
| JavaScript           | `js`       |
| Shell commands       | `bash`     |
| Directory trees      | `sh`       |
| JSON                 | `json`     |
| YAML                 | `yaml`     |
| Markdown (templates) | `markdown` |
| Plain text/output    | `text`     |
| SQL                  | `sql`      |
| HTML                 | `html`     |
| CSS                  | `css`      |
| Diff output          | `diff`     |

## Other Enforced Rules

- **MD007**: 2-space indentation for lists
- **MD046**: Use fenced code blocks (not indented)

## Disabled Rules

Line length (MD013), multiple headings (MD025), inline HTML (MD033) are allowed.
