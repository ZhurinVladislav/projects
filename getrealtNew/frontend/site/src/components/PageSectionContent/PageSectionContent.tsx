import { TPage } from '@/types';
import NotFoundPage from '../NotFoundPage';
import PageContent from '../PageContent';

interface IProps {
  data: TPage | null;
}

const PageSectionContent = async ({ data }: IProps) => {
  if (data) {
    return (
      <>
        {/* <Breadcrumbs /> */}
        <PageContent title={data.pageTitle} content={data.content} />
      </>
    );
  } else {
    <NotFoundPage />;
  }
};

export default PageSectionContent;
