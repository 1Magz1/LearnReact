import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const themeDecorator = (theme: Theme) => function (storyComponent: StoryFn) {
  return (
    <div className={`app ${theme}`}>
      {storyComponent()}
    </div>
  );
};
