import Button from '@/components/common/Button/Button'
import Icons from '@/components/common/Icons/Icons'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockBook } from '@/constants/MockData'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

const BookDetailContainer = styled.div`
  padding-top: 56px;
`

const BookDetailWrapper = styled.div``

const BookInfoWrapper = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  .book_image {
    border-radius: 12px;
    margin-right: 20px;
  }
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 200px;

    .book_info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        ${({ theme }) => theme.typography.head1};
        color: ${({ theme }) => theme.color.gray[950]};
        margin-bottom: 8px;
      }
      .sub {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};

        .divider {
          width: 1px;
          height: 12px;
          background: ${({ theme }) => theme.color.gray[600]};
          margin-left: 8px;
        }

        .caption {
          margin-left: 8px;
          ${({ theme }) => theme.typography.body3};
          color: ${({ theme }) => theme.color.gray[950]};
        }
      }
      .tags {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};
        gap: 8px;
      }
      .score {
        display: flex;
        align-items: center;
        gap: 4px;
        ${({ theme }) => theme.typography.body2};
        color: ${({ theme }) => theme.color.main[600]};
      }
    }

    .action_button_wrapper {
      display: flex;
      gap: 8px;
      .button_body {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: 4px;
      }
    }
  }
`

const RequestButton = styled.button`
  position: absolute;
  right: 20px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[600]};
  text-decoration: underline;
`

const BookDetailBodyWrapper = styled.div``

const SectionTitle = styled.div`
  padding: 16px 20px 12px;
  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
`

const SynopsisWrapper = styled.div`
  padding: 14px 20px;
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
  margin: 4px 20px 32px 20px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
  white-space: pre-wrap;
`

const PlarformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 20px 32px 20px;
`

const PlatformItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 20px;
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
`

function BookDetail() {
  const router = useRouter()
  const theme = useTheme()
  const { id } = router.query

  const book = MockBook.webNovel.find((item) => item.id === id)

  return (
    <BookDetailContainer>
      <TitleHeader title="" onClickBack={() => router.back()} isSearch />
      {book && (
        <BookDetailWrapper>
          <BookInfoWrapper>
            {!isEmpty(book.image) && (
              <Image
                className="book_image"
                src={book.image}
                width={140}
                height={200}
                alt=""
              />
            )}
            <div className="book_info_wrapper">
              <div className="book_info">
                <div className="title">{book.title}</div>
                <div className="sub">
                  {book.author} <span className="caption">저</span>
                </div>
                <div className="sub">
                  {book.publisher} <span className="caption">출판</span>
                </div>
                <div className="sub">
                  총 {book.total}화
                  {book.status.value === 'complete' && (
                    <>
                      <div className="divider" />
                      <span className="caption">{book.status.label}</span>
                    </>
                  )}
                </div>
                <div className="tags">
                  {book.tags.map((tag) => (
                    <div key={tag}>#{tag}</div>
                  ))}
                </div>
              </div>
              <div className="action_button_wrapper">
                <Button type="secondary" width="auto">
                  <div className="button_body">
                    <Icons
                      name="HeartDefault"
                      width="20px"
                      height="20px"
                      color={theme.color.main[600]}
                    />
                    {book.score.toLocaleString()}
                  </div>
                </Button>
                <Button type="secondary" width="auto">
                  <div className="button_body">
                    <Icons
                      name="Plus"
                      width="20px"
                      height="20px"
                      color={theme.color.main[600]}
                    />
                    내 서재에 추가하기
                  </div>
                </Button>
              </div>
            </div>
            <RequestButton>정보 수정 요청</RequestButton>
          </BookInfoWrapper>
          <BookDetailBodyWrapper>
            <SectionTitle>줄거리</SectionTitle>
            <SynopsisWrapper>{book.synopsis}</SynopsisWrapper>
            <SectionTitle>보러가기</SectionTitle>
            <PlarformWrapper>
              {book.platforms.map((platform) => (
                <PlatformItem key={platform.value}>
                  <Image
                    key={platform.value}
                    src={`/images/${platform.value}.png`}
                    alt={platform.value}
                    width={20}
                    height={20}
                  />
                  {platform.label}
                </PlatformItem>
              ))}
            </PlarformWrapper>
          </BookDetailBodyWrapper>
        </BookDetailWrapper>
      )}
    </BookDetailContainer>
  )
}

BookDetail.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default BookDetail
