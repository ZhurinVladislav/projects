import Api from '@/app/api';
import ResourcesForm from '../ResourcesForm';

interface IProps {
  id: string;
}

const Resource: React.FC<IProps> = async ({ id }) => {
  try {
    const responsePages = await Api.fetchGetPagesSimple();
    const responsePage = await Api.fetchShowPage(id);

    const dataPages = responsePages.data;
    const dataPage = responsePage.data;

    if (dataPage && dataPages) {
      return (
        <>
          <h1 className="title-1">Редактировать: {dataPage.pageTitle}</h1>
          <div className="flex flex-col gap-3">
            <ResourcesForm pages={dataPages} pageObj={dataPage} />
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

export default Resource;
