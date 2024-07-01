import { Pagination } from '@/@types/categories'
import { ProviderItem, Series } from '@/@types/series'
import { getProviders } from '@/api/providers'
import { getNewSeriesList } from '@/api/series'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { WEBTOON } from '@/constants/Series'
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

const NewWebtoonContainer = styled.div``

const NewWebtoonWrapper = styled.div``

const NewWebtoonTabWrapper = styled.div`
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
  padding: 28px 20px 32px;

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

function NewWebtoon() {
  const [newWebToonSeries, setNewWebToonSeries] = useState<Series[]>([])
  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [selectedProvider, setSelectedProvider] = useState<TabItem>(
    providers[0],
  )
  const [page, setPage] = useState(1)
  const [paginationData, setPaginationData] = useState<Pagination>()
  const targetRef = useRef(null)
  const pageSize = 20

  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null)
  const router = useRouter()

  const fetchMore = useCallback(async () => {
    const nextPage = page + 1
    const res = await getNewSeriesList({
      seriesType: WEBTOON,
      provider: selectedProvider.name,
      page: nextPage,
      pageSize,
    })
    const { series, pagination } = res.data.data
    setNewWebToonSeries((prev) => [...prev, ...series])
    setPage(nextPage)
    setPaginationData(pagination)
  }, [page, selectedProvider?.name])

  useInfiniteScrolling({
    observerRef,
    fetchMore,
    hasMore: paginationData?.hasNext ?? false,
  })

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
      setSelectedProvider(res.data.data[0])
    }
    fetchProviders()
  }, [])

  useEffect(() => {
    async function fetchNewWebToonSeries() {
      const res = await getNewSeriesList({
        seriesType: WEBTOON,
        provider: selectedProvider.name,
        page: 1,
        pageSize,
      })

      const { series, pagination } = res.data.data

      setPaginationData(pagination)

      setNewWebToonSeries(series)
    }
    if (!isEmpty(providers)) {
      fetchNewWebToonSeries()
    }
  }, [providers, selectedProvider?.name])

  return (
    <NewWebtoonContainer>
      <TitleHeader
        title="웹툰 신작"
        onClickBack={() => {
          router.back()
        }}
      />
      <NewWebtoonWrapper>
        <NewWebtoonTabWrapper>
          {!isEmpty(providers) && (
            <Tab
              type="text"
              tabList={providers}
              selectedTab={selectedProvider}
              onChange={async (tab) => {
                if (selectedProvider.name !== tab.name) {
                  await setPage(1)
                  await setNewWebToonSeries([])
                  await setSelectedProvider(tab)
                }
              }}
            />
          )}
        </NewWebtoonTabWrapper>
        <SeriesListWrapper>
          {isEmpty(newWebToonSeries) ? (
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
              {newWebToonSeries.map((item) => (
                <Thumbnail key={item.hashId} series={item} />
              ))}
            </>
          )}
        </SeriesListWrapper>
      </NewWebtoonWrapper>
      <div ref={targetRef} />
      <div ref={setObserverRef} />
    </NewWebtoonContainer>
  )
}

export default NewWebtoon
