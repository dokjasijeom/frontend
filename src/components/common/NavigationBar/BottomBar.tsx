import React from 'react'
import styled from 'styled-components'
import NavigationButton from './NavigationButton'

const BottomBarContainer = styled.div`
  width: 600px;
  z-index: 100;
  @media (max-width: 600px) {
    width: 100%;
  }
  background: ${({ theme }) => theme.color.system.w};
  padding: 8px 0 6px;
  display: flex;
  justify-content: space-around;
  flex: 1;
  position: fixed;
  bottom: 0;
  border-top: solid 1px ${({ theme }) => theme.color.gray[200]};
  border-left: solid 1px ${({ theme }) => theme.color.gray[200]};
  border-right: solid 1px ${({ theme }) => theme.color.gray[200]};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

function BottomBar() {
  return (
    <BottomBarContainer>
      <NavigationButton IconName="Doksi" title="홈" href="/" />
      <NavigationButton IconName="Menu" title="카테고리" href="/category" />
      <NavigationButton IconName="Search" title="검색" href="/search" />
      <NavigationButton IconName="Library" title="내 서재" href="/library" />
    </BottomBarContainer>
  )
}

export default BottomBar
