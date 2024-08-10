import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import { useState } from 'react'
import { getNewSeriesList, getSeriesList } from '@/api/series'
import { ProviderItem, Series } from '@/@types/series'
import { WEBNOVEL, WEBTOON } from '@/constants/Series'
import { isEmpty, range } from 'lodash'
import { useRouter } from 'next/router'
import { getProviders } from '@/api/providers'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ThumbnailListSkeleton from '@/components/common/Skeleton/ThumbnailListSkeleton'
import Empty from '@/components/common/Empty/Empty'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '@/components/common/Skeleton/Skeleton'

const HomeContainer = styled.div``

const WeekTabWrapper = styled.div`
  padding: 4px 20px 0;
`

const BookListWrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 16px;
  column-gap: 4px;
  padding: 16px 20px 32px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 419px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const SwiperBookListWrapper = styled.div`
  position: relative;
  padding: 4px 0px 32px;
  width: 100%;
  .swiper {
    .swiper-slide {
      width: 184px;

      @media (max-width: 490px) {
        width: 158px;
      }
    }
  }
`

const SwiperSkeletonWrapper = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 20px;
  .skeleton_item {
    width: 184px;
    height: 300px;
    @media (max-width: 490px) {
      width: 158px;
    }
  }
`

function SwiperSkeleton() {
  return (
    <SwiperSkeletonWrapper>
      {range(3).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={i} width="184px" height="300px" />
      ))}
    </SwiperSkeletonWrapper>
  )
}

export default function Home({
  providers,
  seriesType,
  week,
  newWebNovelProvider,
  newWebToonProvider,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] =
    useState<TabItem>(seriesType)
  const [selectedWeek, setSelectedWeek] = useState<TabItem>(week)
  const [selectedWebNovelProviderTab, setSelectedWebNovelProviderTab] =
    useState<TabItem>(newWebNovelProvider)
  const [selectedWebToonProviderTab, setSelectedWebToonProviderTab] =
    useState<TabItem>(newWebToonProvider)

  const router = useRouter()

  const {
    data: weekSeries,
    refetch: weekSeriesRefetch,
    isLoading: weekSeriesLoading,
  } = useQuery<Series[]>({
    queryKey: ['weekSeries'],
    queryFn: async () => {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab.name,
        publishDay: selectedWeek.name,
        page: 1,
        pageSize: 12,
      })

      const { series } = res.data.data
      return series
    },
    enabled: !isEmpty(selectedSeriesTypeTab) && !isEmpty(selectedWeek),
  })

  const {
    data: newWebNovelSeries,
    refetch: newWebNovelSeriesRefetch,
    isLoading: newWebNovelSeriesLoading,
  } = useQuery<Series[]>({
    queryKey: ['newWebNovelSeries'],
    queryFn: async () => {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedWebNovelProviderTab.name,
        page: 1,
        pageSize: 9,
      })

      const { series } = res.data.data
      return series
    },
    enabled: !isEmpty(providers) && !isEmpty(selectedWebNovelProviderTab),
  })
  const {
    data: newWebToonSeries,
    refetch: newWebToonSeriesRefetch,
    isLoading: newWebToonSeriesLoading,
  } = useQuery<Series[]>({
    queryKey: ['newWebToonSeries'],
    queryFn: async () => {
      const res = await getNewSeriesList({
        seriesType: WEBTOON,
        provider: selectedWebToonProviderTab.name,
        page: 1,
        pageSize: 9,
      })

      const { series } = res.data.data
      return series
    },
    enabled: !isEmpty(providers) && !isEmpty(selectedWebToonProviderTab),
  })

  const handleChangeSeriesTypeTab = async (tab: TabItem) => {
    await setSelectedSeriesTypeTab(tab)
    weekSeriesRefetch()
    router.replace(
      {
        pathname: '/',
        query: {
          seriesType: tab.name,
          week: selectedWeek.name,
          newWebNovelProvider: selectedWebNovelProviderTab.name,
          newWebToonProvider: selectedWebToonProviderTab.name,
        },
      },
      '/',
      { shallow: true },
    )
  }
  const handleChangeWeek = async (tab: TabItem) => {
    await setSelectedWeek(tab)
    weekSeriesRefetch()
    router.replace(
      {
        pathname: '/',
        query: {
          seriesType: selectedSeriesTypeTab.name,
          week: tab.name,
          newWebNovelProvider: selectedWebNovelProviderTab.name,
          newWebToonProvider: selectedWebToonProviderTab.name,
        },
      },
      '/',
      { shallow: true },
    )
  }
  const handleChangeWebNovelProvider = async (tab: TabItem) => {
    await setSelectedWebNovelProviderTab(tab)
    newWebNovelSeriesRefetch()
    router.replace(
      {
        pathname: '/',
        query: {
          seriesType: selectedSeriesTypeTab.name,
          week: selectedWeek.name,
          newWebNovelProvider: tab.name,
          newWebToonProvider: selectedWebToonProviderTab.name,
        },
      },
      '/',
      { shallow: true },
    )
  }
  const handleChangeWebToonProvider = async (tab: TabItem) => {
    await setSelectedWebToonProviderTab(tab)
    newWebToonSeriesRefetch()
    router.replace(
      {
        pathname: '/',
        query: {
          seriesType: selectedSeriesTypeTab.name,
          week: selectedWeek.name,
          newWebNovelProvider: selectedWebNovelProviderTab.name,
          newWebToonProvider: tab.name,
        },
      },
      '/',
      { shallow: true },
    )
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <TabTitleHeader
          iconName="Calendar"
          title="요일별 연재 작품"
          selectedTab={selectedSeriesTypeTab}
          tabList={SERIES_TYPE_TAB_LIST}
          onChangeTab={(tab) => {
            handleChangeSeriesTypeTab(tab)
          }}
          onClickMore={() => {
            router.push(
              {
                pathname: '/week',
                query: {
                  seriesType: selectedSeriesTypeTab.name,
                  week: selectedWeek?.name,
                },
              },
              '/week',
            )
          }}
        />
        {selectedWeek && (
          <WeekTabWrapper>
            <Tab
              type="button"
              tabList={WEEK_TAB_LIST}
              selectedTab={selectedWeek}
              onChange={(tab) => handleChangeWeek(tab)}
            />
          </WeekTabWrapper>
        )}
        {isEmpty(weekSeries) && !weekSeriesLoading && (
          <Empty
            description="등록된 작품이 없어요."
            style={{ padding: '80px 0 40px' }}
          />
        )}
        <BookListWrapper>
          {weekSeriesLoading ? (
            <ThumbnailListSkeleton />
          ) : (
            <>
              {weekSeries &&
                weekSeries.map((item) => (
                  <Thumbnail key={item.hashId} series={item} />
                ))}
            </>
          )}
        </BookListWrapper>
        {!isEmpty(providers) && (
          <>
            <TabTitleHeader
              iconName="New"
              title="웹소설 신작"
              selectedTab={selectedWebNovelProviderTab}
              tabList={providers.filter((v) => v.name !== 'lezhin')}
              onChangeTab={(tab: TabItem) => handleChangeWebNovelProvider(tab)}
              onClickMore={() => {
                router.push(
                  {
                    pathname: '/new/webnovel',
                    query: {
                      newWebNovelProvider: selectedWebNovelProviderTab.name,
                    },
                  },
                  '/new/webnovel',
                )
              }}
            />
            {isEmpty(newWebNovelSeries) && !newWebNovelSeriesLoading && (
              <Empty
                description="등록된 작품이 없어요."
                style={{ padding: '80px 0 40px' }}
              />
            )}
            <SwiperBookListWrapper>
              {newWebNovelSeriesLoading && <>{SwiperSkeleton()}</>}
              <SwiperPosterThumbnail seriesList={newWebNovelSeries ?? []} />
            </SwiperBookListWrapper>
            <TabTitleHeader
              iconName="New"
              title="웹툰 신작"
              selectedTab={selectedWebToonProviderTab}
              tabList={providers}
              onChangeTab={(tab: TabItem) => handleChangeWebToonProvider(tab)}
              onClickMore={() => {
                router.push(
                  {
                    pathname: '/new/webtoon',
                    query: {
                      newWebToonProvider: selectedWebToonProviderTab.name,
                    },
                  },
                  '/new/webnovel',
                )
              }}
            />
            {isEmpty(newWebToonSeries) && !newWebToonSeriesLoading && (
              <Empty
                description="등록된 작품이 없어요."
                style={{ padding: '80px 0 40px' }}
              />
            )}
            <SwiperBookListWrapper>
              {newWebToonSeriesLoading && <>{SwiperSkeleton()}</>}
              <SwiperPosterThumbnail seriesList={newWebToonSeries ?? []} />
            </SwiperBookListWrapper>
          </>
        )}
      </HomeContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  providers: ProviderItem[]
  seriesType: TabItem
  week: TabItem
  newWebNovelProvider: TabItem
  newWebToonProvider: TabItem
}> = async (context) => {
  let providers = [] as ProviderItem[]
  let seriesType = SERIES_TYPE_TAB_LIST[0] as TabItem
  let week = WEEK_TAB_LIST[0] as TabItem
  let newWebNovelProvider = {} as TabItem
  let newWebToonProvider = {} as TabItem
  const res = await getProviders()

  providers = res.data.data

  if (providers) {
    if (context.query.newWebNovelProvider) {
      const findProvider = providers.find(
        (v) => v.name === context.query.newWebNovelProvider,
      ) as TabItem
      newWebNovelProvider = findProvider
    } else {
      // eslint-disable-next-line prefer-destructuring
      newWebNovelProvider = providers[0]
    }

    if (context.query.newWebToonProvider) {
      const findProvider = providers.find(
        (v) => v.name === context.query.newWebToonProvider,
      ) as TabItem
      newWebToonProvider = findProvider
    } else {
      // eslint-disable-next-line prefer-destructuring
      newWebToonProvider = providers[0]
    }
  }

  if (context.query.seriesType) {
    const findSeriesType = SERIES_TYPE_TAB_LIST.find(
      (v) => v.name === context.query.seriesType,
    ) as TabItem

    seriesType = findSeriesType
  }

  if (context.query.week) {
    const findWeek = WEEK_TAB_LIST.find(
      (v) => v.name === context.query.week,
    ) as TabItem
    week = findWeek
  }

  return {
    props: {
      providers,
      seriesType,
      week,
      newWebNovelProvider,
      newWebToonProvider,
    },
  }
}
