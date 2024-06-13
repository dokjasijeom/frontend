import GlobalModal from '@/components/common/Modal/GlobalModal'
import GlobalToast from '@/components/common/Toast/GlobalToast'
import AppLayout from '@/components/layout/AppLayout'
import GlobalStyle from '@/styles/GlobalStyle'
import theme from '@/styles/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
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

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Head>
            <title>독자시점</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover, user-scalable=0"
            />
          </Head>
          <GlobalStyle />
          <GlobalModal />
          <GlobalToast />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
