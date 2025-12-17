
import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/components/ui/spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
