import Button from '@/components/common/Button/Button'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import { isEmpty } from 'lodash'
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

const SearchResultWrapper = styled.div`
  padding-top: 20px;
`

const SearchKeywordsWrapper = styled.div`
  padding-top: 20px;
`

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SectionTitle = styled.div`
  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
  cursor: default;
`

const KeywordsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
`

const KeywordBox = styled.div`
  padding: 14px 20px;
  border-radius: 12px;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[950]};
  background: ${({ theme }) => theme.color.gray[50]};
  display: flex;
  align-items: center;
  gap: 4px;
`

interface Keyword {
  id: number
  text: string
}

function Search() {
  const [search, setSearch] = useState('')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])

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
    const filteredKeyword = keywords.filter((keyword) => keyword.id !== id)
    setKeywords(filteredKeyword)
  }

  const handleClearKeywords = () => {
    setKeywords([])
  }

  const handleShowSearchResult = () => {
    setShowSearchBox(false)
    setShowSearchResult(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      const { value } = e.currentTarget
      handleAddKeyword(value)
      setShowSearchBox(false)
      handleShowSearchResult()
    }
  }
  const handleChangeSearch = (value: string) => {
    setSearch(value)

    if (!isEmpty(search)) {
      setShowSearchBox(true)
    }
  }

  const handleClearSearch = () => {
    setSearch('')
    setShowSearchResult(false)
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
      {!showSearchResult && !isEmpty(keywords) && (
        <SearchKeywordsWrapper>
          <SectionTitleWrapper>
            <SectionTitle>최근 검색어</SectionTitle>
            <Button width="auto" type="text" onClick={handleClearKeywords}>
              전체 삭제
            </Button>
          </SectionTitleWrapper>
          <KeywordsWrapper>
            {keywords.map((keyword) => (
              <KeywordBox key={keyword.id}>
                {keyword.text}{' '}
                <Icons
                  width="20px"
                  height="20px"
                  name="Close"
                  onClick={() => handleDeleteKeyword(keyword.id)}
                />
              </KeywordBox>
            ))}
          </KeywordsWrapper>
        </SearchKeywordsWrapper>
      )}
      {showSearchResult && (
        <SearchResultWrapper>
          <SectionTitle>{`‘${search}’ 검색 결과`}</SectionTitle>
        </SearchResultWrapper>
      )}
    </SearchContainer>
  )
}

export default Search
