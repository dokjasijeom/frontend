import { MockBook } from '@/constants/MockData'
import React from 'react'
import styled from 'styled-components'
import BookPosterItem from '../common/BookPosterItem/BookPosterItem'

const SearchResultContainer = styled.div`
  padding-top: 20px;
`

const SectionTitle = styled.div`
  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
  cursor: default;
`

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
`

const BookItemWrapper = styled.div`
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
`

interface SearchResultProps {
  search: string
}

function SearchResult(props: SearchResultProps) {
  const { search } = props

  return (
    <SearchResultContainer>
      <SectionTitle>{`‘${search}’ 검색 결과`}</SectionTitle>
      <SearchResultWrapper>
        {MockBook.webNovel.map((book) => (
          <BookItemWrapper key={book.id}>
            <BookPosterItem book={book} />
          </BookItemWrapper>
        ))}
      </SearchResultWrapper>
    </SearchResultContainer>
  )
}

export default SearchResult