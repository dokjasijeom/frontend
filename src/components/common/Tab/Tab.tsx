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
    ${({ theme }) => theme.typography.body1};
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

  .button_tab_wrapper {
    width: 100%;
    display: flex;
  }
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

const UnderBarTabContainer = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: solid 1px ${({ theme }) => theme.color.gray[200]};
`

const UnderBarTabItemWrapper = styled.div`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.gray[600]};
  cursor: pointer;
  padding: 16px 4px 12px;
  display: flex;
  flex-direction: column;

  &.active {
    padding: 16px 4px 9px;
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.color.main[600]};
    border-bottom: 3px solid ${({ theme }) => theme.color.main[600]};
  }
`

export interface TabItem {
  label: string
  value: string
}

interface TabProps {
  type?: 'text' | 'button' | 'underbar'
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
            <div className="button_tab_wrapper" key={tab.value}>
              <ButtonTabItemWrapper
                className={selectedTab.value === tab.value ? 'active' : ''}
                key={tab.value}
                onClick={() => onChange(tab)}
              >
                {tab.label}
              </ButtonTabItemWrapper>
              {tabList.length !== index + 1 && <ButtonTabDivider />}
            </div>
          ))}
        </ButtonTabContainer>
      )
    }
    if (type === 'underbar') {
      return (
        <UnderBarTabContainer>
          {tabList.map((tab) => (
            <>
              <UnderBarTabItemWrapper
                className={selectedTab.value === tab.value ? 'active' : ''}
                key={tab.value}
                onClick={() => onChange(tab)}
              >
                {tab.label}
              </UnderBarTabItemWrapper>
            </>
          ))}
        </UnderBarTabContainer>
      )
    }
    return null
  }
  return <>{renderComponent()}</>
}

export default Tab
