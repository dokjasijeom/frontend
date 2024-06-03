import { atom } from 'recoil'

export interface ToastProps {
  message?: string
  type?: 'success' | 'error'
}

export const toastState = atom<ToastProps>({
  key: 'toastState',
  default: { type: 'success' },
})
