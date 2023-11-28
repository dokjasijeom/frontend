import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Icons from '../Icons/Icons'

interface CheckboxProps {
  children?: ReactNode | undefined
  disabled?: boolean
  checked: boolean
  onChange?: () => void
}

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
  font-size: 0;
`
const CheckboxText = styled.div`
  color: ${({ theme }) => theme.color.gray[800]};
  ${({ theme }) => theme.typography.head3};
`

function Checkbox(props: CheckboxProps) {
  const { children, disabled = false, checked, onChange } = props
  return (
    <CheckboxContainer>
      <CheckboxLabel>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <CheckboxIcon>
          {checked ? (
            <Icons name="CheckActive" />
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
