import 'styled-components'
import { Theme } from '../styles/theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module '*.svg' {
  const svg: string
  export default svg
}

declare module '*.svg' {
  import React from 'react'

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
