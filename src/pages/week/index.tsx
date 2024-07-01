import { Pagination } from '@/@types/categories'
import { Series } from '@/@types/series'
import { getSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
import { useInfiniteScrolling } from '@/hooks/useInfiniteScrolling'
import { isEmpty, range } from 'lodash'
import { useRouter } from 'next/router'
import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [page, setPage] = useState(1)
  const [paginationData, setPaginationData] = useState<Pagination>()
  const targetRef = useRef(null)
  const pageSize = 15

  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null)
  const router = useRouter()

  const fetchMore = useCallback(async () => {
    const nextPage = page + 1
    const res = await getSeriesList({
      seriesType: selectedSeriesTypeTab.value,
      publishDay: selectedWeek.value,
      page: nextPage,
      pageSize,
    })
    const { series, pagination } = res.data.data
    setWeekSeries((prev) => [...prev, ...series])
    setPage(nextPage)
    setPaginationData(pagination)
  }, [page, selectedSeriesTypeTab.value, selectedWeek.value])

  useInfiniteScrolling({
    observerRef,
    fetchMore,
    hasMore: paginationData?.hasNext ?? false,
  })

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab.value,
        publishDay: selectedWeek.value,
        page: 1,
        pageSize,
      })

      const { series, pagination } = res.data.data

      setPaginationData(pagination)
      setWeekSeries(series)
    }

    fetchWeekSeries()
  }, [selectedSeriesTypeTab.value, selectedWeek.value])

  return (
    <WeekContainer>
      <TitleHeader
        title="요일별 연재 작품"
        onClickBack={() => {
          router.back()
        }}
      />
      <WeekWrapper>
        <WeekTabWrapper>
          <Tab
            type="text"
            tabList={SERIES_TYPE_TAB_LIST}
            selectedTab={selectedSeriesTypeTab}
            onChange={async (tab) => {
              if (selectedSeriesTypeTab.value !== tab.value) {
                await setPage(1)
                await setWeekSeries([])
                await setSelectedSeriesTypeTab(tab)
              }
            }}
          />
          <Tab
            type="button"
            tabList={WEEK_TAB_LIST}
            selectedTab={selectedWeek}
            onChange={async (tab) => {
              if (selectedWeek.value !== tab.value) {
                await setPage(1)
                await setWeekSeries([])
                await setSelectedWeek(tab)
              }
            }}
          />
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
      <div ref={targetRef} />
      <div ref={setObserverRef} />
    </WeekContainer>
  )
}

export default Week
