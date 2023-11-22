import React, { useState } from 'react'
import styled from 'styled-components'
import Checkbox from '../common/Checkbox/Checkbox'
import Divider from '../common/Divider/Divider'
import Button from '../common/Button/Button'

const TermOfUseWrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Title = styled.div`
  ${({ theme }) => theme.typography.head1};
`
const ContentsWrapper = styled.div``

const TermOfUseDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const CheckboxLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .show_detail {
    flex: none;
    width: 21px;
    ${({ theme }) => theme.typography.body4};
    color: ${({ theme }) => theme.color.gray[600]};
  }
`

interface TermOfUseProps {
  onNextStep: () => void
}

function TermOfUseContainer(props: TermOfUseProps) {
  const { onNextStep } = props
  const [all, setAll] = useState(false)

  return (
    <TermOfUseWrapper>
      <Title>
        서비스 이용약관에 <br />
        동의해주세요.
      </Title>
      <ContentsWrapper>
        <Checkbox
          checked={all}
          onChange={() => {
            setAll(!all)
          }}
        >
          모두 동의합니다.
        </Checkbox>
        <Divider />
        <TermOfUseDetailWrapper>
          <CheckboxLabelWrapper>
            <Checkbox
              checked={all}
              onChange={() => {
                setAll(!all)
              }}
            >
              [필수] 이용약관에 동의합니다.
            </Checkbox>
            <div className="show_detail">보기</div>
          </CheckboxLabelWrapper>
          <CheckboxLabelWrapper>
            <Checkbox
              checked={all}
              onChange={() => {
                setAll(!all)
              }}
            >
              [필수] 개인정보 수집 및 이용에 동의합니다.
            </Checkbox>
            <div className="show_detail">보기</div>
          </CheckboxLabelWrapper>
          <Checkbox
            checked={all}
            onChange={() => {
              setAll(!all)
            }}
          >
            [필수] 본인은 만 14세 이상합니다.
          </Checkbox>
        </TermOfUseDetailWrapper>
      </ContentsWrapper>
      <Button onClick={onNextStep}>다음</Button>
    </TermOfUseWrapper>
  )
}

export default TermOfUseContainer
