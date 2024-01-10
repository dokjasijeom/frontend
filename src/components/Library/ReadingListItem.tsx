import Image from 'next/image'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import Icons from '../common/Icons/Icons'

const ReadingListItemWrapper = styled.div`
  display: flex;
`

const ReadingItem = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.color.sub[50]};
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  .book_thumbnail_image {
    z-index: 1;
  }

  .book_info_wrapper {
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .book_info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .book_title {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};

        span {
          margin-left: 12px;
          ${({ theme }) => theme.typography.body5};
          color: ${({ theme }) => theme.color.gray[800]};
        }
      }
      .platform_wrapper {
        display: flex;
        gap: 4px;
      }
    }
    .book_count_wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      .current {
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.main[600]};
      }
      .total {
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
  }
`

const ProgressValue = styled.div<{ value: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ value }) => value}%;
  height: 100%;
  background: ${({ theme }) => theme.color.sub[200]};
  border-radius: 12px;
`
const ReadingListItemEditButton = styled.button`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 50px;
  padding: 0 4px;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
`

const ReadingListItemAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  background: ${({ theme }) => theme.color.sub[200]};
  border-radius: 12px;
`

interface ReadingListItemProps {
  book: any
  isEdit?: boolean
  onEdit?: () => void
}

function ReadingListItem(props: ReadingListItemProps) {
  const { book, isEdit = false, onEdit } = props
  const theme = useTheme()
  const progressValue = (total: number, current: number) => {
    return (current / total) * 100
  }

  return (
    <ReadingListItemWrapper>
      <ReadingItem>
        <Image
          className="book_thumbnail_image"
          src={book.image}
          width={50}
          height={50}
          alt=""
        />
        <div className="book_info_wrapper">
          <div className="book_info">
            <div className="book_title">
              {book.title}
              <span>
                {book.author} · {book.genre}
              </span>
            </div>
            <div className="platform_wrapper">
              {book.platforms.map((platform: any) => (
                <Image
                  key={platform}
                  src={`/images/${platform}.png`}
                  alt={platform}
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
          <div className="book_count_wrapper">
            <span className="current">{book.current}화</span>
            <span className="total">/{book.total}화</span>
          </div>
        </div>
        <ProgressValue value={progressValue(book.total, book.current)} />
      </ReadingItem>
      {isEdit ? (
        <ReadingListItemEditButton onClick={onEdit}>
          삭제
        </ReadingListItemEditButton>
      ) : (
        <ReadingListItemAddButton>
          <Icons name="Plus" color={theme.color.gray[800]} />
        </ReadingListItemAddButton>
      )}
    </ReadingListItemWrapper>
  )
}

export default ReadingListItem
