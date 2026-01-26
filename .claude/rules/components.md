---
paths: 'packages/ui/src/**,apps/web/src/components/**'
---

# UI Component Rules

## React Aria Components

This project uses [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) for accessible, unstyled primitives.

Components are in `packages/ui/` as a shared package (`@oakoss/ui`).

## Component Pattern

Wrap React Aria primitives with styled variants:

```tsx
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { cn } from './utils';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
} & AriaButtonProps;

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
```

## Icons Pattern (To Implement)

When adding icons, centralize them in a single file. Never import directly from icon libraries:

```tsx
// packages/ui/src/icons.ts (create this file)
import { Menu, X, ChevronDown } from 'lucide-react';

export const Icons = {
  Menu,
  Close: X,
  ChevronDown,
} as const;

// Usage
import { Icons } from '@oakoss/ui';
<Icons.Menu size={24} />;
```

## Polymorphic Components

React Aria Components support `asChild` pattern via slots:

```tsx
import { Link } from '@tanstack/react-router';

<Button asChild>
  <Link to="/">Go Home</Link>
</Button>;
```

## Composition with Slots

React Aria uses slots for compound components:

```tsx
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from 'react-aria-components';

<DialogTrigger>
  <Button>Open Dialog</Button>
  <ModalOverlay>
    <Modal>
      <Dialog>
        {({ close }) => (
          <>
            <Heading slot="title">Dialog Title</Heading>
            <p>Dialog content</p>
            <Button onPress={close}>Close</Button>
          </>
        )}
      </Dialog>
    </Modal>
  </ModalOverlay>
</DialogTrigger>;
```

## State Styling with data-\* Attributes

React Aria exposes state via data attributes. Use Tailwind's data-\* variants:

```tsx
<Button className="data-[pressed]:scale-95 data-[disabled]:opacity-50">
  Click me
</Button>

// Available data attributes:
// data-pressed - Button is being pressed
// data-hovered - Element is hovered
// data-focused - Element has focus
// data-focus-visible - Element has keyboard focus
// data-disabled - Element is disabled
// data-selected - Element is selected (toggle buttons, tabs)
// data-open - Disclosure/popover is open
```

## Object Keys Sorting

Sort alphabetically when 3+ keys:

```ts
const config = { alpha: 1, beta: 2, gamma: 3 };
```

## Directory Structure

```sh
packages/ui/src/
├── button.tsx        # Button component
├── card.tsx          # Card component
├── input.tsx         # Input component
├── icons.ts          # Centralized icons
├── utils.ts          # cn() utility
└── index.ts          # Public exports

apps/web/src/components/
├── layout/           # Layout components (header, sidebar)
├── shared/           # Shared app-specific components
└── errors/           # Error boundaries
```

## Importing UI Components

Always import from the package, not relative paths:

```tsx
// Good
import { Button, Input } from '@oakoss/ui';

// Bad - don't import from relative paths
import { Button } from '../../../packages/ui/src/button';
```

## Storybook Conventions

Stories are co-located with components:

```sh
packages/ui/src/components/ui/button/
├── button.tsx           # Component
├── button.stories.tsx   # Stories
└── index.ts             # Export
```

### Story Naming

| Type         | Convention            | Example                                   |
| ------------ | --------------------- | ----------------------------------------- |
| Default      | `Default`             | `export const Default: Story`             |
| Variants     | Variant name          | `Secondary`, `Destructive`, `Ghost`       |
| Sizes        | Size name             | `Small`, `Large`                          |
| States       | State description     | `Disabled`, `Loading`                     |
| Interactions | `{Action}Interaction` | `ClickInteraction`, `KeyboardInteraction` |

For story writing how-to, see the `storybook` skill.
