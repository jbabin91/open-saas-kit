import { RiAddLine, RiArrowRightLine } from '@remixicon/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Button } from './button';

const meta = {
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'default',
        'lg',
        'icon',
        'icon-sm',
        'icon-lg',
        'icon-xs',
      ],
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
        'plain',
      ],
    },
  },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <RiAddLine data-slot="icon" />
        Add Item
      </>
    ),
  },
};

export const IconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <RiArrowRightLine data-slot="icon" />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    'aria-label': 'Add item',
    children: <RiAddLine data-slot="icon" />,
    size: 'icon',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="plain">Plain</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const ClickInteraction: Story = {
  args: {
    children: 'Click me',
    onPress: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const DisabledInteraction: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true,
    onPress: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

export const KeyboardInteraction: Story = {
  args: {
    children: 'Press Enter',
    onPress: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    await expect(args.onPress).toHaveBeenCalledTimes(2);
  },
};

export const IconOnlyAccessibility: Story = {
  args: {
    'aria-label': 'Add new item',
    children: <RiAddLine data-slot="icon" />,
    size: 'icon',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Add new item' });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName('Add new item');
  },
};
