import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Icons from '../Icons/Icons'
import Button from '../Button/Button'

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBackground = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.color.system.dim};
  width: 100%;
  height: 100%;
`

const ModalWrapper = styled.div`
  z-index: 11;
  background: ${({ theme }) => theme.color.system.w};
  width: 100%;
  max-width: 460px;
  min-width: 320px;
  box-shadow: 5px 3px 20px 0px rgba(154, 153, 159, 0.1);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  margin: 20px;
`
const ModalContents = styled.div``

const ModalHeader = styled.div`
  ${({ theme }) => theme.typography.head1};
  color: ${({ theme }) => theme.color.gray[950]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ModalBody = styled.div`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
  margin-top: 12px;
`

const ModalButtonGroup = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  button {
    display: flex;
    flex: 1;
    justify-content: center;
  }
`

interface ModalProps {
  type?: 'alert' | 'confirm' | 'self'
  title: string
  children: ReactNode | undefined
  negativeText?: string
  positiveText?: string
  onNegativeClick?: () => void
  onPositiveClick?: () => void
  onClose: () => void
}

function Modal(props: ModalProps) {
  const {
    type = 'alert',
    title,
    children,
    negativeText,
    positiveText,
    onNegativeClick,
    onPositiveClick,
    onClose,
  } = props

  const handleNegativeClick = () => {
    if (onNegativeClick) {
      onNegativeClick()
    }
    return onClose()
  }

  const handlePositiveClick = () => {
    if (onPositiveClick) {
      onPositiveClick()
    }
    return onClose()
  }

  const getButtons = () => {
    if (type === 'self') {
      return null
    }
    if (type === 'alert') {
      return (
        <ModalButtonGroup>
          <Button type="primary" onClick={handlePositiveClick}>
            {positiveText ?? '확인'}
          </Button>
        </ModalButtonGroup>
      )
    }
    if (type === 'confirm') {
      return (
        <ModalButtonGroup>
          {negativeText && (
            <Button type="secondary" onClick={handleNegativeClick}>
              {negativeText ?? '취소'}
            </Button>
          )}
          {positiveText && (
            <Button type="primary" onClick={handlePositiveClick}>
              {positiveText ?? '확인'}
            </Button>
          )}
        </ModalButtonGroup>
      )
    }
    return null
  }

  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalContents>
          <ModalHeader>
            {title}
            <Icons name="Close" onClick={onClose} />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContents>
        {getButtons()}
      </ModalWrapper>
      <ModalBackground onClick={onClose} />
    </ModalContainer>
  )
}

export default Modal
