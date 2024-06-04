import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import {
  SERIES_TYPE_TAB_LIST,
  SORT_TAB_LIST,
  PROVIDER_TAB_LIST,
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
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
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

  .series_list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 16px;
    column-gap: 4px;
    padding: 12px 0 20px;

    @media (max-width: 560px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 419px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY[selectedSeriesTypeTab.value][0],
  )
  const [selectedSort, setSelectedSort] = useState(SORT_TAB_LIST[0])
  const [selectedProvider, setSelectedProvider] = useState<Platform[]>([])
  const [page, setPage] = useState(1)

  const handleChangePage = (currentPage: number) => {
    setPage(currentPage)
  }
  const handleSelectedCategory = (category: CategoryItem) => {
    setSelectedCategory(category)
  }

  const handleselectedProvider = (platform: any) => {
    const findPlatform = selectedProvider.find(
      (item) => item.value === platform.value,
    )
    if (findPlatform) {
      const filterPlarform = selectedProvider.filter(
        (item) => item.value !== platform.value,
      )
      setSelectedProvider(filterPlarform)
    } else {
      setSelectedProvider([...selectedProvider, platform])
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
          tabList={SERIES_TYPE_TAB_LIST}
          selectedTab={selectedSeriesTypeTab}
          onChange={(tab) => {
            setSelectedSeriesTypeTab(tab)
            setSelectedCategory(CATEGORY[tab.value][0])
          }}
        />
        <CategoryTabWrapper>
          {!isEmpty(selectedSeriesTypeTab) &&
            CATEGORY[selectedSeriesTypeTab.value].map((category) => (
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
            {PROVIDER_TAB_LIST.map((provider) => (
              <Checkbox
                key={provider.value}
                style={{ gap: '4px' }}
                checked={Boolean(
                  selectedProvider.find(
                    (item) => item.value === provider.value,
                  ),
                )}
                onChange={() => {
                  handleselectedProvider(provider)
                }}
                checkColor={theme.color.main[600]}
              >
                <div className="checkbox_label">{provider.label}</div>
              </Checkbox>
            ))}
          </div>
        </CategoryFilterWrapper>
        <CategoryListWrapper>
          <div className="total_count">전체 21,234</div>
          <div className="series_list">
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
