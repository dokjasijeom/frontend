import { isEmpty } from 'lodash'
import Image from 'next/image'
import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Series } from '@/@types/series'
import Badge from '../Badge/Badge'
import Icons from '../Icons/Icons'

const SeriesPosterItemWrapper = styled.div`
  padding: 20px;
  display: flex;
  .book_image {
    border-radius: 12px;
    margin-right: 18px;
  }
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 200px;

    .book_info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .status {
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.gray[950]};
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .title {
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
}

function SeriesPosterItem(props: SeriesPosterItemProps) {
  const { series, onClick } = props
  const theme = useTheme()

  const authorGenreText = useMemo(() => {
    const authorText = series.authors.map((value) => value.name).join('/')
    const genreText = series.genres.map((value) => value.name).join('/')

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
        <Image
          className="book_image"
          src={series.thumbnail}
          width={140}
          height={200}
          alt=""
        />
      )}
      <div className="book_info_wrapper">
        <div className="book_info">
          {series.isComplete && (
            <div className="status">
              <Badge
                value="완결"
                color={
                  series.isComplete
                    ? theme.color.gray[300]
                    : theme.color.main[100]
                }
              />
              총 {series.totalEpisode}화
            </div>
          )}
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
