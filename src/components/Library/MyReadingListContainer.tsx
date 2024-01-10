import React, { useState } from 'react'
import { CONTENTS_TAB_LIST } from '@/constants/Tab'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import TabTitleHeader from '../common/TabTitleHeader/TabTitleHeader'
import ReadingListItem from './ReadingListItem'

const MyReadingListContainerWrapper = styled.div``

// const EmptyWrapper = styled.div`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   ${({ theme }) => theme.typography.body2};
//   color: ${({ theme }) => theme.color.gray[800]};
//   text-align: center;
//   gap: 20px;
//   padding: 32px;
// `

const EditButton = styled.div`
  padding: 0px 4px;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`

function MyReadingListContainer() {
  const { showModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)

  const mock = {
    webToon: [],
    webNovel: [
      {
        title: '전지적 독자 시점',
        image: '/images/profile.png',
        author: '싱숑',
        genre: '판타지',
        platforms: ['naver', 'kakao', 'ridi'],
        total: 790,
        current: 519,
      },
      {
        title: '나 혼자만 레벨업',
        image: '/images/profile.png',
        author: '추공',
        genre: '판타지',
        platforms: ['naver', 'kakao', 'ridi'],
        total: 271,
        current: 200,
      },
      {
        title: '피오니-살인귀 대공과의 미래를 보았다',
        image: '/images/profile.png',
        author: '은려원',
        genre: '로판',
        platforms: ['kakao'],
        total: 223,
        current: 98,
      },
    ],
  }

  const handleEditReadingList = () => {
    showModal({
      title: '기록한 작품 삭제',
      description: (
        <>
          삭제된 기록은 되돌릴 수 없어요.
          <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
    })
  }

  return (
    <MyReadingListContainerWrapper>
      <TabTitleHeader
        iconName="OpenedBook"
        title="읽고 있는 작품"
        tabList={CONTENTS_TAB_LIST}
        moreButton={<EditButton>{isEdit ? '완료' : '편집'}</EditButton>}
        onClickMore={() => setIsEdit(!isEdit)}
      />
      {/* <EmptyWrapper>
        <Image
          src="/images/empty_book.png"
          width={210}
          height={105}
          alt="empty"
        />
        읽고 있는 작품을 추가하고
        <br />
        기록해보세요!
      </EmptyWrapper> */}
      <ListWrapper>
        {mock.webNovel.map((book) => (
          <ReadingListItem
            book={book}
            key={book.title}
            isEdit={isEdit}
            onEdit={handleEditReadingList}
          />
        ))}
      </ListWrapper>
    </MyReadingListContainerWrapper>
  )
}

export default MyReadingListContainer
