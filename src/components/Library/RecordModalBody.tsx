import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { PROVIDER_TAB_LIST } from '@/constants/Tab'
import { isEmpty, range } from 'lodash'
import { RecordSeries } from '@/@types/user'
import { recordSeriesEpisode } from '@/api/user'
import { useQueryClient } from '@tanstack/react-query'
import useToast from '@/hooks/useToast'
import Checkbox from '../common/Checkbox/Checkbox'
import Selector, { OptionItem } from '../common/Selector/Selector'
import RecordEpisodes, { Episodes } from './RecordEpisodes'
import Button from '../common/Button/Button'
import Modal from '../common/Modal/Modal'

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
  onCloseModal: () => void
}

function RecordModalBody(props: RecordModalBodyProps) {
  const { recordSeries, onCloseModal } = props
  const theme = useTheme()
  const [isMulti, setIsMulti] = useState(false)
  const [provider, setProvider] = useState<OptionItem | null>(null)
  const [episodes, setEpisodes] = useState<Episodes>({ from: '0', to: '0' })
  const [isOverWriteEpisodeModal, setIsOverWriteEpisodeModal] = useState(false)
  const queryclient = useQueryClient()
  const { showToast } = useToast()

  const handleChangeProvider = (option: OptionItem) => {
    setProvider(option)
  }

  const authorGenreText = useMemo(() => {
    let result = ''
    if (!isEmpty(recordSeries) && !isEmpty(recordSeries.series)) {
      const authorText = recordSeries.series.authors
        ? recordSeries.series.authors.map((value) => value.name).join('/')
        : ''
      const genreText = recordSeries.series.genres
        ? recordSeries.series.genres.map((value) => value.name).join('/')
        : ''

      result = authorText.concat(' · ', genreText)
    }
    return result
  }, [recordSeries])

  const fetchRecordSeriesEpisode = async () => {
    const from = Number(episodes.from)
    const to = Number(episodes.to)
    const params = {
      userRecordSeriesId: recordSeries.id,
      providerName: provider?.value ?? PROVIDER_TAB_LIST[0].value,
      from: isMulti ? from : to,
      to,
    }
    await recordSeriesEpisode(params)
      .then(() => {
        queryclient.invalidateQueries({ queryKey: ['mySeriesDetail'] })
        queryclient.invalidateQueries({ queryKey: ['user'] })
        onCloseModal()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showToast({
            type: 'error',
            message: '최대 회차를 초과하여 기록할 수 없어요.',
          })
        }
      })
  }

  const handleRecord = async () => {
    const from = Number(episodes.from)
    const to = Number(episodes.to)

    const fromToEpisodeArr = isMulti ? range(from, to + 1) : [to]

    const duplicationEpisodes = recordSeries.recordEpisodes.filter((v) =>
      fromToEpisodeArr.includes(v.episodeNumber),
    )

    if (!isEmpty(duplicationEpisodes)) {
      setIsOverWriteEpisodeModal(true)
    } else {
      fetchRecordSeriesEpisode()
    }
  }

  const lastRecordEpisode = useMemo(() => {
    if (isEmpty(recordSeries)) return null

    const { recordEpisodes } = recordSeries

    return recordEpisodes[recordEpisodes.length - 1]
  }, [recordSeries])

  return (
    <RecordModalBodyContainer>
      {isOverWriteEpisodeModal && (
        <Modal
          width="320px"
          type="confirm"
          title="잠깐!"
          positiveText="덮어쓰기"
          negativeText="취소"
          onPositiveClick={fetchRecordSeriesEpisode}
          onClose={() => {
            setIsOverWriteEpisodeModal(false)
          }}
        >
          <>
            이미 기록한 회차가 포함되어 있어요!
            <br />
            등록된 기록에 새로 덮어쓸까요?
          </>
        </Modal>
      )}
      <BookWrapper>
        {recordSeries.series && (
          <Image
            unoptimized
            className="book_thumbnail"
            src={recordSeries.series.thumbnail}
            width={50}
            height={50}
            alt=""
          />
        )}

        <div className="book_info">
          <div className="title">
            {recordSeries.series && recordSeries.series.title}
            <span className="sub">{authorGenreText}</span>
          </div>
          {!isEmpty(lastRecordEpisode) && (
            <div className="description">
              <Image
                unoptimized
                src={`/images/${lastRecordEpisode.providerName}.png`}
                width={16}
                height={16}
                alt=""
              />
              {
                PROVIDER_TAB_LIST.find(
                  (item) => item.value === lastRecordEpisode.providerName,
                )?.label
              }
              에서 {lastRecordEpisode.episodeNumber}화까지 읽었어요!
            </div>
          )}
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
          value={isEmpty(provider) ? '선택' : provider.label}
          options={PROVIDER_TAB_LIST}
          onClickOption={(option) => handleChangeProvider(option)}
        />
        <RecordEpisodes isMulti={isMulti} setEpisodes={setEpisodes} />
      </RecordWrapper>
      <Button disabled={isEmpty(provider)} onClick={handleRecord}>
        저장
      </Button>
    </RecordModalBodyContainer>
  )
}

export default RecordModalBody
