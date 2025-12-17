
import { Meta, StoryObj } from '@storybook/react';
import { InputOtp } from '@/components/ui/input-otp';

const meta: Meta<typeof InputOtp> = {
  title: 'Components/InputOtp',
  component: InputOtp,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof InputOtp>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
