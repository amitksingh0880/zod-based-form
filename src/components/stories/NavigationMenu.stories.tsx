
import { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from '@/components/ui/navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
