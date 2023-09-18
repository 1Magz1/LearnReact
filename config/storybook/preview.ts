import type { Preview } from '@storybook/react';
import { styleDecorator } from '../../src/shared/config/Storybook/decorators/styleDecorator';
import { themeDecorator } from '../../src/shared/config/Storybook/decorators/themeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [styleDecorator, themeDecorator(Theme.DARK)],
};

export default preview;
