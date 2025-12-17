
import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/components/ui/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
