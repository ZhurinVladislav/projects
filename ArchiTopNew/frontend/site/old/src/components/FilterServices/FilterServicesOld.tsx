// 'use client';

// import { TPage, TServices } from '@/types';
// import { ChevronLeft, ChevronRight, ListFilter, X } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useMemo, useState } from 'react';
// import RatingCard from '../RatingCard';
// import ButtonLink from '../ui/ButtonLink';
// import Checkbox from '../ui/Checkbox';
// import Radio from '../ui/Radio';

// export interface Company {
//   id: number;
//   name: string;
//   rating: number;
//   reviews: number;
//   category: string;
//   logo: string;
//   address: string;
//   tags: string[];
//   isPremium?: boolean;
// }

// interface FiltersState {
//   services: string[];
//   propertyTypes: string[];
//   rating: number;
// }

// const companiesData = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   name: `Компания №${i + 1}`,
//   rating: 4 + Math.random() * 1,
//   reviews: Math.floor(Math.random() * 200),
//   services: i % 2 === 0 ? ['Купля-продажа', 'Наследование'] : ['Управление недвижимостью'],
//   propertyType: i % 3 === 0 ? 'Коммерческая' : 'Жилая',
// }));

// interface IProps {
//   dataPage: TPage;
//   dataServices: TServices;
// }

// const FilterServicesOld: React.FC<IProps> = props => {
//   const { dataPage, dataServices } = props;

//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // --- Инициализация фильтров из URL ---
//   const [filters, setFilters] = useState<FiltersState>({
//     services: searchParams.get('services')?.split(',') || [],
//     propertyTypes: searchParams.get('types')?.split(',') || [],
//     rating: Number(searchParams.get('rating')) || 0,
//   });

//   const [sort, setSort] = useState<'none' | 'rating' | 'reviews'>((searchParams.get('sort') as 'none' | 'rating' | 'reviews') || 'none');

//   const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
//   const [isSortOpen, setIsSortOpen] = useState(false);
//   const ITEMS_PER_PAGE = 5;

//   // --- Debounce состояния ---
//   const [debouncedState, setDebouncedState] = useState({ filters, sort, page });

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedState({ filters, sort, page });
//     }, 300);
//     return () => clearTimeout(handler);
//   }, [filters, sort, page]);

//   // --- Обновление URL ---
//   useEffect(() => {
//     const params = new URLSearchParams();

//     if (debouncedState.filters.services.length > 0) params.set('services', debouncedState.filters.services.join(','));
//     if (debouncedState.filters.propertyTypes.length > 0) params.set('types', debouncedState.filters.propertyTypes.join(','));
//     if (debouncedState.filters.rating > 0) params.set('rating', debouncedState.filters.rating.toString());
//     if (debouncedState.sort !== 'none') params.set('sort', debouncedState.sort);
//     if (debouncedState.page > 1) params.set('page', debouncedState.page.toString());

//     const queryString = params.toString();
//     router.replace(`?${queryString}`, { scroll: false });
//   }, [debouncedState]);

//   // --- Изменение фильтров ---
//   const handleFilterChange = (type: 'services' | 'propertyTypes', value: string) => {
//     setFilters(prev => {
//       const isActive = prev[type].includes(value);
//       const updated = isActive ? prev[type].filter(v => v !== value) : [...prev[type], value];
//       return { ...prev, [type]: updated };
//     });
//     setPage(1); // сбрасываем пагинацию
//   };

//   const handleRatingChange = (value: number) => {
//     setFilters(prev => ({
//       ...prev,
//       rating: prev.rating === value ? 0 : value,
//     }));
//     setPage(1);
//   };

//   const clearFilter = (type: string, value?: string) => {
//     setFilters(prev => {
//       if (type === 'rating') return { ...prev, rating: 0 };
//       const arr = prev[type as 'services' | 'propertyTypes'];
//       return {
//         ...prev,
//         [type]: arr.filter(v => v !== value),
//       };
//     });
//     setPage(1);
//   };

//   const handleSortChange = (value: 'none' | 'rating' | 'reviews') => {
//     setSort(value);
//     setIsSortOpen(false);
//     setPage(1);
//   };

//   // --- Фильтрация и сортировка ---
//   const filteredCompanies = useMemo(() => {
//     return [...companiesData]
//       .filter(company => {
//         const serviceMatch = filters.services.length === 0 || filters.services.some(s => company.services.includes(s));
//         const typeMatch = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(company.propertyType);
//         const ratingMatch = filters.rating === 0 || company.rating >= filters.rating;
//         return serviceMatch && typeMatch && ratingMatch;
//       })
//       .sort((a, b) => {
//         if (sort === 'rating') return b.rating - a.rating;
//         if (sort === 'reviews') return b.reviews - a.reviews;
//         return 0;
//       });
//   }, [filters, sort]);

//   // --- Пагинация ---
//   const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
//   const paginatedCompanies = filteredCompanies.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const changePage = (newPage: number) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPage(newPage);
//   };

//   // --- Активные фильтры ---
//   const activeFilters = [
//     ...filters.services.map(v => ({ type: 'services', label: v })),
//     ...filters.propertyTypes.map(v => ({ type: 'propertyTypes', label: v })),
//     ...(filters.rating > 0 ? [{ type: 'rating', label: `Рейтинг ${filters.rating}+` }] : []),
//   ];

//   return (
//     <section data-testid="filter-services-section" className="section">
//       <div className="container">
//         <div className="flex flex-col gap-17">
//           {/* Верхние кнопки услуг */}
//           <div className="card">
//             <h1 className="title-2 text-center">{dataPage.longTitle === '' ? dataPage.pageTitle : dataPage.longTitle}</h1>

//             <ul
//               data-testid="filter-services-list"
//               className="grid list-disc grid-cols-3 gap-4 pl-9 marker:text-2xl marker:leading-none marker:text-(--link-second-color) max-lg:grid-cols-2 max-md:grid-cols-1"
//             >
//               {dataServices.map(service => {
//                 const isActive = filters.services.includes(service.title);
//                 return (
//                   <li key={service.id}>
//                     <button
//                       onClick={() => handleFilterChange('services', service.title)}
//                       className={`text-left text-base transition-colors duration-300 ease-linear ${isActive ? 'text-(--link-second-color)' : ''}`}
//                     >
//                       {service.title}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           <div className="flex flex-col justify-between gap-6 lg:flex-row">
//             {/* Сайдбар фильтров */}
//             <aside data-testid="filter-services" className="flex max-h-max w-full max-w-[314px] flex-col gap-10 rounded-4xl bg-white p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] max-lg:max-w-full">
//               {/* Услуги */}
//               <div className="flex flex-col gap-4">
//                 <p className="text-base font-semibold">Услуги</p>

//                 <ul className="flex flex-col gap-3">
//                   {dataServices.map(service => (
//                     <li key={service.id}>
//                       <Checkbox checked={filters.services.includes(service.title)} onChange={() => handleFilterChange('services', service.title)} className="mr-2" label={service.title} />
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Тип недвижимости */}
//               {/* <div className="flex flex-col gap-4">
//                 <p className="text-base font-semibold">Тип недвижимости</p>

//                 <ul className="flex flex-col gap-3">
//                   {['Жилая', 'Коммерческая'].map(t => (
//                     <li key={t}>
//                       <Checkbox checked={filters.propertyTypes.includes(t)} onChange={() => handleFilterChange('propertyTypes', t)} label={t} />
//                     </li>
//                   ))}
//                 </ul>
//               </div> */}

//               {/* Рейтинг */}
//               <div className="flex flex-col gap-4">
//                 <p className="text-base font-semibold">Рейтинг</p>

//                 <ul className="flex flex-col gap-3">
//                   {[4, 4.5].map(r => (
//                     <li key={r}>
//                       <Radio checked={filters.rating === r} name="rating" label={`От ${r}+`} onChange={() => handleRatingChange(r)} />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </aside>

//             <div className="flex w-full max-w-[1086px] flex-col gap-10">
//               {/* Панель сортировки и плитки тегов */}
//               <div data-testid="filter-tags-and-sort" className="relative flex min-h-20 items-center justify-between gap-3">
//                 {activeFilters.length > 0 && (
//                   <div className="flex max-w-4xl flex-wrap gap-4 rounded-(--border-radius) bg-(--gray-color) px-6 py-4">
//                     {activeFilters.map((filter, i) => (
//                       <button
//                         key={i}
//                         onClick={() => clearFilter(filter.type, filter.label.replace('Рейтинг ', '').replace('+', ''))}
//                         className="flex items-center justify-center gap-3 rounded-2xl bg-white p-3 text-base"
//                       >
//                         {filter.label} <X size={14} />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 <button onClick={() => setIsSortOpen(!isSortOpen)} className="ml-auto flex items-center gap-2 text-base">
//                   Сортировка
//                   <ListFilter size={20} />
//                 </button>

//                 {isSortOpen && (
//                   <div className="absolute top-12 right-3 z-10 w-40 rounded-lg border bg-white shadow-md">
//                     <button
//                       onClick={() => handleSortChange('rating')}
//                       className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${sort === 'rating' ? 'font-medium text-indigo-600' : ''}`}
//                     >
//                       По рейтингу
//                     </button>
//                     <button
//                       onClick={() => handleSortChange('reviews')}
//                       className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${sort === 'reviews' ? 'font-medium text-indigo-600' : ''}`}
//                     >
//                       По отзывам
//                     </button>
//                     <button onClick={() => handleSortChange('none')} className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${sort === 'none' ? 'font-medium text-indigo-600' : ''}`}>
//                       Без сортировки
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Список компаний */}
//               <div data-testid="filter-companies">
//                 {filteredCompanies.length > 0 && (
//                   <ul className="flex flex-col gap-8">
//                     {paginatedCompanies.map(c => (
//                       <li key={c.id} className="flex gap-4.5 rounded-(--border-radius) bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] max-lg:flex-col">
//                         <div className="flex w-full max-w-[238px] flex-col gap-6 max-lg:max-w-full">
//                           <div className="relative pt-5 pl-5">
//                             <div className="num num_first absolute top-0 left-0">{c.id}</div>
//                             <Image className="h-56.5 w-58 rounded-lg object-cover" src="/img/company/img-1.jpg" alt={c.name} width={232} height={226} />
//                           </div>

//                           <ul className="flex flex-col gap-2.5">
//                             <li className="flex gap-1.5">
//                               <p>Сайт:</p>
//                               <a className="link-text link-text_base font-normal" href="apex-realty.ru" target="_blank">
//                                 apex-realty.ru
//                               </a>
//                             </li>
//                             <li className="flex gap-1.5">
//                               <p>Опыт работы:</p>
//                               <p className="font-normal">15 лет</p>
//                             </li>
//                             <li className="flex gap-1.5">
//                               <p className="font-normal">
//                                 <strong>Город: </strong>
//                                 Краснодарский край, Сочи, Лазаревское
//                               </p>
//                             </li>
//                           </ul>
//                         </div>

//                         <div>
//                           <h3 className="title-3">{c.name}</h3>

//                           <RatingCard idCompany={0} />

//                           <div className="mb-6 flex flex-wrap gap-3">
//                             <ButtonLink href="tel:+79883145875" target="_blank" rel="noopener noreferrer">
//                               +7 (988) 314 58 75
//                             </ButtonLink>
//                             <ButtonLink href="/moscow/companies/apeks-nedvizhimost" variant="secondary" target="_blank">
//                               Подробнее
//                             </ButtonLink>
//                           </div>

//                           <div>
//                             <p>
//                               Апекс-Недвижимость «АН Апекс Недвижимость» является специализированным агентством с 2002 года по продаже и аренде коммерческой недвижимости. Наша команда насчитывает
//                               более 40 квалифицированных брокеров, работающих с базой из 3000 ликвидных нежилых помещений...
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {filteredCompanies.length === 0 && <p className="text-center">Ничего не найдено</p>}

//                 {/* Пагинация */}
//                 {filteredCompanies.length > 0 && (
//                   <div className="mt-10 flex justify-center gap-5">
//                     <button
//                       onClick={() => changePage(page - 1)}
//                       disabled={page === 1}
//                       className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 p-2 text-white transition hover:bg-indigo-600 disabled:cursor-auto disabled:opacity-50"
//                     >
//                       <ChevronLeft size={20} />
//                     </button>

//                     <ul className="flex min-h-12 items-center rounded-xl bg-(--gray-color)">
//                       {Array.from({ length: totalPages }, (_, i) => (
//                         <li key={i} className="min-h-max not-last:border-r-2 not-last:border-(--text-color-second)">
//                           <button
//                             onClick={() => changePage(i + 1)}
//                             className={`h-max px-4 text-base transition-colors duration-300 ease-linear ${page === i + 1 ? 'text-(--text-color)' : 'text-(--text-color-second) hover:text-(--text-color)'}`}
//                           >
//                             {i + 1}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>

//                     <button
//                       onClick={() => changePage(page + 1)}
//                       disabled={page === totalPages}
//                       className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 p-2 text-white transition hover:bg-indigo-600 disabled:cursor-auto disabled:opacity-50"
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FilterServicesOld;
