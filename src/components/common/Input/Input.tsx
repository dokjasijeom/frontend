import React, { ReactNode, useState } from 'react'
import { styled } from 'styled-components'

const InputContainer = styled.div`
  padding: 12px 20px;
  width: 100%;
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.color.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border: solid 1px ${({ theme }) => theme.color.gray[600]};
  }
  &.disabled {
    border: none;
    background: ${({ theme }) => theme.color.gray[100]};
  }
  &.focus {
    border: solid 2px ${({ theme }) => theme.color.main[600]};
  }
  &.error {
    border: solid 2px ${({ theme }) => theme.color.system.error} !important;
  }
`
const InputPrefixWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  gap: 4px;
`

const InputWrapper = styled.input`
  border: 0;
  width: 100%;
  flex: 1;
  color: ${({ theme }) => theme.color.gray[950]};
  ${({ theme }) => theme.typography.body2};
  outline: none;
  background: ${({ theme }) => theme.color.system.w};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[600]};
  }
  &:disabled {
    background: ${({ theme }) => theme.color.gray[100]};
    color: ${({ theme }) => theme.color.gray[600]};
  }
`

interface InputProps {
  value: string
  placeholder: string
  disabled?: boolean
  error?: boolean
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  onChange?: () => void
}

function Input(props: InputProps) {
  const {
    value = '',
    placeholder = '',
    disabled = false,
    error = false,
    prefix,
    suffix,
    onChange,
  } = props

  const [isFocus, setIsFocus] = useState(false)

  return (
    <InputContainer
      className={`${error ? 'error' : ''} ${isFocus ? 'focus' : ''} ${
        disabled ? 'disabled' : ''
      }`}
    >
      <InputPrefixWrapper>
        {prefix}
        <InputWrapper
          type="text"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => {
            setIsFocus(true)
          }}
          onBlur={() => {
            setIsFocus(false)
          }}
        />
      </InputPrefixWrapper>
      {suffix}
    </InputContainer>
  )
}

export default Input
