
import { Meta, StoryObj } from '@storybook/react';
import { Empty } from '@/components/ui/empty';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
