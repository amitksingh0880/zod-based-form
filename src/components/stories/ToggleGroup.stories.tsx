
import { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from '@/components/ui/toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
