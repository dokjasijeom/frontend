import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import React from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
  padding: 16px 20px;
  .title {
    ${({ theme }) => theme.typography.head1};
    color: ${({ theme }) => theme.color.gray[950]};
  }

  .login_form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 32px;

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

function Login() {
  return (
    <LoginContainer>
      <div className="title">로그인</div>
      <form className="login_form_wrapper">
        <div className="form_item">
          <div className="label">이메일</div>
          <Input value="" placeholder="이메일을 입력해주세요." />
        </div>
        <div className="form_item">
          <div className="label">비밀번호</div>
          <Input value="" placeholder="비밀번호를 입력해주세요." />
        </div>
        <div className="button_wrapper">
          <Button type="primary" onClick={() => {}}>
            로그인
          </Button>
          <Button type="secondary" onClick={() => {}}>
            이메일로 회원가입
          </Button>
          <Button type="text" onClick={() => {}}>
            비밀번호를 잊어버렸어요.
          </Button>
        </div>
      </form>
    </LoginContainer>
  )
}

export default Login
