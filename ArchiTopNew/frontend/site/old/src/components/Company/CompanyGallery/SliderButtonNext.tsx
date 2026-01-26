'use client';

import { ChevronRight } from 'lucide-react';

export const SliderButtonNext = ({ swiperRef }: { swiperRef: any }) => {
  return (
    <button onClick={() => swiperRef.current?.slideNext()} className="rounded-full bg-indigo-500 p-2 text-white transition hover:bg-indigo-600">
      <ChevronRight size={20} />
    </button>
  );
};
