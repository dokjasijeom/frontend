import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'
import Input from '@/components/common/Input/Input'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useModal from '@/hooks/useModal'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  padding-top: 56px;
`

const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 20px 32px;
`

const ImageWrapper = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &:hover {
    .overlay {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: ${({ theme }) => theme.color.system.dim};
      border-radius: 50%;

      &::after {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.system.w};
        content: '변경';
      }
    }
  }
`

const UserInfoFormWrapper = styled.div`
  padding: 0 20px;
  .user_info_form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .form_item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .label {
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
    .button_wrapper {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`

const UserAccountSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  padding: 0 20px;
`

const ListButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  ${({ theme }) => theme.typography.head3};
  color: ${({ theme }) => theme.color.gray[600]};
`

function Profile() {
  const router = useRouter()
  const { showModal } = useModal()

  const handleEditProfileImage = () => {
    // TODO: 프로필 수정
  }

  const handleEditUserInfo = () => {
    // TODO: 회원 정보 수정
  }

  const handleLogout = () => {
    // TODO: 로그아웃
  }

  const handleWithdrawal = () => {
    // TODO: 회원 탈퇴
    showModal({
      type: 'confirm',
      title: '회원 탈퇴',
      body: (
        <div>
          회원 탈퇴 시 기록한 모든 데이터가 사라지고
          <br />
          복구할 수 없어요.
          <br />
          <br />
          정말 탈퇴하시겠어요?
        </div>
      ),
      negativeText: '취소',
      positiveText: '탈퇴하기',
    })
  }

  return (
    <ProfileContainer>
      <TitleHeader title="프로필 수정" onClickBack={() => router.back()} />
      <ProfileImageWrapper>
        <ImageWrapper onClick={handleEditProfileImage}>
          <Image
            src="/images/profile.png"
            width={104}
            height={104}
            alt="profile"
          />
          <div className="overlay" />
        </ImageWrapper>
        <Button type="text" width="auto" style={{ marginTop: '8px' }}>
          사진 삭제
        </Button>
      </ProfileImageWrapper>
      <UserInfoFormWrapper>
        <form className="user_info_form_wrapper">
          <div className="form_item">
            <div className="label">이메일</div>
            <Input
              disabled
              value="e-mail@gmail.com"
              placeholder="이메일을 입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="form_item">
            <div className="label">닉네임</div>
            <Input
              value=""
              placeholder="닉네임을 입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호</div>
            <Input
              value=""
              placeholder="영문, 숫자를 포함하여 8자리 이상 입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호 확인</div>
            <Input
              value=""
              placeholder="비밀번호를 재입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="button_wrapper">
            <Button type="primary" onClick={handleEditUserInfo}>
              저장
            </Button>
          </div>
        </form>
      </UserInfoFormWrapper>
      <UserAccountSettingWrapper>
        <Divider style={{ margin: '0 0 12px 0' }} />
        <ListButton type="button" onClick={handleLogout}>
          로그아웃
        </ListButton>
        <ListButton type="button" onClick={handleWithdrawal}>
          회원 탈퇴
        </ListButton>
      </UserAccountSettingWrapper>
    </ProfileContainer>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Profile
