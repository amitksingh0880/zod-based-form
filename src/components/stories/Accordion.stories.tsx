
import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
