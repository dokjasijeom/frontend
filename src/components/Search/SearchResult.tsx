import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { getSearchList } from '@/api/search'
import { Series } from '@/@types/series'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import SeriesPosterItem from '../common/SeriesPosterItem/SeriesPosterItem'

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

const SeriesItemWrapper = styled.div`
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
`

const EmptyWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
  text-align: center;
  gap: 20px;
  margin-top: 80px;
`

interface SearchResultProps {
  keyword: string
}

function SearchResult(props: SearchResultProps) {
  const { keyword } = props
  const router = useRouter()

  const [searchList, setSearchList] = useState<Series[]>([])

  useEffect(() => {
    async function fetchSearchList() {
      const res = await getSearchList(keyword)
      setSearchList(res.data.data)
    }

    fetchSearchList()
  }, [keyword])

  return (
    <SearchResultContainer>
      {!isEmpty(searchList) ? (
        <>
          <SectionTitle>{`‘${keyword}’ 검색 결과`}</SectionTitle>
          <SearchResultWrapper>
            {searchList.map((series) => (
              <SeriesItemWrapper key={series.hashId}>
                <SeriesPosterItem
                  typeBadge
                  series={series}
                  onClick={() => router.push(`/series/${series.hashId}`)}
                />
              </SeriesItemWrapper>
            ))}
          </SearchResultWrapper>
        </>
      ) : (
        <EmptyWrapper>
          <Image
            src="/images/empty_search.png"
            width={120}
            height={120}
            alt="empty"
          />
          검색 결과가 없습니다.
        </EmptyWrapper>
      )}
    </SearchResultContainer>
  )
}

export default SearchResult
