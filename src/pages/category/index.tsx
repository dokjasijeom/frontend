import Tab, { TabItem } from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import {
  DEFAULT_GENRE_ITEM,
  SERIES_TYPE_TAB_LIST,
  SORT_TAB_LIST,
} from '@/constants/Tab'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Pagination from '@/components/common/Pagination/Pagination'
import { GetCategoriesParams, getCategories } from '@/api/categories'
import { Categories } from '@/@types/categories'
import { getGenres } from '@/api/genres'
import { Genre, Genres, ProviderItem } from '@/@types/series'
import { getProviders } from '@/api/providers'
import { useQuery } from '@tanstack/react-query'
import ThumbnailListSkeleton from '@/components/common/Skeleton/ThumbnailListSkeleton'
import { PAGE_SIZE, WEBNOVEL, WEBTOON } from '@/constants/Series'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Empty from '@/components/common/Empty/Empty'
import { NextSeo } from 'next-seo'

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

const SubscriptionItem = styled.div`
  padding: 12px 20px;
  border-radius: 100px;
  height: 41px;
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

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .platform_wrapper {
    display: flex;
    gap: 12px;

    @media (max-width: 390px) {
      gap: 8px;
    }

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
function Category({
  queryPage,
  querySeriesType,
  queryGenres,
  queryGenre,
  querySort,
  providers,
  queryProvider,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const theme = useTheme()
  const [selectedSeriesType, setSelectedSeriesType] = useState(querySeriesType)
  const [selectedSort, setSelectedSort] = useState(querySort)
  const [page, setPage] = useState(queryPage)
  const [selectedGenre, setSeletedGenre] = useState<Genre>(queryGenre)
  const [selectedProvider, setSelectedProvider] =
    useState<ProviderItem[]>(queryProvider)

  const genres = useMemo(() => {
    return queryGenres[selectedSeriesType.name]
  }, [queryGenres, selectedSeriesType?.name])

  const seriesTypeProviders = useMemo(() => {
    if (selectedSeriesType?.name === WEBNOVEL) {
      return providers?.filter((v) => v.name !== 'lezhin')
    }
    return providers
  }, [providers, selectedSeriesType])

  const {
    data: categories,
    refetch,
    isLoading,
  } = useQuery<Categories>({
    queryKey: ['categories'],
    queryFn: async () => {
      const providerArr = selectedProvider?.map((provider) => provider.hashId)
      const params = {
        seriesType: selectedSeriesType.name,
        providers: providerArr,
        sort: selectedSort.name,
        page,
        pageSize: PAGE_SIZE,
      } as unknown as GetCategoriesParams

      if (selectedGenre.hashId !== 'all') {
        params.genre = selectedGenre.hashId
      }

      const res = await getCategories(params)
      return res.data.data
    },
    enabled: !isEmpty(providers),
  })

  const handleChangePage = async (currentPage: number) => {
    await setPage(currentPage)
    await refetch()
    await window.scrollTo({
      top: 0,
    })

    router.replace(
      {
        pathname: '/category',
        query: {
          page: currentPage,
          seriesType: selectedSeriesType.name,
          genre: selectedGenre.hashId,
          sort: selectedSort.name,
          provider: JSON.stringify(selectedProvider),
        },
      },
      '/category',
      { shallow: true },
    )
  }

  const handleSelectedSeriesType = async (seriesType: TabItem) => {
    setSelectedSeriesType(seriesType)
    await setSeletedGenre(DEFAULT_GENRE_ITEM)
    await setPage(1)
    await refetch()

    router.replace(
      {
        pathname: '/category',
        query: {
          page: 1,
          seriesType: seriesType.name,
          genre: DEFAULT_GENRE_ITEM.hashId,
          sort: selectedSort.name,
          provider: JSON.stringify(selectedProvider),
        },
      },
      '/category',
      { shallow: true },
    )
  }

  const handleSelectedGenre = async (genre: Genre) => {
    setSeletedGenre(genre)
    await setPage(1)
    await refetch()

    router.replace(
      {
        pathname: '/category',
        query: {
          page: 1,
          seriesType: selectedSeriesType.name,
          genre: genre.hashId,
          sort: selectedSort.name,
          provider: JSON.stringify(selectedProvider),
        },
      },
      '/category',
      { shallow: true },
    )
  }

  const handleSelectedSort = async (sort: TabItem) => {
    setSelectedSort(sort)
    await setPage(1)
    await refetch()

    router.replace(
      {
        pathname: '/category',
        query: {
          page: 1,
          seriesType: selectedSeriesType.name,
          genre: selectedGenre.hashId,
          sort: sort.name,
          provider: JSON.stringify(selectedProvider),
        },
      },
      '/category',
      { shallow: true },
    )
  }

  const handleSelectedProvider = async (provider: ProviderItem) => {
    if (selectedProvider) {
      const findProvider = selectedProvider.find(
        (item) => item.hashId === provider.hashId,
      )
      if (findProvider) {
        const filterProvider = selectedProvider.filter(
          (item) => item.hashId !== provider.hashId,
        )
        await setSelectedProvider(filterProvider)

        router.replace(
          {
            pathname: '/category',
            query: {
              page,
              seriesType: selectedSeriesType.name,
              genre: selectedGenre.hashId,
              sort: selectedSort.name,
              provider: JSON.stringify(filterProvider),
            },
          },
          '/category',
          { shallow: true },
        )
      } else {
        await setSelectedProvider([...selectedProvider, provider])

        router.replace(
          {
            pathname: '/category',
            query: {
              page,
              seriesType: selectedSeriesType.name,
              genre: selectedGenre.hashId,
              sort: selectedSort.name,
              provider: JSON.stringify([...selectedProvider, provider]),
            },
          },
          '/category',
          { shallow: true },
        )
      }

      await refetch()
    }
  }
  return (
    <>
      <NextSeo title="카테고리" />
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
            selectedTab={selectedSeriesType}
            onChange={(tab) => {
              handleSelectedSeriesType(tab)
            }}
          />
          <CategoryTabWrapper>
            {!isEmpty(genres) &&
              genres.map((genre: Genre) => (
                <SubscriptionItem
                  key={genre.hashId}
                  onClick={() => handleSelectedGenre(genre)}
                  className={
                    selectedGenre.hashId === genre.hashId ? 'active' : ''
                  }
                >
                  {genre.name}
                </SubscriptionItem>
              ))}
          </CategoryTabWrapper>
          <CategoryFilterWrapper>
            <Tab
              type="text"
              tabList={SORT_TAB_LIST}
              selectedTab={selectedSort}
              onChange={(tab) => {
                handleSelectedSort(tab)
              }}
            />
            <div className="platform_wrapper">
              {!isEmpty(seriesTypeProviders) &&
                seriesTypeProviders?.map((provider) => (
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
                      handleSelectedProvider(provider)
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
            {isLoading && (
              <div className="series_list">
                <ThumbnailListSkeleton />
              </div>
            )}
            {isEmpty(categories?.series) && !isLoading && (
              <Empty description="등록된 작품이 없어요." />
            )}
            {!isEmpty(categories?.series) && (
              <>
                <div className="series_list">
                  {categories?.series.map((series) => (
                    <Thumbnail key={series.hashId} series={series} />
                  ))}
                </div>

                <div className="pagination_wrapper">
                  <Pagination
                    totalPage={categories?.pagination.totalPage ?? 1}
                    pageCount={10}
                    currentPage={page}
                    onChangePage={handleChangePage}
                  />
                </div>
              </>
            )}
          </CategoryListWrapper>
        </CategoryWrapper>
      </CategoryContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  queryPage: number
  querySeriesType: TabItem
  queryGenres: Genres
  queryGenre: Genre
  querySort: TabItem
  providers: ProviderItem[]
  queryProvider: ProviderItem[]
}> = async (context) => {
  let querySeriesType = SERIES_TYPE_TAB_LIST[0] as TabItem
  let queryPage = 1
  let queryGenres = {
    webnovel: [DEFAULT_GENRE_ITEM],
    webtoon: [DEFAULT_GENRE_ITEM],
  } as Genres
  let queryGenre = DEFAULT_GENRE_ITEM as Genre
  let querySort = SORT_TAB_LIST[0]
  const providers = (await getProviders()).data.data
  let queryProvider = providers

  if (context.query.provider) {
    queryProvider = JSON.parse(context.query.provider as any)
  }

  if (context.query.seriesType) {
    const findSeriesType = SERIES_TYPE_TAB_LIST.find(
      (v) => v.name === context.query.seriesType,
    ) as TabItem

    if (findSeriesType) {
      querySeriesType = findSeriesType
    }
  }

  const webNovelGenres = (
    await getGenres({
      seriesType: WEBNOVEL,
    })
  ).data.data

  const webToonGenres = (
    await getGenres({
      seriesType: WEBTOON,
    })
  ).data.data

  queryGenres = {
    webnovel: [DEFAULT_GENRE_ITEM, ...webNovelGenres],
    webtoon: [DEFAULT_GENRE_ITEM, ...webToonGenres],
  }

  if (context.query.genre && querySeriesType && queryGenres) {
    const findGenre = queryGenres[querySeriesType.name].find(
      (v) => v.hashId === context.query.genre,
    ) as Genre

    if (findGenre) {
      queryGenre = findGenre
    }
  }

  if (context.query.page) {
    queryPage = Number(context.query.page)
  }

  if (context.query.sort) {
    const findSort = SORT_TAB_LIST.find(
      (v) => v.name === context.query.sort,
    ) as TabItem

    if (findSort) {
      querySort = findSort
    }
  }

  return {
    props: {
      queryPage,
      querySeriesType,
      queryGenre,
      queryGenres,
      querySort,
      providers,
      queryProvider,
    },
  }
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Category
