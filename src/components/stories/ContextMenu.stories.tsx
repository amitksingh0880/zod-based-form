
import { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '@/components/ui/context-menu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
