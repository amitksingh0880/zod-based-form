
import { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from '@/components/ui/alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
