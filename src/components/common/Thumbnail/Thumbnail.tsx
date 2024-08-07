import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Provider, Series } from '@/@types/series'
import { isEmpty } from 'lodash'
import { IMAGE_BLUR } from '@/constants/Image'
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
  .provider_wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
    z-index: 1;
  }
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  position: relative;
  img {
    object-fit: cover;
    border-radius: 12px;
  }
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
        <div className="provider_wrapper">
          {!isEmpty(series.providers) &&
            series.providers.map((provider: Provider) => (
              <Image
                key={provider.hashId}
                src={`/images/${provider.name}.svg`}
                alt={provider.name}
                width={20}
                height={20}
              />
            ))}
        </div>
        <ThumbnailWrapper>
          <Image
            alt={series.title}
            src={series.thumbnail}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
            fill
            priority
            sizes="(max-width: 419px) 380px, (max-width: 560px) 340px, 274px"
          />
        </ThumbnailWrapper>
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
