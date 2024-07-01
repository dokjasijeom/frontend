import { Pagination } from '@/@types/categories'
import { Series } from '@/@types/series'
import { getNewSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { WEBNOVEL } from '@/constants/Series'
import { PROVIDER_TAB_LIST } from '@/constants/Tab'
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

const NewWebnovelContainer = styled.div``

const NewWebnovelWrapper = styled.div``

const NewWebnovelTabWrapper = styled.div`
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

function NewWebnovel() {
  const [newWebNovelSeries, setNewWebNovelSeries] = useState<Series[]>([])
  const [selectedWebNovelProviderTab, setSelectedWebNovelProviderTab] =
    useState(PROVIDER_TAB_LIST[0])
  const [page, setPage] = useState(1)
  const [paginationData, setPaginationData] = useState<Pagination>()
  const targetRef = useRef(null)
  const pageSize = 20

  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null)
  const router = useRouter()

  const fetchMore = useCallback(async () => {
    const nextPage = page + 1
    const res = await getNewSeriesList({
      seriesType: WEBNOVEL,
      provider: selectedWebNovelProviderTab.value,
      page: nextPage,
      pageSize,
    })
    const { series, pagination } = res.data.data
    setNewWebNovelSeries((prev) => [...prev, ...series])
    setPage(nextPage)
    setPaginationData(pagination)
  }, [page, selectedWebNovelProviderTab.value])

  useInfiniteScrolling({
    observerRef,
    fetchMore,
    hasMore: paginationData?.hasNext ?? false,
  })

  useEffect(() => {
    async function fetchNewWebNovelSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedWebNovelProviderTab.value,
        page: 1,
        pageSize,
      })

      const { series, pagination } = res.data.data

      setPaginationData(pagination)
      setNewWebNovelSeries(series)
    }

    fetchNewWebNovelSeries()
  }, [selectedWebNovelProviderTab.value])

  return (
    <NewWebnovelContainer>
      <TitleHeader
        title="웹소설 신작"
        onClickBack={() => {
          router.back()
        }}
      />
      <NewWebnovelWrapper>
        <NewWebnovelTabWrapper>
          <Tab
            type="text"
            tabList={PROVIDER_TAB_LIST}
            selectedTab={selectedWebNovelProviderTab}
            onChange={async (tab) => {
              if (selectedWebNovelProviderTab.value !== tab.value) {
                await setPage(1)
                await setNewWebNovelSeries([])
                await setSelectedWebNovelProviderTab(tab)
              }
            }}
          />
        </NewWebnovelTabWrapper>
        <SeriesListWrapper>
          {isEmpty(newWebNovelSeries) ? (
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
              {newWebNovelSeries.map((item) => (
                <Thumbnail key={item.hashId} series={item} />
              ))}
            </>
          )}
        </SeriesListWrapper>
      </NewWebnovelWrapper>
      <div ref={targetRef} />
      <div ref={setObserverRef} />
    </NewWebnovelContainer>
  )
}

export default NewWebnovel
