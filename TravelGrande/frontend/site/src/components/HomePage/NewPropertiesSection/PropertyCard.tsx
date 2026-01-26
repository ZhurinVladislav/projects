'use client';

import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PropertyCardProps {
  property: {
    id: number;
    images: string[];
    isNew?: boolean;
    title: string;
    location: string;
    description: string;
    price: number;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative flex rounded border border-(--border-color) bg-white max-md:flex-col">
      {/* Image Section with Slider */}
      <div className="relative h-81.25 w-81.25 shrink-0 overflow-hidden rounded-l max-md:h-62.5 max-md:w-full max-md:rounded-t max-md:rounded-bl-none">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            el: '.swiper-pagination-custom',
            clickable: true,
            bulletClass: 'property-pagination-bullet',
            bulletActiveClass: 'property-pagination-bullet-active',
          }}
          onSwiper={swiper => (swiperRef.current = swiper)}
          className="h-full w-full"
        >
          {property.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image className="h-full w-full object-cover" src={image} width={325} height={300} alt={`${property.title} - ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1"></div>

        {/* Navigation Arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-3 z-10 flex h-10 w-10.5 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 transition-colors hover:bg-white"
        >
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.03333 10.28L3.68667 6.93333C3.17333 6.42 3.17333 5.58 3.68667 5.06667L7.03333 1.72"
              stroke="#2B2A29"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-3 z-10 flex h-10 w-10.5 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-90"
        >
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.966667 1.72L4.31333 5.06667C4.82667 5.58 4.82667 6.42 4.31333 6.93333L0.966667 10.28"
              stroke="#2B2A29"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 max-md:p-4">
        {/* Badge */}
        {property.isNew && (
          <div className="mb-5 inline-flex h-6 w-fit items-center justify-center gap-2.5 rounded bg-(--light-bg-color) px-11 py-1.5 max-md:mb-3">
            <span className="text-sm font-normal text-(--primary-color)">NEW</span>
          </div>
        )}

        {/* Title and Location */}
        <h3 className="mb-4 font-[--font-primary] text-2xl max-md:text-xl">{property.title}</h3>
        <div className="mb-6 flex items-center gap-1 max-md:mb-4">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.54545C12 10.9091 6 16 6 16C6 16 0 10.9091 0 6.54545C0 2.98036 2.732 0 6 0C9.268 0 12 2.98036 12 6.54545Z" stroke="#BE8817" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M6 8.72741C7.10457 8.72741 8 7.75058 8 6.54559C8 5.3406 7.10457 4.36377 6 4.36377C4.89543 4.36377 4 5.3406 4 6.54559C4 7.75058 4.89543 8.72741 6 8.72741Z"
              stroke="#BE8817"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-base font-normal text-(--gray-color)">{property.location}</p>
        </div>

        {/* Description */}
        <p className="mb-auto text-base font-normal">{property.description}</p>

        {/* Price */}
        <div className="mt-6 max-md:mt-4">
          <span className="font-[--font-primary] text-2xl font-normal">от {property.price.toLocaleString('ru-RU')} ₽ </span>
          <span className="font-[--font-primary] text-base font-normal text-(--gray-color)">/ ночь</span>
        </div>
      </div>
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-20 flex h-6 w-6 items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.0074 21.2275L2.62281 12.7269C-2.47755 7.62659 5.01996 -2.16608 12.0074 5.75645C18.9949 -2.16608 26.4585 7.6606 21.3921 12.7269L12.0074 21.2275Z"
            stroke="#2B2A29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PropertyCard;
