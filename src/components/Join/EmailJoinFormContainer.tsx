import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button/Button'
import Input from '../common/Input/Input'

const EmailJoinFormWrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Title = styled.div`
  ${({ theme }) => theme.typography.head1};
`
const ContentsWrapper = styled.div`
  .join_form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .form_item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .label {
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
    .button_wrapper {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`

function EmailJoinFormContainer() {
  console.log(111)

  return (
    <EmailJoinFormWrapper>
      <Title>
        이메일과 비밀번호를 <br />
        입력해주세요.
      </Title>
      <ContentsWrapper>
        <form className="join_form_wrapper">
          <div className="form_item">
            <div className="label">이메일</div>
            <Input
              value=""
              placeholder="이메일을 입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호</div>
            <Input
              value=""
              placeholder="영문, 숫자를 포함하여 8자리 이상 입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호 확인</div>
            <Input
              value=""
              placeholder="비밀번호를 재입력해주세요."
              onChange={() => {}}
            />
          </div>
          <div className="button_wrapper">
            <Button type="primary" onClick={() => {}}>
              완료
            </Button>
          </div>
        </form>
      </ContentsWrapper>
    </EmailJoinFormWrapper>
  )
}

export default EmailJoinFormContainer
