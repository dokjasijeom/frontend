import { ReactNode } from 'react'
import styled from 'styled-components'

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
      <FixedWidth>{children}</FixedWidth>
    </Centering>
  )
}

export default AppLayout
