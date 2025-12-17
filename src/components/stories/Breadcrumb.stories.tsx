
import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
