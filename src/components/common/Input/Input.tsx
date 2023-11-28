import React from 'react'
import { styled } from 'styled-components'

const InputContainer = styled.div``

const InputWrapper = styled.input`
  padding: 12px 20px;
  width: 100%;
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.color.gray[200]};
  color: ${({ theme }) => theme.color.gray[950]};
  ${({ theme }) => theme.typography.body2};
  outline: none;
  background: ${({ theme }) => theme.color.system.w};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[600]};
  }
  &:hover {
    border: solid 1px ${({ theme }) => theme.color.gray[600]};
  }
  &:focus {
    border: solid 2px ${({ theme }) => theme.color.main[600]};
  }
  &:disabled {
    border: none;
    background: ${({ theme }) => theme.color.gray[100]};
  }
  &.error {
    border: solid 2px ${({ theme }) => theme.color.system.error} !important;
  }
`

interface InputProps {
  value: string
  placeholder: string
  disabled?: boolean
  error?: boolean
  onChange?: () => void
}

function Input(props: InputProps) {
  const {
    value = '',
    placeholder = '',
    disabled = false,
    error = false,
    onChange,
  } = props
  return (
    <InputContainer>
      <InputWrapper
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'error' : ''}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  )
}

export default Input
