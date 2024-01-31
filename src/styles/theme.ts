import { ColorType } from '@/@types/theme'
import { typography } from './typography'
import { color } from './color'

const theme = { color, typography } as { color: ColorType }

export type Theme = typeof theme

export default theme
