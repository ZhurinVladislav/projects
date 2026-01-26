'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const NearbyPlacesSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const places = [
    {
      title: 'Пляж Ривьера',
      description: 'Один из самых популярных пляжей в Сочи, с набережной, кафе и мягким галькой. Отличное место для утренней прогулки или заката у моря.',
      image: '/img/object/location/img-1.jpg',
      carTime: '30 мин',
      walkTime: null,
    },
    {
      title: 'Улица Навагинская',
      description: 'Пешеходная улица в центре города, полная кафе, бутиков и сувенирных лавок. Идеальна для неспешного шопинга и капучино на террасе.',
      image: '/img/object/location/img-1.jpg',
      carTime: null,
      walkTime: '5 мин',
    },
    {
      title: 'Парк Ривьера',
      description: 'Один из самых популярных пляжей в Сочи, с набережной, кафе и мягким галькой. Отличное место для утренней прогулки или заката у моря.',
      image: '/img/object/location/img-1.jpg',
      carTime: '5 мин',
      walkTime: '25 мин',
    },
    {
      title: 'Дендрарий',
      description: 'Ботанический сад с редкими растениями и потрясающими видами на горы. Идеальное место для спокойной прогулки на природе.',
      image: '/img/object/location/img-1.jpg',
      carTime: '15 мин',
      walkTime: null,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-end max-md:justify-center">
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-(--primary-color) transition-colors hover:bg-(--primary-color) hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.0332 13.28L5.68654 8.93333C5.1732 8.42 5.1732 7.58 5.68654 7.06667L10.0332 2.72"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-color) text-white transition-colors hover:bg-(--secondary-color)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.9668 2.72L10.3135 7.06667C10.8268 7.58 10.8268 8.42 10.3135 8.93333L5.9668 13.28"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={swiper => (swiperRef.current = swiper)}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="nearby-places-swiper"
      >
        {places.map((place, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden rounded-sm border border-(--border-color)">
              <div className="relative h-53.25 overflow-hidden bg-(--light-bg-color)">
                <Image src={place.image} alt={place.title} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h4 className="mb-3 font-[--font-primary] text-xl text-black">{place.title}</h4>
                <p className="mb-4 text-base">{place.description}</p>
                <div className="flex gap-2">
                  {place.carTime && (
                    <div className="inline-flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.8333 7.5H4.16667C3.24619 7.5 2.5 8.24619 2.5 9.16667V15C2.5 15.9205 3.24619 16.6667 4.16667 16.6667H15.8333C16.7538 16.6667 17.5 15.9205 17.5 15V9.16667C17.5 8.24619 16.7538 7.5 15.8333 7.5Z"
                          stroke="#BE8817"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M2.5 10.8333H17.5" stroke="#BE8817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.66667 7.5L8.33333 3.33334" stroke="#BE8817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 7.5L11.6667 3.33334" stroke="#BE8817" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M5.83333 14.1667C6.29357 14.1667 6.66667 13.7936 6.66667 13.3333C6.66667 12.8731 6.29357 12.5 5.83333 12.5C5.3731 12.5 5 12.8731 5 13.3333C5 13.7936 5.3731 14.1667 5.83333 14.1667Z"
                          fill="#BE8817"
                        />
                        <path
                          d="M14.1667 14.1667C14.6269 14.1667 15 13.7936 15 13.3333C15 12.8731 14.6269 12.5 14.1667 12.5C13.7064 12.5 13.3333 12.8731 13.3333 13.3333C13.3333 13.7936 13.7064 14.1667 14.1667 14.1667Z"
                          fill="#BE8817"
                        />
                      </svg>
                      <span className="text-base font-semibold text-(--secondary-color)">{place.carTime}</span>
                    </div>
                  )}
                  {place.walkTime && (
                    <div className="inline-flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.3333 3.33334C14.2538 3.33334 15 2.58715 15 1.66667C15 0.746193 14.2538 0 13.3333 0C12.4128 0 11.6667 0.746193 11.6667 1.66667C11.6667 2.58715 12.4128 3.33334 13.3333 3.33334Z"
                          fill="#BE8817"
                        />
                        <path d="M11.6667 5.83334L10 7.5V12.5H11.6667V16.6667H13.3333V11.6667L15 10V7.5L13.3333 5.83334H11.6667Z" fill="#BE8817" />
                        <path d="M8.33333 12.5L6.66667 10.8333V7.5L5 5.83334V10L6.66667 11.6667V16.6667H8.33333V12.5Z" fill="#BE8817" />
                      </svg>
                      <span className="text-base font-semibold text-(--secondary-color)">{place.walkTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NearbyPlacesSlider;
