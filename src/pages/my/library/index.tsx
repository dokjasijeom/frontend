import { getUser } from '@/api/user'
import MyInfoContainer from '@/components/Library/MyInfoContainer'
import Divider from '@/components/common/Divider/Divider'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useModal from '@/hooks/useModal'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled, { useTheme } from 'styled-components'
import MyRecordSeriesListContainer from '@/components/Library/MyRecordSeriesListContainer'
import AddSeriesModalBody from '@/components/Library/AddSeriesModalBody'
import { User } from '@/@types/user'

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
  const { showModal, closeModal } = useModal()

  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
  })

  const handlePlusButton = () => {
    showModal({
      type: 'self',
      title: '읽고 있는 작품 추가하기',
      body: <AddSeriesModalBody onCloseModal={closeModal} />,
    })
  }

  return (
    <LibraryContainer>
      <TitleHeader title="내 서재" onClickBack={() => router.back()} />
      {!isEmpty(user) && <MyInfoContainer user={user} />}
      <Divider
        size="xlarge"
        color={theme.color.gray[50]}
        style={{ margin: 0 }}
      />
      <MyRecordSeriesListContainer
        recordSeriesList={user?.recordSeries ?? []}
      />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookiesString = context.req.headers.cookie as string
  const cookies = {} as any

  cookiesString.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=').map((c) => c.trim())
    cookies[key] = value
  })

  const isLogin = cookies.DS_AUT

  if (!isLogin) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Library
