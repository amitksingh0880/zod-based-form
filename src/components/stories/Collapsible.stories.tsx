
import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '@/components/ui/collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
