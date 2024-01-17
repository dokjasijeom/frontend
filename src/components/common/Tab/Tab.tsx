import React from 'react'
import styled from 'styled-components'

const TextTabContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
const TextTabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TextTabItemWrapper = styled.div`
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.gray[600]};
  cursor: pointer;

  &.active {
    color: ${({ theme }) => theme.color.main[600]};
  }
`

const TextTabDivider = styled.div`
  width: 0.5px;
  height: 10px;
  background: ${({ theme }) => theme.color.gray[300]};
`

const ButtonTabContainer = styled.div`
  border: solid 1px ${({ theme }) => theme.color.gray[100]};
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.color.system.w};
`

const ButtonTabItemWrapper = styled.div`
  padding: 8px 0;
  height: 33px;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.gray[600]};
  cursor: pointer;
  background: ${({ theme }) => theme.color.system.w};
  flex: 1;
  text-align: center;
  &.active {
    color: ${({ theme }) => theme.color.system.w};
    background: ${({ theme }) => theme.color.main[600]};
  }
`

const ButtonTabDivider = styled.div`
  width: 1px;
  height: 33px;
  background: ${({ theme }) => theme.color.gray[100]};
`

export interface TabItem {
  label: string
  value: string
}

interface TabProps {
  type?: 'text' | 'button'
  tabList: TabItem[]
  selectedTab: TabItem
  onChange: (tab: TabItem) => void
}

function Tab(props: TabProps) {
  const { type = 'text', tabList, selectedTab, onChange } = props

  const renderComponent = () => {
    if (type === 'text') {
      return (
        <TextTabContainer>
          {tabList.map((tab, index) => (
            <TextTabWrapper key={tab.value}>
              <TextTabItemWrapper
                className={selectedTab.value === tab.value ? 'active' : ''}
                onClick={() => onChange(tab)}
              >
                {tab.label}
              </TextTabItemWrapper>
              {tabList.length !== index + 1 && <TextTabDivider />}
            </TextTabWrapper>
          ))}
        </TextTabContainer>
      )
    }
    if (type === 'button') {
      return (
        <ButtonTabContainer>
          {tabList.map((tab, index) => (
            <>
              <ButtonTabItemWrapper
                className={selectedTab.value === tab.value ? 'active' : ''}
                key={tab.value}
                onClick={() => onChange(tab)}
              >
                {tab.label}
              </ButtonTabItemWrapper>
              {tabList.length !== index + 1 && <ButtonTabDivider />}
            </>
          ))}
        </ButtonTabContainer>
      )
    }
    return null
  }
  return <>{renderComponent()}</>
}

export default Tab
