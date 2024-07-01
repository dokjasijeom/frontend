import React, { useState } from 'react'
import styled from 'styled-components'
import Icons from '../Icons/Icons'

const SelectorContainer = styled.div`
  position: relative;
`

const SeletorWrapper = styled.div`
  background: ${({ theme }) => theme.color.system.w};
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[600]};
  cursor: pointer;
  &.active {
    ${({ theme }) => theme.typography.body2};
    color: ${({ theme }) => theme.color.gray[950]};
    border: 2px solid ${({ theme }) => theme.color.main[600]};
  }
`

const OptionsListWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 62px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  overflow: hidden;
  z-index: 1;
`

const OptionItemWrapper = styled.div`
  padding: 12px 20px;
  background: ${({ theme }) => theme.color.system.w};
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.main[50]};
  }
  .last_item {
    display: flex;
    gap: 12px;
    .keyword {
      color: ${({ theme }) => theme.color.main[600]};
    }
  }
`
export interface OptionItem {
  displayName: string
  hashId?: string
  name: string
}

interface SelectorProps {
  value: string
  options: OptionItem[]
  onClickOption: (option: OptionItem) => void
}

function Selector(props: SelectorProps) {
  const { value, options, onClickOption } = props
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleClickOption = (option: OptionItem) => {
    onClickOption(option)
    setIsActive(false)
  }

  return (
    <SelectorContainer>
      <SeletorWrapper
        onClick={handleClick}
        className={isActive ? 'active' : ''}
      >
        {value}
        <Icons name={isActive ? 'ChevronUp' : 'ChevronDown'} />
      </SeletorWrapper>
      {isActive && (
        <OptionsListWrapper>
          {options.map((option) => (
            <OptionItemWrapper
              key={option.name}
              onClick={() => {
                handleClickOption(option)
              }}
            >
              {option.displayName}
            </OptionItemWrapper>
          ))}
        </OptionsListWrapper>
      )}
    </SelectorContainer>
  )
}

export default Selector
