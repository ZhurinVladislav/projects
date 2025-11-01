import CompanyContacts from '@/components/Company/CompanyContacts';
import CompanyGallery from '@/components/Company/CompanyGallery';
import { Document } from '@/components/Company/CompanyGallery/CompanyGallery';
import CompanyHero from '@/components/Company/CompanyHero';
import CompanyReviews from '@/components/Company/CompanyReviews';
import CompanyServices from '@/components/Company/CompanyServices';
import { TPage } from '@/types';

interface IProps {
  dataPage: TPage | null;
}

export const TemplateCompany: React.FC<IProps> = props => {
  const { dataPage } = props;

  const docs: Document[] = [
    { id: 1, type: 'PDF' },
    { id: 2, type: 'PNG' },
    { id: 3, type: 'PNG' },
    { id: 4, type: 'PDF' },
    { id: 5, type: 'JPG' },
  ];

  if (!dataPage) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title-1">Не удалось получить данные о компании</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* <h1>{dataPage.pageTitle}</h1> */}
      <CompanyHero pageId={dataPage.id} content={dataPage.content} />
      <CompanyContacts />
      <CompanyServices />
      <CompanyGallery documents={docs} />
      <CompanyReviews />
    </>
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
