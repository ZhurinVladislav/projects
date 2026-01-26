'use client';

import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { AnimateOnView } from '@/shared/components/AnimateOnView';

const DestinationsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const destinations = [
    {
      id: 1,
      image: '/img/home/destinations-section/img-1.jpg',
      title: 'Горный воздух республики Алтай',
    },
    {
      id: 2,
      image: '/img/home/destinations-section/img-2.jpg',
      title: 'Уникальное жильё в Санкт-Петербурге',
    },
    {
      id: 3,
      image: '/img/home/destinations-section/img-3.jpg',
      title: 'Найдите вдохновение на Байкале',
    },
    {
      id: 4,
      image: '/img/home/destinations-section/img-4.jpg',
      title: 'Дома на побережье Калининграда',
    },
    {
      id: 5,
      image: '/img/home/destinations-section/img-1.jpg',
      title: 'Дома на побережье Калининграда',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <AnimateOnView animation="fade-in-up">
          <h2 className="title-2">выберите направление</h2>
        </AnimateOnView>
        {/* Navigation Arrows */}
        <AnimateOnView animation="fade-in" delay={100}>
          <div className="mb-10 flex items-center justify-end gap-6 max-md:mb-6 max-sm:justify-center">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#C8AC71] transition-colors hover:bg-[#C8AC71] hover:stroke-white"
            >
              <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[#C8AC71] group-hover:stroke-white">
                <path d="M7.03333 10.28L3.68667 6.93333C3.17333 6.42 3.17333 5.58 3.68667 5.06667L7.03333 1.72" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#C8AC71] transition-opacity hover:opacity-90"
            >
              <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.966667 1.72L4.31333 5.06667C4.82667 5.58 4.82667 6.42 4.31333 6.93333L0.966667 10.28"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </AnimateOnView>
        {/* Destinations Slider */}
        <AnimateOnView animation="fade-in-up" delay={200}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            onSwiper={swiper => (swiperRef.current = swiper)}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="destinations-swiper"
          >
            {destinations.map(destination => (
              <SwiperSlide key={destination.id}>
                <Link className="flex flex-col" href="/">
                  <Image src={destination.image} alt={destination.title} className="mb-3 h-89.75 w-full rounded object-cover" width={325} height={359} />
                  <p>{destination.title}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimateOnView>
      </div>
    </section>
  );
};

export default DestinationsSection;
