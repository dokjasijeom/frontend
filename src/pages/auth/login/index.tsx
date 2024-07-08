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
import FindPasswordModalBody from '@/components/Login/FindPasswordModalBody'

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
        console.log(process.env.NEXT_PUBLIC_COOKIE_DOMAIN)
        setCookie('DS_AUT', res.data.data.token, {
          path: '/',
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        })
        setCookie('DS_USER', res.data, {
          path: '/',
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        })
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

  const handleClickFindPassword = () => {
    showModal({
      type: 'self',
      title: '비밀번호 찾기',
      body: <FindPasswordModalBody />,
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
