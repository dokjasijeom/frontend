import { IParams } from '@/@types/interface'
import { Platform } from '@/@types/platform'
import { RecordEpisode, RecordSeries } from '@/@types/user'
import { getMySeries } from '@/api/user'
import AddSeriesForm from '@/components/Library/AddSeriesForm'
import RecordModalBody from '@/components/Library/RecordModalBody'
import Badge from '@/components/common/Badge/Badge'
import Button from '@/components/common/Button/Button'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import SeriesPosterItem from '@/components/common/SeriesPosterItem/SeriesPosterItem'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { PROVIDER_TAB_LIST } from '@/constants/Tab'
import useDebounce from '@/hooks/useDebounce'
import useModal from '@/hooks/useModal'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryDetailContainer = styled.div`
  padding-top: 56px;
`

const BookInfoWrapper = styled.div`
  padding: 20px;
  display: flex;
  position: relative;

  .book_info {
  }
  .record_button {
    position: absolute;
    bottom: 40px;
    left: 198px;
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
  .episodes_wrapper {
    padding: 10px;
    background: ${({ theme }) => theme.color.gray[50]};
    border-radius: 12px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;

    .empty_episodes {
      height: 234px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${({ theme }) => theme.typography.body2};
      color: ${({ theme }) => theme.color.gray[800]};
    }
  }
`
const EpisodeBox = styled.div<{ provider: string }>`
  cursor: pointer;
  ${({ theme }) => theme.typography.body4};
  width: 30px;
  height: 30px;
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
  padding: 12px;
  background: ${({ theme }) => theme.color.gray[950]};
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .selected_info {
    display: flex;
    align-items: center;
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

function LibraryDetail({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const theme = useTheme()
  const { showModal, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedEpisodes, setSelectedEpisodes] = useState<RecordEpisode[]>([])
  const [selectedProvider, setSelectedProvider] = useState<Platform[]>([])

  const debounceSearch = useDebounce(search, 200)

  const { data: mySeries } = useQuery<RecordSeries>({
    queryKey: ['mySeriesDetail'],
    queryFn: async () => {
      const res = await getMySeries(id)
      return res.data.data
    },
  })

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
    })
  }

  const handleAddSeries = () => {}

  const handleEditModal = () => {
    showModal({
      title: '편집',
      body: <AddSeriesForm title="" />,
      positiveText: '추가',
      onPositiveClick: handleAddSeries,
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
          (provider) => provider.value === episode.providerName,
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

  const handleselectedProvider = (platform: any) => {
    const findPlatform = selectedProvider.find(
      (item) => item.value === platform.value,
    )
    if (findPlatform) {
      const filterPlarform = selectedProvider.filter(
        (item) => item.value !== platform.value,
      )
      setSelectedProvider(filterPlarform)
    } else {
      setSelectedProvider([...selectedProvider, platform])
    }
  }

  const handleEditEpisodes = () => {
    setIsEdit(true)
  }

  return (
    <LibraryDetailContainer>
      <TitleHeader title="읽고 있는 작품" onClickBack={() => router.back()} />
      {mySeries && mySeries.series && (
        <>
          <BookInfoWrapper>
            <SeriesPosterItem series={mySeries.series} />
            <div className="book_info">
              {/* {series.isDirect && (
                <Button
                  type="text"
                  width="auto"
                  style={{ position: 'absolute', right: '60px' }}
                  onClick={handleEditModal}
                >
                  편집
                </Button>
              )} */}
              <Button
                type="text"
                width="auto"
                style={{ position: 'absolute', right: '20px' }}
                onClick={handleDeleteModal}
              >
                삭제
              </Button>
            </div>
            <Button
              width="95px"
              style={{
                position: 'absolute',
                bottom: '40px',
                left: mySeries.series.thumbnail ? '198px' : '40px',
              }}
              onClick={handleRecordModal}
            >
              기록하기
            </Button>
          </BookInfoWrapper>
          {/* {book.total > 0 && (
            <RecordBanner>
              <span className="bold">네이버시리즈</span>에서{' '}
              <span className="bold">{book.current}화</span>까지 읽었어요!
            </RecordBanner>
          )} */}
          <RecordDetailWrapper>
            <TabTitleHeader
              iconName="Content"
              title="기록장"
              moreButton={
                <Button type="text" width="auto">
                  {isEdit ? '' : '편집'}
                </Button>
              }
              onClickMore={handleEditEpisodes}
            />
            <RecordDetail>
              <div className="record_filter_wrapper">
                {/* <div className="total_text">전체 {book.total}</div> */}
                <div className="platform_wrapper">
                  {PROVIDER_TAB_LIST.map((provider) => (
                    <Checkbox
                      key={provider.value}
                      style={{ gap: '4px' }}
                      checked={Boolean(
                        selectedProvider.find(
                          (item) => item.value === provider.value,
                        ),
                      )}
                      onChange={() => {
                        handleselectedProvider(provider)
                      }}
                      checkColor={theme.color.main[600]}
                    >
                      <div className="checkbox_label">{provider.label}</div>
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
              <div className="episodes_wrapper">
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
                          handleDeleteModal()
                        } else {
                          setIsEdit(false)
                        }
                      }}
                    >
                      {!isEmpty(selectedEpisodes) ? '삭제' : '취소'}
                    </button>
                  </DeleteBox>
                )}
                {/* {isEmpty(filteredEpisodes) && book.total === 0 && (
                  <div className="empty_episodes">기록된 회차가 없어요.</div>
                )} */}
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
            </RecordDetail>
          </RecordDetailWrapper>
        </>
      )}
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
