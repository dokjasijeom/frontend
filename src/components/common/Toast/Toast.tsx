import React from 'react'
import styled, { useTheme } from 'styled-components'
import Icons from '../Icons/Icons'

const ToastWrapper = styled.div`
  z-index: 102;
  width: max-content;
  border-radius: 20px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typography.body1};
  color: ${({ theme }) => theme.color.system.w};
  gap: 8px;
  position: fixed;
  bottom: 76px;
  left: 50%;
  transform: translateX(-50%);
  cursor: default;
  animation: 3s ease 0s normal 1 fadeinout;
  -webkit-animation: 3s ease 0s normal 1 fadeinout;

  &.success {
    background: ${({ theme }) => theme.color.system.success};
  }

  &.error {
    background: ${({ theme }) => theme.color.system.error};
  }

  @keyframes fadeinout {
    0%,
    100% {
      opacity: 0;
    }
    25%,
    50%,
    75% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeinout {
    0%,
    100% {
      opacity: 0;
    }
    25%,
    50%,
    75% {
      opacity: 1;
    }
  }
`

interface ToastProps {
  type?: 'success' | 'error'
  message: string
}

function Toast(props: ToastProps) {
  const { type = 'success', message } = props

  const theme = useTheme()
  return (
    <ToastWrapper className={type}>
      <Icons
        width="20px"
        height="20px"
        color={theme.color.system.w}
        name={type === 'success' ? 'Check' : 'Alert'}
      />
      {message}
    </ToastWrapper>
  )
}

export default Toast
