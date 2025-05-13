import type { Meta, StoryObj } from '@storybook/react';
import { BookType } from '../../model/schema/articleSchema';
import TextBlock from './TextBlock';

const meta: Meta<typeof TextBlock> = {
  title: 'entities/Article/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  argTypes: {
    block: {
      control: 'object',
      description: 'Объект текстового блока',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Default: Story = {
  args: {
    block: {
      id: '1',
      type: BookType.TEXT,
      title: 'Пример заголовка',
      paragraphs: [
        'Первый параграф текста.',
        'Второй параграф с дополнительной информацией.',
      ],
    },
  },
};

export const NoTitle: Story = {
  args: {
    block: {
      id: '2',
      type: BookType.TEXT,

      paragraphs: [
        'Текст без заголовка.',
        'Просто несколько параграфов контента.',
      ],
    },
  },
  name: 'Без заголовка',
};

export const LongText: Story = {
  args: {
    block: {
      id: '3',
      type: BookType.TEXT,

      title: 'Очень длинный заголовок, который должен корректно переноситься',
      paragraphs: [
        'Длинный текст '.repeat(20),
        'Еще более длинный текст '.repeat(30),
      ],
    },
  },
  name: 'Длинный текст',
};

export const SingleParagraph: Story = {
  args: {
    block: {
      id: '4',
      type: BookType.TEXT,
      title: 'Короткий блок',
      paragraphs: [
        'Всего один параграф текста.',
      ],
    },
  },
  name: 'Один параграф',
};
