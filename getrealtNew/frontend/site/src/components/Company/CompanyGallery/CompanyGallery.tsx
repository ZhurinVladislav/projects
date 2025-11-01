'use client';

import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SliderButtonNext } from './SliderButtonNext';
import { SliderButtonPrev } from './SliderButtonPrev';

export type Document = {
  id: number;
  type: 'PDF' | 'PNG' | 'JPG' | 'DOCX';
};

interface DocumentSliderProps {
  documents: Document[];
}

const CompanyGallery = ({ documents }: DocumentSliderProps) => {
  const swiperRef = useRef<any>(null);

  return (
    <section data-testid="company-gallery" className="section">
      <div className="container">
        <h2 className="title-2 mx-auto text-center">Документы</h2>

        <div className="relative flex items-center justify-center gap-3">
          <SliderButtonPrev swiperRef={swiperRef} />
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            loop
            onSwiper={swiper => (swiperRef.current = swiper)}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {documents.map(doc => (
              <SwiperSlide key={doc.id} className="p-4">
                <div className="flex h-60 items-center justify-center rounded-2xl bg-white shadow transition hover:shadow-lg">
                  <p className="font-medium text-gray-700">{doc.type}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderButtonNext swiperRef={swiperRef} />
        </div>
      </div>
    </section>
  );
};

export default CompanyGallery;
