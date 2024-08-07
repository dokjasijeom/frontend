import { Series } from '@/@types/series'
import { getSeriesList } from '@/api/series'
import ThumbnailListSkeleton from '@/components/common/Skeleton/ThumbnailListSkeleton'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { PAGE_SIZE } from '@/constants/Series'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import { useIntersectionObserver } from '@/hooks/useIntersectionOpserver'
import { useInfiniteQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const WeekContainer = styled.div``

const WeekWrapper = styled.div``

const WeekTabWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  top: 56px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px;
`

const SeriesListWrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 16px;
  column-gap: 4px;
  padding: 103px 20px 32px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 419px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

function Week({
  seriesType,
  week,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] =
    useState<TabItem>(seriesType)
  const [selectedWeek, setSelectedWeek] = useState<TabItem>(week)

  const router = useRouter()

  const fetchWeekSeries = useCallback(
    async (pageParam: any) => {
      const nextPage = pageParam

      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab?.name,
        publishDay: selectedWeek?.name,
        page: nextPage,
        pageSize: PAGE_SIZE,
      })

      return res.data.data
    },
    [selectedSeriesTypeTab, selectedWeek],
  )

  const {
    data: weekSeries,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['weekSeries'],
    queryFn: ({ pageParam }) => fetchWeekSeries(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.currentPage ===
        lastPage.pagination.totalPage || lastPage.pagination.totalPage === 0
        ? undefined
        : lastPage.pagination.currentPage + 1
    },
    initialPageParam: 1,
    select: (data) => {
      return (data.pages ?? []).flatMap((item) => item.series)
    },
    enabled: !isEmpty(selectedSeriesTypeTab) && !isEmpty(selectedWeek),
  })

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  })

  const handleChangeSeriesTypeTab = async (tab: TabItem) => {
    if (selectedSeriesTypeTab?.name !== tab.name) {
      await setSelectedSeriesTypeTab(tab)
      await refetch()
      window.scrollTo(0, 0)
    }
    router.replace(
      {
        pathname: '/week',
        query: {
          seriesType: tab.name,
          week: selectedWeek?.name,
        },
      },
      '/week',
      { shallow: true },
    )
  }

  const handleChangeWeek = async (tab: TabItem) => {
    if (selectedWeek?.name !== tab.name) {
      await setSelectedWeek(tab)
      await refetch()
      window.scrollTo(0, 0)
    }
    router.replace(
      {
        pathname: '/week',
        query: {
          seriesType: selectedSeriesTypeTab?.name,
          week: tab.name,
        },
      },
      '/week',
      { shallow: true },
    )
  }

  return (
    <WeekContainer>
      <TitleHeader
        title="요일별 연재 작품"
        onClickBack={() => {
          router.push(
            {
              pathname: '/',
              query: {
                seriesType: selectedSeriesTypeTab?.name,
                week: selectedWeek?.name,
              },
            },
            '/',
          )
        }}
      />
      <WeekWrapper>
        <WeekTabWrapper>
          {selectedSeriesTypeTab && (
            <Tab
              type="text"
              tabList={SERIES_TYPE_TAB_LIST}
              selectedTab={selectedSeriesTypeTab}
              onChange={async (tab) => {
                handleChangeSeriesTypeTab(tab)
              }}
            />
          )}
          {selectedWeek && (
            <Tab
              type="button"
              tabList={WEEK_TAB_LIST}
              selectedTab={selectedWeek}
              onChange={async (tab) => {
                handleChangeWeek(tab)
              }}
            />
          )}
        </WeekTabWrapper>
        <SeriesListWrapper>
          {isEmpty(weekSeries) ? (
            <ThumbnailListSkeleton />
          ) : (
            <>
              {weekSeries &&
                weekSeries.map((item: Series) => (
                  <Thumbnail key={item.hashId} series={item} />
                ))}
            </>
          )}
        </SeriesListWrapper>
      </WeekWrapper>
      {isFetchingNextPage ? (
        <SeriesListWrapper>
          <ThumbnailListSkeleton />
        </SeriesListWrapper>
      ) : (
        <div ref={setTarget} />
      )}
    </WeekContainer>
  )
}

export const getServerSideProps: GetServerSideProps<{
  seriesType: TabItem
  week: TabItem
}> = async (context) => {
  let seriesType = SERIES_TYPE_TAB_LIST[0] as TabItem
  let week = WEEK_TAB_LIST[0] as TabItem
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
    props: { seriesType, week },
  }
}

export default Week
