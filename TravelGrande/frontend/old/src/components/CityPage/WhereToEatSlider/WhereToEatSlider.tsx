'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Restaurant {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface WhereToEatSliderProps {
  cityName: string;
  subtitle: string;
  restaurants: Restaurant[];
}

const WhereToEatSlider = ({ cityName, subtitle, restaurants }: WhereToEatSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="mb-16 flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="font-[--font-primary] text-[40px] text-(--text-color) uppercase max-md:text-3xl max-sm:text-2xl">
            Где <span className="color">поесть</span>
          </h2>
          <p className="text-lg">{subtitle}</p>
        </div>

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
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={swiper => (swiperRef.current = swiper)}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
          }}
          className="where-to-eat-swiper"
        >
          {restaurants.map(item => (
            <SwiperSlide key={item.id}>
              <Link className="flex h-full overflow-hidden rounded border border-(--border-color) max-md:flex-col" href="#">
                <div className="flex h-full w-full max-w-62.5 overflow-hidden max-md:max-w-full">
                  <Image className="h-full w-full object-cover" src={item.image} alt={item.title} width={250} height={190} />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 max-md:p-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WhereToEatSlider;
