import Api from '@/app/api';
import ServiceForm from '../ServiceForm';

interface IProps {
  id: string;
}

const ServiceShow: React.FC<IProps> = async ({ id }) => {
  try {
    const responseCategories = await Api.FetchCategoriesServicesList();
    const responseServices = await Api.fetchShowService(id);

    const dataCategories = responseCategories.data;
    const dataServices = responseServices.data;

    if (dataCategories && dataServices) {
      return (
        <>
          <h1 className="title-1">Обновление услуги: {dataServices.title}</h1>

          <div className="flex flex-col gap-3">
            <ServiceForm dataCategory={dataCategories} obj={dataServices} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="title-1">Объект услуг пуст, обновите страницу, если не помогло, то свяжитесь с тех. поддержкой</h1>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default ServiceShow;
