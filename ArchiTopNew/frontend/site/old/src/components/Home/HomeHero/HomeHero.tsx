'use client';

import Api from '@/app/api';
import img from '@/assets/img/home/hero/img-1.png';
import { TStatistics } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CompanyHeroSkeleton from './HomeHeroStatisticsSkeleton';

const HomeHero = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<TStatistics | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await Api.fetchGetStatistics();

        if (res?.data) {
          setStatistics(res.data);
        } else {
          throw new Error('Не удалось получить статистику');
        }
      } catch (err: any) {
        const message = err.message || 'Неизвестная ошибка';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section data-testid="home-hero" className="section">
      <div className="container">
        <div className="mb-30 flex justify-between gap-3 max-md:flex-col-reverse max-sm:mb-20">
          <div className="flex flex-col">
            <h1 className="title-1">Рейтинг агентств недвижимости в России</h1>
            <p>Рейтинг лучших и проверенных риэлторских агентств</p>

            {/* <SearchForm typeEl="desc" /> */}
          </div>
          <Image src={img} className="flex h-full min-h-72 w-full max-w-127 min-w-100 object-fill max-sm:min-w-70" alt="Пейзаж с зданиями" />
        </div>

        {loading && <CompanyHeroSkeleton />}

        {error && <p className="text-red-500">{error}</p>}

        {statistics && (
          <ul data-testid="stats-list" className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {statistics.companies && (
              <li className="card items-center justify-center text-center">
                <p className="font-tenor-sans text-[40px] max-md:text-4xl">{statistics.companies}</p>
                <p>Проверенных агентств недвижимости</p>
              </li>
            )}
            {statistics.services && (
              <li className="card items-center justify-center text-center">
                <p className="font-tenor-sans text-[40px] max-md:text-4xl">{statistics.services}</p>
                <p>Оказываемых услуг</p>
              </li>
            )}
            {statistics.reviews != null && (
              <li className="card items-center justify-center text-center">
                <p className="font-tenor-sans text-[40px] max-md:text-4xl">{statistics.reviews}+</p>
                <p>Отзывов клиентов</p>
              </li>
            )}
            {statistics.visitors && (
              <li className="card items-center justify-center text-center">
                <p className="font-tenor-sans text-[40px] max-md:text-4xl">{statistics.visitors}+</p>
                <p>Посетителей в месяц</p>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HomeHero;
