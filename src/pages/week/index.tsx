import { Series } from '@/@types/series'
import { getSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import { useIntersectionObserver } from '@/hooks/useIntersectionOpserver'
import { useInfiniteQuery } from '@tanstack/react-query'
import { isEmpty, range } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { Children, useCallback, useState } from 'react'
import styled from 'styled-components'

const WeekContainer = styled.div``

const WeekWrapper = styled.div``

const WeekTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px 0;
`

const SeriesListWrapper = styled.div`
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

function Week({
  seriesType,
  week,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] =
    useState<TabItem>(seriesType)
  const [selectedWeek, setSelectedWeek] = useState<TabItem>(week)
  const pageSize = 20

  const router = useRouter()

  const fetchWeekSeries = useCallback(
    async (pageParam: any) => {
      const nextPage = pageParam

      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab?.name,
        publishDay: selectedWeek?.name,
        page: nextPage,
        pageSize,
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
      refetch()
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
      refetch()
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
