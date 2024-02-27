import { Episode } from '@/@types/book'
import { Platform } from '@/@types/platform'
import AddBookForm from '@/components/Library/AddBookForm'
import RecordModalBody from '@/components/Library/RecordModalBody'
import Badge from '@/components/common/Badge/Badge'
import Button from '@/components/common/Button/Button'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockMyBook } from '@/constants/MockData'
import { PLATFORM_TAB_LIST } from '@/constants/Tab'
import useDebounce from '@/hooks/useDebounce'
import useModal from '@/hooks/useModal'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryDetailContainer = styled.div`
  padding-top: 56px;
`

const BookInfoWrapper = styled.div`
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
const EpisodeBox = styled.div<{ platform: string }>`
  cursor: pointer;
  ${({ theme }) => theme.typography.body4};
  width: 30px;
  height: 30px;
  background: ${({ theme, platform }) => theme.color.system[platform]};
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

function LibraryDetail() {
  const router = useRouter()
  const theme = useTheme()
  const { showModal } = useModal()
  const { id } = router.query
  const [isEdit, setIsEdit] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedEpisodes, setSelectedEpisodes] = useState<Episode[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<Platform[]>([])

  const debounceSearch = useDebounce(search, 200)

  const book = MockMyBook.webNovel.find((item) => item.id === id)

  const handleRecordModal = () => {
    if (book) {
      showModal({
        type: 'self',
        title: '기록하기',
        body: <RecordModalBody book={book} />,
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

  const handleAddBook = () => {}

  const handleEditModal = () => {
    showModal({
      title: '편집',
      body: <AddBookForm title="" />,
      positiveText: '추가',
      onPositiveClick: handleAddBook,
    })
  }

  const handleChangeSearch = (value: string) => {
    setSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const filteredEpisodes = useMemo(() => {
    if (isEmpty(book) || isEmpty(book.episodes)) return []

    const { episodes } = book

    if (!isEmpty(debounceSearch)) {
      const filter = episodes.filter((episode) =>
        episode.ep.toString().includes(debounceSearch),
      )

      return filter
    }

    if (!isEmpty(selectedPlatform)) {
      const filter = episodes.filter((episode) =>
        selectedPlatform.find(
          (platform) => platform.value === episode.platform.value,
        ),
      )

      return filter
    }

    return episodes
  }, [book, debounceSearch, selectedPlatform])

  const handleClickEpisode = (episode: Episode) => {
    const findEpisodes = selectedEpisodes.find((item) => item.ep === episode.ep)
    if (findEpisodes) {
      const filterEpisodes = selectedEpisodes.filter(
        (item) => item.ep !== episode.ep,
      )
      setSelectedEpisodes(filterEpisodes)
    } else {
      setSelectedEpisodes([...selectedEpisodes, episode])
    }
  }

  const handleSelectedPlatform = (platform: any) => {
    const findPlatform = selectedPlatform.find(
      (item) => item.value === platform.value,
    )
    if (findPlatform) {
      const filterPlarform = selectedPlatform.filter(
        (item) => item.value !== platform.value,
      )
      setSelectedPlatform(filterPlarform)
    } else {
      setSelectedPlatform([...selectedPlatform, platform])
    }
  }

  const handleEditEpisodes = () => {
    setIsEdit(true)
  }

  return (
    <LibraryDetailContainer>
      <TitleHeader title="읽고 있는 작품" onClickBack={() => router.back()} />
      {book && (
        <>
          <BookInfoWrapper>
            {!isEmpty(book.image) && (
              <Image
                className="book_image"
                src={book.image}
                width={140}
                height={200}
                alt=""
              />
            )}
            <div className="book_info_wrapper">
              <div className="book_info">
                {!isEmpty(book.status) && (
                  <div className="status">
                    <Badge
                      value={book.status.label}
                      color={
                        book.status.value === 'complete'
                          ? theme.color.gray[300]
                          : theme.color.main[100]
                      }
                    />
                    총 {book.total}화
                  </div>
                )}
                <div className="title">{book.title}</div>
                <div className="sub">
                  {book.author}
                  {book.genre ? ` · ${book.genre}` : ''}
                </div>
                <div className="score">
                  <Icons
                    name="HeartActive"
                    color={theme.color.main[600]}
                    width="16px"
                    height="16px"
                  />
                  {book.score.toLocaleString()}
                </div>
                {book.isDirect && (
                  <Button
                    type="text"
                    width="auto"
                    style={{ position: 'absolute', right: '40px' }}
                    onClick={handleEditModal}
                  >
                    편집
                  </Button>
                )}
                <Button
                  type="text"
                  width="auto"
                  style={{ position: 'absolute', right: '0' }}
                  onClick={handleDeleteModal}
                >
                  삭제
                </Button>
              </div>
              <Button width="95px" onClick={handleRecordModal}>
                기록하기
              </Button>
            </div>
          </BookInfoWrapper>
          {book.total > 0 && (
            <RecordBanner>
              <span className="bold">네이버시리즈</span>에서{' '}
              <span className="bold">{book.current}화</span>까지 읽었어요!
            </RecordBanner>
          )}
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
                <div className="total_text">전체 {book.total}</div>
                <div className="platform_wrapper">
                  {PLATFORM_TAB_LIST.map((platform) => (
                    <Checkbox
                      key={platform.value}
                      style={{ gap: '4px' }}
                      checked={Boolean(
                        selectedPlatform.find(
                          (item) => item.value === platform.value,
                        ),
                      )}
                      onChange={() => {
                        handleSelectedPlatform(platform)
                      }}
                      checkColor={theme.color.main[600]}
                    >
                      <div className="checkbox_label">{platform.label}</div>
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
                {isEmpty(filteredEpisodes) && book.total === 0 && (
                  <div className="empty_episodes">기록된 회차가 없어요.</div>
                )}
                {filteredEpisodes.map((episode) => (
                  <EpisodeBox
                    className={
                      selectedEpisodes.find((item) => item.ep === episode.ep)
                        ? 'active'
                        : ''
                    }
                    platform={episode.platform.value}
                    key={episode.ep}
                    onClick={() => handleClickEpisode(episode)}
                  >
                    {episode.ep}
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

export default LibraryDetail
