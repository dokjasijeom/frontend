import Image from 'next/image'
import React, { useMemo } from 'react'
import styled, { CSSProperties } from 'styled-components'

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
  text-align: center;
  gap: 20px;
  padding-top: 140px;
`

function Empty({
  type = 'book',
  description,
  style,
}: {
  type?: 'book' | 'search'
  description: React.ReactNode
  style?: CSSProperties
}) {
  const size = useMemo(() => {
    return {
      width: type === 'book' ? 210 : 120,
      height: type === 'book' ? 105 : 120,
    }
  }, [type])

  const { width, height } = size

  return (
    <EmptyWrapper style={style}>
      <Image
        src={`/images/empty_${type}.png`}
        width={width}
        height={height}
        alt="empty"
      />
      {description}
    </EmptyWrapper>
  )
}

export default Empty
