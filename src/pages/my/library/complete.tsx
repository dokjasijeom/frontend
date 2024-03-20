import BookItem from '@/components/common/BookItem/BookItem'
import Divider from '@/components/common/Divider/Divider'
import Tab from '@/components/common/Tab/Tab'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockMyBook } from '@/constants/MockData'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const CompleteContainer = styled.div``

const CompleteWrapper = styled.div`
  padding-top: 56px;
`
const CompleteBookListWrapper = styled.div`
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

const CompleteBookWrapper = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: center;
  min-height: 74px;
  cursor: pointer;
`
function Complete() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(SERIES_TYPE_TAB_LIST[0])
  const theme = useTheme()

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
          {MockMyBook.webNovel.map((book) => (
            <>
              <CompleteBookWrapper
                key={book.id}
                onClick={() => {
                  router.push(`/my/library/${book.id}`)
                }}
              >
                <BookItem book={book} />
              </CompleteBookWrapper>
              <Divider
                color={theme.color.gray[100]}
                style={{ margin: '8px 0' }}
              />
            </>
          ))}
        </CompleteBookListWrapper>
      </CompleteWrapper>
    </CompleteContainer>
  )
}

Complete.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Complete
