import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

export default function SweeperComponent() {
  return (
    <div>
      <Swiper
      // spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src="/images/Fotolia_61887649_M-2.jpg" alt="slide1" style={{width:"100%",height:"100%"}}/></SwiperSlide>
      <SwiperSlide><img src="/images/Fotolia_82176963_M-2.jpg" alt="slide2" style={{width:"100%",height:"100%"}}/></SwiperSlide>
    </Swiper>
    </div>
  )
}
