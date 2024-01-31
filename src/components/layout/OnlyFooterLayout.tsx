import { ReactNode } from 'react'
import styled from 'styled-components'
import BottomBar from '../common/NavigationBar/BottomBar'

const Centering = styled.div`
  display: flex;
  justify-content: center;
`
const FixedWidth = styled.div`
  width: 600px;
  padding-bottom: 88px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
interface OnlyFooterLayoutProps {
  children: ReactNode | undefined
}

function OnlyFooterLayout(props: OnlyFooterLayoutProps) {
  const { children } = props
  return (
    <Centering>
      <FixedWidth>
        {children}
        <BottomBar />
      </FixedWidth>
    </Centering>
  )
}

export default OnlyFooterLayout
