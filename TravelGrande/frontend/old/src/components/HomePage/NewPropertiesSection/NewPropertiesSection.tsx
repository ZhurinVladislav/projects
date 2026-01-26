'use client';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

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
        <h2 className="title-2">
          <span className="color">Новые дома</span> в TravelGrande
        </h2>
        <p className="mb-12 text-center text-lg max-md:mb-8 max-md:text-base">Подборка свежих объектов, которые уже прошли нашу проверку и готовы принять гостей</p>

        {/* Properties Grid */}
        <div className="mb-10 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-(--text-color) px-12.75 py-4 transition-opacity hover:opacity-90" href={PAGES.OBJECTS}>
            <span className="font-semibold text-white">Смотреть больше</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewPropertiesSection;
