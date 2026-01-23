import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';

import { Button } from '../button';
import { toast, Toaster } from './toast';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
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
        toast({
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          title: 'Event has been created',
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
        toast({
          action: {
            label: 'Undo',
            onClick: () => toast.success('Restored!'),
          },
          title: 'File deleted',
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

export const SuccessVariant: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Show Success' });
    await userEvent.click(trigger);
  },
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast.success('Changes saved', {
          description: 'Your profile has been updated.',
        })
      }
    >
      Show Success
    </Button>
  ),
};

export const ErrorVariant: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Show Error' });
    await userEvent.click(trigger);
  },
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast.error('Upload failed', {
          description: 'The file size exceeds the 10MB limit.',
        })
      }
    >
      Show Error
    </Button>
  ),
};

export const WarningVariant: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Show Warning' });
    await userEvent.click(trigger);
  },
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast.warning('Unsaved changes', {
          description: 'You have unsaved changes that will be lost.',
        })
      }
    >
      Show Warning
    </Button>
  ),
};

export const InfoVariant: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Show Info' });
    await userEvent.click(trigger);
  },
  render: () => (
    <Button
      variant="outline"
      onPress={() =>
        toast.info('New feature available', {
          description: 'Check out the new dashboard layout.',
        })
      }
    >
      Show Info
    </Button>
  ),
};
