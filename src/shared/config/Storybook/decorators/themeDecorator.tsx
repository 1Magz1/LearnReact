import { Theme } from 'app/providers/ThemeProvider';
import { StoryFn } from '@storybook/react';

export const themeDecorator = (theme: Theme) => function (Story: StoryFn) {
  document.body.className = theme;

  return (
    <Story />
  );
};
