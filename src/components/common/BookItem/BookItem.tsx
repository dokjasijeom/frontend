import { MyBook } from '@/@types/book'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const BookItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .book_thumbnail_image {
    z-index: 1;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
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
  }
`

interface BookItemProps {
  book: MyBook
}

function BookItem(props: BookItemProps) {
  const { book } = props
  return (
    <BookItemWrapper>
      {!isEmpty(book.image) && (
        <Image
          className="book_thumbnail_image"
          src={book.image}
          width={50}
          height={50}
          alt=""
        />
      )}
      <div className="book_info_wrapper">
        <div className="book_info">
          <div className="book_title">
            {book.title}
            <span>
              {book.author}
              {book.genre ? ` · ${book.genre}` : ''}
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
      </div>
    </BookItemWrapper>
  )
}

export default BookItem
