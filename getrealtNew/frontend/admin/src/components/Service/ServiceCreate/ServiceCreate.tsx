import Api from '@/app/api';
import ServiceForm from '../ServiceForm';

const ServiceCreate: React.FC = async () => {
  try {
    const response = await Api.FetchCategoriesServicesList();
    const data = response.data;

    return (
      <>
        <h1 className="title-1">Создание услуги</h1>

        <div className="flex flex-col gap-3">
          <ServiceForm dataCategory={data} />
        </div>
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default ServiceCreate;
