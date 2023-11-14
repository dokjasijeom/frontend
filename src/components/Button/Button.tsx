import React, { ReactNode } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.button`
  padding: 12px 20px;
  ${({ theme }) => theme.typography.head2};
  border-radius: 12px;
  &.primary {
    background: ${({ theme }) => theme.color.main[600]};
    color: ${({ theme }) => theme.color.system.w};
    &:hover {
      background: ${({ theme }) => theme.color.main[700]};
    }
    &:active {
      background: ${({ theme }) => theme.color.main[800]};
    }
    &:disabled {
      background: ${({ theme }) => theme.color.gray[100]};
      color: ${({ theme }) => theme.color.gray[600]};
    }
  }
  &.secondary {
    background: ${({ theme }) => theme.color.system.w};
    color: ${({ theme }) => theme.color.main[600]};
    border: 1px solid ${({ theme }) => theme.color.main[300]};
    &:hover {
      background: ${({ theme }) => theme.color.main[50]};
    }
    &:active {
      background: ${({ theme }) => theme.color.main[100]};
    }
    &:disabled {
      background: ${({ theme }) => theme.color.system.w};
      color: ${({ theme }) => theme.color.main[100]};
      border: 1px solid ${({ theme }) => theme.color.main[50]};
    }
  }
  &.text {
    padding: 8px 12px;
    ${({ theme }) => theme.typography.head3};
    color: ${({ theme }) => theme.color.gray[600]};
    &:hover {
      color: ${({ theme }) => theme.color.main[600]};
    }
    &:disabled {
      color: ${({ theme }) => theme.color.gray[200]};
    }
  }
`

interface ButtonProps {
  children?: ReactNode | undefined
  type?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  onClick?: any
}

function Button(props: ButtonProps) {
  const { children, type = 'primary', disabled = false, onClick } = props

  return (
    <ButtonContainer className={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonContainer>
  )
}

export default Button
