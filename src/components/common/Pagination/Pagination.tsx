import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icons from '../Icons/Icons'

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`
const PaginationButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 8px;
`

const PaginationButton = styled.button`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[800]};
  &.active {
    color: ${({ theme }) => theme.color.system.w};
    background: ${({ theme }) => theme.color.main[600]};
  }
`

interface PaginationProps {
  pageCount: number // 보여줄 페이지 개수
  currentPage: number // 현재 페이지
  onChangePage: (page: number) => void
}

function Pagination(props: PaginationProps) {
  const { pageCount, currentPage, onChangePage } = props

  const [start, setStart] = useState(1) // 시작 페이지

  const handlePrev = () => {
    if (currentPage === 1) return
    onChangePage(currentPage - 1)
  }

  const handleNext = () => {
    onChangePage(currentPage + 1)
  }

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount)
    if (currentPage < start) setStart((prev) => prev - pageCount)
  }, [currentPage, pageCount, start])

  return (
    <PaginationContainer>
      <Icons name="ChevronLeft" onClick={handlePrev} />
      <PaginationButtonWrapper>
        {[...Array(pageCount)].map((a, i) => (
          <PaginationButton
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`${currentPage === start + i && 'active'}`}
            onClick={() => onChangePage(start + i)}
          >
            {start + i}
          </PaginationButton>
        ))}
      </PaginationButtonWrapper>
      <Icons name="ChevronRight" onClick={handleNext} />
    </PaginationContainer>
  )
}

export default Pagination
