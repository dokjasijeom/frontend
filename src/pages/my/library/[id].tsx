import RecordModalBody from '@/components/Library/RecordModalBody'
import Button from '@/components/common/Button/Button'
import Icons from '@/components/common/Icons/Icons'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockBook } from '@/constants/MockData'
import useModal from '@/hooks/useModal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryDetailContainer = styled.div`
  padding-top: 56px;
`

const BookInfoWrapper = styled.div`
  padding: 20px;
  display: flex;
  .book_image {
    border-radius: 12px;
  }
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 18px;
    width: 100%;

    .book_info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        ${({ theme }) => theme.typography.head1};
        color: ${({ theme }) => theme.color.gray[950]};
      }
      .sub {
        ${({ theme }) => theme.typography.body2};
        color: ${({ theme }) => theme.color.gray[800]};
      }
      .score {
        display: flex;
        align-items: center;
        gap: 4px;
        ${({ theme }) => theme.typography.body2};
        color: ${({ theme }) => theme.color.main[600]};
      }
    }
  }
`

const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  padding: 0 4px;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
`
const RecordBanner = styled.div`
  margin: 0 20px;
  width: calc(100% - 40px);
  padding: 8px 0px;
  text-align: center;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.color.sub[200]};
  background: ${({ theme }) => theme.color.sub[50]};
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[800]};
  .bold {
    font-weight: bold;
  }
`

function LibraryDetail() {
  const router = useRouter()
  const theme = useTheme()
  const { showModal } = useModal()
  const { id } = router.query

  const book = MockBook.webNovel.find((item) => item.id === id)

  const handleRecordModal = () => {
    if (book) {
      showModal({
        type: 'self',
        title: '기록하기',
        body: <RecordModalBody book={book} />,
      })
    }
  }

  const handleDeleteModal = () => {
    showModal({
      title: '기록한 작품 삭제',
      body: (
        <>
          삭제한 기록은 되돌릴 수 없어요. <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
    })
  }
  return (
    <LibraryDetailContainer>
      <TitleHeader title="읽고 있는 작품" onClickBack={() => router.back()} />
      {book && (
        <>
          <BookInfoWrapper>
            <Image
              className="book_image"
              src={book.image}
              width={140}
              height={200}
              alt=""
            />
            <div className="book_info_wrapper">
              <div className="book_info">
                <div className="title">{book.title}</div>
                <div className="sub">
                  {book.author} · {book.genre}
                </div>
                <div className="score">
                  <Icons
                    name="HeartActive"
                    color={theme.color.main[600]}
                    width="16px"
                    height="16px"
                  />
                  {book.score.toLocaleString()}
                </div>
                <DeleteButton onClick={handleDeleteModal}>삭제</DeleteButton>
              </div>
              <Button width="95px" onClick={handleRecordModal}>
                기록하기
              </Button>
            </div>
          </BookInfoWrapper>
          <RecordBanner>
            <span className="bold">네이버시리즈</span>에서{' '}
            <span className="bold">{book.current}화</span>까지 읽었어요!
          </RecordBanner>
        </>
      )}
    </LibraryDetailContainer>
  )
}

LibraryDetail.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default LibraryDetail
