import FilterServices from '@/components/FilterServices';
import PageContent from '@/components/PageContent';
import Services from '@/components/Services';
import { TPage } from '@/types';

interface IProps {
  dataPage: TPage;
}

export const TemplateServices: React.FC<IProps> = props => {
  const { dataPage } = props;

  return (
    <>
      {/* <Breadcrumbs /> */}
      <Services dataPage={dataPage} />
      <FilterServices dataPage={dataPage} dataServices={null} isMain={true} />
      {dataPage && <PageContent content={dataPage.content} />}
      {/* <Services inner={true} dataPage={dataPage} /> */}
      {/* {dataPage && <PageContent content={dataPage.content} />} */}
    </>
  );
};
