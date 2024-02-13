import React, { useState } from 'react'
import { BOOK_TYPE_TAB_LIST } from '@/constants/Tab'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import { MockMyBook } from '@/constants/MockData'
import { MyBook } from '@/@types/book'
import TabTitleHeader from '../common/TabTitleHeader/TabTitleHeader'
import ReadingListItem from './ReadingListItem'
import RecordModalBody from './RecordModalBody'
import { TabItem } from '../common/Tab/Tab'

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
  const [selectedBookTypeTab, setSelectedBookTypeTab] = useState(
    BOOK_TYPE_TAB_LIST[0],
  )

  const handleEditReadingList = () => {
    showModal({
      title: '기록한 작품 삭제',
      body: (
        <>
          삭제된 기록은 되돌릴 수 없어요.
          <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
    })
  }

  const handleRecordReadingList = (book: MyBook) => {
    showModal({
      type: 'self',
      title: '기록하기',
      body: <RecordModalBody book={book} />,
    })
  }
  return (
    <MyReadingListContainerWrapper>
      <TabTitleHeader
        iconName="OpenedBook"
        title="읽고 있는 작품"
        tabList={BOOK_TYPE_TAB_LIST}
        moreButton={<EditButton>{isEdit ? '완료' : '편집'}</EditButton>}
        onClickMore={() => setIsEdit(!isEdit)}
        selectedTab={selectedBookTypeTab}
        onChangeTab={(tab: TabItem) => setSelectedBookTypeTab(tab)}
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
        {MockMyBook.webNovel.map((book) => (
          <ReadingListItem
            book={book}
            key={book.id}
            isEdit={isEdit}
            onEdit={handleEditReadingList}
            onRecord={() => handleRecordReadingList(book)}
          />
        ))}
      </ListWrapper>
    </MyReadingListContainerWrapper>
  )
}

export default MyReadingListContainer
