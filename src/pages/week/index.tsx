import { Pagination } from '@/@types/categories'
import { Series } from '@/@types/series'
import { getSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import { useInfiniteScrolling } from '@/hooks/useInfiniteScrolling'
import { isEmpty, range } from 'lodash'
import { useRouter } from 'next/router'
import React, { Children, useCallback, useEffect, useState } from 'react'
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

function Week() {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState<TabItem>()
  const [selectedWeek, setSelectedWeek] = useState<TabItem>()
  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [page, setPage] = useState(1)
  const [paginationData, setPaginationData] = useState<Pagination>()
  const pageSize = 20

  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null)
  const router = useRouter()

  const fetchMore = useCallback(async () => {
    const nextPage = page + 1
    const res = await getSeriesList({
      seriesType: selectedSeriesTypeTab?.name,
      publishDay: selectedWeek?.name,
      page: nextPage,
      pageSize,
    })
    const { series, pagination } = res.data.data
    setWeekSeries((prev) => [...prev, ...series])
    setPage(nextPage)
    setPaginationData(pagination)
  }, [page, selectedSeriesTypeTab?.name, selectedWeek?.name])

  useInfiniteScrolling({
    observerRef,
    fetchMore,
    hasMore: paginationData?.hasNext ?? false,
  })

  useEffect(() => {
    if (router.isReady) {
      if (router.query.seriesType) {
        const findSeriesType = SERIES_TYPE_TAB_LIST.find(
          (v) => v.name === router.query.seriesType,
        ) as TabItem
        setSelectedSeriesTypeTab(findSeriesType)
      } else {
        setSelectedSeriesTypeTab(SERIES_TYPE_TAB_LIST[0])
      }

      if (router.query.week) {
        const findWeek = WEEK_TAB_LIST.find(
          (v) => v.name === router.query.week,
        ) as TabItem
        setSelectedWeek(findWeek)
      } else {
        setSelectedWeek(WEEK_TAB_LIST[0])
      }
    }
  }, [router.isReady, router.query])

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab?.name,
        publishDay: selectedWeek?.name,
        page: 1,
        pageSize,
      })

      const { series, pagination } = res.data.data

      setPaginationData(pagination)
      setWeekSeries(series)
    }

    if (!isEmpty(selectedSeriesTypeTab) && !isEmpty(selectedWeek)) {
      fetchWeekSeries()
    }
  }, [selectedSeriesTypeTab, selectedWeek])

  const handleChangeSeriesTypeTab = async (tab: TabItem) => {
    if (selectedSeriesTypeTab?.name !== tab.name) {
      await setPage(1)
      await setWeekSeries([])
      await setSelectedSeriesTypeTab(tab)
    }
    router.replace(
      {
        pathname: '/week',
        query: {
          seriesType: tab.name,
          week: selectedWeek?.name,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const handleChangeWeek = async (tab: TabItem) => {
    if (selectedWeek?.name !== tab.name) {
      await setPage(1)
      await setWeekSeries([])
      await setSelectedWeek(tab)
    }
    router.replace(
      {
        pathname: '/week',
        query: {
          seriesType: selectedSeriesTypeTab?.name,
          week: tab.name,
        },
      },
      undefined,
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
              {weekSeries.map((item) => (
                <Thumbnail key={item.hashId} series={item} />
              ))}
            </>
          )}
        </SeriesListWrapper>
      </WeekWrapper>
      <div ref={setObserverRef} />
    </WeekContainer>
  )
}

export default Week
