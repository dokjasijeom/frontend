import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useCallback,
  useState,
  KeyboardEvent,
} from 'react'
import { CSSProperties, styled } from 'styled-components'
import Icons from '../Icons/Icons'

const InputContainer = styled.div``

const InputWrapper = styled.div`
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

const InputStyled = styled.input`
  width: 100%;
  border: 0;
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

const ErrorMessageWrapper = styled.div`
  padding: 4px 20px 0;
  color: ${({ theme }) => theme.color.system.error};
  ${({ theme }) => theme.typography.body2};
`

interface InputProps {
  type?: HTMLInputTypeAttribute
  value: string | number
  placeholder: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  prefix?: ReactNode | undefined
  suffix?: ReactNode | undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  style?: CSSProperties
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

function Input(props: InputProps) {
  const {
    type = 'text',
    value = '',
    placeholder = '',
    disabled = false,
    error = false,
    errorMessage,
    prefix,
    suffix,
    onChange,
    style,
    onKeyDown,
  } = props

  const [isFocus, setIsFocus] = useState(false)
  const [inputType, setInputType] = useState(type)

  const handleClickEye = useCallback(() => {
    if (inputType === 'text') {
      setInputType('password')
    } else if (inputType === 'password') {
      setInputType('text')
    }
  }, [inputType])

  const setSuffix = useCallback(() => {
    if (suffix) {
      return suffix
    }
    if (type === 'password') {
      return (
        <Icons
          name={inputType === 'text' ? 'EyeOpen' : 'EyeClosed'}
          onClick={handleClickEye}
          width="20px"
          height="20px"
        />
      )
    }
    return <></>
  }, [handleClickEye, inputType, suffix, type])

  return (
    <InputContainer>
      <InputWrapper
        style={style}
        className={`${error ? 'error' : ''} ${isFocus ? 'focus' : ''} ${
          disabled ? 'disabled' : ''
        }`}
      >
        <InputPrefixWrapper>
          {prefix}
          <InputStyled
            type={inputType}
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
            onKeyDown={onKeyDown}
          />
        </InputPrefixWrapper>
        {setSuffix()}
      </InputWrapper>
      {error && (
        <ErrorMessageWrapper>{error ? errorMessage : ''}</ErrorMessageWrapper>
      )}
    </InputContainer>
  )
}

export default Input
