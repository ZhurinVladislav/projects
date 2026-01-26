'use client';

import Api from '@/app/api';
import CompanyContacts from '@/components/Company/CompanyContacts';
import CompanyHero from '@/components/Company/CompanyHero';
import CompanyReviews from '@/components/Company/CompanyReviews';
import CompanyServices from '@/components/Company/CompanyServices';
import { TCompanyInfo, TPage } from '@/types';
import { useEffect, useState } from 'react';

interface IProps {
  dataPage: TPage | null;
}

export const TemplateCompany: React.FC<IProps> = props => {
  const { dataPage } = props;

  const [pageId, setPageId] = useState<number | null>(null);
  const [company, setCompany] = useState<TCompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const docs: Document[] = [
  //   { id: 1, type: 'PDF' },
  //   { id: 2, type: 'PNG' },
  //   { id: 3, type: 'PNG' },
  //   { id: 4, type: 'PDF' },
  //   { id: 5, type: 'JPG' },
  // ];

  if (!dataPage) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title-1">Не удалось получить данные о компании</h1>
        </div>
      </section>
    );
  }

  useEffect(() => {
    setPageId(dataPage.id);

    if (pageId) {
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
    }
  }, [pageId]);

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

  if (error) {
    return (
      <div data-testid="company-hero" className="section">
        <div className="container">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  console.log(company);

  if (company) {
    return (
      <>
        {/* <h1>{dataPage.pageTitle}</h1> */}
        <CompanyHero company={company} content={dataPage.content} />
        <CompanyContacts company={company} />
        <CompanyServices serviceCategories={company.serviceCategories} />
        {/* <CompanyGallery documents={docs} /> */}
        <CompanyReviews company={company} />
      </>
    );
  }

  return (
    <div className="hero bg-gray-50 py-12">
      <div className="container">
        <p className="text-center text-gray-500">Компания не найдена</p>
      </div>
    </div>
  );

  // console.log(dataPage);

  // const docs: Document[] = [
  //   { id: 1, type: 'PDF' },
  //   { id: 2, type: 'PNG' },
  //   { id: 3, type: 'PNG' },
  //   { id: 4, type: 'PDF' },
  //   { id: 5, type: 'JPG' },
  // ];
  // if (!dataPage) return <></>;
  // if (!dataPage) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <p className="text-gray-500">Компании не найдены</p>
  //     </div>
  //   );
  // }
  // return <>{dataPage}</>;

  // return (
  //   <>
  //     {/* <CompanyHero pageId={dataPage.id} content={dataPage.content} /> */}
  //     <CompanyContacts />
  //     {/* <CompanyServices /> */}
  //     {/* <CompanyGallery documents={docs} /> */}
  //     {/* <CompanyReviews /> */}
  //   </>
  // );
};
