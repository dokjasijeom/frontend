import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useSwiper } from 'swiper/react'
import Image from 'next/image'

const SwiperNavigationButtonContainer = styled.div<{ type: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ type }) => (type === 'prev' ? 'left: 8px' : 'right: 8px')};
  width: 32px;
  height: 32px;
  z-index: 5;
  cursor: pointer;
  animation: fadein 0.2s linear forwards;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

function SwiperNavigationButton({
  type,
  activeIndex,
}: {
  type: 'prev' | 'next'
  activeIndex: number
}) {
  const swiper = useSwiper()

  const renderComponent = useCallback(() => {
    if (activeIndex === 0 && type === 'prev') {
      return null
    }
    if (swiper.isEnd === true && type === 'next') {
      return null
    }

    return (
      <SwiperNavigationButtonContainer
        type={type}
        onClick={() => {
          if (type === 'prev') {
            swiper.slidePrev()
          } else {
            swiper.slideNext()
          }
        }}
      >
        <Image
          src={`/images/${type}_button.png`}
          width={32}
          height={32}
          alt=""
        />
      </SwiperNavigationButtonContainer>
    )
  }, [activeIndex, type, swiper])

  return <>{renderComponent()}</>
}

export default SwiperNavigationButton
