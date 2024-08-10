import { ProviderItem } from '@/@types/series'
import { getProviders } from '@/api/providers'
import { getNewSeriesList } from '@/api/series'
import Empty from '@/components/common/Empty/Empty'
import ThumbnailListSkeleton from '@/components/common/Skeleton/ThumbnailListSkeleton'
import Tab, { TabItem } from '@/components/common/Tab/Tab'
import Thumbnail from '@/components/common/Thumbnail/Thumbnail'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import { PAGE_SIZE, WEBNOVEL } from '@/constants/Series'
import { useIntersectionObserver } from '@/hooks/useIntersectionOpserver'
import { useInfiniteQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const NewWebnovelContainer = styled.div``

const NewWebnovelWrapper = styled.div``

const NewWebnovelTabWrapper = styled.div`
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
  padding: 52px 20px 32px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 419px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

function NewWebnovel({
  providers,
  queryProvider,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedProvider, setSelectedProvider] =
    useState<TabItem>(queryProvider)

  const router = useRouter()

  const fetchNewSeries = useCallback(
    async (pageParam: any) => {
      const res = await getNewSeriesList({
        seriesType: WEBNOVEL,
        provider: selectedProvider?.name,
        page: pageParam,
        pageSize: PAGE_SIZE,
      })

      return res.data.data
    },
    [selectedProvider],
  )

  const {
    data: newWebNovelSeries,
    fetchNextPage,
    isLoading,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['newWebNovelSeries'],
    queryFn: ({ pageParam }) => fetchNewSeries(pageParam),
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
    enabled: !isEmpty(providers) && !isEmpty(selectedProvider),
  })

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  })

  const handleChangeProviderTab = async (tab: TabItem) => {
    if (selectedProvider.name !== tab.name) {
      await setSelectedProvider(tab)
      await refetch()
      window.scrollTo(0, 0)
    }

    router.replace(
      {
        pathname: '/new/webnovel',
        query: {
          newWebNovelProvider: tab.name,
        },
      },
      '/new/webnovel',
      { shallow: true },
    )
  }

  return (
    <NewWebnovelContainer>
      <TitleHeader
        title="웹소설 신작"
        onClickBack={() => {
          router.push(
            {
              pathname: '/',
              query: {
                newWebNovelProvider: selectedProvider.name,
              },
            },
            '/',
          )
        }}
      />
      <NewWebnovelWrapper>
        <NewWebnovelTabWrapper>
          {!isEmpty(providers) && !isEmpty(selectedProvider) && (
            <Tab
              type="text"
              tabList={providers}
              selectedTab={selectedProvider}
              onChange={async (tab) => {
                handleChangeProviderTab(tab)
              }}
            />
          )}
        </NewWebnovelTabWrapper>
        {isEmpty(newWebNovelSeries) && !isLoading && (
          <Empty description="등록된 작품이 없어요." />
        )}
        <SeriesListWrapper>
          {isLoading && <ThumbnailListSkeleton />}
          {newWebNovelSeries &&
            newWebNovelSeries.map((item) => (
              <Thumbnail key={item.hashId} series={item} />
            ))}
        </SeriesListWrapper>
      </NewWebnovelWrapper>
      {isFetchingNextPage ? (
        <SeriesListWrapper>
          <ThumbnailListSkeleton />
        </SeriesListWrapper>
      ) : (
        <div ref={setTarget} />
      )}
    </NewWebnovelContainer>
  )
}

export const getServerSideProps: GetServerSideProps<{
  providers: ProviderItem[]
  queryProvider: TabItem
}> = async (context) => {
  let providers = [] as ProviderItem[]
  let queryProvider = {} as TabItem
  const res = await getProviders()

  providers = res.data.data.filter((v: ProviderItem) => v.name !== 'lezhin')

  if (providers) {
    if (context.query.newWebNovelProvider) {
      const findProvider = providers.find(
        (v) => v.name === context.query.newWebNovelProvider,
      ) as TabItem
      queryProvider = findProvider
    } else {
      // eslint-disable-next-line prefer-destructuring
      queryProvider = providers[0]
    }
  }

  return {
    props: { providers, queryProvider },
  }
}

export default NewWebnovel
