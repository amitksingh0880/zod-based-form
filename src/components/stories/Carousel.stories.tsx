
import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@/components/ui/carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
