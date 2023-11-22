import React from 'react'
import styled from 'styled-components'

const DividerContainer = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gray[200]};
  margin: 12px 0;
`

function Divider() {
  return <DividerContainer />
}

export default Divider
