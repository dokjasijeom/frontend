import { useRouter } from 'next/router'
import React, { KeyboardEvent } from 'react'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import { login } from '@/api/user'
import { useForm } from 'react-hook-form'
import { setCookie } from 'cookies-next'
import { isEmpty } from 'lodash'

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
  width: 100%;
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
  const { setValue, watch, setError, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const watchEmail = watch('email')
  const watchPassword = watch('password')

  const handleLogin = async () => {
    await login({ email: watchEmail, password: watchPassword })
      .then((res: any) => {
        setCookie('DS_AUT', res.data.data.token)
        setCookie('DS_USER', res.data)
        router.push('/')
      })
      .catch(() => {
        setError('email', {
          type: 'authError',
          message: '이메일 혹은 비밀번호를 확인해주세요.',
        })
        setError('password', {
          type: 'authError',
          message: '이메일 혹은 비밀번호를 확인해주세요.',
        })
      })
  }

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter
    if (e.keyCode === 13 && !isEmpty(watchEmail) && !isEmpty(watchPassword)) {
      handleLogin()
    }
  }

  return (
    <LoginContainer>
      <div className="title">로그인</div>
      <div className="login_form_wrapper">
        <div className="form_item">
          <div className="label">이메일</div>
          <Input
            value={watchEmail}
            placeholder="이메일을 입력해주세요."
            error={!!formState.errors.email}
            errorMessage={formState.errors.email?.message}
            onChange={(e) => {
              setValue('email', e.target.value, { shouldValidate: true })
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="form_item">
          <div className="label">비밀번호</div>
          <Input
            type="password"
            value={watchPassword}
            placeholder="비밀번호를 입력해주세요."
            error={!!formState.errors.password}
            errorMessage={formState.errors.password?.message}
            onChange={(e) => {
              setValue('password', e.target.value, { shouldValidate: true })
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="button_wrapper">
          <Button type="primary" onClick={handleLogin}>
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
