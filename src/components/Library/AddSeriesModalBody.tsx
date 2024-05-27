import React, { useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { AutoComplete } from '@/@types/search'
import useDebounce from '@/hooks/useDebounce'
import { getSearchAutoComplete } from '@/api/search'
import { getSeries, recordSeries } from '@/api/series'
import { Series } from '@/@types/series'
import { useQueryClient } from '@tanstack/react-query'
import useModal from '@/hooks/useModal'
import Input from '../common/Input/Input'
import Icons from '../common/Icons/Icons'
import Badge from '../common/Badge/Badge'
import AddSeriesForm from './AddSeriesForm'
import Button from '../common/Button/Button'

const AddSeriesModalBodyWrapper = styled.div`
  width: 100%;
  min-height: 364px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const SearchWrapper = styled.div`
  position: relative;
  margin-top: 20px;
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
  .thumbnail {
    border-radius: 12px;
  }
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .episode_info {
      display: flex;
      align-items: center;
      ${({ theme }) => theme.typography.body5};
      color: ${({ theme }) => theme.color.gray[950]};
      gap: 8px;
    }
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

function AddSeriesModalBody() {
  const [keyword, setKeyword] = useState('')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [autoCompleteList, setAutoCompleteList] = useState<AutoComplete[]>([])
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<Series>()
  const [isDirect, setIsDirect] = useState(false)
  const [title, setTitle] = useState('')
  const theme = useTheme()

  const debounceSearch = useDebounce(keyword, 200)
  const queryClient = useQueryClient()
  const { showModal } = useModal()

  const handleChangeSearch = (value: string) => {
    setKeyword(value)
    setTitle(value)

    if (!isEmpty(keyword)) {
      setShowSearchBox(true)
    }
  }
  const handleAddSeriesDirect = () => {
    setIsDirect(true)
    setShowSearchBox(false)
  }

  const handleShowSearchResult = async (hashId: string) => {
    const res = await getSeries(hashId)

    setSelectedSeries(res.data.data)
    setIsDirect(false)
    setShowSearchBox(false)
    setShowSearchResult(true)
  }

  const handleClearSearch = () => {
    setKeyword('')
    setShowSearchResult(false)
  }

  useEffect(() => {
    async function fetchAutoCompleteList() {
      const res = await getSearchAutoComplete(debounceSearch)
      setAutoCompleteList(res.data.data)
    }

    if (!isEmpty(debounceSearch)) {
      fetchAutoCompleteList()
    }
  }, [debounceSearch])

  const authorGenreText = useMemo(() => {
    let result = ''
    if (!isEmpty(selectedSeries)) {
      const authorText = selectedSeries.authors
        ? selectedSeries.authors.map((value) => value.name).join('/')
        : ''
      const genreText = selectedSeries.genres
        ? selectedSeries.genres.map((value) => value.name).join('/')
        : ''

      result = authorText.concat(' · ', genreText)
    }
    return result
  }, [selectedSeries])

  const handleAddSeries = async () => {
    if (!isEmpty(selectedSeries)) {
      await recordSeries(selectedSeries?.hashId)
        .then(() => {
          showModal({
            title: '읽고 있는 작품 추가 완료',
            body: `${selectedSeries.title} 작품이 추가 완료되었습니다.`,
          })

          queryClient.invalidateQueries({ queryKey: ['user'] })
        })
        .catch((error) => {
          if (error.response.status === 400) {
            showModal({
              title: '오류',
              body: `이미 추가 완료된 작품입니다.`,
            })
          }
        })
    }
  }

  return (
    <AddSeriesModalBodyWrapper>
      <SearchWrapper>
        <Input
          value={keyword}
          placeholder="작품을 검색해보세요."
          suffix={
            !isEmpty(keyword) ? (
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
        {!isEmpty(autoCompleteList) && !isEmpty(keyword) && showSearchBox && (
          <SearchBox>
            {autoCompleteList.map((autoComplete) => (
              <SearchBoxItem
                key={autoComplete.hashId}
                onClick={() => handleShowSearchResult(autoComplete.hashId)}
              >
                {autoComplete.title}
              </SearchBoxItem>
            ))}
            <SearchBoxItem onClick={handleAddSeriesDirect}>
              <div className="last_item">
                <div className="keyword">{keyword}</div> 직접 등록하기
              </div>
            </SearchBoxItem>
          </SearchBox>
        )}
      </SearchWrapper>
      {isDirect && <AddSeriesForm title={title} />}
      {!isEmpty(keyword) &&
        !isDirect &&
        showSearchResult &&
        !isEmpty(selectedSeries) && (
          <SearchResultWrapper>
            <Image
              className="thumbnail"
              src={selectedSeries.thumbnail}
              width={142}
              height={200}
              alt=""
            />
            <div className="book_info_wrapper">
              <div className="episode_info">
                {selectedSeries.isComplete && <Badge value="완결" />}총{' '}
                {selectedSeries.totalEpisode}화
              </div>
              <div className="title">{selectedSeries.title}</div>
              <div className="sub">{authorGenreText}</div>
              <div className="count">
                <Icons
                  name="HeartActive"
                  width="16px"
                  height="16px"
                  color={theme.color.main[600]}
                />
                {selectedSeries.likeCount}
              </div>
            </div>
          </SearchResultWrapper>
        )}
      <Button
        disabled={!showSearchResult}
        style={{ marginTop: '32px' }}
        onClick={handleAddSeries}
      >
        추가
      </Button>
    </AddSeriesModalBodyWrapper>
  )
}

export default AddSeriesModalBody
