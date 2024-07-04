import { Series } from '@/@types/series'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import styled from 'styled-components'

const SeriesItemWrapper = styled.div`
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

interface SeriesItemProps {
  series: Series
}

function SeriesItem(props: SeriesItemProps) {
  const { series } = props
  const router = useRouter()

  const authorGenreText = useMemo(() => {
    const authorText = series.authors
      ? series.authors.map((value) => value.name).join('/')
      : ''
    const genreText = series.genres
      ? series.genres.map((value) => value.name).join('/')
      : ''

    const result = authorText.concat(' · ', genreText)
    return result
  }, [series])

  return (
    <SeriesItemWrapper onClick={() => router.push(`/series/${series.hashId}`)}>
      {!isEmpty(series?.thumbnail) && (
        <Image
          unoptimized
          className="series_thumbnail_image"
          src={series?.thumbnail}
          width={50}
          height={50}
          alt=""
        />
      )}
      <div className="series_info_wrapper">
        <div className="series_info">
          <div className="series_title">
            {series?.title}
            <span>{authorGenreText}</span>
          </div>
          <div className="platform_wrapper">
            {series.providers &&
              series.providers.map((provider) => (
                <Image
                  key={provider.hashId}
                  src={`/images/${provider.name}.svg`}
                  alt={provider.name}
                  width={20}
                  height={20}
                />
              ))}
          </div>
        </div>
      </div>
    </SeriesItemWrapper>
  )
}

export default SeriesItem
