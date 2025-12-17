
import { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '@/components/ui/button-group';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
