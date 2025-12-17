
import { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
