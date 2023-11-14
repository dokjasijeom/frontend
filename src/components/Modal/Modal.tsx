import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Icons from '../Icons/Icons'

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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
  min-width: 320px;
  min-height: 212px;
  box-shadow: 5px 3px 20px 0px rgba(154, 153, 159, 0.1);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

interface ModalProps {
  title: string
  children: ReactNode | undefined
  onClose: () => void
}

function Modal(props: ModalProps) {
  const { title, children, onClose } = props

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
      </ModalWrapper>
      <ModalBackground onClick={onClose} />
    </ModalContainer>
  )
}

export default Modal
