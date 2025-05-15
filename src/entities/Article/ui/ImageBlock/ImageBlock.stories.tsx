import type { Meta, StoryObj } from '@storybook/react';
import { BookType } from '../../model/schema/articleSchema';
import ImageBlock from './ImageBlock';

const meta: Meta<typeof ImageBlock> = {
  title: 'entities/Article/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  argTypes: {
    block: {
      control: 'object',
      description: 'Объект текстового блока',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageBlock>;

export const Default: Story = {
  args: {
    block: {
      id: '1',
      type: BookType.IMAGE,
      title: 'Пример текста',
      src: 'https://picsum.photos/seed/picsum/150',
    },
  },
};

export const NoTitle: Story = {
  args: {
    block: {
      id: '2',
      type: BookType.IMAGE,
      title: '',
      src: 'https://picsum.photos/seed/picsum/150',
    },
  },
  name: 'Без заголовка',
};
