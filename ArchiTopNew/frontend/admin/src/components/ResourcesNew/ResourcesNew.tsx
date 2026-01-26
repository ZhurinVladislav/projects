import Api from '@/app/api';
import ResourcesForm from '../ResourcesForm';

const ResourcesNew = async () => {
  try {
    const pages = await Api.fetchGetPagesSimple();

    return (
      <>
        <h1 className="title-1">Создание нового ресурса сайта</h1>

        <div className="flex flex-col gap-3">
          <ResourcesForm pages={pages.data} />
        </div>
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default ResourcesNew;
