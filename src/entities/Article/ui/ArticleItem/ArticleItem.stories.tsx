import type { Meta, StoryObj } from '@storybook/react';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ArticleItem from './ArticleItem';
import { Article, BookType, ViewType } from '../../model/schema/articleSchema';

const meta: Meta<typeof ArticleItem> = {
  title: 'entities/Article/ArticleItem',
  component: ArticleItem,
  tags: ['autodocs'],
  argTypes: {
    viewType: {
      control: 'radio',
      options: ['CARD', 'LIST'] as ViewType[],
      description: 'Тип отображения статьи',
    },
    data: {
      control: 'object',
      description: 'Данные статьи',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleItem>;

const mockArticle = {
  id: '1',
  title: 'Заголовок статьи',
  subtitle: 'Подзаголовок статьи',
  img: 'https://placehold.co/600x400',
  views: 1234,
  createdAt: Date.now() / 1000,
  tags: ['JavaScript', 'React', 'Frontend'],
  blocks: [
    {
      id: '1',
      type: BookType.TEXT,
      title: 'Введение',
      paragraphs: [
        'Это пример текстового блока статьи. Он содержит несколько абзацев текста.',
        'Второй абзац текста для демонстрации работы компонента.',
      ],
    },
    {
      id: '2',
      type: BookType.CODE,
      code: 'const x = 1;\nconst y = 2;\n\nfunction sum(a, b) {\n  return a + b;\n}',
    },
    {
      id: '3',
      type: BookType.IMAGE,
      src: 'https://placehold.co/600x400',
      title: 'Пример изображения',
    },
  ],
} as Article;

export const CardView: Story = {
  args: {
    viewType: 'CARD',
    data: mockArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CardViewDark: Story = {
  args: {
    viewType: 'CARD',
    data: mockArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
    themeDecorator(Theme.DARK),
  ],
};

export const ListView: Story = {
  args: {
    viewType: 'LIST',
    data: mockArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ListViewDark: Story = {
  args: {
    viewType: 'LIST',
    data: mockArticle,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
    themeDecorator(Theme.DARK),
  ],
};
