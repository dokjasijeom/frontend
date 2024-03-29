import AddBookModalBody from '@/components/Library/AddBookModalBody'
import MyInfoContainer from '@/components/Library/MyInfoContainer'
import MyReadingListContainer from '@/components/Library/MyReadingListContainer'
import Divider from '@/components/common/Divider/Divider'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useModal from '@/hooks/useModal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryContainer = styled.div`
  padding-top: 56px;
  position: relative;
  height: calc(100vh - 55px);
`

const AddPlusButtonWrapper = styled.div`
  width: 600px;
  height: 56px;
  position: fixed;
  bottom: 88px;
  display: flex;
  justify-content: end;
  padding-right: 22px;
  @media (max-width: 600px) {
    width: 100%;
  }
`

const AddPlusButton = styled.button`
  font-size: 0;
`

function Library() {
  const router = useRouter()
  const theme = useTheme()
  const { showModal } = useModal()

  const handleAddBook = () => {}

  const handlePlusButton = () => {
    showModal({
      title: '웹소설 작품 추가하기',
      body: <AddBookModalBody />,
      positiveText: '추가',
      onPositiveClick: handleAddBook,
    })
  }

  return (
    <LibraryContainer>
      <TitleHeader title="내 서재" onClickBack={() => router.back()} />
      <MyInfoContainer />
      <Divider
        size="xlarge"
        color={theme.color.gray[50]}
        style={{ margin: 0 }}
      />
      <MyReadingListContainer />
      <AddPlusButtonWrapper>
        <AddPlusButton onClick={handlePlusButton}>
          <Image
            src="/images/floating_plus.svg"
            width={56}
            height={56}
            alt=""
          />
        </AddPlusButton>
      </AddPlusButtonWrapper>
    </LibraryContainer>
  )
}

Library.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Library
