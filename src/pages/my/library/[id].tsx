import RecordModalBody from '@/components/Library/RecordModalBody'
import Button from '@/components/common/Button/Button'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Icons from '@/components/common/Icons/Icons'
import Input from '@/components/common/Input/Input'
import TabTitleHeader from '@/components/common/TabTitleHeader/TabTitleHeader'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { MockBook } from '@/constants/MockData'
import { PLATFORM_TAB_LIST } from '@/constants/Tab'
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
  }
  .book_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 18px;
    width: 100%;

    .book_info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
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

const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  padding: 0 4px;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
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

const EditButton = styled.div`
  padding: 0px 4px;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
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
`
function LibraryDetail() {
  const router = useRouter()
  const theme = useTheme()
  const { showModal } = useModal()
  const { id } = router.query
  const [isEdit, setIsEdit] = useState(false)
  const [search, setSearch] = useState('')

  const book = MockBook.webNovel.find((item) => item.id === id)

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

  const handleChangeSearch = (value: string) => {
    setSearch(value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const filteredEpisodes = useMemo(() => {
    if (isEmpty(book) || isEmpty(book.episodes)) return []

    const { episodes } = book

    if (!isEmpty(search)) {
      const filter = episodes.filter((episode) =>
        episode.ep.toString().includes(search),
      )

      return filter
    }
    return episodes
  }, [book, search])

  console.log(11, filteredEpisodes)

  return (
    <LibraryDetailContainer>
      <TitleHeader title="읽고 있는 작품" onClickBack={() => router.back()} />
      {book && (
        <>
          <BookInfoWrapper>
            <Image
              className="book_image"
              src={book.image}
              width={140}
              height={200}
              alt=""
            />
            <div className="book_info_wrapper">
              <div className="book_info">
                <div className="title">{book.title}</div>
                <div className="sub">
                  {book.author} · {book.genre}
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
                <DeleteButton onClick={handleDeleteModal}>삭제</DeleteButton>
              </div>
              <Button width="95px" onClick={handleRecordModal}>
                기록하기
              </Button>
            </div>
          </BookInfoWrapper>
          <RecordBanner>
            <span className="bold">네이버시리즈</span>에서{' '}
            <span className="bold">{book.current}화</span>까지 읽었어요!
          </RecordBanner>
          <RecordDetailWrapper>
            <TabTitleHeader
              iconName="Content"
              title="기록장"
              moreButton={<EditButton>{isEdit ? '완료' : '편집'}</EditButton>}
              onClickMore={() => {}}
            />
            <RecordDetail>
              <div className="record_filter_wrapper">
                <div className="total_text">전체 {book.total}</div>
                <div className="platform_wrapper">
                  {PLATFORM_TAB_LIST.map((platform) => (
                    <Checkbox
                      key={platform.value}
                      style={{ gap: '4px' }}
                      checked={false}
                      onChange={() => {}}
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
                {filteredEpisodes.map((episode) => (
                  <EpisodeBox platform={episode.platform} key={episode.ep}>
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
