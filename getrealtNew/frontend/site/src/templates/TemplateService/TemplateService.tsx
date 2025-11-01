import Api from '@/app/api';
import FilterServices from '@/components/FilterServices';
import PageContent from '@/components/PageContent';
import { TPage } from '@/types';

interface IProps {
  dataPage: TPage;
}

export const TemplateService: React.FC<IProps> = async props => {
  const { dataPage } = props;

  try {
    const responseServices = await Api.fetchGetCategoryServices(dataPage.id);

    const dataServices = responseServices.data;

    return (
      <>
        {/* <Breadcrumbs /> */}
        <FilterServices dataPage={dataPage} dataServices={dataServices} />
        <PageContent content={dataPage.content} />
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};
