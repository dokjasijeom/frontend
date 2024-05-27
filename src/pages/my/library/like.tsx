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
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import SeriesItem from '@/components/common/SeriesItem/SeriesItem'
import { Series } from '@/@types/series'

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
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;

  .add_button_body {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`
function Like() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(SERIES_TYPE_TAB_LIST[0])
  const theme = useTheme()
  const { showToast } = useToast()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
  })

  const handleAddMyLibrary = () => {
    showToast({ message: '기록장에 추가했어요!' })
  }
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
          {!isEmpty(user) &&
            !isEmpty(user.likeSeries) &&
            user.likeSeries.map((series: Series) => (
              <>
                <LikeBookWrapper key={series.hashId}>
                  <SeriesItem series={series} />
                  <Button
                    width="auto"
                    type="secondary"
                    onClick={handleAddMyLibrary}
                  >
                    <div className="add_button_body">
                      <Icons
                        width="20px"
                        height="20px"
                        name="Plus"
                        color={theme.color.main[600]}
                      />
                      내 서재에 추가하기
                    </div>
                  </Button>
                </LikeBookWrapper>
                <Divider
                  color={theme.color.gray[100]}
                  style={{ margin: '8px 0' }}
                />
              </>
            ))}
        </LikeBookListWrapper>
      </LikeWrapper>
    </LikeContainer>
  )
}

Like.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Like
