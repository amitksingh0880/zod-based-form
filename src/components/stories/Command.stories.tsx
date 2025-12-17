
import { Meta, StoryObj } from '@storybook/react';
import { Command } from '@/components/ui/command';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
