import { useEffect, useState } from 'react'
import { InfiniteQueryObserverResult } from '@tanstack/react-query'

interface IuseIntersectionObserverProps {
  threshold?: number
  hasNextPage: boolean | undefined
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}

export const useIntersectionObserver = ({
  threshold = 1,
  hasNextPage,
  fetchNextPage,
}: IuseIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
  }

  useEffect(() => {
    if (!target) return

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    })

    observer.observe(target)

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(target)
  }, [observerCallback, threshold, target])

  return { setTarget }
}
