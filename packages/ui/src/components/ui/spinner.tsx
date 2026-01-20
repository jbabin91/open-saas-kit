import { type RemixiconComponentType, RiLoaderLine } from '@remixicon/react';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type SpinnerProps = ComponentProps<RemixiconComponentType>;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <RiLoaderLine
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      role="status"
      {...props}
    />
  );
}

export { Spinner };
