import { ReactNode } from 'react'
import { atom } from 'recoil'

export interface ModalProps {
  type?: 'alert' | 'confirm' | 'self'
  title?: string
  description?: string | ReactNode | undefined
  negativeText?: string
  positiveText?: string
  onNegativeClick?: () => void
  onPositiveClick?: () => void
  onClose?: () => void
}

export const modalState = atom<ModalProps>({
  key: 'modalState',
  default: {},
})
