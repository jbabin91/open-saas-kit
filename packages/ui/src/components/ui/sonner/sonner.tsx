'use client';

import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiLoaderLine,
} from '@remixicon/react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const toastTypeStyles = {
  error: [
    'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-900',
    'text-red-900 dark:text-red-100',
    '[&_[data-description]]:text-red-700 dark:[&_[data-description]]:text-red-300',
    '[&_svg]:text-red-600 dark:[&_svg]:text-red-400',
  ].join(' '),
  info: [
    'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-900',
    'text-blue-900 dark:text-blue-100',
    '[&_[data-description]]:text-blue-700 dark:[&_[data-description]]:text-blue-300',
    '[&_svg]:text-blue-600 dark:[&_svg]:text-blue-400',
  ].join(' '),
  loading: [
    'bg-muted border-border',
    'text-foreground',
    '[&_[data-description]]:text-muted-foreground',
    '[&_svg]:text-muted-foreground',
  ].join(' '),
  success: [
    'bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-900',
    'text-green-900 dark:text-green-100',
    '[&_[data-description]]:text-green-700 dark:[&_[data-description]]:text-green-300',
    '[&_svg]:text-green-600 dark:[&_svg]:text-green-400',
  ].join(' '),
  warning: [
    'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-900',
    'text-amber-900 dark:text-amber-100',
    '[&_[data-description]]:text-amber-700 dark:[&_[data-description]]:text-amber-300',
    '[&_svg]:text-amber-600 dark:[&_svg]:text-amber-400',
  ].join(' '),
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      closeButton
      className="toaster group"
      icons={{
        error: <RiCloseCircleLine className="size-4" />,
        info: <RiInformationLine className="size-4" />,
        loading: <RiLoaderLine className="size-4 animate-spin" />,
        success: <RiCheckboxCircleLine className="size-4" />,
        warning: <RiErrorWarningLine className="size-4" />,
      }}
      style={
        {
          '--border-radius': 'var(--radius)',
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
        } as React.CSSProperties
      }
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          actionButton:
            'bg-primary! text-primary-foreground! hover:bg-primary/90!',
          cancelButton: 'bg-muted! text-muted-foreground! hover:bg-muted/80!',
          ...toastTypeStyles,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
