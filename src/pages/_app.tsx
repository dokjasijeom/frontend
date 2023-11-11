import AppLayout from '@/components/AppLayout/AppLayout'
import GlobalStyle from '@/styles/GlobalStyle'
import theme from '@/styles/theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  )
}
