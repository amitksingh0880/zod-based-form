
import { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
