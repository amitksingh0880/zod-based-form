
import { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from '@/components/ui/input-group';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
