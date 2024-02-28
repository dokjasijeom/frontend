import { Book, MyBook } from '@/@types/book'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import Badge from '../Badge/Badge'
import Icons from '../Icons/Icons'

const BookPosterItemWrapper = styled.div`
  padding: 20px;
  display: flex;
  .book_image {
    border-radius: 12px;
    margin-right: 18px;
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
      .status {
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.gray[950]};
        display: flex;
        align-items: center;
        gap: 8px;
      }
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

interface BookPosterItemProps {
  book: Book | MyBook
}

function BookPosterItem(props: BookPosterItemProps) {
  const { book } = props
  const theme = useTheme()
  return (
    <BookPosterItemWrapper>
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
          {!isEmpty(book.status) && (
            <div className="status">
              <Badge
                value={book.status.label}
                color={
                  book.status.value === 'complete'
                    ? theme.color.gray[300]
                    : theme.color.main[100]
                }
              />
              총 {book.total}화
            </div>
          )}
          <div className="title">{book.title}</div>
          <div className="sub">
            {book.author}
            {book.genre ? ` · ${book.genre}` : ''}
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
        </div>
      </div>
    </BookPosterItemWrapper>
  )
}

export default BookPosterItem
