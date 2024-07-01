import { useCallback, useEffect } from 'react'

type Props = {
  observerRef: HTMLDivElement | null
  fetchMore: () => void
  hasMore: boolean
}

const options: IntersectionObserverInit = {
  threshold: 1,
}

export const useInfiniteScrolling = ({
  observerRef,
  fetchMore,
  hasMore,
}: Props) => {
  const onScroll: IntersectionObserverCallback = useCallback(
    async (entries) => {
      if (!entries[0].isIntersecting) return

      await fetchMore()
    },
    [fetchMore],
  )

  useEffect(() => {
    if (!observerRef) return
    // 콜백함수와 옵션값을 지정
    const observer = new IntersectionObserver(onScroll, options)
    // 특정 요소 감시 시작
    observer.observe(observerRef)
    // 더 가져올 게시글이 존재하지 않는다면 패치 중지
    if (!hasMore) {
      observer.unobserve(observerRef)
    }

    // 감시 종료
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect()
  }, [hasMore, observerRef, onScroll])
}
