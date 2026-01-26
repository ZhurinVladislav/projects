'use client';

import Api from '@/app/api';
import { TPage, TServices } from '@/types';
import { ChevronLeft, ChevronRight, ListFilter, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompanyCard from '../Company/CompanyCard';
import Loader from '../Loader';
import Checkbox from '../ui/Checkbox';
import Radio from '../ui/Radio';

interface IProps {
  dataPage: TPage;
  dataServices: TServices;
}

export default function FilterServicesNew({ dataPage, dataServices }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Состояния фильтров и данных ---
  const [filters, setFilters] = useState({
    service_ids: searchParams.get('service_id')?.split(',').filter(Boolean) || [],
    property_type_id: searchParams.get('property_type_id') || '',
    rating: Number(searchParams.get('rating')) || 0,
  });

  const [sort, setSort] = useState(searchParams.get('sort') || 'rating');
  const [order, setOrder] = useState(searchParams.get('order') || 'desc');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [companies, setCompanies] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ current_page: number; last_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // --- Формируем список активных фильтров ---
  const activeFilters = [];

  if (filters.service_ids.length > 0 && dataServices.length > 0) {
    const activeServices = dataServices.filter(s => filters.service_ids.includes(String(s.id)));
    activeServices.forEach(s => {
      activeFilters.push({ type: 'service_id', label: s.title, value: String(s.id) });
    });
  }

  if (filters.rating > 0) {
    activeFilters.push({ type: 'rating', label: `Рейтинг ${filters.rating}+`, value: filters.rating });
  }

  if (filters.property_type_id) {
    activeFilters.push({ type: 'property_type_id', label: `Тип: ${filters.property_type_id}`, value: filters.property_type_id });
  }

  // --- Очистка отдельного фильтра ---
  const clearFilter = (type: string, value: string) => {
    switch (type) {
      case 'service_id': {
        const updatedIds = filters.service_ids.filter(id => id !== value);
        setFilters(prev => ({ ...prev, service_ids: updatedIds }));
        updateQuery({
          service_id: updatedIds.length > 0 ? updatedIds.join(',') : null,
          page: 1,
        });
        break;
      }
      case 'rating': {
        setFilters(prev => ({ ...prev, rating: 0 }));
        updateQuery({ rating: null, page: 1 });
        break;
      }
      case 'property_type_id': {
        setFilters(prev => ({ ...prev, property_type_id: '' }));
        updateQuery({ property_type_id: null, page: 1 });
        break;
      }
    }
  };

  // --- Получение компаний ---
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, any> = {
        sort,
        order,
        per_page: 10,
        page,
      };

      if (filters.service_ids.length > 0) {
        params.service_id = filters.service_ids.join(',');
      }
      if (filters.property_type_id) params.property_type_id = filters.property_type_id;
      if (filters.rating > 0) params.rating = filters.rating;

      const response = await Api.fetchCompaniesByPage(dataPage.id, params);

      if (!response || response.status === false || !response.data) {
        setCompanies([]);
        setError(response?.message || 'Компании не найдены');
        return;
      }

      setCompanies(response.data);
      if (response.meta) {
        setMeta({
          current_page: response.meta.current_page,
          last_page: response.meta.last_page,
          total: response.meta.total,
        });
      }
    } catch (err) {
      console.error('Ошибка загрузки компаний:', err);
      setError('Ошибка при загрузке компаний');
    } finally {
      setLoading(false);
    }
  };

  // --- Следим за изменениями URL-параметров ---
  useEffect(() => {
    fetchCompanies();
  }, [searchParams]);

  // --- Обновление URL ---
  const updateQuery = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') params.delete(key);
      else params.set(key, String(value));
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // --- Обработчики фильтров ---
  const handleServiceChange = (id: string) => {
    let updatedIds = [...filters.service_ids];

    if (updatedIds.includes(id)) {
      updatedIds = updatedIds.filter(x => x !== id);
    } else {
      updatedIds.push(id);
    }

    setFilters(prev => ({ ...prev, service_ids: updatedIds }));
    setPage(1);

    updateQuery({
      service_id: updatedIds.length > 0 ? updatedIds.join(',') : null,
      page: 1,
    });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    updateQuery({ sort: value, page: 1 });
    setIsSortOpen(false);
  };

  const handleRatingChange = (r: number) => {
    const newRating = filters.rating === r ? 0 : r;
    setFilters(prev => ({ ...prev, rating: newRating }));
    updateQuery({ rating: newRating || null, page: 1 });
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > meta.last_page) return;
    setPage(newPage);
    updateQuery({ page: newPage });
  };

  // --- Состояния загрузки ---
  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section data-testid="filter-services-section" className="section">
      <div className="container">
        <div className="flex flex-col gap-17">
          {/* Верхние кнопки услуг */}
          <div className="card">
            <h1 className="title-2 text-center">{dataPage.longTitle === '' ? dataPage.pageTitle : dataPage.longTitle}</h1>

            {dataServices.length > 0 ? (
              <ul
                data-testid="filter-services-list"
                className="grid list-disc grid-cols-3 gap-4 pl-9 marker:text-2xl marker:leading-none marker:text-(--link-second-color) max-lg:grid-cols-2 max-md:grid-cols-1"
              >
                {dataServices.map(service => {
                  const isActive = filters.service_ids.includes(String(service.id));
                  return (
                    <li key={service.id}>
                      <button
                        onClick={() => handleServiceChange(String(service.id))}
                        className={`text-left text-base transition-colors duration-300 ease-linear ${isActive ? 'text-(--link-second-color)' : ''}`}
                      >
                        {service.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            {/* --- Фильтры --- */}
            <aside data-testid="filter-services" className="flex max-h-max w-full max-w-[314px] flex-col gap-10 rounded-4xl bg-white p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] max-lg:max-w-full">
              {/* Услуги */}
              {dataServices.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-semibold">Услуги</h3>
                  <ul className="flex flex-col gap-3">
                    {dataServices.map(service => (
                      <li key={service.id}>
                        <Checkbox checked={filters.service_ids.includes(String(service.id))} label={service.title} onChange={() => handleServiceChange(String(service.id))} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Тип недвижимости */}
              {/* <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Тип недвижимости</p>

                <ul className="flex flex-col gap-3">
                  {['Жилая', 'Коммерческая'].map(t => (
                    <li key={t}>
                      <Checkbox checked={filters.propertyTypes.includes(t)} onChange={() => handleFilterChange('propertyTypes', t)} label={t} />
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Рейтинг */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold">Рейтинг</h3>
                <ul className="flex flex-col gap-3">
                  {[4, 4.5].map(r => (
                    <li key={r}>
                      <Radio name="rating" label={`От ${r}+`} checked={filters.rating === r} onChange={() => handleRatingChange(r)} />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="flex w-full max-w-[1086px] flex-col gap-10">
              {/* Панель сортировки и плитки тегов */}
              <div data-testid="filter-tags-and-sort" className="relative flex min-h-20 items-center justify-between gap-3">
                {activeFilters.length > 0 && (
                  <div className="flex max-w-4xl flex-wrap gap-4 rounded-(--border-radius) bg-(--gray-color) px-6 py-4">
                    {activeFilters.map((filter, i) => (
                      <button key={i} onClick={() => clearFilter(filter.type, String(filter.value))} className="flex items-center justify-center gap-3 rounded-2xl bg-white p-3 text-base">
                        {filter.label}
                        <X size={14} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Панель сортировки */}
                <div className="relative ml-auto">
                  <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 text-base">
                    Сортировка
                    <ListFilter size={20} />
                  </button>

                  {isSortOpen && (
                    <div className="absolute top-12 right-3 z-10 w-40 rounded-lg border bg-white shadow-md">
                      {[
                        { key: 'rating', label: 'По рейтингу' },
                        { key: 'reviews', label: 'По отзывам' },
                        { key: 'title', label: 'По названию' },
                      ].map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => handleSortChange(opt.key)}
                          className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${sort === opt.key ? 'font-medium text-indigo-600' : ''}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* --- Компании --- */}
              <div className="flex flex-1 flex-col gap-6">
                {/* Список компаний */}
                {companies.length > 0 ? (
                  <ul className="flex flex-col gap-6">
                    {companies.map((company, i) => (
                      <CompanyCard key={company.id} idx={++i} company={company} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500">Компаний не найдено</p>
                )}

                {/* Пагинация */}
                {meta.last_page > 1 && (
                  <div className="mt-10 flex justify-center gap-5">
                    <button onClick={() => changePage(page - 1)} disabled={page === 1} className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white disabled:opacity-50">
                      <ChevronLeft size={20} />
                    </button>

                    <ul className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
                      {Array.from({ length: meta.last_page }, (_, i) => (
                        <li key={i}>
                          <button onClick={() => changePage(i + 1)} className={`rounded px-3 py-1 ${page === i + 1 ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => changePage(page + 1)}
                      disabled={page === meta.last_page}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
