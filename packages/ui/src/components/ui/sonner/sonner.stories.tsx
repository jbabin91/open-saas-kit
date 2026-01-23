import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from 'next-themes';
import { toast } from 'sonner';
import { userEvent } from 'storybook/test';

import { Button } from '../button';
import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Story />
        <Toaster />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Toaster',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onPress={() => toast('Default toast message')}>
        Default
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.success('Operation completed successfully!')}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.error('Something went wrong. Please try again.')}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.warning('Please review before continuing.')}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.info('Here is some useful information.')}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onPress={() => toast.loading('Loading your data...')}
      >
        Loading
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
};

export const WithAction: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', {
      name: 'Show Toast with Action',
    });
    await userEvent.click(trigger);
  },
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast('File deleted', {
          action: {
            label: 'Undo',
            onClick: () => toast.success('Restored!'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const PromiseToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast.promise(delay(2000), {
          error: 'Failed to save',
          loading: 'Saving...',
          success: 'Saved successfully!',
        })
      }
    >
      Show Promise Toast
    </Button>
  ),
};
