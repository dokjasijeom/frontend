import { RecordSeries } from '@/@types/user'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const RecordSeriesItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

  .series_thumbnail_image {
    z-index: 1;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;

    @media (max-width: 490px) {
      width: 60px;
      height: 60px;
    }
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

      .series_title {
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};

        span {
          margin-left: 12px;
          ${({ theme }) => theme.typography.body5};
          color: ${({ theme }) => theme.color.gray[800]};
        }

        @media (max-width: 490px) {
          span {
            margin: 0;
            display: block;
          }
        }
      }
      .platform_wrapper {
        display: flex;
        gap: 4px;
      }
    }
  }
`

interface RecordSeriesItemProps {
  recordSeries: RecordSeries
}

function RecordSeriesItem(props: RecordSeriesItemProps) {
  const { recordSeries } = props
  const router = useRouter()

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
    <RecordSeriesItemWrapper
      onClick={() => router.push(`/my/library/${recordSeries.id}`)}
    >
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
            {!isEmpty(recordSeries.recordProviders) &&
              recordSeries.recordProviders.map((provider) => (
                <Image
                  key={provider}
                  src={`/images/${provider}.svg`}
                  alt={provider}
                  width={20}
                  height={20}
                />
              ))}
          </div>
        </div>
      </div>
    </RecordSeriesItemWrapper>
  )
}

export default RecordSeriesItem
