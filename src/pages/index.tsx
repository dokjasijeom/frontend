import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import {
  BOOK_TYPE_TAB_LIST,
  PLATFORM_TAB_LIST,
  WEEK_TAB_LIST,
} from '@/constants/Tab'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import { useEffect, useState } from 'react'
import { MockBook } from '@/constants/MockData'
import { getSeriesList } from '@/api/series'
import { Series } from '@/@types/series'

const HomeContainer = styled.div``

const WeekTabWrapper = styled.div`
  padding: 4px 20px 0;
`

const BookListWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 137px);
  row-gap: 16px;
  column-gap: 4px;
  padding: 16px 0 32px;
`

const SwiperBookListWrapper = styled.div`
  position: relative;
  padding: 4px 20px 32px;
  width: 100%;
  .swiper {
    .swiper-slide {
      width: 184px;
    }
  }
`

export default function Home() {
  const [selectedBookTypeTab, setSelectedBookTypeTab] = useState(
    BOOK_TYPE_TAB_LIST[0],
  )
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
  const [selectedWebNovelPlatformTab, setSelectedWebNovelPlatformTab] =
    useState(PLATFORM_TAB_LIST[0])
  const [selectedWebToonPlatformTab, setSelectedWebToonPlatformTab] = useState(
    PLATFORM_TAB_LIST[0],
  )

  const [weekSeries, setWeekSeries] = useState<Series[]>([])

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

  return (
    <>
      <Head>
        <title>독자시점</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <TabTitleHeader
          iconName="Calendar"
          title="요일별 연재 작품"
          selectedTab={selectedBookTypeTab}
          tabList={BOOK_TYPE_TAB_LIST}
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
          {weekSeries.map((item) => (
            <Thumbnail key={item.hashId} series={item} />
          ))}
        </BookListWrapper>
        <TabTitleHeader
          iconName="New"
          title="웹소설 신작"
          selectedTab={selectedWebNovelPlatformTab}
          tabList={PLATFORM_TAB_LIST}
          onChangeTab={(tab: TabItem) => setSelectedWebNovelPlatformTab(tab)}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail bookList={MockBook.webNovel} />
        </SwiperBookListWrapper>
        <TabTitleHeader
          iconName="New"
          title="웹툰 신작"
          selectedTab={selectedWebToonPlatformTab}
          tabList={PLATFORM_TAB_LIST}
          onChangeTab={(tab: TabItem) => setSelectedWebToonPlatformTab(tab)}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail bookList={MockBook.webToon} />
        </SwiperBookListWrapper>
      </HomeContainer>
    </>
  )
}
