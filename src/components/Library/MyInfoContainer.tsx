import React from 'react'
import Icons from '@/components/common/Icons/Icons'
import Image from 'next/image'
import styled, { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { User } from '@/@types/user'

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

  img {
    border-radius: 50%;
    object-fit: cover;
  }

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

  @media (max-width: 490px) {
    flex-direction: column;
  }
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
  cursor: pointer;

  .title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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

  @media (max-width: 490px) {
    flex-direction: row;
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

const ProviderIcon = styled.div<{ index: number }>`
  border-radius: 50%;
  font-size: 0;
  border: solid 3px ${({ theme }) => theme.color.system.w};
  position: absolute;
  z-index: calc(${({ index }) => index} * -1);
  right: calc(${({ index }) => index} * 23px);
  bottom: -4px;
  cursor: pointer;
  @media (max-width: 490px) {
    bottom: 0px;
  }
`

const SubscribtionProviderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
`

interface MyInfoContainerProps {
  user: User
}

function MyInfoContainer(props: MyInfoContainerProps) {
  const { user } = props
  const router = useRouter()
  const theme = useTheme()
  const handleEditMyInfo = () => {
    router.push('/my/profile')
  }
  const handleEditSubscribe = () => {
    router.push('/my/subscribtion')
  }

  return (
    <MyInfoWrapper>
      <ProfileWrppaer>
        <SettingButton>
          <Icons name="Setting" onClick={handleEditMyInfo} />
        </SettingButton>
        <Image
          src={
            !isEmpty(user.profile.avatar)
              ? user.profile.avatar
              : '/images/profile.png'
          }
          width={104}
          height={104}
          alt="profile"
          objectFit="cover"
        />
        <div className="account_wrapper">
          <div className="nickname">
            {!isEmpty(user.profile.username)
              ? user.profile.username
              : user.email}
          </div>
          <div className="email">{user.email}</div>
        </div>
      </ProfileWrppaer>
      <MyContentsWrapper>
        <Box
          onClick={() => {
            router.push('/my/library/like')
          }}
        >
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
            <button type="button" className="count">
              {user.likeSeriesCount}
            </button>
          </div>
        </Box>
        <Box
          onClick={() => {
            router.push('/my/library/complete')
          }}
        >
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
            <button type="button" className="count">
              67
            </button>
          </div>
        </Box>
        <Box onClick={handleEditSubscribe}>
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
            {isEmpty(user.subscribeProvider) ? (
              <PlusButton>
                <Icons name="Plus" width="20px" height="20px" />
              </PlusButton>
            ) : (
              <SubscribtionProviderWrapper>
                {user.subscribeProvider.map((subscribtion, index) => (
                  <ProviderIcon
                    key={subscribtion.hashId}
                    index={index}
                    onClick={handleEditSubscribe}
                  >
                    <Image
                      src={`/images/${subscribtion.name}.png`}
                      alt={subscribtion.displayName}
                      width={26}
                      height={26}
                    />
                  </ProviderIcon>
                ))}
              </SubscribtionProviderWrapper>
            )}
          </div>
        </Box>
      </MyContentsWrapper>
    </MyInfoWrapper>
  )
}

export default MyInfoContainer
