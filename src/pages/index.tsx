import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import Head from 'next/head'
import styled from 'styled-components'
import { range } from 'lodash'
import { Book } from '@/@types/book'
import SwiperPosterThumbnail from '@/components/common/SwiperPosterThumbnail/SwiperPosterThumbnail'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import {
  CONTENTS_TAB_LIST,
  PLATFORM_TAB_LIST,
  WEEK_TAB_LIST,
} from '@/constants/Tab'
import Tab from '@/components/common/Tab/Tab'
import { useState } from 'react'

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

const book = {
  image: '',
  title: '게임 속 바바리안으로 살아남기',
  author: 'carbo(도효원)',
  genre: '로맨스',
  score: 935,
  platforms: ['naver', 'kakao', 'ridi'],
} as Book

export default function Home() {
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
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
          tabList={CONTENTS_TAB_LIST}
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
          {range(12).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Thumbnail key={index} book={book} />
          ))}
        </BookListWrapper>
        <TabTitleHeader
          iconName="New"
          title="웹소설 신작"
          tabList={PLATFORM_TAB_LIST}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail />
        </SwiperBookListWrapper>
        <TabTitleHeader
          iconName="New"
          title="웹툰 신작"
          tabList={PLATFORM_TAB_LIST}
          onClickMore={() => {}}
        />
        <SwiperBookListWrapper>
          <SwiperPosterThumbnail />
        </SwiperBookListWrapper>
      </HomeContainer>
    </>
  )
}
