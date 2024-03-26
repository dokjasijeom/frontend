import React, { useEffect } from 'react'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import { useForm } from 'react-hook-form'
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
  const { showModal } = useModal()
  const { register, formState, setValue, watch, clearErrors, setError } =
    useForm({
      defaultValues: {
        email: '',
        password: '',
        comparePassword: '',
      },
    })

  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const watchComparePassword = watch('comparePassword')

  const handleJoin = () => {
    showModal({
      title: '회원가입 완료',
      body: '독자시점에 오신 것을 환영합니다!',
    })
  }

  useEffect(() => {
    register('email', {
      required: {
        value: true,
        message: '이메일을 입력해주세요.',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '이메일을 올바르게 입력해주세요.',
      },
    })
    register('password', {
      required: {
        value: true,
        message: '비밀번호를 입력해주세요.',
      },
      pattern: {
        value:
          /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
        message: '영문, 숫자를 포함하여 8자리 이상 입력해주세요.',
      },
    })
    register('comparePassword', {
      required: {
        value: true,
        message: '비밀번호를 재입력해주세요.',
      },
      pattern: {
        value:
          /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
        message: '영문, 숫자를 포함하여 8자리 이상 입력해주세요.',
      },
      validate: (value) =>
        value !== watchPassword ? '비밀번호가 일치하지 않습니다.' : true,
    })
  }, [register, watchPassword])

  useEffect(() => {
    if (watchPassword === watchComparePassword) {
      clearErrors('comparePassword')
    }
  }, [clearErrors, setError, watchComparePassword, watchPassword])

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
              value={watchEmail}
              placeholder="이메일을 입력해주세요."
              {...register('email')}
              error={!!formState.errors.email}
              errorMessage={formState.errors.email?.message}
              onChange={(e) => {
                setValue('email', e.target.value, { shouldValidate: true })
              }}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호</div>
            <Input
              value={watchPassword}
              placeholder="영문, 숫자를 포함하여 8자리 이상 입력해주세요."
              {...register('password')}
              error={!!formState.errors.password}
              errorMessage={formState.errors.password?.message}
              onChange={(e) => {
                setValue('password', e.target.value, { shouldValidate: true })
              }}
            />
          </div>
          <div className="form_item">
            <div className="label">비밀번호 확인</div>
            <Input
              value={watchComparePassword}
              placeholder="비밀번호를 재입력해주세요."
              {...register('comparePassword')}
              error={!!formState.errors.comparePassword}
              errorMessage={formState.errors.comparePassword?.message}
              onChange={(e) => {
                setValue('comparePassword', e.target.value, {
                  shouldValidate: true,
                })
              }}
            />
          </div>
          <div className="button_wrapper">
            <Button
              type="primary"
              onClick={handleJoin}
              disabled={!formState.isValid}
            >
              완료
            </Button>
          </div>
        </form>
      </ContentsWrapper>
    </EmailJoinFormWrapper>
  )
}

export default EmailJoinFormContainer
