import AddBookModalDescription from '@/components/Library/AddBookModalDescription'
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
  transform: rotate(0); // fixed 부모에 영향
  height: 100vh;
`
const AddPlusButton = styled.button`
  position: fixed;
  bottom: 88px;
  right: 22px;
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
      description: <AddBookModalDescription />,
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
      <AddPlusButton onClick={handlePlusButton}>
        <Image src="/images/floating_plus.svg" width={56} height={56} alt="" />
      </AddPlusButton>
    </LibraryContainer>
  )
}

Library.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Library
