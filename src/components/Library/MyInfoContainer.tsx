import React from 'react'
import Icons from '@/components/common/Icons/Icons'
import Image from 'next/image'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'

const MyInfoWrapper = styled.div`
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 32px;
`

const ProfileWrppaer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .account_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    .nickname {
      ${({ theme }) => theme.typography.head2};
    }
    .email {
      ${({ theme }) => theme.typography.body2};
      color: ${({ theme }) => theme.color.gray[600]};
    }
  }
`

const SettingButton = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 0;
`

const MyContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
`
const Box = styled.div`
  height: 114px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    gap: 4px;
    ${({ theme }) => theme.typography.body4};
    color: ${({ theme }) => theme.color.gray[800]};
  }
  .box_content_wrapper {
    display: flex;
    justify-content: end;
    .count {
      ${({ theme }) => theme.typography.head1};
      color: ${({ theme }) => theme.color.gray[950]};
    }
  }
`

const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.gray[50]};
  cursor: pointer;
`

function MyInfoContainer() {
  const router = useRouter()
  const theme = useTheme()
  const handleEditMyInfo = () => {
    router.push('/user/profile')
  }
  const handleEditSubscribe = () => {
    // TODO: 구독 중인 서비스 설정
  }
  return (
    <MyInfoWrapper>
      <ProfileWrppaer>
        <SettingButton>
          <Icons name="Setting" onClick={handleEditMyInfo} />
        </SettingButton>
        <Image
          src="/images/profile.png"
          width={104}
          height={104}
          alt="profile"
        />
        <div className="account_wrapper">
          <div className="nickname">독시</div>
          <div className="email">email@gmail.com</div>
        </div>
      </ProfileWrppaer>
      <MyContentsWrapper>
        <Box>
          <div className="title">
            <Icons
              name="HeartActive"
              width="20px"
              height="20px"
              color={theme.color.main[600]}
            />
            찜한 작품
          </div>
          <div className="box_content_wrapper">
            <div className="count">24</div>
          </div>
        </Box>
        <Box>
          <div className="title">
            <Icons
              name="Book"
              width="20px"
              height="20px"
              color={theme.color.main[600]}
            />
            완독한 작품
          </div>
          <div className="box_content_wrapper">
            <div className="count">67</div>
          </div>
        </Box>
        <Box>
          <div className="title">
            <Icons
              name="Subscription"
              width="20px"
              height="20px"
              color={theme.color.main[600]}
            />
            구독 중인 서비스
          </div>
          <div className="box_content_wrapper">
            <PlusButton onClick={handleEditSubscribe}>
              <Icons name="Plus" width="20px" height="20px" />
            </PlusButton>
          </div>
        </Box>
      </MyContentsWrapper>
    </MyInfoWrapper>
  )
}

export default MyInfoContainer
