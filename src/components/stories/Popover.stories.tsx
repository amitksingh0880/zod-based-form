
import { Meta, StoryObj } from '@storybook/react';
import { Popover } from '@/components/ui/popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
