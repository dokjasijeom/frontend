import React from 'react'
import styled from 'styled-components'

const BadgeContainer = styled.div`
  padding: 2px 8px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
  display: inline-flex;
  width: fit-content;
  border-radius: 4px;
  &.primary {
    background: ${({ theme }) => theme.color.gray[300]};
  }
  &.secondary {
    background: ${({ theme }) => theme.color.main[100]};
  }
`

interface BadgeProps {
  type?: 'primary' | 'secondary'
  value: string
}
function Badge(props: BadgeProps) {
  const { type = 'primary', value } = props
  return <BadgeContainer className={type}>{value}</BadgeContainer>
}

export default Badge
