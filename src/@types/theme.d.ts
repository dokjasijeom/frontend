import { CSS } from 'styled-components/dist/types'

export interface ColorType {
  main: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    950: string
  }
  sub: {
    50: string
    100: string
    200: string
    300: string
    400: string
  }
  gray: {
    50: string
    100: string
    200: string
    300: string
    600: string
    800: string
    950: string
  }
  system: {
    w: string
    bk: string
    dim: string
    error: string
    success: string
    series: string
    'kakao-page': string
    ridi: string
    [key: string]: string
  }
}

export interface TypographyType {
  head1: CSS
  head2: CSS
  head3: CSS
  body1: CSS
  body2: CSS
  body3: CSS
  body4: CSS
  body5: CSS
  caption: CSS
}
