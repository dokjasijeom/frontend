import { range } from 'lodash'
import React, { Children } from 'react'
import styled from 'styled-components'
import Skeleton from './Skeleton'

const SkeletonItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

function ThumbnailListSkeleton() {
  return (
    <>
      {Children.toArray(
        range(12).map(() => (
          <SkeletonItem>
            <Skeleton
              width="100%"
              height="100%"
              style={{ aspectRatio: 1, margin: 0 }}
            />
            <Skeleton height="18px" style={{ marginTop: '8px' }} />
            <Skeleton width="50%" />
            <Skeleton width="30%" />
          </SkeletonItem>
        )),
      )}
    </>
  )
}

export default ThumbnailListSkeleton
