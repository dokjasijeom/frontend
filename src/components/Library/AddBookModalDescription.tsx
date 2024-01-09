import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import Input from '../common/Input/Input'
import Icons from '../common/Icons/Icons'
import Badge from '../common/Badge/Badge'

const AddBookModalDescriptionWrapper = styled.div`
  width: 396px;
  min-height: 266px;
`
const SearchWrapper = styled.div`
  position: relative;
  margin-top: 32px;
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
  display: flex;
  margin-top: 20px;
  gap: 18px;
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .title {
      ${({ theme }) => theme.typography.head1};
      color: ${({ theme }) => theme.color.gray[950]};
    }
    .sub {
      ${({ theme }) => theme.typography.body2};
      color: ${({ theme }) => theme.color.gray[800]};
    }
    .count {
      display: flex;
      align-items: center;
      gap: 4px;
      ${({ theme }) => theme.typography.body2};
      color: ${({ theme }) => theme.color.main[600]};
    }
  }
`

const AddBookFormWrapper = styled.div`
  .add_book_form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 32px;

    .form_item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .label {
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
  }
`

function AddBookModalDescription() {
  const [search, setSearch] = useState('')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [isDirect, setIsDirect] = useState(false)
  const [title, setTitle] = useState('')
  const theme = useTheme()

  const handleChangeSearch = (value: string) => {
    setSearch(value)
    setTitle(value)

    if (!isEmpty(search)) {
      setShowSearchBox(true)
    }
  }
  const handleAddBookDirect = () => {
    setIsDirect(true)
    setShowSearchBox(false)
  }

  const handleShowSearchResult = () => {
    setIsDirect(false)
    setShowSearchBox(false)
    setShowSearchResult(true)
  }

  const handleClearSearch = () => {
    setSearch('')
    setShowSearchResult(false)
  }
  return (
    <AddBookModalDescriptionWrapper>
      <SearchWrapper>
        <Input
          value={search}
          placeholder="작품을 검색해보세요."
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
        />
        {showSearchBox && (
          <SearchBox>
            <SearchBoxItem onClick={handleShowSearchResult}>
              나 혼자만 레벨업
            </SearchBoxItem>
            <SearchBoxItem onClick={handleAddBookDirect}>
              <div className="last_item">
                <div className="keyword">{search}</div> 직접 등록하기
              </div>
            </SearchBoxItem>
          </SearchBox>
        )}
      </SearchWrapper>
      {isDirect && (
        <AddBookFormWrapper>
          <form className="add_book_form_wrapper">
            <div className="form_item">
              <div className="label">제목</div>
              <Input
                value={title}
                placeholder="제목을 입력해주세요."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form_item">
              <div className="label">저자</div>
              <Input
                value=""
                placeholder="저자를 입력해주세요."
                onChange={() => {}}
              />
            </div>
            <div className="form_item">
              <div className="label">전체 회차</div>
              <Input
                value=""
                placeholder="총 몇 화인지 숫자만 입력해주세요."
                onChange={() => {}}
              />
            </div>
          </form>
        </AddBookFormWrapper>
      )}
      {!isEmpty(search) && !isDirect && showSearchResult && (
        <SearchResultWrapper>
          <Image src="/images/empty_book.png" width={142} height={200} alt="" />
          <div className="book_info_wrapper">
            <Badge value="완결" />
            <div className="title">나 혼자만 레벨업</div>
            <div className="sub">추공 · 판타지</div>
            <div className="count">
              <Icons
                name="HeartActive"
                width="16px"
                height="16px"
                color={theme.color.main[600]}
              />
              4,504
            </div>
          </div>
        </SearchResultWrapper>
      )}
    </AddBookModalDescriptionWrapper>
  )
}

export default AddBookModalDescription
