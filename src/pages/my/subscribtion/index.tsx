import { Platform } from '@/@types/platform'
import Button from '@/components/common/Button/Button'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { PROVIDER_TAB_LIST } from '@/constants/Tab'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'

const SubscribtionContainer = styled.div`
  padding-top: 56px;
`

const SubscribtionWrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  .title {
    ${({ theme }) => theme.typography.head1};
    color: ${({ theme }) => theme.color.gray[950]};
  }
  .platform_wrapper {
    display: flex;
    gap: 12px;
  }
`

const SubscribtionItem = styled.div`
  padding: 12px 20px;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.gray[50]};
  ${({ theme }) => theme.typography.body4};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &.active {
    border: 2px solid ${({ theme }) => theme.color.main[600]};
    background: ${({ theme }) => theme.color.system.w};
  }
`

function Subscribtion() {
  const router = useRouter()

  const [subscribtion, setSubscribtion] = useState<Platform[]>([
    { label: '네이버 시리즈', value: 'naver' },
  ])

  const handleChangeSubscribtion = (platform: any) => {
    const findItem = subscribtion?.find((v) => v.value === platform.value)
    if (findItem) {
      const temp = subscribtion.filter((v) => v.value !== platform.value)
      setSubscribtion(temp)
    } else {
      setSubscribtion([...subscribtion, platform])
    }
  }

  return (
    <SubscribtionContainer>
      <TitleHeader title="구독 중인 서비스" onClickBack={() => router.back()} />
      <SubscribtionWrapper>
        <div className="title">
          구독 중인 서비스를 <br />
          선택해주세요.
        </div>
        <div className="platform_wrapper">
          {PROVIDER_TAB_LIST.map((provider) => (
            <SubscribtionItem
              key={provider.value}
              onClick={() => handleChangeSubscribtion(provider)}
              className={
                subscribtion?.find((v) => v.value === provider.value)
                  ? 'active'
                  : ''
              }
            >
              <Image
                src={`/images/${provider.value}.png`}
                alt={provider.label}
                width={16}
                height={16}
              />
              {provider.label}
            </SubscribtionItem>
          ))}
        </div>
        <Button>저장</Button>
      </SubscribtionWrapper>
    </SubscribtionContainer>
  )
}

Subscribtion.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Subscribtion
