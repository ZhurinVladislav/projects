import Api from '@/app/api';
import CategoryServicesForm from '../CategoryServicesForm';

interface IProps {
  id: string;
}

const CategoryServices: React.FC<IProps> = async ({ id }) => {
  try {
    const pages = await Api.fetchGetPagesSimple();
    const response = await Api.fetchShowCategoryServices(id);

    const pagesData = pages.data;
    const categoryServicesData = response.data;

    if (pagesData && categoryServicesData) {
      return (
        <>
          <h1 className="title-1">Редактировать: {categoryServicesData.title}</h1>
          <div className="flex flex-col gap-3">
            <CategoryServicesForm pages={pagesData} obj={categoryServicesData} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="title-1">Объект страницы пуст, обновите страницу, если не помогло, то свяжитесь с тех. поддержкой</h1>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CategoryServices;
