import { ToastProps, toastState } from '@/recoil/toast'
import { useRecoilState } from 'recoil'

const useToast = () => {
  const [toast, setToast] = useRecoilState<ToastProps>(toastState)

  const showToast = (toastProps: ToastProps) => {
    setToast(toastProps)
  }

  return {
    toast,
    showToast,
  }
}

export default useToast
