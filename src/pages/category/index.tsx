import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { SERIES_TYPE_TAB_LIST, SORT_TAB_LIST } from '@/constants/Tab'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Pagination from '@/components/common/Pagination/Pagination'
import { GetCategoriesParams, getCategories } from '@/api/categories'
import { Categories } from '@/@types/categories'
import { getGenres } from '@/api/genres'
import { Genre, ProviderItem } from '@/@types/series'
import { getProviders } from '@/api/providers'

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

  const [selectedSort, setSelectedSort] = useState(SORT_TAB_LIST[0])

  const [page, setPage] = useState(1)
  const [selectedGenre, setSeletedGenre] = useState<Genre>({
    hashId: 'all',
    name: '전체',
    genreType: 'common',
  })
  const [genres, setGenres] = useState<Genre[]>()
  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [categories, setCategories] = useState<Categories>()
  const [selectedProvider, setSelectedProvider] = useState<ProviderItem[]>()

  useEffect(() => {
    async function fetchCategories() {
      const providerArr = selectedProvider?.map((provider) => provider.hashId)
      const params = {
        seriesType: selectedSeriesTypeTab.name,
        page,
        pageSize: 20,
        providers: providerArr,
      } as GetCategoriesParams

      if (selectedGenre.hashId !== 'all') {
        params.genre = selectedGenre.hashId
      }

      const res = await getCategories(params)
      setCategories(res.data.data)
    }
    fetchCategories()
  }, [page, selectedGenre.hashId, selectedProvider, selectedSeriesTypeTab.name])

  useEffect(() => {
    async function fetchGenres() {
      const res = await getGenres({
        seriesType: selectedSeriesTypeTab.name,
      })
      setGenres([
        {
          hashId: 'all',
          name: '전체',
          genreType: 'common',
        },
        ...res.data.data,
      ])
    }
    fetchGenres()
  }, [selectedSeriesTypeTab.name])

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
      setSelectedProvider(res.data.data)
    }
    fetchProviders()
  }, [])

  const handleChangePage = (currentPage: number) => {
    setPage(currentPage)
  }

  const handleSelectedGenre = (genre: Genre) => {
    setSeletedGenre(genre)
  }

  const handleselectedProvider = (provider: ProviderItem) => {
    if (selectedProvider) {
      const findProvider = selectedProvider.find(
        (item) => item.hashId === provider.hashId,
      )
      if (findProvider) {
        const filterProvider = selectedProvider.filter(
          (item) => item.hashId !== provider.hashId,
        )
        setSelectedProvider(filterProvider)
      } else {
        setSelectedProvider([...selectedProvider, provider])
      }
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
            setSeletedGenre({
              hashId: 'all',
              name: '전체',
              genreType: 'common',
            })
          }}
        />
        <CategoryTabWrapper>
          {!isEmpty(genres) &&
            genres?.map((genre) => (
              <SubscribtionItem
                key={genre.hashId}
                onClick={() => handleSelectedGenre(genre)}
                className={
                  selectedGenre.hashId === genre.hashId ? 'active' : ''
                }
              >
                {genre.name}
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
            {!isEmpty(providers) &&
              providers.map((provider) => (
                <Checkbox
                  key={provider.hashId}
                  style={{ gap: '4px' }}
                  checked={
                    selectedProvider
                      ? Boolean(
                          selectedProvider.find(
                            (item) => item.hashId === provider.hashId,
                          ),
                        )
                      : false
                  }
                  onChange={() => {
                    handleselectedProvider(provider)
                  }}
                  checkColor={theme.color.main[600]}
                >
                  <div className="checkbox_label">{provider.displayName}</div>
                </Checkbox>
              ))}
          </div>
        </CategoryFilterWrapper>
        <CategoryListWrapper>
          <div className="total_count">
            전체 {categories?.pagination.totalCount.toLocaleString()}
          </div>
          <div className="series_list">
            {categories?.series.map((series) => (
              <Thumbnail key={series.hashId} series={series} />
            ))}
          </div>
          <div className="pagination_wrapper">
            <Pagination
              pageCount={categories?.pagination.totalPage ?? 1}
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
