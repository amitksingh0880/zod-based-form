
import { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '@/components/ui/kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
