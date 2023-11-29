import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
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
`

const MoreButton = styled.button``

interface TabTitleHeaderProps {
  iconName: IconNameType
  title: string
  tabList: TabItem[]
  onClickMore: () => void
}

function TabTitleHeader(props: TabTitleHeaderProps) {
  const { title, tabList, onClickMore, iconName } = props
  const theme = useTheme()

  const [selectedTab, setSelectedTab] = useState(tabList[0])

  return (
    <TabTitleHeaderContainer>
      <div className="tab_title_wrapper">
        <div className="tab_title">
          <Icons name={iconName} color={theme.color.main[300]} />
          {title}
        </div>
        <Tab
          tabList={tabList}
          selectedTab={selectedTab}
          onChange={(tab) => setSelectedTab(tab)}
        />
      </div>
      <MoreButton onClick={onClickMore}>
        <Icons name="ChevronRight" />
      </MoreButton>
    </TabTitleHeaderContainer>
  )
}

export default TabTitleHeader
