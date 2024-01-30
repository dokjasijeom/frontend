import { ReactNode } from 'react'
import styled from 'styled-components'
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
