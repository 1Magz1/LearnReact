import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from 'entities/Comment';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { BookType, Article } from '../../model/schema/articleSchema';
import ArticleComponent from './ArticleComponent';

const meta: Meta<typeof ArticleComponent> = {
  title: 'entities/Article/ArticleComponent',
  component: ArticleComponent,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Данные статьи',
    },
    comments: {
      control: 'object',
      description: 'Список комментариев',
    },
    onCommentSave: {
      action: 'commentSaved',
      description: 'Коллбек при сохранении комментария',
    },
    isLoading: {
      control: 'boolean',
      description: 'Флаг загрузки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleComponent>;

const mockArticle = {
  id: '1',
  title: 'Заголовок статьи',
  subtitle: 'Подзаголовок статьи',
  img: 'https://example.com/image.jpg',
  views: 1234,
  createdAt: Date.now() / 1000,
  blocks: [
    {
      id: '1',
      type: BookType.TEXT,
      title: 'Заголовок текстового блока',
      paragraphs: ['Первый параграф', 'Второй параграф'],
    },
    {
      id: '2',
      type: BookType.CODE,
      code: 'const x = 1;\nconst y = 2;',
    },
    {
      id: '3',
      type: BookType.IMAGE,
      src: 'https://example.com/image-block.jpg',
      title: 'Подпись к изображению',
    },
  ],
} as Article;

const mockComments = [
  {
    id: '1',
    text: 'Первый комментарий',
    user: {
      id: '1',
      username: 'User1',
      avatar: 'https://example.com/avatar1.jpg',
    },
  },
  {
    id: '2',
    text: 'Второй комментарий',
    user: {
      id: '2',
      username: 'User2',
      avatar: 'https://example.com/avatar2.jpg',
    },
  },
] as Comment[];

export const Default: Story = {
  args: {
    data: mockArticle,
    comments: mockComments,
    isLoading: false,
  },
};

export const DefaultDark: Story = {
  args: {
    data: mockArticle,
    comments: mockComments,
    isLoading: false,
  },
};

DefaultDark.decorators = [themeDecorator(Theme.DARK)];

export const Loading: Story = {
  args: {
    data: mockArticle,
    comments: [],
    isLoading: true,
  },
};

export const WithoutComments: Story = {
  args: {
    data: mockArticle,
    comments: [],
    isLoading: false,
  },
};
