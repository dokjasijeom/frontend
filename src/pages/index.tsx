import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import { Children, useEffect, useState } from 'react'
import { getNewSeriesList, getSeriesList } from '@/api/series'
import { ProviderItem, Series } from '@/@types/series'
import { WEBNOVEL, WEBTOON } from '@/constants/Series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import { isEmpty, range } from 'lodash'
import { useRouter } from 'next/router'
import { getProviders } from '@/api/providers'

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

const SkeletonItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SwiperBookListWrapper = styled.div`
  position: relative;
  padding: 4px 0px 32px;
  width: 100%;
  .swiper {
    .swiper-slide {
      width: 184px;
    }
  }
`

export default function Home() {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [selectedWebNovelProviderTab, setSelectedWebNovelProviderTab] =
    useState<TabItem>(providers[0])
  const [selectedWebToonProviderTab, setSelectedWebToonProviderTab] =
    useState<TabItem>(providers[0])
  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [newWebNovelSeries, setNewWebNovelSeries] = useState<Series[]>([])
  const [newWebToonSeries, setNewWebToonSeries] = useState<Series[]>([])

  const router = useRouter()

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
      setSelectedWebNovelProviderTab(res.data.data[0])
      setSelectedWebToonProviderTab(res.data.data[0])
    }
    fetchProviders()
  }, [])

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab.name,
        publishDay: selectedWeek.name,
      })

      const { series } = res.data.data
      setWeekSeries(series)
    }
    fetchWeekSeries()
  }, [selectedSeriesTypeTab.name, selectedWeek.name])

  useEffect(() => {
    async function fetchNewWebNovelSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedWebNovelProviderTab.name,
      })

      const { series } = res.data.data
      setNewWebNovelSeries(series)
    }
    if (!isEmpty(providers)) {
      fetchNewWebNovelSeries()
    }
  }, [providers, selectedWebNovelProviderTab?.name])

  useEffect(() => {
    async function fetchNewWebToonSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBTOON,
        provider: selectedWebToonProviderTab.name,
      })
      const { series } = res.data.data
      setNewWebToonSeries(series)
    }
    if (!isEmpty(providers)) {
      fetchNewWebToonSeries()
    }
  }, [providers, selectedWebToonProviderTab?.name])

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
            setSelectedSeriesTypeTab(tab)
          }}
          onClickMore={() => {
            router.push('/week')
          }}
        />
        <WeekTabWrapper>
          <Tab
            type="button"
            tabList={WEEK_TAB_LIST}
            selectedTab={selectedWeek}
            onChange={(tab) => setSelectedWeek(tab)}
          />
        </WeekTabWrapper>
        <BookListWrapper>
          {isEmpty(weekSeries) ? (
            <>
              {Children.toArray(
                range(12).map(() => (
                  <SkeletonItem>
                    <Skeleton
                      width="100%"
                      height="100%"
                      style={{ aspectRatio: 1, margin: 0 }}
                    />
                    <Skeleton height="18px" style={{ marginTop: '8px' }} />
                    <Skeleton width="50%" />
                    <Skeleton width="30%" />
                  </SkeletonItem>
                )),
              )}
            </>
          ) : (
            <>
              {weekSeries.slice(0, 12).map((item) => (
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
              onChangeTab={(tab: TabItem) =>
                setSelectedWebNovelProviderTab(tab)
              }
              onClickMore={() => router.push('/new/webnovel')}
            />
            <SwiperBookListWrapper>
              <SwiperPosterThumbnail seriesList={newWebNovelSeries} />
            </SwiperBookListWrapper>
            <TabTitleHeader
              iconName="New"
              title="웹툰 신작"
              selectedTab={selectedWebToonProviderTab}
              tabList={providers}
              onChangeTab={(tab: TabItem) => setSelectedWebToonProviderTab(tab)}
              onClickMore={() => router.push('/new/webtoon')}
            />
            <SwiperBookListWrapper>
              <SwiperPosterThumbnail seriesList={newWebToonSeries} />
            </SwiperBookListWrapper>
          </>
        )}
      </HomeContainer>
    </>
  )
}
