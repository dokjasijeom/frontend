import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
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
  position: relative;
  .show_detail {
    position: absolute;
    right: 0;
    width: 21px;
    ${({ theme }) => theme.typography.body4};
    color: ${({ theme }) => theme.color.gray[600]};
  }
  .link {
    display: inline-block;
    ${({ theme }) => theme.typography.head3};
    color: ${({ theme }) => theme.color.main[600]};
    cursor: pointer;
  }
`

interface TermOfUseProps {
  onNextStep: () => void
}

function TermsOfUseContainer(props: TermOfUseProps) {
  const { onNextStep } = props
  const theme = useTheme()
  const router = useRouter()

  const { register, setValue, watch } = useForm({
    defaultValues: {
      selectAll: false,
      reason1: false,
      reason2: false,
      reason3: false,
    },
  })

  const watchSelectAll = watch('selectAll')
  const watchReason1 = watch('reason1')
  const watchReason2 = watch('reason2')
  const watchReason3 = watch('reason3')

  const handleSelectAll = () => {
    if (!watchSelectAll) {
      setValue('selectAll', true)
      setValue('reason1', true)
      setValue('reason2', true)
      setValue('reason3', true)
    } else {
      setValue('selectAll', false)
      setValue('reason1', false)
      setValue('reason2', false)
      setValue('reason3', false)
    }
  }

  const isValid = useMemo(() => {
    if (watchReason1 && watchReason2 && watchReason3) {
      return true
    }
    return false
  }, [watchReason1, watchReason2, watchReason3])

  return (
    <TermOfUseWrapper>
      <Title>
        서비스 이용약관에 <br />
        동의해주세요.
      </Title>
      <ContentsWrapper>
        <Checkbox
          checkColor={theme.color.main[600]}
          checked={watchSelectAll}
          {...register('selectAll')}
          onChange={handleSelectAll}
        >
          모두 동의합니다.
        </Checkbox>
        <Divider />
        <TermOfUseDetailWrapper>
          <CheckboxLabelWrapper>
            <Checkbox
              checkColor={theme.color.main[600]}
              checked={watchReason1}
              {...register('reason1')}
              onChange={() => {
                setValue('reason1', !watchReason1)
              }}
            >
              [필수]{' '}
              <button
                type="button"
                className="link"
                onClick={() => router.push('/support/termsOfUse')}
              >
                이용약관
              </button>
              에 동의합니다.
            </Checkbox>
          </CheckboxLabelWrapper>
          <CheckboxLabelWrapper>
            <Checkbox
              checkColor={theme.color.main[600]}
              checked={watchReason2}
              {...register('reason2')}
              onChange={() => {
                setValue('reason2', !watchReason2)
              }}
            >
              [필수]{' '}
              <button
                type="button"
                className="link"
                onClick={() => router.push('/support/privacyPolicy')}
              >
                개인정보 수집 및 이용
              </button>
              에 동의합니다.
            </Checkbox>
          </CheckboxLabelWrapper>
          <Checkbox
            checkColor={theme.color.main[600]}
            checked={watchReason3}
            {...register('reason3')}
            onChange={() => {
              setValue('reason3', !watchReason3)
            }}
          >
            [필수] 본인은 만 14세 이상합니다.
          </Checkbox>
        </TermOfUseDetailWrapper>
      </ContentsWrapper>
      <Button disabled={!isValid} onClick={onNextStep}>
        다음
      </Button>
    </TermOfUseWrapper>
  )
}

export default TermsOfUseContainer
