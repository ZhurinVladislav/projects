import Api from '@/app/api';
import CompaniesListTable from './CompaniesListTable';

const CompaniesList: React.FC = async () => {
  try {
    const response = await Api.fetchCompanies();
    const data = response.data;

    return (
      <>
        <h1 className="title-1">Компании</h1>

        <CompaniesListTable data={data} />
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CompaniesList;
