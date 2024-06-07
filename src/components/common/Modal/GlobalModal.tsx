import { modalState } from '@/recoil/modal'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isEmpty } from 'lodash'
import Modal from './Modal'

function GlobalModal() {
  const [modal, setModal] = useRecoilState(modalState)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isEmpty(modal)) {
      setShowModal(true)
      console.log(111)
    }
  }, [modal])

  const handleModalClose = () => {
    setShowModal(false)
    console.log(222)
    setModal({})
  }

  const renderComponent = () => {
    if (!modal.title || !showModal) return null

    return (
      <Modal
        type={modal.type}
        negativeText={modal.negativeText}
        positiveText={modal.positiveText}
        onNegativeClick={modal.onNegativeClick}
        onPositiveClick={modal.onPositiveClick}
        title={modal.title}
        onClose={handleModalClose}
      >
        {modal.body}
      </Modal>
    )
  }
  return <>{renderComponent()}</>
}

export default GlobalModal
