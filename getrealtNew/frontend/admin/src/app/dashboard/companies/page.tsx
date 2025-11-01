import CompaniesList from '@/components/Company/CompaniesList';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Компании`,
  description: `Добавление, редактирование и удаление компаний | ${SITE.APP_NAME}`,
};

export default function CompaniesPage() {
  return <CompaniesList />;
}
