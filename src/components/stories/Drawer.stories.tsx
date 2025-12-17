
import { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '@/components/ui/drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
