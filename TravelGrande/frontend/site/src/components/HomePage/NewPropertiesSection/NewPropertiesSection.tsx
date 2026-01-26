'use client';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { AnimateOnView } from '@/shared/components/AnimateOnView';

const NewPropertiesSection = () => {
  const properties = [
    {
      id: 1,
      images: ['/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg'],
      isNew: true,
      title: 'Дом у моря в Сочи',
      location: 'Сочи, Адлер',
      description: 'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
      price: 40500,
    },
    {
      id: 2,
      images: ['/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg'],
      isNew: true,
      title: 'Дом у моря в Сочи',
      location: 'Сочи, Адлер',
      description: 'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
      price: 40500,
    },
    {
      id: 3,
      images: ['/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg'],
      isNew: true,
      title: 'Дом у моря в Сочи',
      location: 'Сочи, Адлер',
      description: 'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
      price: 40500,
    },
    {
      id: 4,
      images: ['/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg', '/img/home/new-properties-section/img-1.jpg'],
      isNew: true,
      title: 'Дом у моря в Сочи',
      location: 'Сочи, Адлер',
      description: 'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
      price: 40500,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <AnimateOnView animation="fade-in-up">
          <h2 className="title-2">
            <span className="color">Новые дома</span> в TravelGrande
          </h2>
        </AnimateOnView>
        <AnimateOnView animation="fade-in-up" delay={100}>
          <p className="mb-12 text-center text-lg max-md:mb-8 max-md:text-base">Подборка свежих объектов, которые уже прошли нашу проверку и готовы принять гостей</p>
        </AnimateOnView>

        {/* Properties Grid */}
        <div className="mb-10 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {properties.map((property, index) => (
            <AnimateOnView key={property.id} animation="fade-in-up" delay={200 + index * 100}>
              <PropertyCard property={property} />
            </AnimateOnView>
          ))}
        </div>

        {/* View More Button */}
        <AnimateOnView animation="fade-in-up" delay={600}>
          <div className="flex justify-center">
            <Link className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-(--text-color) px-12.75 py-4 transition-opacity hover:opacity-90" href={PAGES.OBJECTS}>
              <span className="font-semibold text-white">Смотреть больше</span>
            </Link>
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
};

export default NewPropertiesSection;
