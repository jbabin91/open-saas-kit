import {
  Switch as SwitchPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitiveProps & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive
      className={cn(
        'data-selected:bg-primary data-[selected=false]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-[selected=false]:bg-input/80 shrink-0 rounded-full border border-transparent focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      data-size={size}
      data-slot="switch"
      {...props}
    >
      {({ isSelected }) => (
        <span
          className={cn(
            'bg-background dark:data-[selected=false]:bg-foreground dark:data-selected:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 pointer-events-none block ring-0 transition-transform',
            isSelected
              ? 'group-data-[size=default]/switch:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:translate-x-[calc(100%-2px)]'
              : 'translate-x-0',
          )}
          data-selected={isSelected}
          data-slot="switch-thumb"
        />
      )}
    </SwitchPrimitive>
  );
}

export { Switch };
