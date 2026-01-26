'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IProps {
  id: string;
}

const MainContent = ({ id }: IProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:px-10 lg:px-70">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumbs */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-base">
              <Link href="/" className="text-(--gray-color) hover:text-(--primary-color)">
                Главная
              </Link>
              <span className="text-(--gray-color)">/</span>
              <Link href="/objects" className="text-(--gray-color) hover:text-(--primary-color)">
                Сочи
              </Link>
              <span className="text-black">/</span>
              <span className="text-(--text-color)">Дом у моря в Сочи</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 font-['Times_New_Roman'] text-4xl">Дом у моря в Сочи</h1>

            {/* Amenity Tags */}
            <div className="mb-6 flex flex-wrap gap-3">
              {['Джакузи', 'Хамам', 'Вид на море', 'Бассейн'].map(tag => (
                <span key={tag} className="rounded bg-(--light-bg-color) px-3 py-1.5 text-sm text-(--secondary-color)">
                  {tag}
                </span>
              ))}
            </div>

            {/* Property Details */}
            <div className="mb-6 flex flex-col gap-8 md:flex-row">
              <div className="flex items-center gap-3">
                <Image src="/img/icons/people.svg" width={24} height={24} alt="Люди" />
                <div className="flex flex-wrap gap-2">
                  <div className="text-base font-semibold">Максимум гостей: 11</div>
                  <div className="text-base text-(--gray-color)">(Основных мест 7, дополнительных мест 3, детских кроватей 1)</div>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Image src="/img/icons/bed.svg" width={24} height={24} alt="Кровать" />
                <span className="text-base font-semibold">4 спальни</span>
              </div>

              <div className="flex items-center gap-3">
                <Image src="/img/icons/toilet.svg" width={24} height={24} alt="Туалет" />
                <span className="text-base font-semibold">3 Санузла</span>
              </div>

              <div className="flex items-center gap-3">
                <Image src="/img/icons/pathfinder-union.svg" width={22} height={22} alt="Квадратура" />
                <span className="text-base font-semibold">195 кв.м</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <p className="mb-4 text-base leading-relaxed">
                Идеальное место для тех, кто ищет уединение, свежий морской воздух и комфорт. Просторный интерьер с качественной отделкой, уютная атмосфера и панорамные окна наполняют дом светом и
                тишиной.
              </p>
              <p className="mb-4 text-base leading-relaxed">
                В вашем распоряжении всё необходимое для отдыха: оборудованная кухня, мягкая зона для отдыха, Wi-Fi, кондиционер и стильная мебель. На территории — зелёный дворик и зона для отдыха на
                свежем воздухе.
              </p>
              <p className="text-base leading-relaxed">Дом подойдёт для романтической поездки, спокойного отпуска или удалённой работы с видом на природу.</p>
            </div>

            {/* Location */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <div className="mb-4 flex items-center gap-2">
                <Image src="/img/icons/mark.svg" width={12} height={16} alt="Маркер" />
                <span className="text-base">Сочи, Адлер, ул. Центральная 14</span>
                <Link href="#" className="text-base underline hover:text-(--primary-color)">
                  (показать на карте)
                </Link>
              </div>
            </div>

            {/* What awaits you */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl">Что вас ждёт</h2>
                <div className="flex gap-3">
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
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-color) text-white transition-colors hover:bg-(--secondary-color)">
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

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {[
                  {
                    title: 'Всего в нескольких шагах от берега',
                    description: '— идеальное место, чтобы наслаждаться свежим морским воздухом.',
                    image: '/img/object/expectation/img-1.jpg',
                  },
                  {
                    title: 'Приватная зона на улице:',
                    description: 'оборудованная терраса с шезлонгами и обеденной зоной',
                    image: '/img/object/expectation/img-2.jpg',
                  },
                  {
                    title: 'Комфортный интерьер:',
                    description: 'светлыe стены, качественная отделка и продуманная обстановка',
                    image: '/img/object/expectation/img-3.jpg',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="overflow-hidden rounded-sm border border-(--border-color)">
                    <div className="relative h-41">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-base">
                        <span className="font-semibold">{item.title}</span> {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bedrooms and bathrooms */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <h2 className="mb-6 text-2xl">Спальни и ванные комнаты</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image src="/img/icons/bed-color.svg" width={24} height={24} alt="Кровать" />
                  <span className="text-base">3 спальни, 6 кроватей</span>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="/img/icons/toilet-color.svg" width={24} height={24} alt="Кровать" />
                  <span className="text-base">2 санузла</span>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <h2 className="mb-6 text-2xl">Оснащение объекта</h2>

              <div className="mb-8 grid grid-cols-1 gap-x-24 gap-y-4 md:grid-cols-2">
                {['Места для сидения на открытом воздухе', 'Рабочее место, стол для ноутбука', 'Wi-Fi', 'Кондиционер', 'Домашние животные разрешены', 'Парковка доступна', 'Сушилка', 'Сад'].map(
                  (item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--light-bg-color)">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M1 8.19231L3.415 11.2973C3.49649 11.4032 3.60091 11.4892 3.72041 11.549C3.83992 11.6087 3.97141 11.6407 4.105 11.6423C4.23645 11.6439 4.36658 11.616 4.48594 11.561C4.60529 11.5059 4.71087 11.4248 4.795 11.3238L12.5 2"
                            stroke="#BE8817"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-base text-black">{item}</span>
                    </div>
                  ),
                )}
              </div>

              <button className="w-full rounded-full bg-(--text-color) px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-[#3B3A39] md:w-auto">Посмотреть оснащение</button>
            </div>

            {/* Additional Services */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <h2 className="mb-6 text-2xl">Дополнительно</h2>

              <div className="mb-6 space-y-4">
                {[
                  'Помощь со стиркой и глажкой белья',
                  'Покупка продуктов к вашему приезду',
                  'Уборка во время проживания',
                  'Помощь с бронированием ресторанов и экскурсий',
                  'Возможность организовать трансфер из аэропорта',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--light-bg-color)">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 8.19231L3.415 11.2973C3.49649 11.4032 3.60091 11.4892 3.72041 11.549C3.83992 11.6087 3.97141 11.6407 4.105 11.6423C4.23645 11.6439 4.36658 11.616 4.48594 11.561C4.60529 11.5059 4.71087 11.4248 4.795 11.3238L12.5 2"
                          stroke="#BE8817"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-base text-black">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded bg-(--light-bg-color) p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(200,172,113,0.2)]">
                    <span className="text-base text-(--secondary-color)">!</span>
                  </div>
                  <p className="text-base font-semibold text-(--secondary-color)">
                    Дополнительные услуги предоставляются при наличии возможности и после согласования с хозяином, за дополнительную стоимость
                  </p>
                </div>
              </div>
            </div>

            {/* Available Dates */}
            <div className="mb-8 border-b border-(--border-color) pb-8">
              <h2 className="mb-6 text-2xl">Свободные даты</h2>

              <div className="rounded-2xl border border-[#D9D9D9] p-6">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-12 rounded-full border border-(--border-color) px-2 py-2">
                    <button className="p-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M10.0332 13.28L5.68654 8.93333C5.1732 8.42 5.1732 7.58 5.68654 7.06667L10.0332 2.72"
                          stroke="#2B2A29"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="text-base font-semibold">Август 2025</span>
                    <button className="p-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M5.9668 2.72L10.3135 7.06667C10.8268 7.58 10.8268 8.42 10.3135 8.93333L5.9668 13.28"
                          stroke="#2B2A29"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar placeholder */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map(day => (
                    <div key={day} className="py-2 text-base font-semibold">
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div key={day} className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded transition-colors hover:bg-(--light-bg-color)">
                      <span className="text-base">{day}</span>
                      {day % 7 !== 0 && <span className="text-[10px] font-semibold text-(--gray-color)">{(20000 + day * 500).toLocaleString()}₽</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[120px]">
              <div className="mb-6 rounded-[32px] border border-(--border-color) bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl">Узнать стоимость</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] transition-colors hover:border-(--primary-color)"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8.00496 14.1517L1.74854 8.48465C-1.6517 5.08441 3.34664 -1.44404 8.00496 3.83766C12.6632 -1.44404 17.639 5.10709 14.2614 8.48465L8.00496 14.1517Z"
                          fill={isFavorite ? '#EB5C5C' : 'none'}
                          stroke="#2B2A29"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9D9D9] transition-colors hover:border-(--primary-color)">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M12.0008 5.143H14.2866C14.5896 5.143 14.8804 5.26341 15.0947 5.47773C15.309 5.69206 15.4294 5.98275 15.4294 6.28585V14.2859C15.4294 14.589 15.309 14.8796 15.0947 15.094C14.8804 15.3083 14.5896 15.4287 14.2866 15.4287H1.71512C1.41201 15.4287 1.12133 15.3083 0.907 15.094C0.692674 14.8796 0.572266 14.589 0.572266 14.2859V6.28585C0.572266 5.98275 0.692674 5.69206 0.907 5.47773C1.12133 5.26341 1.41201 5.143 1.71512 5.143H4.00084"
                          stroke="#2B2A29"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M8 8.57129V0.571289" stroke="#2B2A29" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.71484 2.85742L8.00056 0.571707L10.2863 2.85742" stroke="#2B2A29" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="cursor-pointer border border-(--border-color) bg-white px-6 py-4 transition-colors hover:border-(--primary-color)">
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

                  <div className="cursor-pointer border border-(--border-color) bg-white px-6 py-4 transition-colors hover:border-(--primary-color)">
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
                </div>

                <Link className="w-full rounded-full bg-(--text-color) px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-[#3B3A39]" href={`${id}/payment`}>
                  Рассчитать стоимость
                </Link>
              </div>

              <div className="rounded-4xl bg-(--light-bg-color) p-6">
                <h3 className="mb-5 text-xl">Задать вопрос владельцу</h3>
                <p className="text-base">
                  Если у вас есть вопросы об этом доме, вы можете напрямую обратиться к владельцу и уточнить все детали.{' '}
                  <Link href="#" className="text-(--secondary-color) underline hover:text-(--primary-color)">
                    Написать владельцу
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
