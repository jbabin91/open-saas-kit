'use client';

import { RiCheckLine } from '@remixicon/react';
import {
  Checkbox as CheckboxPrimitive,
  type CheckboxProps as CheckboxPrimitiveProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: CheckboxPrimitiveProps) {
  return (
    <CheckboxPrimitive
      className={cn(
        'border-input dark:bg-input/30 data-selected:bg-primary data-selected:text-primary-foreground dark:data-selected:bg-primary data-selected:border-primary aria-invalid:data-selected:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-lg border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-[3px] aria-invalid:ring-[3px] peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      {({ isSelected }) => (
        <div
          className="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
          data-slot="checkbox-indicator"
        >
          {isSelected && <RiCheckLine />}
        </div>
      )}
    </CheckboxPrimitive>
  );
}

export { Checkbox };
