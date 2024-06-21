import { Series } from '@/@types/series'
import { getSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab from '@/components/common/Tab/Tab'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import { SERIES_TYPE_TAB_LIST, WEEK_TAB_LIST } from '@/constants/Tab'
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

function Week() {
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )
  const [selectedWeek, setSelectedWeek] = useState(WEEK_TAB_LIST[0])
  const [weekSeries, setWeekSeries] = useState<Series[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const targetRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const firstEntry = entries[0]

      if (firstEntry.isIntersecting && !isLoading) {
        setIsLoading(true)
        setPage((prev) => prev + 1)
      }
    },
    [isLoading],
  )

  useEffect(() => {
    if (!targetRef.current) return undefined
    const options = {
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    observer.observe(targetRef.current)

    if (totalPage <= page) {
      observer.unobserve(targetRef.current)
    }

    return () => observer && observer.disconnect()
  }, [totalPage, page, handleObserver])

  useEffect(() => {
    async function fetchWeekSeries() {
      const res = await getSeriesList({
        seriesType: selectedSeriesTypeTab.value,
        publishDay: selectedWeek.value,
        page,
        pageSize: 15,
      })

      const { series, pagination } = res.data.data

      setTotalPage(pagination.totalPage)
      setWeekSeries((prev) => [...prev, ...series])
    }

    fetchWeekSeries()
  }, [selectedSeriesTypeTab.value, selectedWeek.value, page])

  return (
    <WeekContainer>
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
            {weekSeries.map((item) => (
              <Thumbnail key={item.hashId} series={item} />
            ))}
          </>
        )}
      </BookListWrapper>
      <div style={{ backgroundColor: 'red' }} ref={targetRef} />
    </WeekContainer>
  )
}

export default Week
