'use client';

import { RiCircleLine } from '@remixicon/react';
import {
  composeRenderProps,
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupProps as RadioGroupPrimitiveProps,
  type RadioProps as RadioPrimitiveProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitiveProps) {
  return (
    <RadioGroupPrimitive
      className={cn('grid w-full gap-2', className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitiveProps) {
  return (
    <RadioPrimitive
      className={cn(
        'border-input text-primary dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex size-4 rounded-full focus-visible:ring-[3px] aria-invalid:ring-[3px] group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-slot="radio-group-item"
      {...props}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {isSelected && (
            <div
              className="group-aria-invalid/radio-group-item:text-destructive text-primary flex size-4 items-center justify-center"
              data-slot="radio-group-indicator"
            >
              <RiCircleLine className="absolute left-1/2 top-1/2 size-2 -translate-1/2 fill-current" />
            </div>
          )}
          {children}
        </>
      ))}
    </RadioPrimitive>
  );
}

export { RadioGroup, RadioGroupItem };
