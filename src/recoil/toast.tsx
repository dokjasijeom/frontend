import { atom } from 'recoil'

export interface ToastProps {
  message?: string
}

export const toastState = atom<ToastProps>({
  key: 'toastState',
  default: {},
})
