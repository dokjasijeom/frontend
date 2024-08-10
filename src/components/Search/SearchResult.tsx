import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { getSearchList } from '@/api/search'
import { Series } from '@/@types/series'
import { isEmpty } from 'lodash'
import SeriesPosterItem from '../common/SeriesPosterItem/SeriesPosterItem'
import Empty from '../common/Empty/Empty'

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
        <Empty
          type="search"
          description="검색 결과가 없습니다."
          style={{ paddingTop: '80px' }}
        />
      )}
    </SearchResultContainer>
  )
}

export default SearchResult
