
import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@/components/ui/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    // Customize argTypes here
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    // Customize default props here
  },
};
