'use client';

import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiLoaderLine,
} from '@remixicon/react';
import {
  Button,
  Text,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_ToastQueue,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
} from 'react-aria-components';
import { flushSync } from 'react-dom';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '../../../lib/utils';

export type ToastVariant =
  | 'default'
  | 'error'
  | 'info'
  | 'loading'
  | 'success'
  | 'warning';

export type ToastContent = {
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  title: string;
  variant?: ToastVariant;
};

export type ToastOptions = {
  onClose?: () => void;
  timeout?: number;
};

const toastVariants = tv({
  base: [
    'group/toast flex w-full items-center gap-3 rounded-lg border p-4 shadow-lg',
    'entering:animate-in entering:slide-in-from-bottom-full entering:fade-in-0 entering:duration-300',
    'exiting:animate-out exiting:slide-out-to-right-full exiting:fade-out-0 exiting:duration-200',
  ],
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'bg-popover text-popover-foreground border-border',
      error: [
        'bg-red-50 border-red-200 text-red-900',
        'dark:bg-red-950/50 dark:border-red-900 dark:text-red-100',
      ],
      info: [
        'bg-blue-50 border-blue-200 text-blue-900',
        'dark:bg-blue-950/50 dark:border-blue-900 dark:text-blue-100',
      ],
      loading: 'bg-muted border-border text-foreground',
      success: [
        'bg-green-50 border-green-200 text-green-900',
        'dark:bg-green-950/50 dark:border-green-900 dark:text-green-100',
      ],
      warning: [
        'bg-amber-50 border-amber-200 text-amber-900',
        'dark:bg-amber-950/50 dark:border-amber-900 dark:text-amber-100',
      ],
    },
  },
});

const toastIconVariants = tv({
  base: 'size-5 shrink-0',
  variants: {
    variant: {
      default: 'text-muted-foreground',
      error: 'text-red-600 dark:text-red-400',
      info: 'text-blue-600 dark:text-blue-400',
      loading: 'text-muted-foreground animate-spin',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-amber-600 dark:text-amber-400',
    },
  },
});

const toastDescriptionVariants = tv({
  base: 'text-sm',
  variants: {
    variant: {
      default: 'text-muted-foreground',
      error: 'text-red-700 dark:text-red-300',
      info: 'text-blue-700 dark:text-blue-300',
      loading: 'text-muted-foreground',
      success: 'text-green-700 dark:text-green-300',
      warning: 'text-amber-700 dark:text-amber-300',
    },
  },
});

const toastCloseVariants = tv({
  base: [
    'flex size-6 shrink-0 items-center justify-center rounded-md transition-colors',
    'text-(--close-fg)',
    'data-[hovered]:bg-(--close-bg-hover)',
    'data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-(--close-ring)',
  ],
  variants: {
    variant: {
      default: [
        '[--close-fg:var(--color-muted-foreground)] [--close-bg-hover:var(--color-muted)/50] [--close-ring:var(--color-ring)]',
        'dark:[--close-bg-hover:var(--color-muted)/30]',
        'data-[hovered]:text-foreground',
      ],
      error: [
        '[--close-fg:var(--color-red-600)] [--close-bg-hover:var(--color-red-100)] [--close-ring:var(--color-red-600)]',
        'dark:[--close-fg:var(--color-red-400)] dark:[--close-bg-hover:var(--color-red-900)/30] dark:[--close-ring:var(--color-red-400)]',
        'data-[hovered]:text-red-700 dark:data-[hovered]:text-red-300',
      ],
      info: [
        '[--close-fg:var(--color-blue-600)] [--close-bg-hover:var(--color-blue-100)] [--close-ring:var(--color-blue-600)]',
        'dark:[--close-fg:var(--color-blue-400)] dark:[--close-bg-hover:var(--color-blue-900)/30] dark:[--close-ring:var(--color-blue-400)]',
        'data-[hovered]:text-blue-700 dark:data-[hovered]:text-blue-300',
      ],
      loading: [
        '[--close-fg:var(--color-muted-foreground)] [--close-bg-hover:var(--color-muted)/50] [--close-ring:var(--color-ring)]',
        'dark:[--close-bg-hover:var(--color-muted)/30]',
        'data-[hovered]:text-foreground',
      ],
      success: [
        '[--close-fg:var(--color-green-600)] [--close-bg-hover:var(--color-green-100)] [--close-ring:var(--color-green-600)]',
        'dark:[--close-fg:var(--color-green-400)] dark:[--close-bg-hover:var(--color-green-900)/30] dark:[--close-ring:var(--color-green-400)]',
        'data-[hovered]:text-green-700 dark:data-[hovered]:text-green-300',
      ],
      warning: [
        '[--close-fg:var(--color-amber-600)] [--close-bg-hover:var(--color-amber-100)] [--close-ring:var(--color-amber-600)]',
        'dark:[--close-fg:var(--color-amber-400)] dark:[--close-bg-hover:var(--color-amber-900)/30] dark:[--close-ring:var(--color-amber-400)]',
        'data-[hovered]:text-amber-700 dark:data-[hovered]:text-amber-300',
      ],
    },
  },
});

const toastActionVariants = tv({
  base: 'mt-2 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors',
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground data-[hovered]:bg-primary/90',
      error:
        'bg-red-600 text-white data-[hovered]:bg-red-700 dark:bg-red-500 dark:data-[hovered]:bg-red-600',
      info: 'bg-blue-600 text-white data-[hovered]:bg-blue-700 dark:bg-blue-500 dark:data-[hovered]:bg-blue-600',
      loading:
        'bg-primary text-primary-foreground data-[hovered]:bg-primary/90',
      success:
        'bg-green-600 text-white data-[hovered]:bg-green-700 dark:bg-green-500 dark:data-[hovered]:bg-green-600',
      warning:
        'bg-amber-600 text-white data-[hovered]:bg-amber-700 dark:bg-amber-500 dark:data-[hovered]:bg-amber-600',
    },
  },
});

const icons: Record<ToastVariant, React.ElementType> = {
  default: RiInformationLine,
  error: RiCloseCircleLine,
  info: RiInformationLine,
  loading: RiLoaderLine,
  success: RiCheckboxCircleLine,
  warning: RiErrorWarningLine,
};

// Create queue outside React for global access
export const toastQueue = new UNSTABLE_ToastQueue<ToastContent>({
  wrapUpdate(fn) {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (
        document as Document & { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        // eslint-disable-next-line @eslint-react/dom/no-flush-sync -- Required for view transitions per React Aria docs
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

// Helper functions for easy toast creation
function createToast(
  content: ToastContent | string,
  options?: ToastOptions,
): string {
  const toastContent: ToastContent =
    typeof content === 'string'
      ? { title: content, variant: 'default' }
      : content;
  return toastQueue.add(toastContent, {
    onClose: options?.onClose,
    timeout: options?.timeout ?? 5000,
  });
}

export const toast = Object.assign(
  (content: ToastContent | string, options?: ToastOptions) =>
    createToast(
      typeof content === 'string'
        ? { title: content, variant: 'default' }
        : content,
      options,
    ),
  {
    dismiss: (key: string) => toastQueue.close(key),
    error: (title: string, options?: ToastOptions & { description?: string }) =>
      createToast(
        { description: options?.description, title, variant: 'error' },
        options,
      ),
    info: (title: string, options?: ToastOptions & { description?: string }) =>
      createToast(
        { description: options?.description, title, variant: 'info' },
        options,
      ),
    loading: (
      title: string,
      options?: ToastOptions & { description?: string },
    ) =>
      createToast(
        { description: options?.description, title, variant: 'loading' },
        { ...options, timeout: options?.timeout ?? 0 },
      ),
    promise: async <T,>(
      promise: Promise<T>,
      messages: { error: string; loading: string; success: string },
    ): Promise<T> => {
      const id = toast.loading(messages.loading);
      try {
        const result = await promise;
        toastQueue.close(id);
        toast.success(messages.success);
        return result;
      } catch (error) {
        toastQueue.close(id);
        toast.error(messages.error);
        throw error;
      }
    },
    success: (
      title: string,
      options?: ToastOptions & { description?: string },
    ) =>
      createToast(
        { description: options?.description, title, variant: 'success' },
        options,
      ),
    warning: (
      title: string,
      options?: ToastOptions & { description?: string },
    ) =>
      createToast(
        { description: options?.description, title, variant: 'warning' },
        options,
      ),
  },
);

export type ToastProps = Omit<
  React.ComponentProps<typeof ToastPrimitive>,
  'toast'
> &
  VariantProps<typeof toastVariants> & {
    toast: { content: ToastContent; key: string };
  };

export function Toast({ className, toast: toastData, ...props }: ToastProps) {
  const variant: ToastVariant = toastData.content.variant ?? 'default';
  const Icon = icons[variant];

  return (
    <ToastPrimitive
      className={cn(toastVariants({ variant }), className)}
      data-slot="toast"
      data-variant={variant}
      style={{ viewTransitionName: `toast-${toastData.key}` }}
      toast={toastData}
      {...props}
    >
      <Icon className={toastIconVariants({ variant })} />
      <ToastContentPrimitive
        className="flex flex-1 flex-col"
        data-slot="toast-content"
      >
        <Text className="text-sm font-medium leading-tight" slot="title">
          {toastData.content.title}
        </Text>
        {toastData.content.description && (
          <Text
            className={cn(
              toastDescriptionVariants({ variant }),
              'mt-1 leading-tight',
            )}
            slot="description"
          >
            {toastData.content.description}
          </Text>
        )}
        {toastData.content.action && (
          <Button
            className={toastActionVariants({ variant })}
            data-slot="toast-action"
            onPress={toastData.content.action.onClick}
          >
            {toastData.content.action.label}
          </Button>
        )}
      </ToastContentPrimitive>
      {variant !== 'loading' && (
        <Button
          aria-label="Close"
          className={toastCloseVariants({ variant })}
          data-slot="toast-close"
          slot="close"
        >
          <RiCloseLine className="size-4" />
        </Button>
      )}
    </ToastPrimitive>
  );
}

export type ToasterProps = {
  className?: string;
};

export function Toaster({ className }: ToasterProps) {
  return (
    <ToastRegionPrimitive
      aria-label="Notifications"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex max-w-sm flex-col-reverse gap-2',
        className,
      )}
      data-slot="toaster"
      queue={toastQueue}
    >
      {({ toast: toastData }) => <Toast toast={toastData} />}
    </ToastRegionPrimitive>
  );
}
