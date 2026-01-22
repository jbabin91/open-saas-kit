import { RiAlertLine, RiErrorWarningLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';

const meta = {
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Alert',
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <RiAlertLine />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert className="max-w-md" variant="destructive">
      <RiErrorWarningLine />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Alert className="max-w-md">
      <RiAlertLine />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version is available. Would you like to update now?
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This is a simple alert without an icon.
      </AlertDescription>
    </Alert>
  ),
};
