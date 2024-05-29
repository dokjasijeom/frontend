import { ModalProps, modalState } from '@/recoil/modal'
import { useRecoilState } from 'recoil'

const useModal = () => {
  const [modal, setModal] = useRecoilState<ModalProps>(modalState)

  const showModal = (modalProps: ModalProps) => {
    setModal(modalProps)
  }

  const closeModal = () => {
    setModal({})
  }

  return {
    modal,
    showModal,
    closeModal,
  }
}

export default useModal
