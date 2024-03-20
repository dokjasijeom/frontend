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
import { MockSeries } from '@/constants/MockData'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Pagination from '@/components/common/Pagination/Pagination'

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

const CategoryListWrapper = styled.div`
  padding: 20px;

  .total_count {
    ${({ theme }) => theme.typography.body1};
    color: ${({ theme }) => theme.color.gray[800]};
  }

  .book_list {
    display: grid;
    justify-content: center;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(4, 137px);
    row-gap: 16px;
    column-gap: 4px;
    padding: 12px 0 20px;
  }

  .pagination_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
function Category() {
  const router = useRouter()
  const theme = useTheme()
  const [selectedBookTypeTab, setSelectedBookTypeTab] = useState(
    BOOK_TYPE_TAB_LIST[0],
  )
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY[selectedBookTypeTab.value][0],
  )
  const [selectedSort, setSelectedSort] = useState(SORT_TAB_LIST[0])
  const [selectedPlatform, setSelectedPlatform] = useState<Platform[]>([])
  const [page, setPage] = useState(1)

  const handleChangePage = (currentPage: number) => {
    setPage(currentPage)
  }
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
          selectedTab={selectedBookTypeTab}
          onChange={(tab) => {
            setSelectedBookTypeTab(tab)
            setSelectedCategory(CATEGORY[tab.value][0])
          }}
        />
        <CategoryTabWrapper>
          {!isEmpty(selectedBookTypeTab) &&
            CATEGORY[selectedBookTypeTab.value].map((category) => (
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
        <CategoryListWrapper>
          <div className="total_count">전체 21,234</div>
          <div className="book_list">
            {MockSeries.map((series) => (
              <Thumbnail key={series.hashId} series={series} />
            ))}
            {/* {MockBook[selectedBookTypeTab.value].map((book) => (
              <Thumbnail key={book.id} book={book} />
            ))} */}
          </div>
          <div className="pagination_wrapper">
            <Pagination
              pageCount={10}
              currentPage={page}
              onChangePage={handleChangePage}
            />
          </div>
        </CategoryListWrapper>
      </CategoryWrapper>
    </CategoryContainer>
  )
}
Category.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Category
