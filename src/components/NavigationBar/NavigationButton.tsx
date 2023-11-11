import React from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Icons, { IconNameType } from '../Icons/Icons'

interface NavigationButtonProps {
  IconName: IconNameType
  title: string
  href: string
}

const NavigationButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const ButtonTitle = styled.div`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.color.gray[600]};
`

function NavigationButton(props: NavigationButtonProps) {
  const { IconName, title, href } = props
  const router = useRouter()
  return (
    <NavigationButtonContainer
      onClick={() => {
        router.push(href)
      }}
    >
      <Icons
        name={IconName}
        width={IconName === 'Doksi' ? '17' : '28'}
        height={IconName === 'Doksi' ? '20' : '28'}
      />
      <ButtonTitle>{title}</ButtonTitle>
    </NavigationButtonContainer>
  )
}

export default NavigationButton
