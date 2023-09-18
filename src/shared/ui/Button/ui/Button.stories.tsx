import type { Meta, StoryObj } from '@storybook/react';
import { THEME_BUTTON, Button } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.CLEAR,
  },
};

export const Outline: Story = {
  args: {
    children: 'Text',
    theme: THEME_BUTTON.OUTLINE,
  },
};
