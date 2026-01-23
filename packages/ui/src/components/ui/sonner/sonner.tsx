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

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      closeButton
      richColors
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
          '--error-bg': 'var(--toast-error-bg)',
          '--error-border': 'var(--toast-error-border)',
          '--error-text': 'var(--toast-error-text)',
          '--info-bg': 'var(--toast-info-bg)',
          '--info-border': 'var(--toast-info-border)',
          '--info-text': 'var(--toast-info-text)',
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
          '--success-bg': 'var(--toast-success-bg)',
          '--success-border': 'var(--toast-success-border)',
          '--success-text': 'var(--toast-success-text)',
          '--warning-bg': 'var(--toast-warning-bg)',
          '--warning-border': 'var(--toast-warning-border)',
          '--warning-text': 'var(--toast-warning-text)',
        } as React.CSSProperties
      }
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          actionButton:
            'bg-primary! text-primary-foreground! hover:bg-primary/90!',
          cancelButton: 'bg-muted! text-muted-foreground! hover:bg-muted/80!',
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
