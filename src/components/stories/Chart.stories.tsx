
import { Meta, StoryObj } from '@storybook/react';
import { Chart } from '@/components/ui/chart';

const meta: Meta<typeof Chart> = {
  title: 'Components/Chart',
  component: Chart,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
