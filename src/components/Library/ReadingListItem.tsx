import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import Icons from '../common/Icons/Icons'
import BookItem from '../common/BookItem/BookItem'
import Button from '../common/Button/Button'

const ReadingListItemWrapper = styled.div`
  display: flex;
`

const ReadingItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.color.sub[50]};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 74px;

  .book_count_wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 1;
    .current {
      ${({ theme }) => theme.typography.head2};
      color: ${({ theme }) => theme.color.main[600]};
    }
    .total {
      ${({ theme }) => theme.typography.body4};
      color: ${({ theme }) => theme.color.gray[800]};
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
  onRecord?: () => void
}

function ReadingListItem(props: ReadingListItemProps) {
  const { book, isEdit = false, onEdit, onRecord } = props
  const theme = useTheme()
  const router = useRouter()
  const progressValue = (total: number, current: number) => {
    return (current / total) * 100
  }

  return (
    <ReadingListItemWrapper>
      <ReadingItem
        onClick={() => {
          router.push(`/my/library/${book.id}`)
        }}
      >
        <BookItem book={book} />
        <div className="book_count_wrapper">
          <span className="current">{book.current}화</span>
          <span className="total">/{book.total}화</span>
        </div>
        <ProgressValue value={progressValue(book.total, book.current)} />
      </ReadingItem>
      {isEdit ? (
        <Button
          style={{ marginLeft: '12px' }}
          type="text"
          width="auto"
          onClick={onEdit}
        >
          삭제
        </Button>
      ) : (
        <ReadingListItemAddButton onClick={onRecord}>
          <Icons name="Plus" color={theme.color.gray[800]} />
        </ReadingListItemAddButton>
      )}
    </ReadingListItemWrapper>
  )
}

export default ReadingListItem
