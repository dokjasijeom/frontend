import React, { useState } from 'react'
import { Book } from '@/@types/book'
import PosterThumbnail from '@/components/common/PosterThumbnail/PosterThumbnail'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/virtual'
import { Navigation } from 'swiper/modules'
import { range } from 'lodash'
import styled from 'styled-components'
import SwiperNavigationButton from './SwiperNavigationButton'

const book = {
  image: '',
  title: '피오니-살인귀 대공과의 미래를 보았다',
  author: 'carbo(도효원)',
  genre: '로맨스',
  score: 935,
  platforms: ['naver', 'kakao', 'ridi'],
} as Book

const SwiperPosterThumbnailContainer = styled.div``

function SwiperPosterThumbnail() {
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
        loop={false}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
      >
        {range(9).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>
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
