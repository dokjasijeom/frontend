import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.system.w};
  z-index: 100;
  width: 600px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const PageTitleWrapper = styled.div`
  display: inline-flex;
  gap: 12px;
  cursor: pointer;

  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
`

function Header() {
  const router = useRouter()
  return (
    <HeaderContainer>
      <PageTitleWrapper onClick={() => router.push('/')}>
        <Image src="/logo.svg" alt="doksi" width={80} height={20} priority />
        독자시점
      </PageTitleWrapper>
    </HeaderContainer>
  )
}

export default Header
