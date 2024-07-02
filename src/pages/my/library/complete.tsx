import { RecordSeries, User } from '@/@types/user'
import { getUser } from '@/api/user'
import Divider from '@/components/common/Divider/Divider'
import RecordSeriesItem from '@/components/common/RecordSeriesItem/RecordSeriesItem'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import { useQuery } from '@tanstack/react-query'
import { isEmpty, range } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Children, ReactElement, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const CompleteContainer = styled.div``

const CompleteWrapper = styled.div`
  padding-top: 56px;
`
const CompleteBookListWrapper = styled.div`
  padding: 20px;
`

const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 12px;
`

const SkeletonItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const EmptyBook = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
  align-items: center;
  justify-content: center;
  gap: 20px;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
`

const CompleteBookWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 12px;
  justify-content: space-between;
  align-items: center;

  .add_button_body {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 490px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    width: 100%;
    padding: 12px 0;
    button {
      width: 100%;
    }
  }
`

function Complete() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(SERIES_TYPE_TAB_LIST[0])
  const theme = useTheme()

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
  })

  const filterCompletedRecordSeriesList = useMemo(() => {
    if (!isEmpty(user) && !isEmpty(user.completeRecordSeries)) {
      return user.completeRecordSeries.filter(
        (list: RecordSeries) => list.seriesType === selectedTab.name,
      )
    }

    return []
  }, [selectedTab.name, user])

  return (
    <CompleteContainer>
      <TitleHeader title="완독한 작품" onClickBack={() => router.back()} />
      <CompleteWrapper>
        <Tab
          type="underbar"
          tabList={SERIES_TYPE_TAB_LIST}
          selectedTab={selectedTab}
          onChange={(tab) => setSelectedTab(tab)}
        />
        <CompleteBookListWrapper>
          {isLoading && (
            <SkeletonWrapper>
              {Children.toArray(
                range(4).map(() => (
                  <SkeletonItem>
                    <Skeleton width="50px" height="50px" />
                    <div>
                      <Skeleton width="150px" height="14px" />
                      <Skeleton width="100px" />
                    </div>
                  </SkeletonItem>
                )),
              )}
            </SkeletonWrapper>
          )}
          {!isLoading && isEmpty(filterCompletedRecordSeriesList) && (
            <EmptyBook>
              <Image
                src="/images/empty_book.png"
                width={210}
                height={105}
                alt=""
              />
              완독한 작품이 없어요.
            </EmptyBook>
          )}
          {!isEmpty(filterCompletedRecordSeriesList) &&
            filterCompletedRecordSeriesList.map(
              (recordSeries: RecordSeries) => (
                <>
                  <CompleteBookWrapper key={recordSeries.id}>
                    <RecordSeriesItem recordSeries={recordSeries} />
                  </CompleteBookWrapper>
                  <Divider
                    color={theme.color.gray[100]}
                    style={{ margin: '8px 0' }}
                  />
                </>
              ),
            )}
        </CompleteBookListWrapper>
      </CompleteWrapper>
    </CompleteContainer>
  )
}

Complete.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Complete
