'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const WhatAwaitsSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const features = [
    {
      title: 'Всего в нескольких шагах от берега',
      description: '— идеальное место, чтобы наслаждаться свежим морским воздухом.',
      image: '/img/object/expectation/img-1.jpg',
    },
    {
      title: 'Приватная зона на улице:',
      description: 'оборудованная терраса с шезлонгами и обеденной зоной',
      image: '/img/object/expectation/img-2.jpg',
    },
    {
      title: 'Комфортный интерьер:',
      description: 'светлыe стены, качественная отделка и продуманная обстановка',
      image: '/img/object/expectation/img-3.jpg',
    },
    {
      title: 'Современная кухня',
      description: 'полностью оборудованная для приготовления любимых блюд',
      image: '/img/object/expectation/img-1.jpg',
    },
  ];

  return (
    <div className="mb-8 border-b border-(--border-color) pb-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl">Что вас ждёт</h2>
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
        className="what-awaits-swiper"
      >
        {features.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden rounded-sm border border-(--border-color)">
              <div className="relative h-41">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="text-base">
                  <span className="font-semibold">{item.title}</span> {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .what-awaits-swiper {
          padding: 0 !important;
        }
        .what-awaits-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default WhatAwaitsSlider;
