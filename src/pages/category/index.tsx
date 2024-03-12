import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import {
  BOOK_TYPE_TAB_LIST,
  PLATFORM_TAB_LIST,
  SORT_TAB_LIST,
} from '@/constants/Tab'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { CATEGORY, CategoryItem } from '@/constants/Category'
import { isEmpty } from 'lodash'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import { Platform } from '@/@types/platform'

const CategoryContainer = styled.div`
  padding-top: 56px;
`

const CategoryWrapper = styled.div``

const CategoryTabWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`

const SubscribtionItem = styled.div`
  padding: 12px 20px;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.gray[50]};
  ${({ theme }) => theme.typography.body4};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &.active {
    border: 2px solid ${({ theme }) => theme.color.main[600]};
    background: ${({ theme }) => theme.color.system.w};
  }
`

const CategoryFilterWrapper = styled.div`
  padding: 0 20px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .platform_wrapper {
    display: flex;
    gap: 12px;

    .checkbox_label {
      flex: 1;
      ${({ theme }) => theme.typography.body1};
    }
  }
`

function Category() {
  const router = useRouter()
  const theme = useTheme()
  const [selectedTab, setSelectedTab] = useState(BOOK_TYPE_TAB_LIST[0])
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY[selectedTab.value][0],
  )

  const [selectedSort, setSelectedSort] = useState(SORT_TAB_LIST[0])
  const [selectedPlatform, setSelectedPlatform] = useState<Platform[]>([])

  const handleSelectedCategory = (category: CategoryItem) => {
    setSelectedCategory(category)
  }

  const handleSelectedPlatform = (platform: any) => {
    const findPlatform = selectedPlatform.find(
      (item) => item.value === platform.value,
    )
    if (findPlatform) {
      const filterPlarform = selectedPlatform.filter(
        (item) => item.value !== platform.value,
      )
      setSelectedPlatform(filterPlarform)
    } else {
      setSelectedPlatform([...selectedPlatform, platform])
    }
  }
  return (
    <CategoryContainer>
      <TitleHeader
        title="카테고리"
        onClickBack={() => {
          router.back()
        }}
      />
      <CategoryWrapper>
        <Tab
          type="underbar"
          tabList={BOOK_TYPE_TAB_LIST}
          selectedTab={selectedTab}
          onChange={(tab) => {
            setSelectedTab(tab)
            setSelectedCategory(CATEGORY[tab.value][0])
          }}
        />
        <CategoryTabWrapper>
          {!isEmpty(selectedTab) &&
            CATEGORY[selectedTab.value].map((category) => (
              <SubscribtionItem
                key={category.id}
                onClick={() => handleSelectedCategory(category)}
                className={selectedCategory.id === category.id ? 'active' : ''}
              >
                {category.label}
              </SubscribtionItem>
            ))}
        </CategoryTabWrapper>
        <CategoryFilterWrapper>
          <Tab
            type="text"
            tabList={SORT_TAB_LIST}
            selectedTab={selectedSort}
            onChange={(tab) => {
              setSelectedSort(tab)
            }}
          />
          <div className="platform_wrapper">
            {PLATFORM_TAB_LIST.map((platform) => (
              <Checkbox
                key={platform.value}
                style={{ gap: '4px' }}
                checked={Boolean(
                  selectedPlatform.find(
                    (item) => item.value === platform.value,
                  ),
                )}
                onChange={() => {
                  handleSelectedPlatform(platform)
                }}
                checkColor={theme.color.main[600]}
              >
                <div className="checkbox_label">{platform.label}</div>
              </Checkbox>
            ))}
          </div>
        </CategoryFilterWrapper>
      </CategoryWrapper>
    </CategoryContainer>
  )
}
Category.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Category
