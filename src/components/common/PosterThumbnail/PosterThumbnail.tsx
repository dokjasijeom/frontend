import { Series } from '@/@types/series'
import { IMAGE_BLUR } from '@/constants/Image'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const PosterThumbnailContainer = styled.div`
  width: 184px;
  font-size: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  @media (max-width: 490px) {
    width: 158px;
  }
`

const ThumbnailImageWrapper = styled.div`
  position: relative;
  width: 184px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 490px) {
    width: 158px;
  }
  .series_info_wrapper {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #000 65%);

    .series_info {
      position: absolute;
      bottom: 20px;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);

      .series_title {
        width: 100%;
        padding: 0 20px;
        ${({ theme }) => theme.typography.head1};
        color: ${({ theme }) => theme.color.system.w};
        word-break: keep-all;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        text-shadow: 2px 2px 2px ${({ theme }) => theme.color.system.bk};
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .series_author {
        text-align: center;
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.system.w};
        word-break: keep-all;
      }
    }
  }
`

const ThumbnailWrapper = styled.div`
  width: 184px;
  height: 300px;
  position: relative;
  @media (max-width: 490px) {
    width: 158px;
    height: 258px;
  }

  img {
    object-fit: cover;
    border-radius: 12px;
  }
`

interface PosterThumbnailProps {
  series: Series
}
function PosterThumbnail(props: PosterThumbnailProps) {
  const { series } = props

  const router = useRouter()
  return (
    <PosterThumbnailContainer
      onClick={() => router.push(`/series/${series.hashId}`)}
    >
      <ThumbnailImageWrapper>
        <ThumbnailWrapper>
          <Image
            alt={series.title}
            src={series.thumbnail}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
            fill
            sizes="(max-width: 490px) 316px, 368px"
          />
        </ThumbnailWrapper>
        <div className="series_info_wrapper">
          <div className="series_info">
            <div className="series_title">{series.title}</div>
            <div className="series_author">
              {series.authors.map((value) => value.name).join('/')}
            </div>
          </div>
        </div>
      </ThumbnailImageWrapper>
    </PosterThumbnailContainer>
  )
}

export default PosterThumbnail
