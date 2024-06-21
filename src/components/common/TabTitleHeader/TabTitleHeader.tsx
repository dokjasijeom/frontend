import React, { ReactNode } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Tab, { TabItem } from '../Tab/Tab'
import Icons, { IconNameType } from '../Icons/Icons'

const TabTitleHeaderContainer = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  ${({ theme }) => theme.typography.head1};
  color: ${({ theme }) => theme.color.gray[950]};
  .tab_title_wrapper {
    display: flex;
    align-items: center;
    gap: 20px;

    .tab_title {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  @media (max-width: 450px) {
    align-items: flex-start;
    .tab_title_wrapper {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  &.inline {
    @media (max-width: 450px) {
      align-items: center;
      .tab_title_wrapper {
        flex-direction: row;
        align-items: center;
        gap: 20px;
      }
    }
  }
`

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

interface TabTitleHeaderProps {
  iconName: IconNameType
  title: string
  tabList?: TabItem[]
  selectedTab?: TabItem
  onChangeTab?: (tab: TabItem) => void
  moreButton?: ReactNode | undefined
  onClickMore: () => void
}

function TabTitleHeader(props: TabTitleHeaderProps) {
  const {
    title,
    tabList = [],
    selectedTab,
    onChangeTab,
    onClickMore,
    iconName,
    moreButton,
  } = props
  const theme = useTheme()

  return (
    <TabTitleHeaderContainer
      className={iconName === 'Calendar' ? 'inline' : ''}
    >
      <div className="tab_title_wrapper">
        <div className="tab_title">
          <Icons name={iconName} color={theme.color.main[300]} />
          {title}
        </div>
        {!isEmpty(tabList) && !isEmpty(selectedTab) && onChangeTab && (
          <Tab
            tabList={tabList}
            selectedTab={selectedTab}
            onChange={(tab) => onChangeTab(tab)}
          />
        )}
      </div>
      <MoreButton onClick={onClickMore}>
        {moreButton || <Icons name="ChevronRight" />}
      </MoreButton>
    </TabTitleHeaderContainer>
  )
}

export default TabTitleHeader
