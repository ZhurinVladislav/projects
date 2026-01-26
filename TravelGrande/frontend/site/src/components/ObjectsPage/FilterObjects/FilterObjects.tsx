'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const OBJECTS = [
  {
    id: 1,
    title: 'Дом у моря в Сочи',
    guests: 6,
    bedrooms: 3,
    amenities: 'Джакузи, хамам, вид на море, бассейн',
    location: 'Сочи, Адлер',
    price: 9200,
    specialPrice: 18400,
    image: '/img/objects/img-1.jpg',
    isFavorite: true,
    coordinates: { lat: 43.585525, lng: 39.723062 },
  },
  {
    id: 2,
    title: 'Дом у моря в Сочи',
    guests: 6,
    bedrooms: 3,
    amenities: 'Джакузи, хамам, вид на море, бассейн',
    location: 'Сочи, Адлер',
    price: 9200,
    specialPrice: 18400,
    image: '/img/objects/img-1.jpg',
    isFavorite: false,
    coordinates: { lat: 43.595525, lng: 39.733062 },
  },
  {
    id: 3,
    title: 'Дом у моря в Сочи',
    guests: 6,
    bedrooms: 3,
    amenities: 'Джакузи, хамам, вид на море, бассейн',
    location: 'Сочи, Адлер',
    price: 9200,
    specialPrice: 18400,
    image: '/img/objects/img-1.jpg',
    isFavorite: false,
    coordinates: { lat: 43.575525, lng: 39.713062 },
  },
];

const FilterObjects = () => {
  const [showMap, setShowMap] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([1]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  return (
    <section className="section">
      <div className="w-full max-w-480 pl-10 max-sm:pr-(--container-padding-ph) max-sm:pl-(--container-padding-ph)">
        {/* Search Filters */}
        <div className="mb-5.5">
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {/* City Filter */}
            <div className="flex-1 cursor-pointer border border-(--border-color) bg-white px-6 py-4 transition-colors hover:border-(--primary-color) md:max-w-[320px]">
              <div className="flex items-center justify-between">
                <span className="text-base">Город</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.28 5.96667L8.93333 10.3133C8.42 10.8267 7.58 10.8267 7.06667 10.3133L2.72 5.96667"
                    stroke="#2B2A29"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Date Filter */}
            <div className="flex-1 cursor-pointer border border-(--border-color) bg-white px-6 py-4 transition-colors hover:border-(--primary-color) md:max-w-[320px]">
              <div className="flex items-center justify-between">
                <span className="text-base">Дата</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.28 5.96667L8.93333 10.3133C8.42 10.8267 7.58 10.8267 7.06667 10.3133L2.72 5.96667"
                    stroke="#2B2A29"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Guests Filter */}
            <div className="flex-1 cursor-pointer border border-(--border-color) bg-white px-6 py-4 transition-colors hover:border-(--primary-color) md:max-w-[320px]">
              <div className="flex items-center justify-between">
                <span className="text-base">Гости</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.28 5.96667L8.93333 10.3133C8.42 10.8267 7.58 10.8267 7.06667 10.3133L2.72 5.96667"
                    stroke="#2B2A29"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <button className="flex h-12 w-full items-center justify-center rounded-full bg-(--text-color) transition-colors hover:bg-[#3B3A39] md:w-12">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M9.14292 17.5239C13.7716 17.5239 17.5239 13.7716 17.5239 9.14297C17.5239 4.51429 13.7716 0.762016 9.14292 0.762016C4.51424 0.762016 0.761963 4.51429 0.761963 9.14297C0.761963 13.7716 4.51424 17.5239 9.14292 17.5239Z"
                  stroke="white"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M20.5709 20.5718L15.2375 15.2384" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Filter Button */}
            <button className="hidden h-12 w-33 items-center justify-center gap-2 rounded-full bg-white px-4 shadow-[0_0_8px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_0_12px_rgba(0,0,0,0.16)] md:flex">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.78 19.8891V10.1113" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.78 6.55577V2.11133" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5979 19.8888V15.4443" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5979 11.8891V2.11133" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.41577 19.8891V10.1113" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.41577 6.55577V2.11133" stroke="#2B2A29" strokeWidth="1.33333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-base">Фильтр</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Property List */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="mb-2 text-base font-semibold">Доступно объектов: 268</h2>
              <p className="mb-2 text-base">Мы рассмотрели сотни заявок и разместили только лучшие из них</p>
              <Link href="#" className="text-base text-[#BE8817] underline transition-colors hover:text-(--primary-color)">
                Узнать о критериях TravelGrande
              </Link>
            </div>

            {/* Property Cards */}
            <div className="space-y-4">
              {OBJECTS.map(property => (
                <Link key={property.id} href={`/objects/${property.id}`} className="block">
                  <div className="relative flex flex-col overflow-hidden rounded border border-(--border-color) bg-white transition-shadow hover:shadow-lg md:flex-row">
                    {/* Property Image */}
                    <div className="relative w-full max-w-86.25 shrink-0 overflow-hidden max-md:h-64 max-md:max-w-full">
                      <Image className="h-full rounded-l object-cover" src={property.image} alt={property.title} fill />
                      {property.id === 1 && <div className="absolute top-3 left-3 rounded bg-white px-3 py-1 text-sm text-(--primary-color)">NEW</div>}
                    </div>

                    {/* Property Details */}
                    <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
                      <div className="space-y-6">
                        {/* Title and Basic Info */}
                        <div>
                          <h3 className="mb-2 font-['Times_New_Roman'] text-2xl">{property.title}</h3>
                          <div className="flex items-center gap-2 text-base text-(--gray-color)">
                            <span>{property.guests} гостей</span>
                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
                              <circle cx="2.5" cy="2.5" r="2.5" fill="#ACACAC" />
                            </svg>
                            <span>{property.bedrooms} спальни</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div>
                          <p className="mb-2 text-base">{property.amenities}</p>

                          {/* Location */}
                          <div className="flex items-center gap-2">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                              <path
                                d="M12 9.54545C12 13.9091 6 19 6 19C6 19 0 13.9091 0 9.54545C0 5.98036 2.732 3 6 3C9.268 3 12 5.98036 12 9.54545Z"
                                stroke="#C8AC71"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 11.7273C7.10457 11.7273 8 10.7505 8 9.54553C8 8.34054 7.10457 7.36371 6 7.36371C4.89543 7.36371 4 8.34054 4 9.54553C4 10.7505 4.89543 11.7273 6 11.7273Z"
                                stroke="#C8AC71"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-base">{property.location}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div>
                          <div className="font-['Times_New_Roman']">
                            <span className="text-2xl">от {property.price.toLocaleString()} ₽ </span>
                            <span className="text-base">ночь</span>
                          </div>
                          <div className="text-sm text-(--gray-color)">На ваши даты {property.specialPrice.toLocaleString()} ₽</div>
                        </div>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={e => {
                          e.preventDefault();
                          toggleFavorite(property.id);
                        }}
                        className="absolute top-4 right-4 md:relative md:top-0 md:right-0 md:self-end"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12.0074 21.2275L2.62281 12.7269C-2.47755 7.62659 5.01996 -2.16608 12.0074 5.75645C18.9949 -2.16608 26.4585 7.6606 21.3921 12.7269L12.0074 21.2275Z"
                            fill={favorites.includes(property.id) ? '#EB5C5C' : 'none'}
                            stroke="#2B2A29"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-(--primary-color) transition-colors hover:bg-(--primary-color) hover:text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10.0332 13.28L5.68654 8.93333C5.1732 8.42 5.1732 7.58 5.68654 7.06667L10.0332 2.72"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-base text-black">40 из 268</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-color) text-white transition-colors hover:bg-[#BE8817]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5.9668 2.72L10.3135 7.06667C10.8268 7.58 10.8268 8.42 10.3135 8.93333L5.9668 13.28"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Map */}
          <div className={`lg:w-1/2 ${showMap ? 'block' : 'hidden lg:block'}`}>
            <div className="relative h-210.75 overflow-hidden rounded bg-gray-200">
              {/* Placeholder map - would integrate with actual map library */}
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-100 to-green-100">
                <p className="text-gray-600">Карта объектов</p>
              </div>

              {/* Property markers on map */}
              {OBJECTS.map((property, idx) => (
                <div
                  key={property.id}
                  className="absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
                  style={{
                    top: `${30 + idx * 15}%`,
                    left: `${40 + idx * 10}%`,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M0.857422 13.7141L12.0003 2.57129L23.1431 13.7141" stroke="#C8AC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.28516 10.2856V21.4285H19.7137V10.2856" stroke="#C8AC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Map Toggle */}
        <button onClick={() => setShowMap(!showMap)} className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) shadow-lg lg:hidden">
          {showMap ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default FilterObjects;
