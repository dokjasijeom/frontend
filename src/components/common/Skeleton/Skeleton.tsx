import { range } from 'lodash'
import React, { Children } from 'react'
import styled, { CSSProperties } from 'styled-components'

const SkeletonContainer = styled.div<{
  width: string
  height: string
  isCircle: boolean
}>`
  overflow: hidden;
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #e9e9e9;
  border-radius: ${({ isCircle }) => (isCircle ? '50%' : '12px')};
  line-height: 1;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.2) 20%,
      hsla(0, 0%, 100%, 0.5) 60%,
      hsla(0, 0%, 100%, 0)
    );
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-animation: skeleton 1.5s infinite;
    animation: skeleton 1.5s infinite;

    @keyframes skeleton {
      100% {
        transform: translateX(100%);
      }
    }
  }

  & + & {
    margin-top: 4px;
  }
`

interface SkeletonProps {
  width?: string
  height?: string
  count?: number
  isCircle?: boolean
  style?: CSSProperties
}
function Skeleton(props: SkeletonProps) {
  const {
    width = '100%',
    height = '16px',
    count = 1,
    isCircle = false,
    style,
  } = props
  return (
    <>
      {Children.toArray(
        range(count).map(() => (
          <SkeletonContainer
            className="skeleton_item"
            style={style}
            width={width}
            height={height}
            isCircle={isCircle}
          />
        )),
      )}
    </>
  )
}

export default Skeleton
