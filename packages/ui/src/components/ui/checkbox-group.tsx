'use client';

import {
  CheckboxGroup as CheckboxGroupPrimitive,
  type CheckboxGroupProps as CheckboxGroupPrimitiveProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitiveProps) {
  return (
    <CheckboxGroupPrimitive
      className={cn('grid w-full gap-2', className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export { CheckboxGroup };
