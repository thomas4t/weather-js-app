import React from 'react'
import { ThemeProvider, DefaultTheme } from '@xstyled/styled-components'
import { StoryContext } from '@storybook/react'
import { Normalize, GlobalStyle } from '@layouts/Default/styles'
import * as themes from '../../App/settings/theme'

const wrapWithTheme = (Story: React.ComponentType, themeName: 'defaultTheme' | undefined) => {
  if (!themeName || !themes[themeName]) {
    return <Story />
  }

  const themeTyped = themes[themeName] as DefaultTheme
  return (
    <ThemeProvider theme={themeTyped}>
      <Normalize />
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
}

const withTheme = (Story: React.ComponentType, context?: StoryContext): JSX.Element => {
  const themeName = context?.globals?.theme
  return wrapWithTheme(Story, themeName)
}

export const Themed = ({ children }: { children: React.ReactNode }) => wrapWithTheme(() => <>{children}</>, 'defaultTheme')

export const { defaultTheme } = themes

export default withTheme
