
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@/components/ui/tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
