import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const themeDecorator = (theme: Theme) => function (Story: Story) {
  return (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );
};
