import { ReactNode } from 'react'
import styled from 'styled-components'
import { Metadata, Viewport } from 'next'
import Header from '../common/Header/Header'
import BottomBar from '../common/NavigationBar/BottomBar'

const Centering = styled.div`
  display: flex;
  justify-content: center;
`
const FixedWidth = styled.div`
  width: 600px;
  padding: 56px 0 88px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
interface AppLayoutProps {
  children: ReactNode | undefined
}

export const medadata: Metadata = {
  title: '독자시점',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

function AppLayout(props: AppLayoutProps) {
  const { children } = props
  return (
    <Centering>
      <FixedWidth>
        <Header />
        {children}
        <BottomBar />
      </FixedWidth>
    </Centering>
  )
}

export default AppLayout
