'use client';

import Api from '@/app/api';
import { TCompanyInfo } from '@/types';
import { useEffect, useState } from 'react';
import CompanyHeroCard from './CompanyHeroCard';

interface IProps {
  pageId: number;
  content: string | null;
}

const CompanyHero: React.FC<IProps> = ({ pageId, content }) => {
  const [company, setCompany] = useState<TCompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await Api.fetchCompanyByPage(pageId);
        if (res?.data) {
          setCompany(res.data);
        } else {
          throw new Error('Компания не найдена');
        }
      } catch (err: any) {
        const message = err.message || 'Неизвестная ошибка';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [pageId]);

  // Loading
  if (loading) {
    return (
      <div data-testid="company-hero" className="section">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div data-testid="company-hero" className="section">
        <div className="container">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Success
  if (company) {
    return <CompanyHeroCard company={company} content={content} />;
  }

  return (
    <div className="hero bg-gray-50 py-12">
      <div className="container">
        <p className="text-center text-gray-500">Компания не найдена</p>
      </div>
    </div>
  );
};

export default CompanyHero;
