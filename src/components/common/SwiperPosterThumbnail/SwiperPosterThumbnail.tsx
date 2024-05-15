import React, { useState } from 'react'
import PosterThumbnail from '@/components/common/PosterThumbnail/PosterThumbnail'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/virtual'
import { Navigation } from 'swiper/modules'
import styled from 'styled-components'
import { Book } from '@/@types/book'
import SwiperNavigationButton from './SwiperNavigationButton'

const SwiperPosterThumbnailContainer = styled.div``

interface SwiperPosterThumbnailProps {
  bookList: Book[]
}

function SwiperPosterThumbnail(props: SwiperPosterThumbnailProps) {
  const { bookList } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHover, setIsHover] = useState(false)

  return (
    <SwiperPosterThumbnailContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={4}
        slidesOffsetAfter={20}
        slidesOffsetBefore={20}
        loop={false}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {bookList &&
          bookList.map((book) => (
            <SwiperSlide key={book.id}>
              <PosterThumbnail book={book} />
            </SwiperSlide>
          ))}
        {isHover && (
          <>
            <SwiperNavigationButton type="prev" activeIndex={activeIndex} />
            <SwiperNavigationButton type="next" activeIndex={activeIndex} />
          </>
        )}
      </Swiper>
    </SwiperPosterThumbnailContainer>
  )
}

export default SwiperPosterThumbnail
