import React, { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

const ButtonContainer = styled.button<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.head2};
  border-radius: 12px;
  box-sizing: border-box;
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
    padding: 0 4px;
    ${({ theme }) => theme.typography.head3};
    color: ${({ theme }) => theme.color.gray[600]};
    &:hover {
      color: ${({ theme }) => theme.color.main[600]};
    }
    &:disabled {
      color: ${({ theme }) => theme.color.gray[200]};
    }
  }
  &.icon {
    width: auto;
    padding: 10px;
    background: ${({ theme }) => theme.color.main[50]};
    font-size: 0;
    &:hover {
      background: ${({ theme }) => theme.color.main[100]};
    }
    &:disabled {
      background: transparent;
    }
  }
`

interface ButtonProps {
  children?: ReactNode | undefined
  type?: 'primary' | 'secondary' | 'text' | 'icon'
  disabled?: boolean
  onClick?: () => void
  width?: string
  height?: string
  style?: CSSProperties
  className?: string
}

function Button(props: ButtonProps) {
  const {
    children,
    type = 'primary',
    disabled = false,
    onClick,
    width = '100%',
    height = 'auto',
    style,
    className,
  } = props

  return (
    <ButtonContainer
      type="button"
      className={`${className} ${type}`}
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
      style={style}
    >
      {children}
    </ButtonContainer>
  )
}

export default Button
