import CompanyCreate from '@/components/Company/CompanyCreate';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Создание компании`,
  description: `Создание компании | ${SITE.APP_NAME}`,
};

export default function CompanyCreatePage() {
  return <CompanyCreate />;
}
