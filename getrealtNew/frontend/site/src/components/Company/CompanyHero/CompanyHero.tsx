import { TCompanyInfo } from '@/types';
import CompanyHeroCard from './CompanyHeroCard';

interface IProps {
  company: TCompanyInfo | null;
  content: string | null;
}

const CompanyHero: React.FC<IProps> = props => {
  const { company, content } = props;

  if (company) {
    return <CompanyHeroCard company={company} content={content} />;
  }

  return (
    <div className="hero bg-gray-50 py-12">
      <div className="container">
        <p className="text-center text-gray-500">Компания не найдена</p>
      </div>
    </div>
  );
};

export default CompanyHero;
