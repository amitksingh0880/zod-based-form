
import { Meta, StoryObj } from '@storybook/react';
import { Item } from '@/components/ui/item';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
