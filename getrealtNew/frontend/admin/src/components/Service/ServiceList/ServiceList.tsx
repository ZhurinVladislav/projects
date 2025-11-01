import Api from '@/app/api';
import ServiceListTable from './ServiceListTable';

const ServiceList: React.FC = async () => {
  try {
    const response = await Api.fetchServices();
    const data = response.data;

    return (
      <>
        <h1 className="title-1">Услуги</h1>

        <ServiceListTable data={data} />
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default ServiceList;
