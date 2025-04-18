import { Theme } from 'app/providers/ThemeProvider';
import { StoryFn } from '@storybook/react';

export const themeDecorator = (theme: Theme) => function (Story: StoryFn) {
  if (document.body) {
    setTimeout(() => {
      document.body.className = theme;
    }, 0);
  }

  return (
    <Story />
  );
};
