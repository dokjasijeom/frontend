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
import useToast from '@/hooks/useToast'
import Input from '../common/Input/Input'
import Icons from '../common/Icons/Icons'
import Badge from '../common/Badge/Badge'
import AddSeriesForm from './AddSeriesForm'
import Button from '../common/Button/Button'

const AddSeriesModalBodyWrapper = styled.div`
  width: 100%;
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
  flex-direction: column;
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  max-width: 142px;
  display: flex;
  min-width: 69px;
  img {
    width: 100%;
    min-width: 70px;
    height: auto !important;
    position: relative !important;
    object-fit: cover;
    border-radius: 12px;
  }
`

const SeriesInfoWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 18px;
  grid-template-columns: 0.6fr 1fr;

  @media (max-width: 400px) {
    grid-template-columns: 0.4fr 1fr;
    gap: 12px;
  }

  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;

    .episode_info {
      display: flex;
      align-items: center;
      ${({ theme }) => theme.typography.body5};
      color: ${({ theme }) => theme.color.gray[950]};
      gap: 8px;
    }
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
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

interface AddSeriesModalBodyProps {
  onCloseModal: () => void
}

function AddSeriesModalBody(props: AddSeriesModalBodyProps) {
  const { onCloseModal } = props
  const [keyword, setKeyword] = useState('')
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [autoCompleteList, setAutoCompleteList] = useState<AutoComplete[]>([])
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<Series>()
  const [isDirect, setIsDirect] = useState(false)
  const theme = useTheme()

  const debounceSearch = useDebounce(keyword, 200)
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const handleChangeSearch = (value: string) => {
    setKeyword(value)
    setShowSearchBox(true)
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
          showToast({ message: '기록장에 추가했어요!' })

          queryClient.invalidateQueries({ queryKey: ['user'] })
        })
        .catch((error) => {
          if (error.response.status === 400) {
            showToast({
              message: '이미 추가한 작품이에요.',
              type: 'error',
            })
          }
        })
    }
  }

  return (
    <AddSeriesModalBodyWrapper
      style={{ minHeight: !showSearchResult ? '366px' : '100%' }}
    >
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
        {!isEmpty(keyword) && showSearchBox && (
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
      {isDirect && (
        <AddSeriesForm keyword={keyword} onCloseModal={onCloseModal} />
      )}
      {!isEmpty(keyword) &&
        !isDirect &&
        showSearchResult &&
        !isEmpty(selectedSeries) && (
          <SearchResultWrapper>
            <SeriesInfoWrapper>
              <ThumbnailWrapper>
                <Image
                  className="thumbnail"
                  src={selectedSeries.thumbnail}
                  fill
                  alt=""
                />
              </ThumbnailWrapper>
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
            </SeriesInfoWrapper>
            <Button
              disabled={!showSearchResult}
              style={{ marginTop: '32px' }}
              onClick={handleAddSeries}
            >
              추가
            </Button>
          </SearchResultWrapper>
        )}
    </AddSeriesModalBodyWrapper>
  )
}

export default AddSeriesModalBody
