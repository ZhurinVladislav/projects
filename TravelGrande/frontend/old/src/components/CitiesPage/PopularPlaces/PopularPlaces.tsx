'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const PopularPlaces = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const places = [
    {
      id: 1,
      image: '/img/cities/places/img-1.jpg',
      title: 'Хотите к морю?',
      locations: 'Сочи, Геленджик, Анапа',
    },
    {
      id: 2,
      image: '/img/cities/places/img-2.jpg',
      title: 'Ищете горы и воздух?',
      locations: 'Красная Поляна, Архыз',
    },
    {
      id: 3,
      image: '/img/cities/places/img-3.jpg',
      title: 'Нужен отдых с детьми?',
      locations: 'Анапа, Ейск',
    },
    {
      id: 4,
      image: '/img/cities/places/img-4.jpg',
      title: 'Для уединения и тишины',
      locations: 'Кучугуры, Абрау-Дюрсо',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6 text-center font-[--font-primary] text-[40px] uppercase max-md:text-3xl max-sm:text-2xl">
          Не знаете, <span className="color">куда</span> поехать?
        </h2>
        <p className="mb-12 text-center text-lg max-md:mb-8 max-md:text-base">
          Позвольте нам вдохновить вас. <br /> Лучшие места и тщательно отобранные дома уже ждут.
        </p>

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
            1024: {
              slidesPerView: 4,
            },
          }}
          className="popular-places-swiper"
        >
          {places.map(place => (
            <SwiperSlide key={place.id}>
              <Link className="group flex flex-col overflow-hidden rounded-xs border border-(--border-color)" href="#">
                <div className="flex h-43.75 w-full overflow-hidden">
                  <Image className="h-full w-full object-cover transition-transform group-hover:scale-110" src={place.image} alt={place.title} width={325} height={175} />
                </div>

                <div className="flex flex-col gap-4 p-4">
                  <p className="mb-2 font-[--font-primary] text-xl font-normal">{place.title}</p>
                  <p>{place.locations}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularPlaces;
