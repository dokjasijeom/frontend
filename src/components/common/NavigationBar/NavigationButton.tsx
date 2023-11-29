import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styled, { useTheme } from 'styled-components'
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
  const pathname = usePathname()
  const theme = useTheme()

  const isActive = useMemo(() => {
    if (pathname === href) {
      return true
    }
    return false
  }, [href, pathname])

  return (
    <NavigationButtonContainer
      onClick={() => {
        router.push(href)
      }}
    >
      <Icons
        name={IconName}
        color={isActive ? theme.color.main[600] : theme.color.gray[600]}
      />
      <ButtonTitle>{title}</ButtonTitle>
    </NavigationButtonContainer>
  )
}

export default NavigationButton
