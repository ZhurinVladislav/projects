'use client';

import { ChevronLeft } from 'lucide-react';

export const SliderButtonPrev = ({ swiperRef }: { swiperRef: any }) => {
  return (
    <button onClick={() => swiperRef.current?.slidePrev()} className="rounded-full bg-indigo-500 p-2 text-white transition hover:bg-indigo-600">
      <ChevronLeft size={20} />
    </button>
  );
};
