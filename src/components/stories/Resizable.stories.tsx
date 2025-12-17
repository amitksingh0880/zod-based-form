
import { Meta, StoryObj } from '@storybook/react';
import { Resizable } from '@/components/ui/resizable';

const meta: Meta<typeof Resizable> = {
  title: 'Components/Resizable',
  component: Resizable,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Resizable>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
