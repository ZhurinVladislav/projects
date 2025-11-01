import Api from '@/app/api';
import Link from 'next/link';
import CompanyForm from '../CompanyForm';

const CompanyCreate: React.FC = async () => {
  try {
    const responsePages = await Api.fetchGetPagesSimple();
    const responseCategories = await Api.FetchCategoriesServicesList();
    const responseServices = await Api.fetchServices();

    const dataPages = responsePages.data;
    const dataCategories = responseCategories.data;
    const dataServices = responseServices.data;

    return (
      <>
        <h1 className="title-1">Создание компании</h1>

        <div className="mb-4 flex max-w-max flex-col gap-1.5 rounded-sm border border-(--info-color) bg-(--info-op-color) p-2">
          <strong className="uppercase">Важно!</strong>
          <p>Для того, чтобы компания отобразилась на сайте, необходимо создать ресурс.</p>
          <Link className="underline hover:no-underline" href="/dashboard/resources/new">
            Создать ресурс
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <CompanyForm dataPages={dataPages} dataCategories={dataCategories} dataServices={dataServices} />
        </div>
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CompanyCreate;
