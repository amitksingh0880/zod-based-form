
import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
