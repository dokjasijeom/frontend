import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.color.system.w};
  color: ${({ theme }) => theme.color.gray[950]};
  ${({ theme }) => theme.typography.head2};
  z-index: 100;
  width: 600px;
  @media (max-width: 600px) {
    width: 100%;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <Image src="/logo.svg" alt="doksi" width={80} height={20} priority />
      독자시점
    </HeaderContainer>
  )
}

export default Header
