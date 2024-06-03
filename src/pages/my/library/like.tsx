import { getUser } from '@/api/user'
import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import Icons from '@/components/common/Icons/Icons'
import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockMyBook } from '@/constants/MockData'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import useToast from '@/hooks/useToast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import SeriesItem from '@/components/common/SeriesItem/SeriesItem'
import { Series } from '@/@types/series'
import { LikeSeries, User } from '@/@types/user'
import { recordSeries } from '@/api/series'

const LikeContainer = styled.div``

const LikeWrapper = styled.div`
  padding-top: 56px;
`
const LikeBookListWrapper = styled.div`
  padding: 20px;
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

const LikeBookWrapper = styled.div`
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
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    width: 100%;
    button {
      width: 100%;
    }
  }
`

function Like() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(SERIES_TYPE_TAB_LIST[0])
  const theme = useTheme()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
  })

  const handleAddMyLibrary = async (series: Series) => {
    await recordSeries(series.hashId).then(() => {
      showToast({ message: '기록장에 추가했어요!' })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    })
  }

  const filterLikeSeriesList = useMemo(() => {
    if (!isEmpty(user) && !isEmpty(user.likeSeries)) {
      return user.likeSeries.filter(
        (list: LikeSeries) => list.seriesType === selectedTab.value,
      )
    }

    return []
  }, [selectedTab.value, user])

  return (
    <LikeContainer>
      <TitleHeader title="찜한 작품" onClickBack={() => router.back()} />
      <LikeWrapper>
        <Tab
          type="underbar"
          tabList={SERIES_TYPE_TAB_LIST}
          selectedTab={selectedTab}
          onChange={(tab) => setSelectedTab(tab)}
        />
        <LikeBookListWrapper>
          {isEmpty(MockMyBook.webNovel) && (
            <EmptyBook>
              <Image
                src="/images/empty_book.png"
                width={210}
                height={105}
                alt=""
              />
              찜한 작품이 없어요.
            </EmptyBook>
          )}
          {!isEmpty(filterLikeSeriesList) &&
            filterLikeSeriesList.map((series: Series) => {
              const isUserRecordSeries = user?.recordSeries.find(
                (item) => item.series?.hashId === series.hashId,
              )

              return (
                <>
                  <LikeBookWrapper key={series.hashId}>
                    <SeriesItem series={series} />
                    <Button
                      style={{ minWidth: '180px' }}
                      width="auto"
                      type={isUserRecordSeries ? 'primary' : 'secondary'}
                      onClick={() => handleAddMyLibrary(series)}
                    >
                      <div className="add_button_body">
                        <Icons
                          width="20px"
                          height="20px"
                          name={isUserRecordSeries ? 'OpenedBook' : 'Plus'}
                          color={
                            isUserRecordSeries
                              ? theme.color.system.w
                              : theme.color.main[600]
                          }
                        />
                        {isUserRecordSeries
                          ? '읽고 있는 작품'
                          : '내 서재에 추가하기'}
                      </div>
                    </Button>
                  </LikeBookWrapper>
                  <Divider
                    color={theme.color.gray[100]}
                    style={{ margin: '8px 0' }}
                  />
                </>
              )
            })}
        </LikeBookListWrapper>
      </LikeWrapper>
    </LikeContainer>
  )
}

Like.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Like
