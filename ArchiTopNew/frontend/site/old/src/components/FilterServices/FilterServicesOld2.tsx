'use client';

import Api from '@/app/api';
import { TCompaniesNotAlias, TPage, TServices } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  dataPage: TPage;
  dataServices: TServices;
}

const FilterServicesOld2: React.FC<IProps> = ({ dataPage, dataServices }) => {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<TCompaniesNotAlias>([]);
  const [meta, setMeta] = useState<{ total: number; current_page: number; last_page: number }>({
    total: 0,
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      searchParams.forEach((v, k) => (params[k] = v));

      const response = await Api.fetchCompaniesByPage(dataPage.id, params);
      setCompanies(response.data);
      setMeta(response.meta);
    } catch (e) {
      console.error('Ошибка загрузки компаний', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [searchParams]);

  if (loading) return <p>Загрузка компаний...</p>;
  if (companies.length === 0) return <p>Компании не найдены</p>;

  return (
    <section data-testid="filter-services-section" className="section">
      <div className="container">
        <div className="flex flex-col gap-17">
          <h2 className="mb-4 text-xl font-semibold">Компании ({meta.total})</h2>
          <ul className="flex flex-col gap-8">
            {/* {companies.map(company => (
              // <CompanyCard key={company.id} company={company} />
              // <li key={c.id} className="rounded-lg bg-white p-4 shadow">
              //   <h3 className="font-bold">{c.title}</h3>
              //   <p>Рейтинг: {c.rating ?? '—'}</p>
              //   <p>Отзывы: {c.totalReviews ?? 0}</p>
              //   {c.promo && <span className="text-sm font-medium text-green-600">🔥 Промо</span>}
              // </li>
            ))} */}
          </ul>
          <div className="mt-4 text-sm text-gray-500">
            Страница {meta.current_page} из {meta.last_page}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterServicesOld2;
