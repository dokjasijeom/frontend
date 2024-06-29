import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const ErrorPageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 144px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  .body {
    ${({ theme }) => theme.typography.head1};
    color: ${({ theme }) => theme.color.gray[600]};
    .highlight {
      margin-bottom: 12px;
      font-size: 32px;
      font-weight: 700;
      line-height: 42.24px;
      letter-spacing: -0.02em;
      text-align: center;
      color: ${({ theme }) => theme.color.main[600]};
    }
  }
`

const ImageWrapper = styled.div`
  width: 496px;
  height: 200px;
  object-fit: contain;
`

function Custom404() {
  return (
    <ErrorPageContainer>
      <ImageWrapper>
        <Image width={496} height={200} src="/images/404.svg" alt="404" />
      </ImageWrapper>
      <div className="body">
        <div className="highlight">Oops!</div>
        요청하신 페이지를 찾을 수 없어요.
      </div>
    </ErrorPageContainer>
  )
}

export default Custom404
