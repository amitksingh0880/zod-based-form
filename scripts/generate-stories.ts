import fs from 'fs/promises';
import path from 'path';

const componentsDir = path.resolve('src/components/ui');
const storiesDir = path.resolve('src/stories');

const storyTemplate = (componentName: string, exportName: string) => `
import { Meta, StoryObj } from '@storybook/react';
import { ${exportName} } from '@/components/ui/${componentName}';

const meta: Meta<typeof ${exportName}> = {
  title: 'Components/${exportName}',
  component: ${exportName},
  argTypes: {
    ${getArgTypes(componentName)}
  },
};

export default meta;

type Story = StoryObj<typeof ${exportName}>;

export const Default: Story = {
  args: {
    ${getDefaultProps(componentName)}
  },
};
`;

function getArgTypes(componentName: string): string {
  switch (componentName) {
    case 'button':
      return `variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] }`;
    case 'input':
      return `type: { control: 'select', options: ['text', 'email', 'password', 'number'] }`;
    case 'checkbox':
      return `checked: { control: 'boolean' }`;
    case 'switch':
      return `checked: { control: 'boolean' }`;
    case 'slider':
      return `defaultValue: { control: 'object' }`;
    // Add more for other components as needed
    default:
      return '// Customize argTypes here';
  }
}

function getDefaultProps(componentName: string): string {
  switch (componentName) {
    case 'button':
      return `variant: 'default', children: 'Button'`;
    case 'input':
      return `placeholder: 'Enter text'`;
    case 'checkbox':
      return `checked: false`;
    case 'switch':
      return `checked: false`;
    case 'card':
      return `className: 'w-96'`;
    // Add more for other components as needed
    default:
      return '// Customize default props here';
  }
}

async function generateStories() {
  await fs.mkdir(storiesDir, { recursive: true });
  const files = await fs.readdir(componentsDir);
  for (const file of files) {
    if (file.endsWith('.tsx') && !file.includes('.stories.')) {
      const componentName = path.basename(file, '.tsx');
      const exportName = componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
      if (['cn', 'utils'].includes(componentName)) continue; // Skip utilities
      const storyContent = storyTemplate(componentName, exportName);
      const storyPath = path.join(storiesDir, `${exportName}.stories.tsx`);
      await fs.writeFile(storyPath, storyContent);
      console.log(`Generated: ${storyPath}`);
    }
  }
}

generateStories().catch(console.error);