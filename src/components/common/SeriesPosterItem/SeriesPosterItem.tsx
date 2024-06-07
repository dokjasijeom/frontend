import { isEmpty } from 'lodash'
import Image from 'next/image'
import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Series } from '@/@types/series'
import { WEBNOVEL, WEBNOVEL_TEXT, WEBTOON_TEXT } from '@/constants/Series'
import Badge from '../Badge/Badge'
import Icons from '../Icons/Icons'

const SeriesPosterItemWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 18px;

  @media (max-width: 400px) {
    gap: 12px;
  }
  .thumbnail_wrapper {
    display: flex;
    flex-shrink: 0;
    width: 140px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: auto !important;
      position: relative !important;
      object-fit: cover;
    }

    @media (max-width: 400px) {
      width: 116px;
      height: 166px;
    }

    .type_badge {
      z-index: 1;
      position: absolute;
      top: 12px;
      left: 12px;
      color: ${({ theme }) => theme.color.system.w};
    }
  }
  .series_info_wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    .series_info {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .episode_wrapper {
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.gray[950]};
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .title {
        width: calc(100% - 12px);
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
      .score {
        display: flex;
        align-items: center;
        gap: 4px;
        ${({ theme }) => theme.typography.body2};
        color: ${({ theme }) => theme.color.main[600]};
      }
    }
  }
`

interface SeriesPosterItemProps {
  series: Series
  onClick?: () => void
  typeBadge?: boolean
}

function SeriesPosterItem(props: SeriesPosterItemProps) {
  const { series, onClick, typeBadge = false } = props
  const theme = useTheme()

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

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <SeriesPosterItemWrapper
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {!isEmpty(series.thumbnail) && (
        <div className="thumbnail_wrapper">
          {typeBadge && (
            <Badge
              className="type_badge"
              value={
                series.seriesType === WEBNOVEL ? WEBNOVEL_TEXT : WEBTOON_TEXT
              }
              color={theme.color.gray[950]}
            />
          )}
          <Image src={series.thumbnail} fill alt="" />
        </div>
      )}
      <div className="series_info_wrapper">
        <div className="series_info">
          <div className="episode_wrapper">
            {series.isComplete && (
              <Badge
                value="완결"
                color={
                  series.isComplete
                    ? theme.color.gray[300]
                    : theme.color.main[100]
                }
              />
            )}
            <div>총 {series.totalEpisode}화</div>
          </div>
          <div className="title">{series.title}</div>
          <div className="sub">{authorGenreText}</div>
          <div className="score">
            <Icons
              name="HeartActive"
              color={theme.color.main[600]}
              width="16px"
              height="16px"
            />
            {series.likeCount ? series.likeCount.toLocaleString() : 0}
          </div>
        </div>
      </div>
    </SeriesPosterItemWrapper>
  )
}

export default SeriesPosterItem
