import React, { useState } from 'react'
import styled from 'styled-components'

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.gray[100]};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 999px;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${({ theme }) => theme.color.main[600]};
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`

interface ToggleProps {
  checked: boolean
  onChange: () => void
}

function Toggle(props: ToggleProps) {
  const [isActive, setIsActive] = useState(false)

  const { checked = false, onChange } = props

  return (
    <ToggleSwitch>
      <CheckBox
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange()
          setIsActive(!isActive)
        }}
      />
      <ToggleSlider />
    </ToggleSwitch>
  )
}

export default Toggle
