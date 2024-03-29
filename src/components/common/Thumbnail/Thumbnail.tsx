import React from 'react'
import styled, { useTheme } from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Series } from '@/@types/series'
import Icons from '../Icons/Icons'

const ThumbnailContainer = styled.div`
  width: 137px;
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
  width: 137px;
  height: 130px;
  object-fit: cover;
  border-radius: 12px;
`

interface ThumbnailProps {
  series: Series
}

function Thumbnail(props: ThumbnailProps) {
  const { series } = props
  const theme = useTheme()
  const router = useRouter()

  return (
    <ThumbnailContainer onClick={() => router.push(`/series/${series.hashId}`)}>
      <ThumbnailImageWrapper>
        <div className="platform_wrapper">
          {series.providers.map((provider: any) => (
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
        <div className="series_info">{`${series.authors[0].name} · ${series.genres[0].name}`}</div>
        <div className="series_score">
          <Icons
            name="HeartActive"
            color={theme.color.main[600]}
            width="12px"
            height="12px"
          />
          {/* {series.score} */}
        </div>
      </div>
    </ThumbnailContainer>
  )
}

export default Thumbnail
