import { IParams } from '@/@types/interface'
import { ProviderItem } from '@/@types/series'
import { RecordEpisode, RecordSeries } from '@/@types/user'
import { getProviders } from '@/api/providers'
import { deleteNonExistRecordSeries, deleteRecordSeries } from '@/api/series'
import {
  deleteRecordEpisode,
  getMySeries,
  updateReadCompleted,
} from '@/api/user'
import AddSeriesForm from '@/components/Library/AddSeriesForm'
import RecordModalBody from '@/components/Library/RecordModalBody'
import Badge from '@/components/common/Badge/Badge'
import Button from '@/components/common/Button/Button'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import SeriesPosterItem from '@/components/common/SeriesPosterItem/SeriesPosterItem'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import { TabItem } from '@/components/common/Tab/Tab'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import Toggle from '@/components/common/Toggle/Toggle'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useDebounce from '@/hooks/useDebounce'
import useModal from '@/hooks/useModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryDetailContainer = styled.div`
  padding-top: 56px;
`

const SkeletonWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
  @media (max-width: 400px) {
    gap: 12px;
  }
  .skeleton_thumbnail_wrapper {
    width: 140px;
    height: 200px;
    flex-shrink: 0;
    @media (max-width: 400px) {
      width: 116px;
      height: 166px;
    }
  }
  .skeleton_item_wrapper {
    width: 100%;
  }
`

const MySeriesInfoWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  .series_edit_wrapper {
  }
  .record_button_wrapper {
    position: absolute;
    bottom: 20px;
    left: 178px;
    display: flex;
    align-items: end;
    gap: 12px;

    @media (max-width: 400px) {
      left: 149px !important;
    }

    &.non_exist_series {
      left: 20px;

      @media (max-width: 400px) {
        left: 20px !important;
      }
    }

    .complete_toggle_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      .label {
        ${({ theme }) => theme.typography.body4};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
  }
`

const RecordBanner = styled.div`
  margin: 0 20px;
  width: calc(100% - 40px);
  padding: 8px 0px;
  text-align: center;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.color.sub[200]};
  background: ${({ theme }) => theme.color.sub[50]};
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[800]};
  .bold {
    font-weight: bold;
  }
`

const RecordDetailWrapper = styled.div`
  margin-top: 32px;
`

const RecordDetail = styled.div`
  padding: 0 20px;
  .record_filter_wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .total_text {
      color: ${({ theme }) => theme.color.gray[800]};
      ${({ theme }) => theme.typography.body1};
    }
    .platform_wrapper {
      display: flex;
      gap: 12px;

      .checkbox_label {
        flex: 1;
        ${({ theme }) => theme.typography.body1};
      }
    }
  }
  .episodes_search_wrapper {
    padding: 12px 0;
  }
`
const EpisodeBox = styled.div<{ provider: string }>`
  cursor: pointer;
  ${({ theme }) => theme.typography.body4};
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  background: ${({ theme, provider }) => theme.color.system[provider]};
  color: ${({ theme }) => theme.color.system.w};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background: ${({ theme }) => theme.color.gray[950]};
  }
`

const DeleteBox = styled.div`
  margin-bottom: 4px;
  padding: 12px;
  background: ${({ theme }) => theme.color.gray[950]};
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 400px) {
    flex-direction: column;

    .selected_info {
      width: 100%;
    }

    .delete_button {
      width: 100%;
      margin-top: 8px;
    }
  }

  .selected_info {
    display: flex;
    align-items: center;
    text-align: left;
    gap: 8px;
    ${({ theme }) => theme.typography.head2};
    color: ${({ theme }) => theme.color.system.w};

    .badge {
      ${({ theme }) => theme.typography.head2};
      color: ${({ theme }) => theme.color.system.w};
    }
  }

  .delete_button {
    padding: 12px 20px;
    background: ${({ theme }) => theme.color.system.error};
    ${({ theme }) => theme.typography.head2};
    color: ${({ theme }) => theme.color.system.w};
    border-radius: 12px;
  }
`

const NonExistSeriesInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  padding: 20px;

  .series_info {
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
`

const RecordEpisodesWrapper = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
  @media (max-width: 400px) {
    padding: 9px;
  }

  .empty_episodes {
    height: 234px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.typography.body2};
    color: ${({ theme }) => theme.color.gray[800]};
  }

  .episodes_wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    gap: 4px;
  }
`

function LibraryDetail({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const theme = useTheme()
  const { showModal, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [search, setSearch] = useState('')
  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [selectedEpisodes, setSelectedEpisodes] = useState<RecordEpisode[]>([])
  const [selectedProvider, setSelectedProvider] = useState<TabItem[]>(providers)

  const debounceSearch = useDebounce(search, 200)
  const queryClient = useQueryClient()

  const { data: mySeries, isError } = useQuery<RecordSeries>({
    queryKey: ['mySeriesDetail'],
    queryFn: async () => {
      const res = await getMySeries(id)
      return res.data.data
    },
    retry: 0,
  })

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
      setSelectedProvider(res.data.data)
    }
    fetchProviders()
  }, [])

  useEffect(() => {
    if (isError) {
      router.push('/my/library')
    }
  }, [isError, mySeries, router])

  const lastRecordEpisode = useMemo(() => {
    if (isEmpty(mySeries)) return null

    const { recordEpisodes } = mySeries

    return recordEpisodes[recordEpisodes.length - 1]
  }, [mySeries])

  const isNonExistSeries = useMemo(() => {
    if (!isEmpty(mySeries) && !isEmpty(mySeries.series)) {
      return false
    }
    return true
  }, [mySeries])

  const handleRecordModal = () => {
    if (mySeries) {
      showModal({
        type: 'self',
        title: '기록하기',
        body: (
          <RecordModalBody recordSeries={mySeries} onCloseModal={closeModal} />
        ),
      })
    }
  }

  const handleDeleteModal = () => {
    showModal({
      title: '기록한 작품 삭제',
      body: (
        <>
          삭제한 기록은 되돌릴 수 없어요. <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
      onPositiveClick: async () => {
        if (!isEmpty(mySeries)) {
          if (!isEmpty(mySeries.series)) {
            await deleteRecordSeries(mySeries.series.hashId).then(async () => {
              router.push('/my/library')
            })
          } else {
            await deleteNonExistRecordSeries(mySeries.id).then(async () => {
              router.push('/my/library')
            })
          }
        }
      },
    })
  }

  const handleEditModal = () => {
    showModal({
      title: '편집',
      type: 'self',
      body: <AddSeriesForm keyword="" onCloseModal={closeModal} />,
    })
  }

  const handleDeleteEpisodeModal = () => {
    showModal({
      title: '기록 삭제',
      body: (
        <>
          삭제한 기록은 되돌릴 수 없어요. <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
      onPositiveClick: async () => {
        if (!isEmpty(mySeries)) {
          const recordIds = selectedEpisodes.map(
            (ep: RecordEpisode) => ep.id,
          ) as number[]

          const params = {
            userRecordSeriesId: mySeries.id,
            recordIds,
          }
          await deleteRecordEpisode(params).then(() => {
            queryClient.invalidateQueries({ queryKey: ['mySeriesDetail'] })
            setSelectedEpisodes([])
          })
        }
      },
    })
  }

  const handleChangeSearch = (value: string) => {
    setSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const filteredEpisodes = useMemo(() => {
    if (isEmpty(mySeries) || isEmpty(mySeries.recordEpisodes)) return []

    const { recordEpisodes } = mySeries

    if (!isEmpty(debounceSearch)) {
      const filter = recordEpisodes.filter((episode) =>
        episode.episodeNumber.toString().includes(debounceSearch),
      )

      return filter
    }

    if (!isEmpty(selectedProvider)) {
      const filter = recordEpisodes.filter((episode) =>
        selectedProvider.find(
          (provider) => provider.name === episode.providerName,
        ),
      )

      return filter
    }

    return recordEpisodes
  }, [mySeries, debounceSearch, selectedProvider])

  const handleClickEpisode = (episode: RecordEpisode) => {
    const findEpisodes = selectedEpisodes.find((item) => item.id === episode.id)
    if (findEpisodes) {
      const filterEpisodes = selectedEpisodes.filter(
        (item) => item.id !== episode.id,
      )
      setSelectedEpisodes(filterEpisodes)
    } else {
      setSelectedEpisodes([...selectedEpisodes, episode])
    }
  }

  const handleselectedProvider = (provider: any) => {
    const findPlatform = selectedProvider.find(
      (item) => item.name === provider.name,
    )
    if (findPlatform) {
      const filterPlarform = selectedProvider.filter(
        (item) => item.name !== provider.name,
      )
      setSelectedProvider(filterPlarform)
    } else {
      setSelectedProvider([...selectedProvider, provider])
    }
  }

  const handleEditEpisodes = () => {
    setIsEdit(true)
  }

  const handleUpdateReadCompleted = async () => {
    await updateReadCompleted({
      id,
      readCompleted: !mySeries?.readCompleted,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['mySeriesDetail'] })
    })
  }

  return (
    <LibraryDetailContainer>
      <TitleHeader title="읽고 있는 작품" onClickBack={() => router.back()} />
      <>
        {isEmpty(mySeries) && (
          <SkeletonWrapper>
            <div className="skeleton_thumbnail_wrapper">
              <Skeleton width="100%" height="100%" style={{ flexShrink: 0 }} />
            </div>
            <div className="skeleton_item_wrapper">
              <Skeleton width="120px" height="24px" />
              <Skeleton
                width="100px"
                height="14px"
                style={{ marginTop: '10px' }}
              />
              <Skeleton width="80px" height="14px" />
              <Skeleton width="50px" height="14px" />
              <Skeleton width="70px" height="14px" />
            </div>
          </SkeletonWrapper>
        )}
        {!isEmpty(mySeries) && (
          <MySeriesInfoWrapper>
            {!isEmpty(mySeries.series) && (
              <SeriesPosterItem
                series={mySeries.series}
                onClick={() => {
                  if (!isEmpty(mySeries.series)) {
                    router.push(`/series/${mySeries.series.hashId}`)
                  }
                }}
              />
            )}
            {mySeries.title && mySeries.author && mySeries.genre && (
              <NonExistSeriesInfoWrapper>
                <div className="series_info">
                  <div className="title">{mySeries.title}</div>
                  <div className="sub">
                    {mySeries.author.concat(' · ', mySeries.genre)}
                  </div>
                </div>
              </NonExistSeriesInfoWrapper>
            )}
            <div className="series_edit_wrapper">
              {isNonExistSeries && (
                <Button
                  type="text"
                  width="auto"
                  style={{ position: 'absolute', top: '20px', right: '60px' }}
                  onClick={handleEditModal}
                >
                  편집
                </Button>
              )}
              <Button
                type="text"
                width="auto"
                style={{ position: 'absolute', top: '20px', right: '20px' }}
                onClick={handleDeleteModal}
              >
                삭제
              </Button>
            </div>
            <div
              className={`record_button_wrapper ${
                isNonExistSeries ? 'non_exist_series' : ''
              }`}
            >
              <Button width="95px" onClick={handleRecordModal}>
                기록하기
              </Button>
              <div className="complete_toggle_wrapper">
                <div className="label">완독</div>
                <Toggle
                  checked={mySeries.readCompleted}
                  onChange={handleUpdateReadCompleted}
                />
              </div>
            </div>
          </MySeriesInfoWrapper>
        )}
        {!isEmpty(lastRecordEpisode) && (
          <RecordBanner>
            <span className="bold">
              {
                providers.find(
                  (provider) =>
                    provider.name === lastRecordEpisode.providerName,
                )?.displayName
              }
            </span>
            에서{' '}
            <span className="bold">{lastRecordEpisode.episodeNumber}화</span>
            까지 읽었어요!
          </RecordBanner>
        )}
        <RecordDetailWrapper>
          <TabTitleHeader
            iconName="Content"
            title="기록장"
            moreButton={
              <Button type="text" width="auto">
                {isEdit || isEmpty(filteredEpisodes) ? '' : '편집'}
              </Button>
            }
            onClickMore={handleEditEpisodes}
          />
          <RecordDetail>
            <div className="record_filter_wrapper">
              <div className="total_text">
                전체 {mySeries?.recordEpisodeCount.toLocaleString()}
              </div>
              <div className="platform_wrapper">
                {providers.map((provider) => (
                  <Checkbox
                    key={provider.name}
                    style={{ gap: '4px' }}
                    checked={Boolean(
                      selectedProvider.find(
                        (item) => item.name === provider.name,
                      ),
                    )}
                    onChange={() => {
                      handleselectedProvider(provider)
                    }}
                    checkColor={theme.color.main[600]}
                  >
                    <div className="checkbox_label">{provider.displayName}</div>
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="episodes_search_wrapper">
              <Input
                value={search}
                placeholder="회차 검색하기"
                suffix={
                  !isEmpty(search) ? (
                    <Icons
                      name="CloseCircle"
                      width="22px"
                      height="22px"
                      onClick={handleClearSearch}
                    />
                  ) : (
                    <Icons name="Search" width="22px" height="22px" />
                  )
                }
                onChange={(e) => handleChangeSearch(e.target.value)}
              />
            </div>
            <RecordEpisodesWrapper>
              {isEmpty(filteredEpisodes) && (
                <div className="empty_episodes">기록된 회차가 없어요.</div>
              )}
              {(!isEmpty(selectedEpisodes) || isEdit) && (
                <DeleteBox>
                  <div className="selected_info">
                    선택한{' '}
                    <Badge
                      color={theme.color.system.error}
                      value={`${selectedEpisodes.length}개`}
                      className="badge"
                    />{' '}
                    기록을 삭제합니다.
                  </div>
                  <button
                    type="button"
                    className="delete_button"
                    onClick={() => {
                      if (!isEmpty(selectedEpisodes)) {
                        handleDeleteEpisodeModal()
                      } else {
                        setIsEdit(false)
                      }
                    }}
                  >
                    {!isEmpty(selectedEpisodes) ? '삭제' : '취소'}
                  </button>
                </DeleteBox>
              )}
              <div className="episodes_wrapper">
                {filteredEpisodes.map((episode) => (
                  <EpisodeBox
                    className={
                      selectedEpisodes.find((item) => item.id === episode.id)
                        ? 'active'
                        : ''
                    }
                    provider={episode.providerName}
                    key={episode.id}
                    onClick={() => handleClickEpisode(episode)}
                  >
                    {episode.episodeNumber}
                  </EpisodeBox>
                ))}
              </div>
            </RecordEpisodesWrapper>
          </RecordDetail>
        </RecordDetailWrapper>
      </>
    </LibraryDetailContainer>
  )
}

LibraryDetail.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export const getServerSideProps: GetServerSideProps<{
  id: string
}> = async (context) => {
  const { id } = context.params as IParams

  return {
    props: {
      id,
    },
  }
}

export default LibraryDetail
