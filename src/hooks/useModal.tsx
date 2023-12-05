import { ModalProps, modalState } from '@/recoil/modal'
import { useRecoilState } from 'recoil'

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState)

  const showModal = (modalProps: ModalProps) => {
    setModal(modalProps)
  }

  return {
    modal,
    showModal,
  }
}

export default useModal
