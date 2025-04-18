import { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'widgets/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'HTML тег для текстового элемента',
    },
    children: {
      control: 'text',
      description: 'Содержимое текстового элемента',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Просто текст в параграфе (по умолчанию)',
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1">Заголовок h1</Text>
      <Text variant="h2">Заголовок h2</Text>
      <Text variant="h3">Заголовок h3</Text>
      <Text variant="h4">Заголовок h4</Text>
      <Text variant="h5">Заголовок h5</Text>
      <Text variant="h6">Заголовок h6</Text>
    </div>
  ),
};

export const SpanText: Story = {
  args: {
    variant: 'span',
    children: 'Текст внутри span элемента',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Текст с дополнительными стилями',
    className: 'custom-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'Добавлен класс `custom-class` который можно стилизовать через CSS',
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WithNestedElements: Story = {
  render: () => (
    <Text variant="p">
      Это параграф с
      {' '}
      {' '}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">ссылкой</a>
      .
    </Text>
  ),
};
