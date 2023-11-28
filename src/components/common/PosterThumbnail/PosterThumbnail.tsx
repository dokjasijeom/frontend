import { Book } from '@/@types/book'
import React from 'react'
import styled from 'styled-components'

const PosterThumbnailContainer = styled.div`
  width: 184px;
  font-size: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ThumbnailImageWrapper = styled.div`
  position: relative;
  width: 184px;
  border-radius: 12px;
  overflow: hidden;
  .book_info_wrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #000 83.85%);
    .book_title {
      width: 100%;
      padding: 0 20px;
      ${({ theme }) => theme.typography.head1};
      color: ${({ theme }) => theme.color.system.w};
      word-break: break-all;
      text-align: center;
    }
    .book_author {
      text-align: center;
      ${({ theme }) => theme.typography.body4};
      color: ${({ theme }) => theme.color.system.w};
    }
  }
`
const ThumbnailImage = styled.img`
  width: 184px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
`

interface PosterThumbnailProps {
  book: Book
}
function PosterThumbnail(props: PosterThumbnailProps) {
  const { book } = props
  return (
    <PosterThumbnailContainer>
      <ThumbnailImageWrapper>
        <ThumbnailImage src={book.image} />
        <div className="book_info_wrapper">
          <div className="book_title">{book.title}</div>
          <div className="book_author">{book.author}</div>
        </div>
      </ThumbnailImageWrapper>
    </PosterThumbnailContainer>
  )
}

export default PosterThumbnail
