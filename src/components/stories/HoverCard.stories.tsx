
import { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from '@/components/ui/hover-card';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
