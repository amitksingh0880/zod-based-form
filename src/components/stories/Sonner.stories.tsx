
import { Meta, StoryObj } from '@storybook/react';
import { Sonner } from '@/components/ui/sonner';

const meta: Meta<typeof Sonner> = {
  title: 'Components/Sonner',
  component: Sonner,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Sonner>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
