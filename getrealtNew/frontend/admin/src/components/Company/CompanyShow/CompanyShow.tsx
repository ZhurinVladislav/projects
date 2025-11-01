import Api from '@/app/api';
import CompanyForm from '../CompanyForm';

interface IProps {
  id: string;
}

const CompanyShow: React.FC<IProps> = async ({ id }) => {
  try {
    const responsePages = await Api.fetchGetPagesSimple();
    const responseCategories = await Api.FetchCategoriesServicesList();
    const responseServices = await Api.fetchServices();
    const responseCompany = await Api.fetchShowCompany(id);

    const dataPages = responsePages.data;
    const dataCategories = responseCategories.data;
    const dataServices = responseServices.data;
    const dataCompany = responseCompany.data;

    if (dataPages && dataCategories && dataServices && dataCompany) {
      return (
        <>
          <h1 className="title-1">Обновление компании: {dataCompany.title}</h1>

          <div className="flex flex-col gap-3">
            <CompanyForm dataPages={dataPages} dataCategories={dataCategories} dataServices={dataServices} obj={dataCompany} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="title-1">Объект компании пуст, обновите страницу, если не помогло, то свяжитесь с тех. поддержкой</h1>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CompanyShow;
