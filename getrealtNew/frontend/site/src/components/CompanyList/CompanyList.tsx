// 'use client';

// import Api from '@/app/api';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import CompanyCard from '../Company/CompanyCard';
// import CompanyListSkeleton from './CompanyListSkeleton';

// interface IProps {
//   pageId: number;
//   filters: { service_ids: string[]; property_type_id?: string; rating?: number };
//   sort: string;
//   order: string;
//   page: number;
//   onPageChange: (p: number) => void;
// }

// const CompanyList: React.FC<IProps> = props => {
//   const { pageId, filters, sort, order, page, onPageChange } = props;

//   const [companies, setCompanies] = useState<any[]>([]);
//   const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         setLoading(true);
//         const params: any = { sort, order, per_page: 10, page };

//         if (filters.service_ids?.length) params.service_id = filters.service_ids.join(',');
//         if (filters.property_type_id) params.property_type_id = filters.property_type_id;
//         if (filters.rating && filters.rating > 0) params.rating = filters.rating;

//         const response = await Api.fetchCompaniesByPage(pageId, params);

//         if (!response || !response.data) {
//           setCompanies([]);
//           setError('Компании не найдены');
//           return;
//         }

//         setCompanies(response.data);
//         setMeta(response.meta || { current_page: 1, last_page: 1, total: 0 });
//       } catch (err) {
//         setError('Ошибка при загрузке компаний');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, [pageId, JSON.stringify(filters), sort, order, page]);

//   if (loading) {
//     return (
//       <div className="flex flex-col gap-6">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <CompanyListSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   // if (loading) {
//   //   return (
//   //     <div className="flex flex-col gap-6">
//   //       {Array.from({ length: 5 }).map((_, i) => (
//   //         <Loader key={i} type="skeleton" />
//   //       ))}
//   //     </div>
//   //   );
//   // }

//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="flex flex-col gap-6">
//       {companies.length > 0 ? (
//         <ul className="flex flex-col gap-6">
//           {companies.map((company, i) => (
//             <CompanyCard key={company.id} idx={i + 1} company={company} />
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-500">Компаний не найдено</p>
//       )}

//       {meta.last_page > 1 && (
//         <div className="mt-10 flex justify-center gap-5">
//           <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white disabled:opacity-50">
//             <ChevronLeft size={20} />
//           </button>

//           <ul className="flex items-center gap-2 rounded-xl bg-gray-100 px-4">
//             {Array.from({ length: meta.last_page }, (_, i) => (
//               <li key={i}>
//                 <button onClick={() => onPageChange(i + 1)} className={`rounded px-3 py-1 ${page === i + 1 ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <button
//             onClick={() => onPageChange(page + 1)}
//             disabled={page === meta.last_page}
//             className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white disabled:opacity-50"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyList;

'use client';

import Api from '@/app/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CompanyCard from '../Company/CompanyCard';
import CompanyListSkeleton from './CompanyListSkeleton';

interface IProps {
  pageId: number;
  filters: {
    service_ids: string[];
    property_type_id?: string;
    rating?: number;
  };
  sort: string;
  order: string;
  page: number;
  onPageChange: (p: number) => void;
}

const CompanyList: React.FC<IProps> = props => {
  const { pageId, filters, sort, order, page, onPageChange } = props;

  const [companies, setCompanies] = useState<any[]>([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ БЕЗОПАСНЫЕ ЗАВИСИМОСТИ ДЛЯ useEffect
  const filtersKey = useMemo(() => {
    return JSON.stringify({
      service_ids: filters.service_ids.sort(), // ✅ Сортируем для стабильности
      property_type_id: filters.property_type_id,
      rating: filters.rating,
    });
  }, [filters.service_ids, filters.property_type_id, filters.rating]);

  useEffect(() => {
    let isCancelled = false;

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ БЕЗОПАСНЫЕ ПАРАМЕТРЫ
        const params: Record<string, any> = {
          sort,
          order,
          per_page: 10,
          page,
        };

        if (filters.service_ids?.length > 0) {
          params.service_id = filters.service_ids.join(',');
        }
        if (filters.property_type_id) {
          params.property_type_id = filters.property_type_id;
        }
        if (filters.rating && filters.rating > 0) {
          params.rating = filters.rating;
        }

        console.log('[CompanyList] Fetching:', { pageId, params, filtersKey });

        const response = await Api.fetchCompaniesByPage(pageId, params);

        // ✅ ПРОВЕРКА ОТВЕТА
        if (isCancelled) return;

        if (!response) {
          throw new Error('Нет ответа от сервера');
        }

        if (!response.data || !Array.isArray(response.data)) {
          console.warn('[CompanyList] Invalid data:', response.data);
          setCompanies([]);
          setMeta({ current_page: 1, last_page: 1, total: 0 });
          setError('Компании не найдены');
          return;
        }

        // ✅ БЕЗОПАСНАЯ МЕТА
        const safeMeta = {
          current_page: Math.max(1, response.meta?.current_page || 1),
          last_page: Math.max(1, response.meta?.last_page || 1),
          total: response.meta?.total || 0,
        };

        console.log('[CompanyList] Success:', {
          count: response.data.length,
          meta: safeMeta,
        });

        setCompanies(response.data);
        setMeta(safeMeta);
      } catch (err: any) {
        if (isCancelled) return;

        console.error('[CompanyList] Error:', err);
        setError(err.message || 'Ошибка при загрузке компаний');
        setCompanies([]);
        setMeta({ current_page: 1, last_page: 1, total: 0 });
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchCompanies();

    return () => {
      isCancelled = true;
    };
  }, [pageId, filtersKey, sort, order, page]); // ✅ СТАБИЛЬНЫЕ ЗАВИСИМОСТИ

  // ✅ LOADING
  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }, (_, i) => (
          <CompanyListSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // ✅ ERROR
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-500">{error}</p>
        <button onClick={() => window.location.reload()} className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Повторить
        </button>
      </div>
    );
  }

  // ✅ ОСНОВНОЙ РЕНДЕР
  return (
    <div className="flex flex-col gap-6">
      {companies.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {companies.map((company, i) => (
            <li key={String(company.id || `company-${i}`)} className="list-none">
              <CompanyCard idx={i + 1} company={company} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">Компаний не найдено</p>
        </div>
      )}

      {/* ✅ ПАГИНАЦИЯ */}
      {meta.last_page > 1 && (
        <div className="mt-10 flex items-center justify-center gap-5">
          {/* Предыдущая */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Страницы */}
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 px-2 py-1">
            {Array.from({ length: meta.last_page }, (_, i) => {
              const pageNum = i + 1;
              const isActive = page === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-700 hover:bg-white hover:text-indigo-600'}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Следующая */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === meta.last_page}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
