// styled-components.d.ts

// import original module declarations
import 'styled-components'
import { DefaultTheme as XStyledDefaultTheme } from '@xstyled/styled-components'

// and extend them!
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends XStyledDefaultTheme {
    /* Customize your theme */
  }
}
