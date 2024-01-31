import React from 'react'
import styled, { CSSProperties, useTheme } from 'styled-components'

const BadgeContainer = styled.div<{ color: string }>`
  padding: 2px 8px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
  display: inline-flex;
  width: fit-content;
  border-radius: 4px;
  background: ${({ color }) => color};
`

interface BadgeProps {
  value: string
  color?: string
  style?: CSSProperties
  className?: string
}
function Badge(props: BadgeProps) {
  const theme = useTheme()
  const { value, color = theme.color.gray[300], style, className } = props

  return (
    <BadgeContainer className={className} style={style} color={color}>
      {value}
    </BadgeContainer>
  )
}

export default Badge
