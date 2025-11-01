'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { NavigationOptions } from 'swiper/types';

const SliderNews = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div data-testid="news-slider" className="section container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current } as NavigationOptions}
        breakpoints={{
          320: { slidesPerView: 1 }, // телефоны
          640: { slidesPerView: 2 }, // планшеты
          1024: { slidesPerView: 3 }, // ноутбуки
          1440: { slidesPerView: 4 }, // десктопы
        }}
        onInit={swiper => {
          if (prevRef.current && nextRef.current) {
            swiper.params.navigation = {
              ...(swiper.params.navigation as NavigationOptions),
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        <SwiperSlide>
          <Link className="relative flex h-84 flex-col justify-between rounded-3xl bg-[url(/img/news/img-1.jpg)] bg-cover bg-center bg-no-repeat p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]" href="#">
            <p className="max-w-40 text-2xl font-normal text-white">Как выбрать риелтора</p>
            <span className="btn-primary max-w-33">Читать</span>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link className="relative flex h-84 flex-col justify-between rounded-3xl bg-[url(/img/news/img-2.jpg)] bg-cover bg-center bg-no-repeat p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]" href="#">
            <p className="max-w-40 text-2xl font-normal text-white">Советы по ипотеке</p>
            <span className="btn-primary max-w-33">Читать</span>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link className="relative flex h-84 flex-col justify-between rounded-3xl bg-[url(/img/news/img-3.jpg)] bg-cover bg-center bg-no-repeat p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]" href="#">
            <p className="max-w-40 text-2xl font-normal text-white">Тренды в дизайне</p>
            <span className="btn-primary max-w-33">Читать</span>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link className="relative flex h-84 flex-col justify-between rounded-3xl bg-[url(/img/news/img-4.jpg)] bg-cover bg-center bg-no-repeat p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]" href="#">
            <p className="max-w-40 text-2xl font-normal text-white">Инвестиции в недвижимость</p>
            <span className="btn-primary max-w-33">Читать</span>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link className="relative flex h-84 flex-col justify-between rounded-3xl bg-[url(/img/news/img-4.jpg)] bg-cover bg-center bg-no-repeat p-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]" href="#">
            <p className="max-w-40 text-2xl font-normal text-white">Инвестиции в недвижимость</p>
            <span className="btn-primary max-w-33">Читать</span>
          </Link>
        </SwiperSlide>
      </Swiper>
      {/* Кастомные кнопки */}
      <button ref={prevRef} className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white">
        ◀
      </button>
      <button ref={nextRef} className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white">
        ▶
      </button>
    </div>
  );
};

export default SliderNews;
