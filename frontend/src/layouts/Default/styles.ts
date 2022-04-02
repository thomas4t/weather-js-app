import { createGlobalStyle } from '@xstyled/styled-components'

export const baseFontSizePx = 14

// just common normalization, without any specific styling
export const Normalize = createGlobalStyle`
  /* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* create consistent and responsive base for relative units */
  html {
    font-size: ${baseFontSizePx}px;
  }

  /* System Fonts as used by GitHub */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  input, button, select, textarea, optgroup, option {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
  }
`

// global theming and styling global elements
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: primary;
    font-size: default;
  }
  h1, h2, h3 {
    color: primary1;
  }
  a {
    text-decoration: none;
    color: primary3;
  }
`

// layout styles for body and other root elements - cannot be used in storybook
export const LayoutStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: white;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`
