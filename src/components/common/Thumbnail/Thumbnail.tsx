import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Series } from '@/@types/series'
import { isEmpty } from 'lodash'
import Icons from '../Icons/Icons'

const ThumbnailContainer = styled.div`
  width: 100%;
  font-size: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  .series_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .series_title {
      ${({ theme }) => theme.typography.body1};
      color: ${({ theme }) => theme.color.gray[950]};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .series_info {
      ${({ theme }) => theme.typography.body5};
      color: ${({ theme }) => theme.color.gray[600]};
    }
    .series_score {
      ${({ theme }) => theme.typography.caption};
      color: ${({ theme }) => theme.color.main[600]};
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`

const ThumbnailImageWrapper = styled.div`
  position: relative;
  .platform_wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
  }
`
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  aspect-ratio: 1;
`

interface ThumbnailProps {
  series: Series
}

function Thumbnail(props: ThumbnailProps) {
  const { series } = props
  const theme = useTheme()
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
    <ThumbnailContainer onClick={() => router.push(`/series/${series.hashId}`)}>
      <ThumbnailImageWrapper>
        <div className="platform_wrapper">
          {!isEmpty(series.providers) &&
            series.providers.map((provider: any) => (
              <Image
                key={provider.value}
                src={`/images/${provider.value}.png`}
                alt={provider.value}
                width={20}
                height={20}
              />
            ))}
        </div>
        <ThumbnailImage src={series.thumbnail} />
      </ThumbnailImageWrapper>
      <div className="series_info_wrapper">
        <div className="series_title">{series.title}</div>
        <div className="series_info">{authorGenreText}</div>
        <div className="series_score">
          <Icons
            name="HeartActive"
            color={theme.color.main[600]}
            width="12px"
            height="12px"
          />
          {series.likeCount ? series.likeCount.toLocaleString() : 0}
        </div>
      </div>
    </ThumbnailContainer>
  )
}

export default Thumbnail
