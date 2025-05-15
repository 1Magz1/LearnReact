import type { Meta, StoryObj } from '@storybook/react';
import { BookType } from '../../model/schema/articleSchema';
import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'entities/Article/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
    block: {
      control: 'object',
      description: 'Объект текстового блока',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    block: {
      id: '1',
      type: BookType.CODE,
      code: 'const x = 1;',
    },
  },
};
