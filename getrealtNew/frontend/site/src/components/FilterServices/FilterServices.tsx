'use client';

import { TPage, TServices } from '@/types';
import { ListFilter, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CompanyList from '../CompanyList';
import Checkbox from '../ui/Checkbox';
import Radio from '../ui/Radio';

interface IProps {
  dataPage: TPage;
  dataServices: TServices;
}

const FilterServices: React.FC<IProps> = props => {
  const { dataPage, dataServices } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    service_ids: searchParams.get('service_id')?.split(',').filter(Boolean) || [],
    property_type_id: searchParams.get('property_type_id') || '',
    rating: Number(searchParams.get('rating')) || 0,
  });

  const [sort, setSort] = useState(searchParams.get('sort') || 'rating');
  const [order, setOrder] = useState(searchParams.get('order') || 'desc');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // --- Активные фильтры ---
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

  // --- Очистка фильтра ---
  const clearFilter = (type: string, value: string) => {
    switch (type) {
      case 'service_id': {
        const updated = filters.service_ids.filter(id => id !== value);
        setFilters({ ...filters, service_ids: updated });
        updateQuery({ service_id: updated.length ? updated.join(',') : null, page: 1 });
        break;
      }
      case 'rating':
        setFilters({ ...filters, rating: 0 });
        updateQuery({ rating: null, page: 1 });
        break;
    }
  };

  // --- Обновление query ---
  const updateQuery = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, String(value));
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleServiceChange = (id: string) => {
    let updated = [...filters.service_ids];
    if (updated.includes(id)) updated = updated.filter(x => x !== id);
    else updated.push(id);
    setFilters({ ...filters, service_ids: updated });
    setPage(1);
    updateQuery({ service_id: updated.length ? updated.join(',') : null, page: 1 });
  };

  const handleRatingChange = (r: number) => {
    const newR = filters.rating === r ? 0 : r;
    setFilters({ ...filters, rating: newR });
    updateQuery({ rating: newR || null, page: 1 });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    updateQuery({ sort: value, page: 1 });
    setIsSortOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQuery({ page: newPage });
  };

  // --- Основная разметка ---
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col gap-17">
          <div className="card">
            <h1 className="title-2 text-center">{dataPage.longTitle || dataPage.pageTitle}</h1>

            {dataServices.length > 0 && (
              <ul
                data-testid="filter-services-list"
                className="grid list-disc grid-cols-3 gap-4 pl-9 marker:text-2xl marker:leading-none marker:text-(--link-second-color) max-lg:grid-cols-2 max-md:grid-cols-1"
              >
                {dataServices.map(service => {
                  const isActive = filters.service_ids.includes(String(service.id));
                  return (
                    <li key={service.id}>
                      <button onClick={() => handleServiceChange(String(service.id))} className={`text-left transition-colors ${isActive ? 'text-(--link-second-color)' : ''}`}>
                        {service.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            {/* Фильтры */}
            <aside className="flex w-full max-w-[314px] flex-col gap-10 rounded-4xl bg-white p-8 shadow-md max-lg:max-w-full">
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

            {/* Список компаний */}
            <div className="flex w-full max-w-[1086px] flex-col gap-10">
              <div className="relative flex min-h-20 items-center justify-between gap-3">
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-4 rounded-xl bg-(--gray-color) px-6 py-4">
                    {activeFilters.map((f, i) => (
                      <button key={i} onClick={() => clearFilter(f.type, String(f.value))} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                        {f.label}
                        <X size={14} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative ml-auto">
                  <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2">
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
                          className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${sort === opt.key ? 'font-medium text-indigo-600' : ''}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 👇 отдельный компонент с загрузкой и пагинацией */}
              <CompanyList pageId={dataPage.id} filters={filters} sort={sort} order={order} page={page} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterServices;
