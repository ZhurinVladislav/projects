'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TopSlider = () => {
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const images = [
    '/img/object/slider/img-1.jpg',
    '/img/object/slider/img-2.jpg',
    '/img/object/slider/img-3.jpg',
    '/img/object/slider/img-4.jpg',
    '/img/object/slider/img-5.jpg',
    '/img/object/slider/img-6.jpg',
  ];

  return (
    <div className="mb-12">
      <div className="group relative">
        {/* Main Image Slider - Shows 3 slides on desktop, 1 on mobile */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
          onSwiper={swiper => (mainSwiperRef.current = swiper)}
          className="h-100 w-full md:h-120"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-100 w-full overflow-hidden rounded md:h-120">
                <Image src={image} alt={`Property ${index + 1}`} fill className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows - Only visible on desktop when hovering */}
        <button
          onClick={() => mainSwiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:flex"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10.0332 13.28L5.68654 8.93333C5.1732 8.42 5.1732 7.58 5.68654 7.06667L10.0332 2.72"
              stroke="#2B2A29"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => mainSwiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:flex"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5.9668 2.72L10.3135 7.06667C10.8268 7.58 10.8268 8.42 10.3135 8.93333L5.9668 13.28"
              stroke="#2B2A29"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Photo Counter */}
        <div className="absolute right-4 bottom-4 z-10 rounded-full bg-white px-4 py-2 text-base shadow-lg">Смотреть {images.length} фото</div>
      </div>
    </div>
  );
};

export default TopSlider;
