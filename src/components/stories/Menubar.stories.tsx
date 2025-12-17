
import { Meta, StoryObj } from '@storybook/react';
import { Menubar } from '@/components/ui/menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
