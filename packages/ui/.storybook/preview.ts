import type { Preview } from '@storybook/react-vite';

import { withThemeByClassName } from '@storybook/addon-themes';
import { themes } from 'storybook/theming';

import { allModes } from './modes';
import './preview.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      parentSelector: 'html',
      themes: {
        dark: 'dark',
        light: 'light',
      },
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      classTarget: 'html',
      dark: themes.dark,
      darkClass: 'dark',
      light: themes.dark,
      lightClass: 'light',
      stylePreview: true,
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
    chromatic: {
      modes: {
        dark: allModes.dark,
        light: allModes.light,
      },
    },
  },
};

export default preview;
