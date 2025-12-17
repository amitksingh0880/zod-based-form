
import { Meta, StoryObj } from '@storybook/react';
import { Sheet } from '@/components/ui/sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
