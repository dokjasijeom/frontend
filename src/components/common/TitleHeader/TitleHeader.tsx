import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Icons from '../Icons/Icons'

const TitleHeaderContainer = styled.div`
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.system.w};
  padding: 15px 20px;
  position: fixed;
  z-index: 100;
  width: 600px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const BackButton = styled.button`
  font-size: 0;
`

const Title = styled.div`
  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

interface TitleHeaderProps {
  title: string
  onClickBack?: () => void
}
function TitleHeader(props: TitleHeaderProps) {
  const { title, onClickBack } = props
  const router = useRouter()

  const handleClickBack = () => {
    if (onClickBack) return onClickBack()
    return router.back()
  }
  return (
    <TitleHeaderContainer>
      <BackButton onClick={handleClickBack}>
        <Icons name="ChevronLeft" />
      </BackButton>
      <Title>{title}</Title>
    </TitleHeaderContainer>
  )
}

export default TitleHeader
