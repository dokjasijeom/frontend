import AppLayout from '@/components/layout/AppLayout'
import GlobalStyle from '@/styles/GlobalStyle'
import theme from '@/styles/theme'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}
