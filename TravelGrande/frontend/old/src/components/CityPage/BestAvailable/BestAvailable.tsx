'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Property {
  id: number;
  image: string;
  title: string;
  price: number;
  period: string;
}

interface BestAvailableProps {
  cityName: string;
  subtitle: string;
  properties: Property[];
}

const BestAvailable = ({ cityName, subtitle, properties }: BestAvailableProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6 text-center font-[--font-primary] text-[40px] uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">
          <span className="color">Лучшие</span> из доступного в {cityName}
        </h2>
        <p className="mb-16 text-center text-lg max-md:mb-8 max-md:text-base">{subtitle}</p>

        {/* Navigation Arrows */}
        <div className="mb-4 flex items-center justify-end gap-3 max-sm:justify-center">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-10 w-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-(--primary-color) transition-colors hover:bg-(--primary-color)"
          >
            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-(--primary-color) hover:stroke-white">
              <path d="M7.03333 10.28L3.68667 6.93333C3.17333 6.42 3.17333 5.58 3.68667 5.06667L7.03333 1.72" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10.5 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-(--primary-color) transition-opacity hover:opacity-90"
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

        {/* Slider */}
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
              slidesPerView: 3,
            },
          }}
          className="best-available-swiper"
        >
          {properties.map(property => (
            <SwiperSlide key={property.id}>
              <Link className="flex h-full flex-col overflow-hidden rounded-xs border border-(--border-color)" href={`${PAGES.OBJECTS}/${property.id}`}>
                <div className="relative flex h-53.5 w-full overflow-hidden">
                  <Image className="h-full w-full object-cover" src={property.image} alt={property.title} width={440} height={214} />
                </div>

                <div className="flex flex-col p-3">
                  <h3 className="mb-3 font-[--font-primary] text-2xl">{property.title}</h3>
                  <div className="mb-6 flex items-center gap-2 text-(--gray-color)">
                    <span>до 6 гостей</span>

                    <div className="h-1.5 w-1.5 rounded-full bg-(--gray-color)"></div>

                    <span>3 спальни</span>
                  </div>
                  <div className="font-[--font-primary]">
                    <span className="text-2xl">от {property.price.toLocaleString('ru-RU')} ₽ </span>
                    <span className="text-base">{property.period}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestAvailable;
