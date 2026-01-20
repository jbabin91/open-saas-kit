import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  ToggleButton as ToggleButtonPrimitive,
  ToggleButtonGroup as ToggleGroupPrimitive,
  type ToggleButtonGroupProps as ToggleGroupPrimitiveProps,
  type ToggleButtonProps as ToggleButtonPrimitiveProps,
} from 'react-aria-components';

import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    orientation?: 'horizontal' | 'vertical';
    spacing?: number;
  }
>({
  orientation: 'horizontal',
  size: 'default',
  spacing: 0,
  variant: 'default',
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupPrimitiveProps &
  VariantProps<typeof toggleVariants> & {
    orientation?: 'horizontal' | 'vertical';
    spacing?: number;
  }) {
  return (
    <ToggleGroupContext.Provider
      value={{ orientation, size, spacing, variant }}
    >
      <ToggleGroupPrimitive
        className={cn(
          'rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
          className,
        )}
        data-orientation={orientation}
        data-size={size}
        data-slot="toggle-group"
        data-spacing={spacing}
        data-variant={variant}
        orientation={orientation}
        style={{ '--gap': spacing } as React.CSSProperties}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: ToggleButtonPrimitiveProps & VariantProps<typeof toggleVariants>) {
  const context = React.use(ToggleGroupContext);

  return (
    <ToggleButtonPrimitive
      className={cn(
        'group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
        toggleVariants({
          size: context.size ?? size,
          variant: context.variant ?? variant,
        }),
        className,
      )}
      data-size={context.size ?? size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant ?? variant}
      {...props}
    >
      {children}
    </ToggleButtonPrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
