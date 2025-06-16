import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSortField } from 'entities/Article';
import { themeDecorator } from 'shared/config/Storybook/decorators/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ArticleFilters from './ArticleFilters';
import { OrderBy } from '../../model/schema/articleSchema';

const meta: Meta<typeof ArticleFilters> = {
  title: 'entities/Article/ArticleFilters',
  component: ArticleFilters,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when filter values change',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleFilters>;

export const Default: Story = {
  args: {
    onValueChange: () => console.log('Filters changed'),
  },
  parameters: {
    mockData: [
      {
        url: '/api/articles*',
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
};

export const DefaultDark: Story = {
  args: {
    onValueChange: () => console.log('Filters changed'),
  },
  parameters: {
    mockData: [
      {
        url: '/api/articles*',
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
};
DefaultDark.decorators = [themeDecorator(Theme.DARK)];

export const WithInitialValues: Story = {
  args: {
    onValueChange: () => console.log('Filters changed'),
  },
  parameters: {
    reactHookForm: {
      defaultValues: {
        sort: ArticleSortField.TITLE,
        order: OrderBy.ASC,
        search: 'React',
      },
    },
  },
};
