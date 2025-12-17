
import { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@/components/ui/sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
