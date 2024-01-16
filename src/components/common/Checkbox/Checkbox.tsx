import React, { ReactNode } from 'react'
import styled, { CSSProperties, useTheme } from 'styled-components'
import Icons from '../Icons/Icons'

const CheckboxContainer = styled.div`
  width: 100%;
  position: relative;
`

const CheckboxLabel = styled.label`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  input {
    display: none;
  }
`

const CheckboxIcon = styled.div`
  display: flex;
  font-size: 0;
`
const CheckboxText = styled.div`
  color: ${({ theme }) => theme.color.gray[800]};
  ${({ theme }) => theme.typography.head3};
`

interface CheckboxProps {
  children?: ReactNode | undefined
  disabled?: boolean
  checked: boolean
  onChange?: () => void
  style?: CSSProperties
  checkColor?: string
}

function Checkbox(props: CheckboxProps) {
  const theme = useTheme()
  const {
    children,
    disabled = false,
    checked,
    onChange,
    style,
    checkColor = theme.color.gray[600],
  } = props

  return (
    <CheckboxContainer>
      <CheckboxLabel style={style}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <CheckboxIcon>
          {checked ? (
            <Icons name="CheckActive" color={checkColor} />
          ) : (
            <Icons name="CheckDefault" />
          )}
        </CheckboxIcon>
        <CheckboxText>{children}</CheckboxText>
      </CheckboxLabel>
    </CheckboxContainer>
  )
}

export default Checkbox
