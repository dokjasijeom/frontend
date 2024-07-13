import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import { useEffect, useState } from 'react'
import { getNewSeriesList, getSeriesList } from '@/api/series'
import { ProviderItem, Series } from '@/@types/series'
import { WEBNOVEL, WEBTOON } from '@/constants/Series'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { getProviders } from '@/api/providers'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ThumbnailListSkeleton from '@/components/common/Skeleton/ThumbnailListSkeleton'

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
  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [newWebNovelSeries, setNewWebNovelSeries] = useState<Series[]>([])
  const [newWebToonSeries, setNewWebToonSeries] = useState<Series[]>([])

  const router = useRouter()

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab.name,
        publishDay: selectedWeek.name,
        page: 1,
        pageSize: 12,
      })

      const { series } = res.data.data
      setWeekSeries(series)
    }

    if (!isEmpty(selectedSeriesTypeTab) && !isEmpty(selectedWeek)) {
      fetchWeekSeries()
    }
  }, [selectedSeriesTypeTab, selectedWeek, setWeekSeries])

  useEffect(() => {
    async function fetchNewWebNovelSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedWebNovelProviderTab.name,
        page: 1,
        pageSize: 9,
      })

      const { series } = res.data.data
      setNewWebNovelSeries(series)
    }
    if (!isEmpty(providers) && !isEmpty(selectedWebNovelProviderTab)) {
      fetchNewWebNovelSeries()
    }
  }, [providers, selectedWebNovelProviderTab])

  useEffect(() => {
    async function fetchNewWebToonSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBTOON,
        provider: selectedWebToonProviderTab.name,
        page: 1,
        pageSize: 9,
      })
      const { series } = res.data.data
      setNewWebToonSeries(series)
    }
    if (!isEmpty(providers) && !isEmpty(selectedWebToonProviderTab)) {
      fetchNewWebToonSeries()
    }
  }, [providers, selectedWebToonProviderTab])

  const handleChangeSeriesTypeTab = (tab: TabItem) => {
    setSelectedSeriesTypeTab(tab)
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
  const handleChangeWeek = (tab: TabItem) => {
    setSelectedWeek(tab)
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
  const handleChangeWebNovelProvider = (tab: TabItem) => {
    setSelectedWebNovelProviderTab(tab)
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
  const handleChangeWebToonProvider = (tab: TabItem) => {
    setSelectedWebToonProviderTab(tab)
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
        <BookListWrapper>
          {isEmpty(weekSeries) ? (
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
              tabList={providers}
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
            <SwiperBookListWrapper>
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
            <SwiperBookListWrapper>
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
