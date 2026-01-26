'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const TeamSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const team = [
    {
      id: 1,
      image: '/img/about/team/member-1.jpg',
      name: 'Анна Смирнова',
      position: 'Основатель и CEO',
    },
    {
      id: 2,
      image: '/img/about/team/member-2.jpg',
      name: 'Дмитрий Петров',
      position: 'Директор по развитию',
    },
    {
      id: 3,
      image: '/img/about/team/member-3.jpg',
      name: 'Екатерина Волкова',
      position: 'Руководитель отдела качества',
    },
    {
      id: 4,
      image: '/img/about/team/member-4.jpg',
      name: 'Михаил Соколов',
      position: 'Менеджер по работе с клиентами',
    },
  ];

  return (
    <section className="section bg-(--light-bg-color) py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <h2 className="title-2">
          Наша <span className="color">команда</span>
        </h2>
        <p className="mb-12 text-center text-lg font-normal max-md:mb-8 max-md:text-base">Люди, которые создают незабываемые путешествия.</p>

        {/* Navigation Arrows */}
        <div className="mb-10 flex items-center justify-end gap-6 max-md:mb-6 max-sm:justify-center">
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
              <path d="M0.966667 1.72L4.31333 5.06667C4.82667 5.58 4.82667 6.42 4.31333 6.93333L0.966667 10.28" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Team Slider */}
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
          className="team-swiper"
        >
          {team.map(member => (
            <SwiperSlide key={member.id}>
              <div className="flex flex-col">
                <div className="relative mb-4 h-89.75 w-full overflow-hidden rounded">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mb-1 font-[--font-primary] text-xl font-normal">{member.name}</h3>
                <p className="text-base text-(--gray-color)">{member.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .team-swiper {
          padding: 0 !important;
        }
        .team-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
