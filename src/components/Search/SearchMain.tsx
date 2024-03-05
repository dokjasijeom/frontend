import React from 'react'
import styled from 'styled-components'
import { Keyword } from '@/@types/search'
import Button from '../common/Button/Button'
import Icons from '../common/Icons/Icons'

const SearchMainWrapper = styled.div``

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
  cursor: default;
`
interface SearchMainProps {
  keywords: Keyword[]
  handleClearKeywords: () => void
  handleDeleteKeyword: (id: number) => void
}

function SearchMain(props: SearchMainProps) {
  const { keywords, handleClearKeywords, handleDeleteKeyword } = props
  return (
    <SearchMainWrapper>
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
    </SearchMainWrapper>
  )
}

export default SearchMain
