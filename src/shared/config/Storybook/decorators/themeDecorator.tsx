import { Theme } from 'app/providers/ThemeProvider';
import { StoryFn } from '@storybook/react';

export const themeDecorator = (theme: Theme) => function (Story: StoryFn) {
  return (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );
};
