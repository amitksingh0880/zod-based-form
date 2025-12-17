
import { Meta, StoryObj } from '@storybook/react';
import { Field } from '@/components/ui/field';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
