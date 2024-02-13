import { ColorType, TypographyType } from '@/@types/theme'
import { typography } from './typography'
import { color } from './color'

const theme = { color, typography } as {
  color: ColorType
  typography: TypographyType
}

export type Theme = typeof theme

export default theme
