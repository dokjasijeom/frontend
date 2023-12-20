import MyInfoContainer from '@/components/Library/MyInfoContainer'
import Divider from '@/components/common/Divider/Divider'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'

const LibraryContainer = styled.div``

function Library() {
  const router = useRouter()
  const theme = useTheme()

  return (
    <LibraryContainer>
      <TitleHeader title="내 서재" onClickBack={() => router.back()} />
      <MyInfoContainer />
      <Divider
        size="xlarge"
        color={theme.color.gray[50]}
        style={{ margin: 0 }}
      />
    </LibraryContainer>
  )
}

Library.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Library
