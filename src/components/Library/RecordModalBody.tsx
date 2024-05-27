import Image from 'next/image'
import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { PROVIDER_TAB_LIST } from '@/constants/Tab'
import { isEmpty } from 'lodash'
import { RecordSeries } from '@/@types/user'
import Checkbox from '../common/Checkbox/Checkbox'
import Selector, { OptionItem } from '../common/Selector/Selector'
import RecordEpisodes, { Episodes } from './RecordEpisodes'
import Button from '../common/Button/Button'

const RecordModalBodyContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const BookWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.sub[300]};
  background: ${({ theme }) => theme.color.sub[50]};
  padding: 12px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  .book_thumbnail {
    border-radius: 4.38px;
    object-fit: cover;
  }

  .book_info {
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .title {
      display: flex;
      gap: 12px;
      align-items: center;
      ${({ theme }) => theme.typography.body1};
      color: ${({ theme }) => theme.color.gray[950]};
      .sub {
        ${({ theme }) => theme.typography.body5};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
    .description {
      display: flex;
      gap: 4px;
      align-items: center;
      ${({ theme }) => theme.typography.body4};
      color: ${({ theme }) => theme.color.main[600]};
    }
  }
`

const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .checkbox_label {
    ${({ theme }) => theme.typography.body1};
  }
`

interface RecordModalBodyProps {
  recordSeries: RecordSeries
}

function RecordModalBody(props: RecordModalBodyProps) {
  const { recordSeries } = props
  const theme = useTheme()
  const { series } = recordSeries
  const [isMulti, setIsMulti] = useState(false)
  const [platform, setPlarform] = useState<OptionItem | null>(null)
  const [episodes, setEpisodes] = useState<Episodes>({ start: '0', end: '0' })
  const handleChangePlatform = (option: OptionItem) => {
    setPlarform(option)
  }

  const handleRecord = () => {
    // TODO: 기록하기 저장
    console.log(platform, episodes)
  }

  return (
    <RecordModalBodyContainer>
      <BookWrapper>
        <Image
          unoptimized
          className="book_thumbnail"
          src={series.thumbnail}
          width={50}
          height={50}
          alt=""
        />
        <div className="book_info">
          <div className="title">
            {series.title}
            {/* <span className="sub">
              {book.author} · {book.genre}
            </span> */}
          </div>
          <div className="description">
            <Image
              unoptimized
              src="/images/naver.png"
              width={16}
              height={16}
              alt=""
            />
            네이버시리즈에서 {recordSeries.recordEpisodeCount}화까지 읽었어요!
          </div>
        </div>
      </BookWrapper>
      <RecordWrapper>
        <Checkbox
          style={{ gap: '4px' }}
          checked={isMulti}
          onChange={() => {
            setIsMulti(!isMulti)
          }}
          checkColor={theme.color.main[600]}
        >
          <div className="checkbox_label">여러 회차 기록하기</div>
        </Checkbox>

        <Selector
          value={isEmpty(platform) ? '선택' : platform.label}
          options={PROVIDER_TAB_LIST}
          onClickOption={(option) => handleChangePlatform(option)}
        />
        <RecordEpisodes isMulti={isMulti} setEpisodes={setEpisodes} />
      </RecordWrapper>
      <Button onClick={handleRecord}>저장</Button>
    </RecordModalBodyContainer>
  )
}

export default RecordModalBody
