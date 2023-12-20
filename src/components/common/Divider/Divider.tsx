import React, { useMemo } from 'react'
import styled from 'styled-components'

const DividerContainer = styled.div<{
  color: string
  height: string
}>`
  width: 100%;
  height: ${({ height }) => height};
  background: ${({ color, theme }) => color || theme.color.gray[200]};
  margin: 12px 0;
`

interface DividerProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  color?: string
  [prop: string]: unknown
}

function Divider({ size = 'small', color = '#e1e2e4', ...rest }: DividerProps) {
  const borderHeight = useMemo(() => {
    if (size === 'small') return '1px'
    if (size === 'medium') return '4px'
    if (size === 'large') return '8px'
    if (size === 'xlarge') return '12px'
    return '1px'
  }, [size])
  return <DividerContainer color={color} height={borderHeight} {...rest} />
}

export default Divider
