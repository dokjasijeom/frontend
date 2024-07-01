import React, { useEffect } from 'react'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import { forgotUser } from '@/api/user'
import useToast from '@/hooks/useToast'
import { useForm } from 'react-hook-form'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'

const FindPasswordModalBodyContainer = styled.div``

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

function FindPasswordModalBody() {
  const { setValue, register, watch, formState } = useForm({
    defaultValues: {
      email: '',
    },
  })
  const watchEmail = watch('email')
  const { showModal } = useModal()
  const { showToast } = useToast()

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
  }, [register])

  const handleSnedFindPasswordMail = async () => {
    await forgotUser({ email: watchEmail })
      .then(() => {
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
      })
      .catch(() => {
        showToast({
          type: 'error',
          message: '이메일을 확인해주세요.',
        })
      })
  }
  return (
    <FindPasswordModalBodyContainer>
      비밀번호를 잊으셨나요? <br />
      가입한 이메일로 로그인 링크를 보내드려요.
      <FindPasswordFormWrapper>
        <div className="label">이메일</div>
        <Input
          value={watchEmail}
          placeholder="가입한 이메일을 입력해주세요."
          {...register('email')}
          error={!!formState.errors.email}
          errorMessage={formState.errors.email?.message}
          onChange={(e) => {
            setValue('email', e.target.value, { shouldValidate: true })
          }}
        />
        <div className="button_wrapper">
          <Button
            disabled={!formState.isValid}
            onClick={handleSnedFindPasswordMail}
          >
            메일 보내기
          </Button>
        </div>
      </FindPasswordFormWrapper>
    </FindPasswordModalBodyContainer>
  )
}

export default FindPasswordModalBody
