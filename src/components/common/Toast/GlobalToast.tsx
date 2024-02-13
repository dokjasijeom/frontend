import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isEmpty } from 'lodash'
import { toastState } from '@/recoil/toast'
import Toast from './Toast'

function GlobalToast() {
  const [toast, setToast] = useRecoilState(toastState)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!isEmpty(toast)) {
      setShowToast(true)
    }
  }, [toast])

  const handleModalClose = useCallback(() => {
    setShowToast(false)
    setToast({})
  }, [setToast])

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        handleModalClose()
      }, 3000)
    }
  }, [handleModalClose, showToast])

  const renderComponent = () => {
    if (!toast.message || !showToast) return null

    return <Toast message={toast.message} />
  }
  return <>{renderComponent()}</>
}

export default GlobalToast
