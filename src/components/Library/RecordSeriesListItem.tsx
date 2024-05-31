import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { isEmpty } from 'lodash'
import { RecordSeries } from '@/@types/user'
import { Provider } from '@/@types/series'
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
      width: 100%;
      max-width: calc(100% - 90px);
      display: flex;
      flex-direction: column;
      gap: 5px;
      .series_title {
        width: 100%;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;

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
    flex-shrink: 0;
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
      width: calc(100% - 70px);
      .series_info {
        width: 100%;
        max-width: 100%;
      }
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
  flex-shrink: 0;
  background: ${({ theme }) => theme.color.sub[200]};
  border-radius: 12px;
`

interface RecordSeriesListItemProps {
  recordSeries: RecordSeries
  isEdit?: boolean
  onEdit?: () => void
  onRecord?: () => void
}

function RecordSeriesListItem(props: RecordSeriesListItemProps) {
  const { recordSeries, isEdit = false, onEdit, onRecord } = props
  const theme = useTheme()
  const router = useRouter()
  const progressValue = (total: number, current: number) => {
    if (!total || !current) {
      return 0
    }
    return (current / total) * 100
  }

  const authorGenreText = useMemo(() => {
    let authorText = ''
    let genreText = ''

    if (!isEmpty(recordSeries) && !isEmpty(recordSeries.series)) {
      authorText = recordSeries.series.authors
        ? recordSeries.series.authors.map((value) => value.name).join('/')
        : ''
      genreText = recordSeries.series.genres
        ? recordSeries.series.genres.map((value) => value.name).join('/')
        : ''
    }

    if (!isEmpty(recordSeries) && recordSeries.author && recordSeries.genre) {
      authorText = recordSeries.author
      genreText = recordSeries.genre
    }

    const result = authorText.concat(' · ', genreText)
    return result
  }, [recordSeries])

  return (
    <RecordSeriesListItemWrapper>
      <ReadingItem
        onClick={() => {
          router.push(`/my/library/${recordSeries.id}`)
        }}
      >
        <SeriesItemWrapper>
          {!isEmpty(recordSeries.series) && (
            <Image
              unoptimized
              className="series_thumbnail_image"
              src={recordSeries.series.thumbnail}
              width={50}
              height={50}
              alt=""
            />
          )}
          <div className="series_info_wrapper">
            <div className="series_info">
              <div className="series_title">
                {!isEmpty(recordSeries.series)
                  ? recordSeries.series.title
                  : recordSeries.title}
                <span>{authorGenreText}</span>
              </div>
              <div className="platform_wrapper">
                {!isEmpty(recordSeries.series) &&
                  recordSeries.series.providers.map((provider: Provider) => (
                    <Image
                      key={provider.hashId}
                      src={`/images/${provider.name}.png`}
                      alt={provider.name}
                      width={20}
                      height={20}
                    />
                  ))}
              </div>
            </div>
            <div className="series_count_wrapper">
              <span className="current">
                {recordSeries.recordEpisodeCount}화
              </span>
              <span className="total">/{recordSeries.totalEpisode}화</span>
            </div>
          </div>
        </SeriesItemWrapper>
        <ProgressValue
          value={progressValue(
            recordSeries.totalEpisode,
            recordSeries.recordEpisodeCount,
          )}
        />
      </ReadingItem>
      {isEdit ? (
        <Button
          style={{ marginLeft: '12px', flexShrink: '0' }}
          type="text"
          width="38px"
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
