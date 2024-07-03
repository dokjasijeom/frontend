import { ProviderItem } from '@/@types/series'
import { User } from '@/@types/user'
import { getProviders } from '@/api/providers'
import { getUser, updateUserProvider } from '@/api/user'
import Button from '@/components/common/Button/Button'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useModal from '@/hooks/useModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
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
  .provider_wrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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
  const queryClient = useQueryClient()
  const { showModal } = useModal()

  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
  })

  const [providers, setProviders] = useState<ProviderItem[]>([])
  const [selectedProvider, setSelectedProvider] = useState<ProviderItem[]>([])

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders()
      setProviders(res.data.data)
    }
    fetchProviders()
  }, [])

  useEffect(() => {
    if (user) {
      setSelectedProvider(user.subscribeProvider)
    }
  }, [user])

  const handleChangeSubscribtion = (provider: ProviderItem) => {
    const findItem = selectedProvider?.find((v) => v.hashId === provider.hashId)
    if (findItem) {
      const temp = selectedProvider?.filter((v) => v.hashId !== provider.hashId)
      setSelectedProvider(temp)
    } else {
      setSelectedProvider([...selectedProvider, provider])
    }
  }

  const handleUpdateSubscription = async () => {
    const providerIds = selectedProvider.map(
      (provider) => provider.hashId,
    ) as any
    await updateUserProvider({ providers: providerIds }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      showModal({
        title: '구독 중인 서비스',
        body: '설정이 완료 되었습니다.',
      })
    })
  }

  return (
    <SubscribtionContainer>
      <TitleHeader title="구독 중인 서비스" onClickBack={() => router.back()} />
      <SubscribtionWrapper>
        <div className="title">
          구독 중인 서비스를 <br />
          선택해주세요.
        </div>
        <div className="provider_wrapper">
          {providers.map((provider) => (
            <SubscribtionItem
              key={provider.hashId}
              onClick={() => handleChangeSubscribtion(provider)}
              className={
                selectedProvider.find((v) => v.hashId === provider.hashId)
                  ? 'active'
                  : ''
              }
            >
              <Image
                src={`/images/${provider.name}.svg`}
                alt={provider.displayName}
                width={16}
                height={16}
              />
              {provider.displayName}
            </SubscribtionItem>
          ))}
        </div>
        <Button onClick={handleUpdateSubscription}>저장</Button>
      </SubscribtionWrapper>
    </SubscribtionContainer>
  )
}

Subscribtion.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Subscribtion
