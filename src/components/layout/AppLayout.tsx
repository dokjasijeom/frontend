import { ReactNode } from 'react'
import styled from 'styled-components'
import Header from '../Header'
import BottomBar from '../NavigationBar/BottomBar'

const Centering = styled.div`
  display: flex;
  justify-content: center;
`
const FixedWidth = styled.div`
  width: 600px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
interface AppLayoutProps {
  children: ReactNode | undefined
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
