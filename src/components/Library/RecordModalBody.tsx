import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty, range } from 'lodash'
import { RecordSeries } from '@/@types/user'
import { recordSeriesEpisode } from '@/api/user'
import { useQueryClient } from '@tanstack/react-query'
import useToast from '@/hooks/useToast'
import { getProviders } from '@/api/providers'
import { ProviderItem } from '@/@types/series'
import Checkbox from '../common/Checkbox/Checkbox'
import Selector, { OptionItem } from '../common/Selector/Selector'
import RecordEpisodes, { Episodes } from './RecordEpisodes'
import Button from '../common/Button/Button'
import Modal from '../common/Modal/Modal'
import Icons from '../common/Icons/Icons'

const RecordModalBodyContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SeriesWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.sub[300]};
  background: ${({ theme }) => theme.color.sub[50]};
  padding: 12px;
  position: relative;
  min-height: 76px;

  .series_info_wrapper {
    display: flex;
    flex-direction: row;
    gap: 12px;
    .series_thumbnail {
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;

      @media (max-width: 490px) {
        width: 50px;
        height: 50px;
      }
    }

    .series_info {
      width: 100%;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      overflow: hidden;
      @media (max-width: 490px) {
        justify-content: center;
      }
      .title_wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 12px;
        overflow: hidden;

        .title {
          display: flex;
          flex-direction: row;
          gap: 12px;
          align-items: center;
          ${({ theme }) => theme.typography.body1};
          color: ${({ theme }) => theme.color.gray[950]};

          @media (max-width: 490px) {
            display: block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }

        .sub {
          ${({ theme }) => theme.typography.body5};
          color: ${({ theme }) => theme.color.gray[800]};
        }
        @media (max-width: 490px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }
      }
    }
  }
  .description {
    display: flex;
    gap: 4px;
    align-items: center;
    ${({ theme }) => theme.typography.body4};
    color: ${({ theme }) => theme.color.main[600]};
    position: absolute;
    bottom: 16px;
    left: 74px;
    @media (max-width: 490px) {
      margin-top: 12px;
      position: unset;
    }

    &.non_exist {
      left: 12px;
    }
    &.empty {
      color: ${({ theme }) => theme.color.gray[600]};
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
  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [provider, setProvider] = useState<OptionItem | null>(null)
  const [episodes, setEpisodes] = useState<Episodes>({ from: '0', to: '0' })
  const [isOverWriteEpisodeModal, setIsOverWriteEpisodeModal] = useState(false)
  const queryclient = useQueryClient()
  const { showToast } = useToast()

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
    }
    fetchProviders()
  }, [])

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
    if (recordSeries.author && recordSeries.genre) {
      result = recordSeries.author?.concat(' · ', recordSeries.genre)
    }
    return result
  }, [recordSeries])

  const fetchRecordSeriesEpisode = async () => {
    const from = Number(episodes.from)
    const to = Number(episodes.to)
    const params = {
      userRecordSeriesId: recordSeries.id,
      providerName: provider?.name ?? providers[0].name,
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
      <SeriesWrapper>
        <div className="series_info_wrapper">
          {recordSeries.series && (
            <Image
              unoptimized
              className="series_thumbnail"
              src={recordSeries.series.thumbnail}
              width={50}
              height={50}
              alt=""
            />
          )}
          <div className="series_info">
            <div className="title_wrapper">
              <span className="title">
                {recordSeries.series
                  ? recordSeries.series.title
                  : recordSeries.title}
              </span>
              <span className="sub">{authorGenreText}</span>
            </div>
          </div>
        </div>
        {!isEmpty(lastRecordEpisode) ? (
          <div
            className={`description ${recordSeries.series ? '' : 'non_exist'}`}
          >
            <Image
              unoptimized
              src={`/images/${lastRecordEpisode.providerName}.svg`}
              width={16}
              height={16}
              alt=""
            />
            {
              providers.find(
                (item) => item.name === lastRecordEpisode.providerName,
              )?.displayName
            }
            에서 {lastRecordEpisode.episodeNumber}화까지 읽었어요!
          </div>
        ) : (
          <div
            className={`description empty ${
              recordSeries.series ? '' : 'non_exist'
            }`}
          >
            <Icons name="Content" width="16px" height="16px" />
            최근에 기록한 회차가 없어요!
          </div>
        )}
      </SeriesWrapper>

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

        {!isEmpty(providers) && (
          <Selector
            value={isEmpty(provider) ? '선택' : provider.displayName}
            options={providers}
            onClickOption={(option) => handleChangeProvider(option)}
          />
        )}
        <RecordEpisodes isMulti={isMulti} setEpisodes={setEpisodes} />
      </RecordWrapper>
      <Button disabled={isEmpty(provider)} onClick={handleRecord}>
        저장
      </Button>
    </RecordModalBodyContainer>
  )
}

export default RecordModalBody
