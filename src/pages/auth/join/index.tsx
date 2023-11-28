import TermOfUseContainer from '@/components/Join/TermOfUseContainer'
import EmailJoinFormContainer from '@/components/Join/emailJoinFormContainer'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'

const JoinContainer = styled.div``

function Join() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <JoinContainer>
      <TitleHeader
        title="이메일 회원가입"
        onClickBack={() => {
          if (step === 0) {
            router.back()
          } else {
            handlePrevStep()
          }
        }}
      />
      {step === 0 && <TermOfUseContainer onNextStep={handleNextStep} />}
      {step === 1 && <EmailJoinFormContainer />}
    </JoinContainer>
  )
}

Join.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default Join
