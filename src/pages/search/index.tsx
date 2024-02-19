import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import { isEmpty } from 'lodash'
import React, { KeyboardEvent, useState } from 'react'
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

function Search() {
  const [search, setSearch] = useState('')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSearchBox(false)
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

  const handleShowSearchResult = () => {
    setShowSearchBox(false)
    setShowSearchResult(true)
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
            <SearchBoxItem onClick={handleShowSearchResult}>
              나 혼자만 레벨업
            </SearchBoxItem>
          </SearchBox>
        )}
      </SearchWrapper>
      <SearchResultWrapper />
    </SearchContainer>
  )
}

export default Search
