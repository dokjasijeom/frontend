import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import {
  SERIES_TYPE_TAB_LIST,
  WEEK_TAB_LIST,
  PROVIDER_TAB_LIST,
} from '@/constants/Tab'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import { Children, useEffect, useState } from 'react'
import { getNewSeriesList, getSeriesList } from '@/api/series'
import { Series } from '@/@types/series'
import { WEBNOVEL, WEBTOON } from '@/constants/Series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import { isEmpty, range } from 'lodash'

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
  const [selectedBookTypeTab, setSelectedBookTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
  const [selectedWebNovelProviderTab, setSelectedWebNovelProviderTab] =
    useState(PROVIDER_TAB_LIST[0])
  const [selectedWebToonProviderTab, setSelectedWebToonProviderTab] = useState(
    PROVIDER_TAB_LIST[0],
  )

  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [newWebNovelSeries, setNewWebNovelSeries] = useState<Series[]>([])
  const [newWebToonSeries, setNewWebToonSeries] = useState<Series[]>([])

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedBookTypeTab.value,
        publishDay: selectedWeek.value,
      })
      setWeekSeries(res.data.data)
    }
    fetchWeekSeries()
  }, [selectedBookTypeTab.value, selectedWeek.value])

  useEffect(() => {
    async function fetchNewWebNovelSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedWebNovelProviderTab.value,
      })
      setNewWebNovelSeries(res.data.data)
    }
    fetchNewWebNovelSeries()
  }, [selectedWebNovelProviderTab.value])

  useEffect(() => {
    async function fetchNewWebToonSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBTOON,
        provider: selectedWebToonProviderTab.value,
      })
      setNewWebToonSeries(res.data.data)
    }
    fetchNewWebToonSeries()
  }, [selectedWebToonProviderTab.value])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <TabTitleHeader
          iconName="Calendar"
          title="요일별 연재 작품"
          selectedTab={selectedBookTypeTab}
          tabList={SERIES_TYPE_TAB_LIST}
          onChangeTab={(tab) => {
            setSelectedBookTypeTab(tab)
          }}
          onClickMore={() => {}}
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
        <TabTitleHeader
          iconName="New"
          title="웹소설 신작"
          selectedTab={selectedWebNovelProviderTab}
          tabList={PROVIDER_TAB_LIST}
          onChangeTab={(tab: TabItem) => setSelectedWebNovelProviderTab(tab)}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail seriesList={newWebNovelSeries} />
        </SwiperBookListWrapper>
        <TabTitleHeader
          iconName="New"
          title="웹툰 신작"
          selectedTab={selectedWebToonProviderTab}
          tabList={PROVIDER_TAB_LIST}
          onChangeTab={(tab: TabItem) => setSelectedWebToonProviderTab(tab)}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail seriesList={newWebToonSeries} />
        </SwiperBookListWrapper>
      </HomeContainer>
    </>
  )
}
