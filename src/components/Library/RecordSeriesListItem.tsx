import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { isEmpty } from 'lodash'
import Icons from '../common/Icons/Icons'
import Button from '../common/Button/Button'

const RecordSeriesListItemWrapper = styled.div`
  display: flex;
`

const ReadingItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.color.sub[50]};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  height: 74px;
`

const SeriesItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  width: 100%;

  .series_thumbnail_image {
    z-index: 1;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .series_info_wrapper {
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .series_info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
      .series_title {
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};

        span {
          margin-left: 12px;
          ${({ theme }) => theme.typography.body5};
          color: ${({ theme }) => theme.color.gray[800]};
        }
      }
      .platform_wrapper {
        display: flex;
        gap: 4px;
      }
    }
  }

  .series_count_wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 1;
    .current {
      ${({ theme }) => theme.typography.head2};
      color: ${({ theme }) => theme.color.main[600]};
    }
    .total {
      ${({ theme }) => theme.typography.body4};
      color: ${({ theme }) => theme.color.gray[800]};
    }
  }

  @media (max-width: 490px) {
    .series_info_wrapper {
      flex-direction: column;
      align-items: flex-start;
    }
    .platform_wrapper {
      display: none !important;
    }
    .series_title {
      span {
        display: none !important;
      }
    }
  }
`

const ProgressValue = styled.div<{ value: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ value }) => value}%;
  height: 100%;
  background: ${({ theme }) => theme.color.sub[200]};
  border-radius: 12px;
`

const RecordSeriesListItemAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  background: ${({ theme }) => theme.color.sub[200]};
  border-radius: 12px;
`

interface RecordSeriesListItemProps {
  book: any
  isEdit?: boolean
  onEdit?: () => void
  onRecord?: () => void
}

function RecordSeriesListItem(props: RecordSeriesListItemProps) {
  const { book, isEdit = false, onEdit, onRecord } = props
  const theme = useTheme()
  const router = useRouter()
  const progressValue = (total: number, current: number) => {
    if (!total || !current) {
      return 0
    }
    return (current / total) * 100
  }

  return (
    <RecordSeriesListItemWrapper>
      <ReadingItem
        onClick={() => {
          router.push(`/my/library/${book.id}`)
        }}
      >
        <SeriesItemWrapper>
          {!isEmpty(book.image) && (
            <Image
              className="series_thumbnail_image"
              src={book.image}
              width={50}
              height={50}
              alt=""
            />
          )}
          <div className="series_info_wrapper">
            <div className="series_info">
              <div className="series_title">
                {book.title}
                <span>
                  {book.author}
                  {book.genre ? ` · ${book.genre}` : ''}
                </span>
              </div>
              <div className="platform_wrapper">
                {book.platforms.map((platform: any) => (
                  <Image
                    key={platform.value}
                    src={`/images/${platform.value}.png`}
                    alt={platform.value}
                    width={20}
                    height={20}
                  />
                ))}
              </div>
            </div>
            <div className="series_count_wrapper">
              <span className="current">{book.current}화</span>
              <span className="total">/{book.total}화</span>
            </div>
          </div>
        </SeriesItemWrapper>
        <ProgressValue value={progressValue(book.total, book.current)} />
      </ReadingItem>
      {isEdit ? (
        <Button
          style={{ marginLeft: '12px' }}
          type="text"
          width="auto"
          onClick={onEdit}
        >
          삭제
        </Button>
      ) : (
        <RecordSeriesListItemAddButton onClick={onRecord}>
          <Icons name="Plus" color={theme.color.gray[800]} />
        </RecordSeriesListItemAddButton>
      )}
    </RecordSeriesListItemWrapper>
  )
}

export default RecordSeriesListItem
