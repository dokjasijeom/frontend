import { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'

function saveScrollPos() {
  sessionStorage.setItem('scrollPos', window.scrollY.toString())
}

function restoreScrollPos() {
  const scrollPos = Number(sessionStorage.getItem('scrollPos'))

  setTimeout(() => {
    if (!window) return

    window.scrollTo(0, scrollPos)
    sessionStorage.removeItem('scrollPos')
  }, 250)
}

export default function useScrollRestoration(router: NextRouter) {
  const shouldScrollRestore = useRef(false)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      shouldScrollRestore.current = false

      window.history.scrollRestoration = 'manual'

      const onRouteChangeStart = () => {
        if (!shouldScrollRestore.current) {
          saveScrollPos()
        }
      }

      const onRouteChangeComplete = () => {
        if (shouldScrollRestore.current) {
          shouldScrollRestore.current = false

          restoreScrollPos()
        }
      }

      router.beforePopState(() => {
        shouldScrollRestore.current = true
        return true
      })

      router.events.on('routeChangeStart', onRouteChangeStart)
      router.events.on('routeChangeComplete', onRouteChangeComplete)
      return () => {
        router.beforePopState(() => true)
        router.events.off('routeChangeStart', onRouteChangeStart)
        router.events.off('routeChangeComplete', onRouteChangeComplete)
      }
    }
  }, [router])
}
