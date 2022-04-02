import withTheme, { defaultTheme } from '@utils/storybook/withTheme'
import withUser from '@utils/storybook/withUser'

export const parameters = {
  grid: {
    gridOn: false,
    columns: 12,
    gap: '20px',
    gutter: '0',
    maxWidth: '100%',
  },
  controls: {
    matchers: {
      color: /(background|color)$|^fill$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: Object.entries(defaultTheme.screens).filter(([, width]) => width > 0).reduce((acc, [name, width]) => {
      acc[name] = {
        name: name,
        styles: {
          width: `${width}px`,
          height: `${width}px`,
        },
      }
      return acc
    }, {}),

    defaultViewport: 'xl',
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'defaultTheme',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['defaultTheme', 'no theme'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
  user: {
    name: 'User',
    description: 'Global user for components',
    defaultValue: 'unlogged',
    toolbar: {
      icon: 'user',
      // Array of plain string values or MenuItem shape (see below)
      items: ['unlogged', 'defaultUser'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
}

export const decorators = [withTheme, withUser]
