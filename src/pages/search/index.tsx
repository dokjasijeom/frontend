import { Keyword } from '@/@types/search'
import SearchMain from '@/components/Search/SearchMain'
import SearchResult from '@/components/Search/SearchResult'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import { isEmpty } from 'lodash'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  padding: 20px;
`

const SearchWrapper = styled.div`
  position: relative;
`

const SearchBox = styled.div`
  position: absolute;
  width: 100%;
  top: 54px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  overflow: hidden;
`

const SearchBoxItem = styled.div`
  padding: 12px 20px;
  background: ${({ theme }) => theme.color.system.w};
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.main[50]};
  }
  .last_item {
    display: flex;
    gap: 12px;
    .keyword {
      color: ${({ theme }) => theme.color.main[600]};
    }
  }
`

interface SearchPageProps {
  query: any
}

function Search({ query }: SearchPageProps) {
  const searchKeyword = query.keyword !== undefined ? query.keyword : ''
  const [search, setSearch] = useState(searchKeyword)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const router = useRouter()

  useEffect(() => {
    if (searchKeyword) {
      setSearch(searchKeyword)
    } else {
      setSearch('')
    }
  }, [router, searchKeyword])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]'
      setKeywords(JSON.parse(result))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  const handleAddKeyword = (value: string) => {
    const newKeyword = {
      id: Date.now(),
      text: value,
    }
    setKeywords([newKeyword, ...keywords])
  }

  const handleDeleteKeyword = (id: number) => {
    // 최근 검색어 개별 삭제
    const filteredKeyword = keywords.filter((keyword) => keyword.id !== id)
    setKeywords(filteredKeyword)
  }

  const handleClearKeywords = () => {
    // 최근 검색어 전체 삭제
    setKeywords([])
  }

  const handleClearSearch = () => {
    setSearch('')
    router.push('/search')
  }

  const handleShowSearchResult = () => {
    // 검색 결과로 이동
    setShowSearchBox(false)
    const trimSearchKeyword = search.trim()
    router.push(`/search?keyword=${trimSearchKeyword}`)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      const { value } = e.currentTarget
      if (isEmpty(value)) {
        handleClearSearch()
      } else {
        handleAddKeyword(value)
        handleShowSearchResult()
      }
    }
  }
  const handleChangeSearch = (value: string) => {
    setSearch(value)

    if (!isEmpty(search)) {
      setShowSearchBox(true)
    }
  }

  return (
    <SearchContainer>
      <SearchWrapper>
        <Input
          value={search}
          placeholder="제목이나 작가를 검색해보세요."
          suffix={
            !isEmpty(search) ? (
              <Icons
                name="CloseCircle"
                width="22px"
                height="22px"
                onClick={handleClearSearch}
              />
            ) : (
              <Icons name="Search" width="22px" height="22px" />
            )
          }
          onChange={(e) => handleChangeSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {showSearchBox && (
          <SearchBox>
            <SearchBoxItem onClick={() => {}}>나 혼자만 레벨업</SearchBoxItem>
          </SearchBox>
        )}
      </SearchWrapper>
      {isEmpty(searchKeyword) && !isEmpty(keywords) && (
        <SearchMain
          keywords={keywords}
          handleClearKeywords={handleClearKeywords}
          handleDeleteKeyword={handleDeleteKeyword}
        />
      )}
      {searchKeyword && <SearchResult search={search} />}
    </SearchContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  }
}

export default Search
