import { Book } from '@/@types/book'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Icons from '../Icons/Icons'

const ThumbnailContainer = styled.div`
  width: 137px;
  font-size: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .book_title {
      ${({ theme }) => theme.typography.body1};
      color: ${({ theme }) => theme.color.gray[950]};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .book_info {
      ${({ theme }) => theme.typography.body5};
      color: ${({ theme }) => theme.color.gray[600]};
    }
    .book_score {
      ${({ theme }) => theme.typography.caption};
      color: ${({ theme }) => theme.color.main[600]};
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`

const ThumbnailImageWrapper = styled.div`
  position: relative;
  .platform_wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
  }
`
const ThumbnailImage = styled.img`
  width: 137px;
  height: 130px;
  object-fit: cover;
  border-radius: 12px;
`

interface ThumbnailProps {
  book: Book
}

function Thumbnail(props: ThumbnailProps) {
  const { book } = props
  const theme = useTheme()
  const router = useRouter()
  return (
    <ThumbnailContainer onClick={() => router.push(`/book/${book.id}`)}>
      <ThumbnailImageWrapper>
        <div className="platform_wrapper">
          {book.platforms.map((platform) => (
            <Image
              key={platform.value}
              src={`/images/${platform.value}.png`}
              alt={platform.value}
              width={20}
              height={20}
            />
          ))}
        </div>
        <ThumbnailImage src={book.image} />
      </ThumbnailImageWrapper>
      <div className="book_info_wrapper">
        <div className="book_title">{book.title}</div>
        <div className="book_info">{`${book.author} · ${book.genre}`}</div>
        <div className="book_score">
          <Icons
            name="HeartActive"
            color={theme.color.main[600]}
            width="12px"
            height="12px"
          />
          {book.score}
        </div>
      </div>
    </ThumbnailContainer>
  )
}

export default Thumbnail
