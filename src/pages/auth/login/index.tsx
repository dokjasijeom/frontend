import { useRouter } from 'next/router'
import React from 'react'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'

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

const FindPasswordFormWrapper = styled.div`
  width: 396px;
  margin-top: 32px;
  .label {
    ${({ theme }) => theme.typography.head2};
    color: ${({ theme }) => theme.color.gray[800]};
    margin-bottom: 8px;
  }
  .button_wrapper {
    margin-top: 32px;
  }
`

function Login() {
  const router = useRouter()
  const { showModal } = useModal()

  const handleSnedFindPasswordMail = () => {
    showModal({
      title: '완료',
      body: (
        <div>
          가입한 이메일로 로그인 링크를 보냈어요!
          <br />
          메일함을 확인해주세요.
        </div>
      ),
    })
  }

  const handleClickFindPassword = () => {
    showModal({
      type: 'self',
      title: '비밀번호 찾기',
      body: (
        <div>
          비밀번호를 잊으셨나요? <br />
          가입한 이메일로 로그인 링크를 보내드려요.
          <FindPasswordFormWrapper>
            <div className="label">이메일</div>
            <Input value="" placeholder="가입한 이메일을 입력해주세요." />
            <div className="button_wrapper">
              <Button onClick={handleSnedFindPasswordMail}>메일 보내기</Button>
            </div>
          </FindPasswordFormWrapper>
        </div>
      ),
    })
  }

  return (
    <LoginContainer>
      <div className="title">로그인</div>
      <div className="login_form_wrapper">
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
            placeholder="비밀번호를 입력해주세요."
            onChange={() => {}}
          />
        </div>
        <div className="button_wrapper">
          <Button type="primary" onClick={() => {}}>
            로그인
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              router.push('/auth/join')
            }}
          >
            이메일로 회원가입
          </Button>
          <Button type="text" onClick={handleClickFindPassword}>
            비밀번호를 잊어버렸어요.
          </Button>
        </div>
      </div>
    </LoginContainer>
  )
}

export default Login
